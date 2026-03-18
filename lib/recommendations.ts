import { FoodItem, NutrientData, MealType, UserInventoryItem, MealComboRecommendation, UserProfile } from '@/types/nutrition';
import { ALL_FOODS, CATEGORY_NAMES } from './foods';
import { getUserInventory, getTodayRemainingMeals, getNextSuggestedMeal, getUserProfile } from './storage';

// 餐次中文名
const MEAL_NAMES: Record<MealType, string> = {
  breakfast: '早餐',
  lunch: '午餐',
  dinner: '晚餐',
  snack: '加餐',
};

// 餐次热量建议比例
const MEAL_CALORIE_RATIO: Record<MealType, number> = {
  breakfast: 0.25,
  lunch: 0.35,
  dinner: 0.30,
  snack: 0.10,
};

// 年龄相关饮食偏好配置
interface AgePreferences {
  preferHomemade: boolean;
  avoidCategories: string[];
  preferCategories: string[];
  maxSodiumPerMeal: number;     // mg
  preferTags: string[];
  avoidTags: string[];
  healthTips: string[];
}

/**
 * 根据年龄获取饮食偏好
 */
export function getAgePreferences(age: number): AgePreferences {
  if (age >= 50) {
    // 中老年人（50岁以上）
    return {
      preferHomemade: true,
      avoidCategories: ['fastfood', 'bbq', 'hotpot', 'snack'],
      preferCategories: ['soup', 'vegetable', 'seafood', 'bean', 'egg'],
      maxSodiumPerMeal: 1500,
      preferTags: ['低钠', '易消化', '清淡', '蒸', '煮', '高蛋白', '低脂'],
      avoidTags: ['油炸', '高热量', '辣', '烧烤', '麻辣', '重口味'],
      healthTips: [
        '建议以家常菜为主，减少外卖摄入',
        '多选择清蒸、水煮等清淡烹饪方式',
        '注意控制钠盐摄入，每日不超过5g',
        '优先选择鱼类、豆制品补充蛋白质',
        '适量补充钙质，预防骨质疏松',
      ],
    };
  } else if (age >= 40) {
    // 中年人（40-50岁）
    return {
      preferHomemade: true,
      avoidCategories: ['fastfood', 'bbq'],
      preferCategories: ['vegetable', 'seafood', 'bean'],
      maxSodiumPerMeal: 2000,
      preferTags: ['低脂', '高蛋白', '清淡'],
      avoidTags: ['油炸', '高热量'],
      healthTips: [
        '适度控制高热量食物摄入',
        '增加优质蛋白质摄入',
        '注意膳食纤维补充',
      ],
    };
  } else {
    // 青年人（40岁以下）
    return {
      preferHomemade: false,
      avoidCategories: [],
      preferCategories: [],
      maxSodiumPerMeal: 3000,
      preferTags: [],
      avoidTags: [],
      healthTips: [],
    };
  }
}

/**
 * 检查食物是否适合特定年龄段
 */
function isFoodSuitableForAge(food: FoodItem, preferences: AgePreferences): boolean {
  // 检查是否在避免分类中
  if (preferences.avoidCategories.includes(food.category)) {
    return false;
  }

  // 检查钠含量
  if (food.nutrients.sodium && food.nutrients.sodium > preferences.maxSodiumPerMeal) {
    return false;
  }

  // 检查标签
  for (const avoidTag of preferences.avoidTags) {
    if (food.tags.some(t => t.includes(avoidTag))) {
      return false;
    }
  }

  return true;
}

/**
 * 计算食物的年龄适配分数
 */
function calculateAgeSuitabilityScore(food: FoodItem, preferences: AgePreferences): number {
  let score = 50; // 基础分

  // 偏好分类加分
  if (preferences.preferCategories.includes(food.category)) {
    score += 20;
  }

  // 避免分类减分
  if (preferences.avoidCategories.includes(food.category)) {
    score -= 30;
  }

  // 偏好标签加分
  for (const preferTag of preferences.preferTags) {
    if (food.tags.some(t => t.includes(preferTag))) {
      score += 10;
    }
  }

  // 避免标签减分
  for (const avoidTag of preferences.avoidTags) {
    if (food.tags.some(t => t.includes(avoidTag))) {
      score -= 15;
    }
  }

  // 低钠加分
  if (food.nutrients.sodium && food.nutrients.sodium < 500) {
    score += 10;
  }

  // 高钠减分
  if (food.nutrients.sodium && food.nutrients.sodium > 1500) {
    score -= 20;
  }

  return Math.max(0, Math.min(100, score));
}

interface ComboItem {
  food: FoodItem;
  grams: number;
  source: 'inventory' | 'takeout' | 'homemade';
}

interface Combo {
  name: string;
  items: ComboItem[];
  totalNutrients: NutrientData;
  reason: string;
}

/**
 * 计算多个食物的总营养
 */
function calculateTotalNutrients(items: ComboItem[]): NutrientData {
  return items.reduce((acc, item) => ({
    calories: acc.calories + Math.round((item.food.nutrients.calories * item.grams) / 100),
    protein: acc.protein + Math.round((item.food.nutrients.protein * item.grams) / 100 * 10) / 10,
    carbs: acc.carbs + Math.round((item.food.nutrients.carbs * item.grams) / 100 * 10) / 10,
    fat: acc.fat + Math.round((item.food.nutrients.fat * item.grams) / 100 * 10) / 10,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
}

/**
 * 获取外卖套餐类食物
 */
function getTakeoutCombos(): FoodItem[] {
  return ALL_FOODS.filter(f =>
    ['takeout', 'fastfood'].includes(f.category) &&
    f.servingSize >= 300 && // 套餐份量通常较大
    f.nutrients.protein >= 8 // 有一定蛋白质
  ).sort((a, b) => {
    // 按蛋白质密度排序
    const densityA = a.nutrients.protein / a.nutrients.calories;
    const densityB = b.nutrients.protein / b.nutrients.calories;
    return densityB - densityA;
  });
}

/**
 * 获取适合加餐的食物
 */
function getSnackFoods(): FoodItem[] {
  return ALL_FOODS.filter(f =>
    ['snack', 'fruit', 'dairy'].includes(f.category) ||
    (f.nutrients.calories < 200 && f.servingSize < 200)
  );
}

/**
 * 从库存中获取可用食材
 */
function getAvailableInventory(): { item: UserInventoryItem; food: FoodItem }[] {
  const inventory = getUserInventory();
  const result: { item: UserInventoryItem; food: FoodItem }[] = [];

  for (const item of inventory) {
    if (item.quantity > 0) {
      // 尝试在食物库中找到匹配的
      const food = ALL_FOODS.find(f => f.id === item.foodId);
      if (food) {
        result.push({ item, food });
      } else {
        // 如果没找到，使用库存中的营养数据创建一个临时FoodItem
        result.push({
          item,
          food: {
            id: item.foodId,
            name: item.foodName,
            brand: item.brand,
            category: item.category,
            nutrients: item.nutrients,
            servingSize: 100,
            servingUnit: '100g',
            tags: item.tags,
          }
        });
      }
    }
  }

  return result;
}

/**
 * 智能推荐餐食组合
 */
export function getSmartRecommendations(
  deficit: NutrientData,
  targetCalories: number,
  userProfile?: UserProfile | null
): MealComboRecommendation[] {
  const remainingMeals = getTodayRemainingMeals();
  const recommendations: MealComboRecommendation[] = [];
  const inventory = getAvailableInventory();

  // 获取用户年龄偏好
  const profile = userProfile || getUserProfile();
  const age = profile?.age || 30;
  const agePreferences = getAgePreferences(age);

  for (const mealType of remainingMeals) {
    const mealCalorieTarget = Math.round(targetCalories * MEAL_CALORIE_RATIO[mealType]);
    const mealProteinTarget = Math.round(deficit.protein * MEAL_CALORIE_RATIO[mealType]);
    const combos: Combo[] = [];

    // 1. 优先推荐库存食材组合
    if (inventory.length > 0) {
      const inventoryCombo = createInventoryCombo(inventory, mealType, mealCalorieTarget, agePreferences);
      if (inventoryCombo) {
        combos.push(inventoryCombo);
      }
    }

    const fitnessGoal = profile?.goal || 'maintain';

    // 2. 根据年龄决定推荐顺序（家常菜始终优先）
    const homemadeCombo = createHomemadeCombo(mealType, mealCalorieTarget, mealProteinTarget, agePreferences, fitnessGoal);
    if (homemadeCombo) combos.push(homemadeCombo);

    // 外卖作为备选
    const takeoutCombo = createTakeoutCombo(mealType, mealCalorieTarget, mealProteinTarget, agePreferences);
    if (takeoutCombo) combos.push(takeoutCombo);

    if (combos.length > 0) {
      recommendations.push({
        mealType,
        combos,
      });
    }
  }

  return recommendations;
}

/**
 * 创建库存食材组合
 */
function createInventoryCombo(
  inventory: { item: UserInventoryItem; food: FoodItem }[],
  mealType: MealType,
  targetCalories: number,
  agePreferences: AgePreferences
): Combo | null {
  if (inventory.length === 0) return null;

  // 优先：看库存食材是否能凑出一道家常菜
  const inventoryNames = inventory.map(({ food }) => food.name);
  const homecookingDishes = ALL_FOODS.filter(f =>
    f.tags.includes('家常菜') &&
    !['soup'].includes(f.category)
  );

  // 找到食材名称与库存匹配度最高的家常菜
  let bestDish: FoodItem | null = null;
  let bestMatchCount = 0;
  for (const dish of homecookingDishes) {
    const matchCount = inventoryNames.filter(name =>
      dish.name.includes(name) || dish.tags.some(t => t === name)
    ).length;
    if (matchCount > bestMatchCount) {
      bestMatchCount = matchCount;
      bestDish = dish;
    }
  }

  if (bestDish && bestMatchCount >= 1) {
    // 找到匹配的家常菜，搭配主食推荐
    const staple = ALL_FOODS.find(f => f.id === 'rice-white');
    const items: ComboItem[] = [
      { food: bestDish, grams: bestDish.servingSize, source: 'homemade' },
    ];
    if (staple && mealType !== 'snack') {
      items.push({ food: staple, grams: 150, source: 'homemade' });
    }
    return {
      name: `用库存做：${bestDish.name}${staple && mealType !== 'snack' ? ' + 米饭' : ''}`,
      items,
      totalNutrients: calculateTotalNutrients(items),
      reason: `用您库存中的${inventoryNames.slice(0, 2).join('、')}可以做这道菜`,
    };
  }

  // 兜底：原始食材组合（最多3种）
  const items: ComboItem[] = [];
  let remainingCalories = targetCalories;
  const sorted = [...inventory]
    .filter(({ food }) => isFoodSuitableForAge(food, agePreferences))
    .sort((a, b) => {
      const scoreA = calculateAgeSuitabilityScore(a.food, agePreferences) + a.food.nutrients.protein;
      const scoreB = calculateAgeSuitabilityScore(b.food, agePreferences) + b.food.nutrients.protein;
      return scoreB - scoreA;
    });

  for (const { food } of sorted) {
    if (remainingCalories <= 0 || items.length >= 3) break;
    const grams = Math.min(food.servingSize, Math.round((remainingCalories / food.nutrients.calories) * 100));
    if (grams >= 50) {
      items.push({ food, grams, source: 'inventory' });
      remainingCalories -= (food.nutrients.calories * grams) / 100;
    }
  }

  if (items.length === 0) return null;
  return {
    name: `库存食材：${items.map(i => i.food.name).join(' + ')}`,
    items,
    totalNutrients: calculateTotalNutrients(items),
    reason: '使用您库存中的食材，避免浪费',
  };
}

// 用日期生成每日不同的轮换索引（同一天内稳定，每天自动变化）
function getDailyRotationIndex(mealType: MealType, poolSize: number): number {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const mealOffset = { breakfast: 0, lunch: 7, dinner: 17, snack: 29 }[mealType];
  return (dayOfYear + mealOffset) % poolSize;
}

// 家常早餐套餐池（每天轮换）
const BREAKFAST_POOLS: Array<{ name: string; foods: Array<{ id: string; grams: number }> }> = [
  { name: '鸡蛋 + 全麦面包 + 牛奶', foods: [{ id: 'egg-whole', grams: 100 }, { id: 'bread-whole', grams: 70 }, { id: 'milk-whole', grams: 250 }] },
  { name: '皮蛋瘦肉粥 + 卤蛋', foods: [{ id: 'hc-congee-pork', grams: 400 }, { id: 'hc-braised-egg', grams: 50 }] },
  { name: '蒸蛋羹 + 馒头 + 豆浆', foods: [{ id: 'hc-steamed-egg', grams: 150 }, { id: 'mantou', grams: 80 }, { id: 'soymilk', grams: 300 }] },
  { name: '燕麦粥 + 鸡蛋 + 牛奶', foods: [{ id: 'oatmeal', grams: 40 }, { id: 'egg-whole', grams: 50 }, { id: 'milk-whole', grams: 250 }] },
  { name: '八宝粥 + 茶叶蛋', foods: [{ id: 'hc-congee-eight-treasure', grams: 300 }, { id: 'hc-braised-egg', grams: 50 }] },
  { name: '韭菜炒鸡蛋 + 馒头 + 豆浆', foods: [{ id: 'hc-chive-egg', grams: 150 }, { id: 'mantou', grams: 80 }, { id: 'soymilk', grams: 250 }] },
  { name: '鸡蛋面条汤', foods: [{ id: 'hc-egg-noodle-soup', grams: 400 }] },
  { name: '番茄炒鸡蛋 + 米饭 + 豆浆', foods: [{ id: 'hc-tomato-egg', grams: 200 }, { id: 'rice-white', grams: 150 }, { id: 'soymilk', grams: 200 }] },
  { name: '小米粥 + 鸡蛋 + 咸菜', foods: [{ id: 'congee-millet', grams: 300 }, { id: 'egg-whole', grams: 50 }] },
];

// 午餐/晚餐家常菜池，按目标分类
const LUNCH_DINNER_POOLS: Record<string, Array<{ name: string; dishId: string; stapleId: string; soupId?: string }>> = {
  lose: [
    { name: '清蒸鲈鱼 + 蒜蓉菠菜 + 米饭', dishId: 'hc-steamed-fish', stapleId: 'rice-white', soupId: 'hc-seaweed-egg-soup' },
    { name: '西兰花炒虾仁 + 米饭 + 番茄蛋花汤', dishId: 'hc-shrimp-broccoli', stapleId: 'rice-white', soupId: 'hc-tomato-egg-soup' },
    { name: '清炒西兰花 + 红烧豆腐 + 米饭', dishId: 'hc-stir-fried-broccoli', stapleId: 'rice-white', soupId: 'hc-luffa-egg-soup' },
    { name: '番茄炒鸡蛋 + 蒜蓉炒青菜 + 米饭', dishId: 'hc-tomato-egg', stapleId: 'rice-white' },
    { name: '苦瓜炒蛋 + 清炒莲藕 + 糙米饭', dishId: 'hc-bitter-melon-egg', stapleId: 'rice-brown' },
    { name: '蒸蛋羹 + 蒜蓉菠菜 + 玉米', dishId: 'hc-steamed-egg', stapleId: 'corn' },
    { name: '麻婆豆腐 + 清炒西兰花 + 米饭', dishId: 'hc-mapo-tofu', stapleId: 'rice-white', soupId: 'hc-tofu-spinach' },
    { name: '凉拌木耳 + 拍黄瓜 + 番茄牛肉面', dishId: 'hc-cold-wood-ear', stapleId: 'hc-beef-noodle' },
    { name: '手撕包菜 + 肉末蒸蛋 + 米饭', dishId: 'hc-shredded-cabbage', stapleId: 'rice-white' },
    { name: '豆角炒肉 + 蒜蓉炒青菜 + 米饭', dishId: 'hc-green-bean-pork', stapleId: 'rice-white', soupId: 'hc-seaweed-egg-soup' },
  ],
  maintain: [
    { name: '宫保鸡丁 + 蒜蓉菠菜 + 米饭', dishId: 'hc-kung-pao-chicken', stapleId: 'rice-white', soupId: 'hc-tomato-egg-soup' },
    { name: '鱼香肉丝 + 清炒西兰花 + 米饭', dishId: 'hc-fish-fragrant-pork', stapleId: 'rice-white' },
    { name: '青椒炒肉 + 蒜蓉炒青菜 + 米饭', dishId: 'hc-green-pepper-pork', stapleId: 'rice-white', soupId: 'hc-seaweed-egg-soup' },
    { name: '木须肉 + 手撕包菜 + 米饭', dishId: 'hc-muxu-pork', stapleId: 'rice-white' },
    { name: '香菇炒肉片 + 清炒莲藕 + 米饭', dishId: 'hc-stir-fried-mushroom', stapleId: 'rice-white', soupId: 'hc-tomato-egg-soup' },
    { name: '番茄炒鸡蛋 + 红烧豆腐 + 米饭', dishId: 'hc-tomato-egg', stapleId: 'rice-white' },
    { name: '黄焖鸡 + 蒜蓉炒青菜 + 米饭', dishId: 'hc-braised-chicken', stapleId: 'rice-white' },
    { name: '地三鲜 + 蒜蓉菠菜 + 米饭', dishId: 'hc-three-fresh', stapleId: 'rice-white', soupId: 'hc-winter-melon-rib-soup' },
    { name: '醋溜土豆丝 + 麻婆豆腐 + 米饭', dishId: 'hc-potato-shreds', stapleId: 'rice-white' },
    { name: '芹菜炒肉丝 + 清炒南瓜 + 米饭', dishId: 'hc-celery-stir-pork', stapleId: 'rice-white', soupId: 'hc-luffa-egg-soup' },
    { name: '西兰花炒虾仁 + 番茄蛋花汤 + 米饭', dishId: 'hc-shrimp-broccoli', stapleId: 'rice-white', soupId: 'hc-tomato-egg-soup' },
    { name: '韭菜炒鸡蛋 + 醋溜土豆丝 + 馒头', dishId: 'hc-chive-egg', stapleId: 'mantou' },
  ],
  gain: [
    { name: '红烧排骨 + 清炒西兰花 + 米饭', dishId: 'hc-braised-spare-ribs', stapleId: 'rice-white', soupId: 'hc-corn-pork-soup' },
    { name: '回锅肉 + 手撕包菜 + 米饭', dishId: 'hc-twice-cooked-pork', stapleId: 'rice-white' },
    { name: '宫保鸡丁 + 蒜蓉菠菜 + 扬州炒饭', dishId: 'hc-kung-pao-chicken', stapleId: 'hc-yangzhou-fried-rice' },
    { name: '鱼香肉丝 + 豆角炒肉 + 米饭', dishId: 'hc-fish-fragrant-pork', stapleId: 'rice-white' },
    { name: '土豆炖鸡 + 蒜蓉炒青菜 + 米饭', dishId: 'hc-braised-chicken-potato', stapleId: 'rice-white', soupId: 'hc-corn-pork-soup' },
    { name: '可乐鸡翅 + 清炒西兰花 + 米饭', dishId: 'hc-cola-wings', stapleId: 'rice-white' },
    { name: '香菇炒肉片 + 韭菜炒鸡蛋 + 米饭', dishId: 'hc-stir-fried-mushroom', stapleId: 'rice-white', soupId: 'hc-mushroom-chicken-soup' },
    { name: '红烧肉 + 蒜蓉菠菜 + 米饭', dishId: 'hc-braised-pork', stapleId: 'rice-white' },
    { name: '粉蒸排骨 + 清炒西兰花 + 米饭', dishId: 'hc-steamed-pork-ribs', stapleId: 'rice-white' },
    { name: '木须肉 + 红烧豆腐 + 米饭', dishId: 'hc-muxu-pork', stapleId: 'rice-white', soupId: 'hc-lotus-root-pork-soup' },
  ],
};

// 加餐池
const SNACK_POOLS = [
  [{ id: 'apple', grams: 200 }, { id: 'yogurt-plain', grams: 150 }],
  [{ id: 'banana', grams: 120 }, { id: 'milk-whole', grams: 200 }],
  [{ id: 'edamame', grams: 100 }, { id: 'orange', grams: 200 }],
  [{ id: 'hc-braised-egg', grams: 100 }, { id: 'kiwi', grams: 80 }],
  [{ id: 'yogurt-greek', grams: 150 }, { id: 'strawberry', grams: 100 }],
  [{ id: 'peanut', grams: 30 }, { id: 'apple', grams: 200 }],
  [{ id: 'tofu-firm', grams: 100 }, { id: 'orange', grams: 200 }],
];

/**
 * 创建外卖套餐组合
 */
function createTakeoutCombo(
  mealType: MealType,
  targetCalories: number,
  targetProtein: number,
  agePreferences: AgePreferences
): Combo | null {
  const items: ComboItem[] = [];

  if (mealType === 'snack') {
    const snacks = getSnackFoods().filter(f => isFoodSuitableForAge(f, agePreferences));
    const proteinSnack = snacks.find(f => f.nutrients.protein > 10);
    if (proteinSnack) {
      items.push({ food: proteinSnack, grams: proteinSnack.servingSize, source: 'takeout' });
    }
  } else {
    const combos = getTakeoutCombos()
      .filter(f =>
        isFoodSuitableForAge(f, agePreferences) &&
        // 降低三文鱼等少见食材的优先级
        !['salmon', 'tuna', 'beef-sirloin'].includes(f.id)
      )
      .sort((a, b) => calculateAgeSuitabilityScore(b, agePreferences) - calculateAgeSuitabilityScore(a, agePreferences));

    const idx = getDailyRotationIndex(mealType, Math.max(combos.length, 1));
    const bestCombo = combos[idx % combos.length] || combos[0];

    if (bestCombo) {
      items.push({ food: bestCombo, grams: bestCombo.servingSize, source: 'takeout' });
    }
  }

  if (items.length === 0) return null;

  const totalNutrients = calculateTotalNutrients(items);
  const mainItem = items[0].food;
  const reasonSuffix = agePreferences.preferHomemade ? '（偶尔换换口味）' : '';

  return {
    name: `${mainItem.brand || ''}${mainItem.name}`,
    items,
    totalNutrients,
    reason: `外卖选择，${CATEGORY_NAMES[mainItem.category] || '快餐'}${reasonSuffix}`,
  };
}

/**
 * 创建家常菜组合（每天轮换，多元化推荐）
 */
function createHomemadeCombo(
  mealType: MealType,
  targetCalories: number,
  targetProtein: number,
  agePreferences: AgePreferences,
  fitnessGoal?: string
): Combo | null {
  const items: ComboItem[] = [];

  if (mealType === 'breakfast') {
    const pool = BREAKFAST_POOLS;
    const idx = getDailyRotationIndex(mealType, pool.length);
    const chosen = pool[idx];
    for (const { id, grams } of chosen.foods) {
      const food = ALL_FOODS.find(f => f.id === id);
      if (food) items.push({ food, grams, source: 'homemade' });
    }
    if (items.length === 0) return null;
    const totalNutrients = calculateTotalNutrients(items);
    return {
      name: `家常早餐：${chosen.name}`,
      items,
      totalNutrients,
      reason: '营养均衡的中式早餐',
    };
  }

  if (mealType === 'lunch' || mealType === 'dinner') {
    const goal = fitnessGoal || 'maintain';
    const pool = LUNCH_DINNER_POOLS[goal] || LUNCH_DINNER_POOLS['maintain'];
    // 午晚餐用不同的偏移避免推荐同样的菜
    const offset = mealType === 'dinner' ? Math.floor(pool.length / 2) : 0;
    const idx = (getDailyRotationIndex(mealType, pool.length) + offset) % pool.length;
    const chosen = pool[idx];

    const dish = ALL_FOODS.find(f => f.id === chosen.dishId);
    const staple = ALL_FOODS.find(f => f.id === chosen.stapleId);
    const soup = chosen.soupId ? ALL_FOODS.find(f => f.id === chosen.soupId) : null;

    if (dish) items.push({ food: dish, grams: dish.servingSize, source: 'homemade' });
    if (staple) items.push({ food: staple, grams: staple.servingSize, source: 'homemade' });
    if (soup && items.length < 3) items.push({ food: soup, grams: soup.servingSize, source: 'homemade' });

    if (items.length === 0) return null;
    const totalNutrients = calculateTotalNutrients(items);
    return {
      name: `家常${MEAL_NAMES[mealType]}：${chosen.name}`,
      items,
      totalNutrients,
      reason: agePreferences.preferHomemade ? '清淡家常，易消化，营养均衡' : '地道家常菜，健康美味',
    };
  }

  // 加餐
  const pool = SNACK_POOLS;
  const idx = getDailyRotationIndex(mealType, pool.length);
  const chosen = pool[idx];
  for (const { id, grams } of chosen) {
    const food = ALL_FOODS.find(f => f.id === id);
    if (food) items.push({ food, grams, source: 'homemade' });
  }
  if (items.length === 0) return null;
  const totalNutrients = calculateTotalNutrients(items);
  return {
    name: `加餐：${items.map(i => i.food.name).join(' + ')}`,
    items,
    totalNutrients,
    reason: '补充能量，健康加餐',
  };
}

/**
 * 获取简化的推荐文本
 */
export function getQuickRecommendationText(
  deficit: NutrientData,
  targetCalories: number
): string[] {
  const recommendations = getSmartRecommendations(deficit, targetCalories);
  const texts: string[] = [];

  for (const rec of recommendations) {
    if (rec.combos.length > 0) {
      const combo = rec.combos[0]; // 取第一个推荐
      texts.push(`${MEAL_NAMES[rec.mealType]}：${combo.name}（${combo.totalNutrients.calories}卡，蛋白质${combo.totalNutrients.protein}g）`);
    }
  }

  return texts;
}

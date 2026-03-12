import { FoodItem, NutrientData, MealType, UserInventoryItem, MealComboRecommendation } from '@/types/nutrition';
import { ALL_FOODS, CATEGORY_NAMES } from './foods';
import { getUserInventory, getTodayRemainingMeals, getNextSuggestedMeal } from './storage';

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
  targetCalories: number
): MealComboRecommendation[] {
  const remainingMeals = getTodayRemainingMeals();
  const recommendations: MealComboRecommendation[] = [];
  const inventory = getAvailableInventory();

  for (const mealType of remainingMeals) {
    const mealCalorieTarget = Math.round(targetCalories * MEAL_CALORIE_RATIO[mealType]);
    const mealProteinTarget = Math.round(deficit.protein * MEAL_CALORIE_RATIO[mealType]);
    const combos: Combo[] = [];

    // 1. 优先推荐库存食材组合
    if (inventory.length > 0) {
      const inventoryCombo = createInventoryCombo(inventory, mealType, mealCalorieTarget);
      if (inventoryCombo) {
        combos.push(inventoryCombo);
      }
    }

    // 2. 推荐外卖套餐组合
    const takeoutCombo = createTakeoutCombo(mealType, mealCalorieTarget, mealProteinTarget);
    if (takeoutCombo) {
      combos.push(takeoutCombo);
    }

    // 3. 推荐自制餐组合
    const homemadeCombo = createHomemadeCombo(mealType, mealCalorieTarget, mealProteinTarget);
    if (homemadeCombo) {
      combos.push(homemadeCombo);
    }

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
  targetCalories: number
): Combo | null {
  if (inventory.length === 0) return null;

  const items: ComboItem[] = [];
  let remainingCalories = targetCalories;

  // 优先选择高蛋白食材
  const sorted = [...inventory].sort((a, b) =>
    b.food.nutrients.protein - a.food.nutrients.protein
  );

  for (const { food } of sorted) {
    if (remainingCalories <= 0) break;

    const grams = Math.min(food.servingSize, Math.round((remainingCalories / food.nutrients.calories) * 100));
    if (grams >= 50) {
      items.push({ food, grams, source: 'inventory' });
      remainingCalories -= (food.nutrients.calories * grams) / 100;
    }

    if (items.length >= 3) break; // 最多3种食材
  }

  if (items.length === 0) return null;

  const totalNutrients = calculateTotalNutrients(items);

  return {
    name: `我的食材：${items.map(i => i.food.name).join(' + ')}`,
    items,
    totalNutrients,
    reason: '使用您库存中的食材，避免浪费',
  };
}

/**
 * 创建外卖套餐组合
 */
function createTakeoutCombo(
  mealType: MealType,
  targetCalories: number,
  targetProtein: number
): Combo | null {
  const items: ComboItem[] = [];

  if (mealType === 'snack') {
    // 加餐推荐轻食
    const snacks = getSnackFoods();
    const proteinSnack = snacks.find(f => f.nutrients.protein > 10);
    if (proteinSnack) {
      items.push({ food: proteinSnack, grams: proteinSnack.servingSize, source: 'takeout' });
    }
  } else {
    // 正餐推荐套餐
    const combos = getTakeoutCombos();

    // 找到热量最接近目标的套餐
    const bestCombo = combos.find(f => {
      const totalCal = (f.nutrients.calories * f.servingSize) / 100;
      return totalCal >= targetCalories * 0.7 && totalCal <= targetCalories * 1.3;
    });

    if (bestCombo) {
      items.push({ food: bestCombo, grams: bestCombo.servingSize, source: 'takeout' });

      // 如果蛋白质不够，推荐加一个高蛋白小食
      const comboProtein = (bestCombo.nutrients.protein * bestCombo.servingSize) / 100;
      if (comboProtein < targetProtein * 0.8) {
        const proteinBoost = ALL_FOODS.find(f =>
          f.nutrients.protein > 20 &&
          f.servingSize <= 150 &&
          ['takeout', 'meat'].includes(f.category)
        );
        if (proteinBoost) {
          items.push({ food: proteinBoost, grams: 100, source: 'takeout' });
        }
      }
    }
  }

  if (items.length === 0) return null;

  const totalNutrients = calculateTotalNutrients(items);
  const mainItem = items[0].food;

  return {
    name: items.length > 1
      ? `${mainItem.brand || ''}${mainItem.name} + ${items[1].food.name}`
      : `${mainItem.brand || ''}${mainItem.name}`,
    items,
    totalNutrients,
    reason: `推荐${MEAL_NAMES[mealType]}外卖，${CATEGORY_NAMES[mainItem.category] || '轻食'}`,
  };
}

/**
 * 创建自制餐组合
 */
function createHomemadeCombo(
  mealType: MealType,
  targetCalories: number,
  targetProtein: number
): Combo | null {
  const items: ComboItem[] = [];

  if (mealType === 'breakfast') {
    // 早餐：鸡蛋 + 全麦面包 + 牛奶
    const egg = ALL_FOODS.find(f => f.name.includes('鸡蛋') && f.category === 'egg');
    const bread = ALL_FOODS.find(f => f.name.includes('全麦') && f.category === 'grain');
    const milk = ALL_FOODS.find(f => f.name.includes('牛奶') && f.category === 'dairy');

    if (egg) items.push({ food: egg, grams: 100, source: 'homemade' }); // 2个鸡蛋
    if (bread) items.push({ food: bread, grams: 60, source: 'homemade' }); // 2片
    if (milk) items.push({ food: milk, grams: 250, source: 'homemade' });
  } else if (mealType === 'lunch' || mealType === 'dinner') {
    // 正餐：米饭 + 鸡胸肉 + 蔬菜
    const rice = ALL_FOODS.find(f => f.name.includes('米饭') && f.category === 'staple');
    const chicken = ALL_FOODS.find(f => f.name.includes('鸡胸肉') && !f.brand);
    const veggie = ALL_FOODS.find(f => f.name.includes('西兰花') || f.name.includes('青菜'));

    if (rice) items.push({ food: rice, grams: 150, source: 'homemade' });
    if (chicken) items.push({ food: chicken, grams: 150, source: 'homemade' });
    if (veggie) items.push({ food: veggie, grams: 150, source: 'homemade' });
  } else {
    // 加餐：水果 + 坚果
    const fruit = ALL_FOODS.find(f => f.name.includes('香蕉') || f.name.includes('苹果'));
    const nuts = ALL_FOODS.find(f => f.category === 'nut' && f.servingSize <= 30);

    if (fruit) items.push({ food: fruit, grams: fruit.servingSize, source: 'homemade' });
    if (nuts) items.push({ food: nuts, grams: 25, source: 'homemade' });
  }

  if (items.length === 0) return null;

  const totalNutrients = calculateTotalNutrients(items);

  return {
    name: `自制${MEAL_NAMES[mealType]}：${items.map(i => i.food.name).join(' + ')}`,
    items,
    totalNutrients,
    reason: '健康自制，营养均衡',
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

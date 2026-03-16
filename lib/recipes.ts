import { Recipe, MealType } from '@/types/nutrition';

// 家常菜谱数据库
// 包含简单易做、营养均衡的家常菜
export const RECIPES: Recipe[] = [
  // ==================== 蛋类菜品 ====================
  {
    id: 'recipe-fanqie-chaodan',
    name: '番茄炒蛋',
    difficulty: 'easy',
    cookingTime: 10,
    ingredients: [
      { foodId: 'egg', name: '鸡蛋', amount: 150 },
      { foodId: 'tomato', name: '番茄', amount: 200 },
    ],
    instructions: [
      '鸡蛋打散加少许盐搅拌均匀',
      '番茄切块备用',
      '热锅凉油，倒入蛋液炒散盛出',
      '锅中少许油，放入番茄翻炒出汁',
      '倒入炒好的鸡蛋，加盐调味即可',
    ],
    nutrients: {
      calories: 280,
      protein: 18,
      carbs: 12,
      fat: 18,
    },
    servings: 2,
    mealTypes: ['lunch', 'dinner'],
    tags: ['家常', '快手', '下饭', '清淡'],
  },
  {
    id: 'recipe-zhengdan',
    name: '蒸蛋羹',
    difficulty: 'easy',
    cookingTime: 15,
    ingredients: [
      { foodId: 'egg', name: '鸡蛋', amount: 100 },
    ],
    instructions: [
      '鸡蛋打散，加1.5倍温水搅拌均匀',
      '过滤蛋液去除气泡',
      '盖上保鲜膜，大火蒸8-10分钟',
      '出锅淋少许酱油和香油即可',
    ],
    nutrients: {
      calories: 160,
      protein: 12,
      carbs: 2,
      fat: 11,
    },
    servings: 1,
    mealTypes: ['breakfast', 'lunch', 'dinner'],
    tags: ['清淡', '易消化', '老人', '儿童', '蒸'],
  },
  {
    id: 'recipe-danchaofan',
    name: '蛋炒饭',
    difficulty: 'easy',
    cookingTime: 10,
    ingredients: [
      { foodId: 'egg', name: '鸡蛋', amount: 100 },
      { foodId: 'rice', name: '米饭', amount: 200 },
      { foodId: 'scallion', name: '葱花', amount: 20, optional: true },
    ],
    instructions: [
      '隔夜米饭打散备用',
      '鸡蛋打散',
      '热锅多油，倒入蛋液快速翻炒',
      '蛋液半凝固时加入米饭翻炒',
      '加盐调味，撒葱花出锅',
    ],
    nutrients: {
      calories: 420,
      protein: 14,
      carbs: 52,
      fat: 16,
    },
    servings: 1,
    mealTypes: ['lunch', 'dinner'],
    tags: ['快手', '主食', '家常'],
  },
  {
    id: 'recipe-jidanzhou',
    name: '鸡蛋粥',
    difficulty: 'easy',
    cookingTime: 20,
    ingredients: [
      { foodId: 'egg', name: '鸡蛋', amount: 50 },
      { foodId: 'rice', name: '大米', amount: 50 },
    ],
    instructions: [
      '大米洗净，加水煮成粥',
      '鸡蛋打散',
      '粥煮好后，淋入蛋液搅拌',
      '加少许盐调味即可',
    ],
    nutrients: {
      calories: 220,
      protein: 10,
      carbs: 30,
      fat: 6,
    },
    servings: 1,
    mealTypes: ['breakfast'],
    tags: ['清淡', '易消化', '早餐', '养胃'],
  },

  // ==================== 蔬菜类菜品 ====================
  {
    id: 'recipe-suanrong-bocai',
    name: '蒜蓉菠菜',
    difficulty: 'easy',
    cookingTime: 8,
    ingredients: [
      { foodId: 'spinach', name: '菠菜', amount: 300 },
      { foodId: 'garlic', name: '蒜', amount: 20 },
    ],
    instructions: [
      '菠菜洗净，开水焯烫30秒捞出',
      '蒜切末',
      '热锅凉油，爆香蒜末',
      '放入菠菜快速翻炒',
      '加盐调味出锅',
    ],
    nutrients: {
      calories: 85,
      protein: 6,
      carbs: 8,
      fat: 4,
    },
    servings: 2,
    mealTypes: ['lunch', 'dinner'],
    tags: ['清淡', '蔬菜', '快手', '低卡'],
  },
  {
    id: 'recipe-liangban-huanggua',
    name: '凉拌黄瓜',
    difficulty: 'easy',
    cookingTime: 5,
    ingredients: [
      { foodId: 'cucumber', name: '黄瓜', amount: 300 },
      { foodId: 'garlic', name: '蒜', amount: 15, optional: true },
    ],
    instructions: [
      '黄瓜拍碎切段',
      '蒜切末',
      '加入盐、醋、生抽、香油拌匀',
      '放冰箱冷藏10分钟更佳',
    ],
    nutrients: {
      calories: 60,
      protein: 3,
      carbs: 10,
      fat: 2,
    },
    servings: 2,
    mealTypes: ['lunch', 'dinner'],
    tags: ['凉菜', '清淡', '快手', '低卡', '夏季'],
  },
  {
    id: 'recipe-tudousi',
    name: '清炒土豆丝',
    difficulty: 'easy',
    cookingTime: 12,
    ingredients: [
      { foodId: 'potato', name: '土豆', amount: 300 },
    ],
    instructions: [
      '土豆去皮切丝，泡水去除淀粉',
      '沥干水分',
      '热锅凉油，放入土豆丝快炒',
      '加醋、盐调味',
      '炒至断生即可出锅',
    ],
    nutrients: {
      calories: 180,
      protein: 4,
      carbs: 38,
      fat: 3,
    },
    servings: 2,
    mealTypes: ['lunch', 'dinner'],
    tags: ['家常', '素菜', '快手'],
  },

  // ==================== 肉类菜品 ====================
  {
    id: 'recipe-qingchao-jixiong',
    name: '清炒鸡胸肉',
    difficulty: 'easy',
    cookingTime: 15,
    ingredients: [
      { foodId: 'chicken-breast', name: '鸡胸肉', amount: 200 },
      { foodId: 'broccoli', name: '西兰花', amount: 150, optional: true },
    ],
    instructions: [
      '鸡胸肉切片，加料酒、淀粉腌制10分钟',
      '西兰花焯水备用',
      '热锅凉油，滑炒鸡肉至变色',
      '加入西兰花翻炒',
      '加盐调味出锅',
    ],
    nutrients: {
      calories: 280,
      protein: 45,
      carbs: 8,
      fat: 8,
    },
    servings: 2,
    mealTypes: ['lunch', 'dinner'],
    tags: ['高蛋白', '低脂', '减脂', '健身'],
  },
  {
    id: 'recipe-qingjiao-rousi',
    name: '青椒肉丝',
    difficulty: 'medium',
    cookingTime: 15,
    ingredients: [
      { foodId: 'pork', name: '猪肉', amount: 150 },
      { foodId: 'green-pepper', name: '青椒', amount: 200 },
    ],
    instructions: [
      '猪肉切丝，加料酒、淀粉腌制',
      '青椒切丝',
      '热锅凉油，滑炒肉丝至变色盛出',
      '锅中放油炒青椒',
      '倒入肉丝，加盐、酱油调味出锅',
    ],
    nutrients: {
      calories: 320,
      protein: 22,
      carbs: 12,
      fat: 20,
    },
    servings: 2,
    mealTypes: ['lunch', 'dinner'],
    tags: ['家常', '下饭'],
  },

  // ==================== 海鲜/豆腐类 ====================
  {
    id: 'recipe-xilanhua-xiaren',
    name: '西兰花炒虾仁',
    difficulty: 'easy',
    cookingTime: 12,
    ingredients: [
      { foodId: 'shrimp', name: '虾仁', amount: 150 },
      { foodId: 'broccoli', name: '西兰花', amount: 200 },
    ],
    instructions: [
      '虾仁加料酒、淀粉腌制',
      '西兰花焯水备用',
      '热锅凉油，快炒虾仁至变色盛出',
      '锅中放油炒西兰花',
      '倒入虾仁，加盐调味出锅',
    ],
    nutrients: {
      calories: 200,
      protein: 28,
      carbs: 10,
      fat: 6,
    },
    servings: 2,
    mealTypes: ['lunch', 'dinner'],
    tags: ['高蛋白', '低脂', '海鲜', '清淡'],
  },
  {
    id: 'recipe-qingzheng-yu',
    name: '清蒸鱼',
    difficulty: 'medium',
    cookingTime: 20,
    ingredients: [
      { foodId: 'fish', name: '鱼', amount: 400 },
      { foodId: 'ginger', name: '姜', amount: 20, optional: true },
      { foodId: 'scallion', name: '葱', amount: 30, optional: true },
    ],
    instructions: [
      '鱼处理干净，两面划刀',
      '铺上姜丝，大火蒸8-10分钟',
      '倒掉盘中腥水，铺上葱丝',
      '淋上热油和蒸鱼豉油',
    ],
    nutrients: {
      calories: 280,
      protein: 48,
      carbs: 2,
      fat: 8,
    },
    servings: 2,
    mealTypes: ['lunch', 'dinner'],
    tags: ['清淡', '高蛋白', '蒸', '低脂', '老人'],
  },
  {
    id: 'recipe-hongshao-doufu',
    name: '红烧豆腐',
    difficulty: 'easy',
    cookingTime: 15,
    ingredients: [
      { foodId: 'tofu', name: '豆腐', amount: 300 },
    ],
    instructions: [
      '豆腐切块',
      '热锅少油，煎至两面金黄',
      '加入酱油、糖、水',
      '小火焖煮5分钟',
      '大火收汁出锅',
    ],
    nutrients: {
      calories: 220,
      protein: 18,
      carbs: 10,
      fat: 12,
    },
    servings: 2,
    mealTypes: ['lunch', 'dinner'],
    tags: ['素菜', '家常', '豆制品', '高蛋白'],
  },

  // ==================== 汤类 ====================
  {
    id: 'recipe-fanqie-dantang',
    name: '番茄蛋花汤',
    difficulty: 'easy',
    cookingTime: 10,
    ingredients: [
      { foodId: 'tomato', name: '番茄', amount: 200 },
      { foodId: 'egg', name: '鸡蛋', amount: 50 },
    ],
    instructions: [
      '番茄切块',
      '锅中放油炒番茄出汁',
      '加水煮开',
      '淋入打散的蛋液',
      '加盐调味，撒葱花出锅',
    ],
    nutrients: {
      calories: 120,
      protein: 8,
      carbs: 10,
      fat: 6,
    },
    servings: 2,
    mealTypes: ['lunch', 'dinner'],
    tags: ['汤', '清淡', '开胃', '快手'],
  },
  {
    id: 'recipe-zicai-dantang',
    name: '紫菜蛋花汤',
    difficulty: 'easy',
    cookingTime: 5,
    ingredients: [
      { foodId: 'seaweed', name: '紫菜', amount: 10 },
      { foodId: 'egg', name: '鸡蛋', amount: 50 },
    ],
    instructions: [
      '水烧开，放入紫菜',
      '淋入打散的蛋液',
      '加盐、香油调味即可',
    ],
    nutrients: {
      calories: 80,
      protein: 7,
      carbs: 4,
      fat: 4,
    },
    servings: 2,
    mealTypes: ['lunch', 'dinner'],
    tags: ['汤', '快手', '清淡', '低卡'],
  },
];

// 根据关键词搜索菜谱
export function searchRecipes(query: string): Recipe[] {
  if (!query.trim()) return [];

  const term = query.toLowerCase();
  return RECIPES.filter(recipe =>
    recipe.name.toLowerCase().includes(term) ||
    recipe.tags.some(tag => tag.includes(term)) ||
    recipe.ingredients.some(ing => ing.name.includes(term))
  );
}

// 根据餐次获取菜谱
export function getRecipesByMealType(mealType: MealType): Recipe[] {
  return RECIPES.filter(recipe => recipe.mealTypes.includes(mealType));
}

// 根据难度获取菜谱
export function getRecipesByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Recipe[] {
  return RECIPES.filter(recipe => recipe.difficulty === difficulty);
}

// 根据标签获取菜谱
export function getRecipesByTag(tag: string): Recipe[] {
  return RECIPES.filter(recipe => recipe.tags.includes(tag));
}

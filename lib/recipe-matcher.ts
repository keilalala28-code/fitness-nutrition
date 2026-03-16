import { Recipe, RecipeMatch, UserInventoryItem, MealType } from '@/types/nutrition';
import { RECIPES } from './recipes';
import { getUserInventory } from './storage';

// 食材名称映射表（将库存食材名映射到菜谱食材名）
const INGREDIENT_ALIASES: Record<string, string[]> = {
  '鸡蛋': ['鸡蛋', '蛋', '土鸡蛋', '草鸡蛋'],
  '番茄': ['番茄', '西红柿', '圣女果'],
  '土豆': ['土豆', '马铃薯'],
  '鸡胸肉': ['鸡胸肉', '鸡肉', '鸡胸'],
  '猪肉': ['猪肉', '五花肉', '瘦肉', '里脊肉', '猪里脊'],
  '西兰花': ['西兰花', '花菜', '花椰菜'],
  '虾仁': ['虾仁', '虾', '大虾', '白虾', '基围虾'],
  '豆腐': ['豆腐', '嫩豆腐', '老豆腐', '北豆腐', '南豆腐'],
  '米饭': ['米饭', '大米', '白米', '糙米'],
  '菠菜': ['菠菜', '青菜', '绿叶菜'],
  '黄瓜': ['黄瓜', '小黄瓜'],
  '青椒': ['青椒', '辣椒', '柿子椒', '彩椒'],
  '蒜': ['蒜', '大蒜', '蒜头', '蒜瓣'],
  '葱': ['葱', '大葱', '小葱', '香葱', '葱花'],
  '姜': ['姜', '生姜', '老姜'],
  '鱼': ['鱼', '鲈鱼', '草鱼', '鲫鱼', '带鱼', '鳕鱼', '龙利鱼'],
  '紫菜': ['紫菜', '海苔'],
};

/**
 * 检查库存食材是否匹配菜谱食材
 */
function doesIngredientMatch(inventoryName: string, recipeIngredientName: string): boolean {
  const normalizedInventory = inventoryName.toLowerCase();
  const normalizedRecipe = recipeIngredientName.toLowerCase();

  // 直接匹配
  if (normalizedInventory.includes(normalizedRecipe) || normalizedRecipe.includes(normalizedInventory)) {
    return true;
  }

  // 通过别名匹配
  for (const [key, aliases] of Object.entries(INGREDIENT_ALIASES)) {
    const matchesKey = aliases.some(alias =>
      normalizedInventory.includes(alias.toLowerCase()) ||
      alias.toLowerCase().includes(normalizedInventory)
    );

    if (matchesKey) {
      const matchesRecipe = aliases.some(alias =>
        normalizedRecipe.includes(alias.toLowerCase()) ||
        alias.toLowerCase().includes(normalizedRecipe)
      ) || normalizedRecipe.includes(key.toLowerCase());

      if (matchesRecipe) return true;
    }
  }

  return false;
}

/**
 * 计算菜谱与库存的匹配度
 */
export function matchRecipeWithInventory(recipe: Recipe, inventory: UserInventoryItem[]): RecipeMatch {
  const matchedIngredients: string[] = [];
  const missingIngredients: string[] = [];

  // 只检查必需食材
  const requiredIngredients = recipe.ingredients.filter(ing => !ing.optional);

  for (const ingredient of requiredIngredients) {
    const found = inventory.some(item =>
      doesIngredientMatch(item.foodName, ingredient.name)
    );

    if (found) {
      matchedIngredients.push(ingredient.name);
    } else {
      missingIngredients.push(ingredient.name);
    }
  }

  const matchRatio = requiredIngredients.length > 0
    ? matchedIngredients.length / requiredIngredients.length
    : 0;

  let status: 'complete' | 'almost' | 'partial';
  if (matchRatio === 1) {
    status = 'complete';
  } else if (missingIngredients.length === 1) {
    status = 'almost';
  } else {
    status = 'partial';
  }

  return {
    recipe,
    matchedIngredients,
    missingIngredients,
    matchRatio,
    status,
  };
}

/**
 * 获取可制作的菜谱推荐
 * @param minMatchRatio 最低匹配度（0-1），默认0.5
 */
export function getRecipeRecommendations(minMatchRatio: number = 0.5): RecipeMatch[] {
  const inventory = getUserInventory();

  if (inventory.length === 0) {
    return [];
  }

  const matches = RECIPES.map(recipe => matchRecipeWithInventory(recipe, inventory));

  // 过滤出匹配度达标的菜谱
  const qualified = matches.filter(m => m.matchRatio >= minMatchRatio);

  // 排序：完全匹配 > 只差一样 > 部分匹配，同组内按匹配度降序
  return qualified.sort((a, b) => {
    const statusOrder = { complete: 3, almost: 2, partial: 1 };
    const statusDiff = statusOrder[b.status] - statusOrder[a.status];
    if (statusDiff !== 0) return statusDiff;
    return b.matchRatio - a.matchRatio;
  });
}

/**
 * 根据餐次获取可制作的菜谱
 */
export function getRecipeRecommendationsByMealType(
  mealType: MealType,
  minMatchRatio: number = 0.5
): RecipeMatch[] {
  const all = getRecipeRecommendations(minMatchRatio);
  return all.filter(m => m.recipe.mealTypes.includes(mealType));
}

/**
 * 获取完全可制作的菜谱（100%匹配）
 */
export function getFullyMatchedRecipes(): RecipeMatch[] {
  return getRecipeRecommendations(1);
}

/**
 * 获取只差一样食材的菜谱
 */
export function getAlmostMatchedRecipes(): RecipeMatch[] {
  const all = getRecipeRecommendations(0);
  return all.filter(m => m.status === 'almost');
}

/**
 * 检查是否有任何可推荐的菜谱
 */
export function hasRecipeRecommendations(): boolean {
  return getRecipeRecommendations(0.5).length > 0;
}

/**
 * 获取推荐状态标签
 */
export function getMatchStatusLabel(status: 'complete' | 'almost' | 'partial'): string {
  switch (status) {
    case 'complete':
      return '可以做';
    case 'almost':
      return '只差一样';
    case 'partial':
      return '部分匹配';
  }
}

/**
 * 获取推荐状态颜色类名
 */
export function getMatchStatusColor(status: 'complete' | 'almost' | 'partial'): string {
  switch (status) {
    case 'complete':
      return 'bg-green-100 text-green-700';
    case 'almost':
      return 'bg-yellow-100 text-yellow-700';
    case 'partial':
      return 'bg-gray-100 text-gray-600';
  }
}

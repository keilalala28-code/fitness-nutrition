import { FoodItem, FoodCategory } from '@/types/nutrition';
import { CHINESE_FOODS } from './foods-basic';
import { TAKEOUT_FOODS } from './foods-takeout';
import { DRINK_FOODS } from './foods-drinks';
import { SNACK_FOODS } from './foods-snacks';
import { BAKERY_FOODS } from './foods-bakery';
import { HOMECOOKING_FOODS } from './foods-homecooking';
import { CONVENIENCE_FOODS } from './foods-convenience';
import foodsJson from '@/data/foods.json';

// 从JSON加载额外的食物数据
function loadFoodsFromJson(): FoodItem[] {
  const foods: FoodItem[] = [];
  const brands = foodsJson.brands as Record<string, {
    category: string;
    updateDate: string;
    products: Array<{
      id: string;
      name: string;
      servingSize: number;
      servingUnit: string;
      nutrients: { calories: number; protein: number; carbs: number; fat: number; fiber?: number; sugar?: number };
      tags: string[];
    }>;
  }>;

  for (const [brandName, brandData] of Object.entries(brands)) {
    for (const product of brandData.products) {
      foods.push({
        id: `json-${product.id}`,
        name: product.name,
        brand: brandName,
        category: brandData.category as FoodCategory,
        nutrients: product.nutrients,
        servingSize: product.servingSize,
        servingUnit: product.servingUnit,
        tags: [brandName, ...product.tags]
      });
    }
  }

  return foods;
}

// 获取数据版本信息
export function getDataVersion(): { version: string; lastUpdated: string } {
  return {
    version: foodsJson._meta.version,
    lastUpdated: foodsJson._meta.lastUpdated
  };
}

// JSON数据（可以通过编辑 data/foods.json 快速更新）
const JSON_FOODS = loadFoodsFromJson();

// 合并所有食物数据（TypeScript文件 + JSON配置）
export const ALL_FOODS: FoodItem[] = [
  ...CHINESE_FOODS,
  ...HOMECOOKING_FOODS,
  ...TAKEOUT_FOODS,
  ...DRINK_FOODS,
  ...SNACK_FOODS,
  ...BAKERY_FOODS,
  ...CONVENIENCE_FOODS,
  ...JSON_FOODS,
];

// 分类显示名称
export const CATEGORY_NAMES: Record<string, string> = {
  staple: '主食',
  grain: '谷物粗粮',
  meat: '肉类',
  seafood: '海鲜',
  vegetable: '蔬菜',
  fruit: '水果',
  dairy: '乳制品',
  egg: '蛋类',
  bean: '豆制品',
  nut: '坚果',
  drink: '饮品',
  snack: '零食',
  bakery: '烘焙糕点',
  takeout: '外卖菜品',
  restaurant: '餐厅',
  fastfood: '快餐',
  hotpot: '火锅',
  bbq: '烧烤',
  dimsum: '点心早茶',
  noodle: '面食',
  soup: '汤类',
  sauce: '调料',
  convenience: '便利店',
};

/**
 * 模糊搜索食物
 * 支持拼音、别名、品牌等多维度搜索
 */
export function searchFoods(query: string): FoodItem[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  const searchTerms = searchTerm.split(/\s+/); // 支持多关键词搜索

  // 计算匹配分数
  const scoredResults = ALL_FOODS.map(food => {
    let score = 0;

    for (const term of searchTerms) {
      // 名称完全匹配 (最高优先级)
      if (food.name.toLowerCase() === term) {
        score += 100;
      }
      // 名称开头匹配
      else if (food.name.toLowerCase().startsWith(term)) {
        score += 50;
      }
      // 名称包含
      else if (food.name.toLowerCase().includes(term)) {
        score += 30;
      }

      // 品牌匹配
      if (food.brand && food.brand.toLowerCase().includes(term)) {
        score += 25;
      }

      // 标签匹配
      for (const tag of food.tags) {
        if (tag.toLowerCase() === term) {
          score += 20;
        } else if (tag.toLowerCase().includes(term)) {
          score += 10;
        }
      }

      // 分类匹配
      const categoryName = CATEGORY_NAMES[food.category];
      if (categoryName && categoryName.includes(term)) {
        score += 15;
      }
    }

    return { food, score };
  });

  // 过滤有分数的结果并排序
  return scoredResults
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(r => r.food);
}

/**
 * 按分类获取食物
 */
export function getFoodsByCategory(category: string): FoodItem[] {
  return ALL_FOODS.filter(food => food.category === category);
}

/**
 * 按品牌获取食物
 */
export function getFoodsByBrand(brand: string): FoodItem[] {
  return ALL_FOODS.filter(food => food.brand === brand);
}

/**
 * 获取所有品牌列表
 */
export function getAllBrands(): string[] {
  const brands = new Set<string>();
  ALL_FOODS.forEach(food => {
    if (food.brand) {
      brands.add(food.brand);
    }
  });
  return Array.from(brands).sort();
}

/**
 * 根据营养素特点推荐食物
 */
export function recommendFoods(options: {
  highProtein?: boolean;
  lowCalorie?: boolean;
  lowCarb?: boolean;
  lowFat?: boolean;
  category?: string;
  limit?: number;
}): FoodItem[] {
  const { highProtein, lowCalorie, lowCarb, lowFat, category, limit = 10 } = options;

  let results = [...ALL_FOODS];

  // 分类筛选
  if (category) {
    results = results.filter(f => f.category === category);
  }

  // 计算每100卡路里含蛋白质量作为蛋白质密度
  if (highProtein) {
    results = results.filter(f => {
      const proteinDensity = f.nutrients.protein / (f.nutrients.calories || 1) * 100;
      return proteinDensity > 15; // 每100卡超过15g蛋白质
    });
    results.sort((a, b) => {
      const densityA = a.nutrients.protein / (a.nutrients.calories || 1);
      const densityB = b.nutrients.protein / (b.nutrients.calories || 1);
      return densityB - densityA;
    });
  }

  // 低热量筛选
  if (lowCalorie) {
    results = results.filter(f => f.nutrients.calories < 100);
    results.sort((a, b) => a.nutrients.calories - b.nutrients.calories);
  }

  // 低碳水筛选
  if (lowCarb) {
    results = results.filter(f => f.nutrients.carbs < 10);
    results.sort((a, b) => a.nutrients.carbs - b.nutrients.carbs);
  }

  // 低脂肪筛选
  if (lowFat) {
    results = results.filter(f => f.nutrients.fat < 5);
    results.sort((a, b) => a.nutrients.fat - b.nutrients.fat);
  }

  return results.slice(0, limit);
}

/**
 * 根据营养缺口推荐食物
 */
export function recommendByDeficit(deficit: {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}, preferTakeout: boolean = true): { food: FoodItem; reason: string; suggestedGrams: number }[] {
  const recommendations: { food: FoodItem; reason: string; suggestedGrams: number; priority: number }[] = [];

  // 优先补充蛋白质
  if (deficit.protein > 20) {
    const highProteinFoods = ALL_FOODS.filter(f => {
      const isHighProtein = f.nutrients.protein > 15;
      const isSuitable = preferTakeout ?
        ['takeout', 'fastfood', 'restaurant'].includes(f.category) || f.category === 'meat' :
        true;
      return isHighProtein && isSuitable;
    }).sort((a, b) => b.nutrients.protein - a.nutrients.protein);

    for (const food of highProteinFoods.slice(0, 3)) {
      const gramsNeeded = Math.round((deficit.protein / food.nutrients.protein) * 100);
      recommendations.push({
        food,
        reason: `高蛋白，每100g含${food.nutrients.protein}g蛋白质`,
        suggestedGrams: Math.min(gramsNeeded, food.servingSize * 2),
        priority: 3
      });
    }
  }

  // 补充热量（不是减脂目标时）
  if (deficit.calories > 300) {
    const balancedFoods = ALL_FOODS.filter(f => {
      const hasGoodRatio = f.nutrients.protein > 5 && f.nutrients.calories > 100;
      const isSuitable = preferTakeout ?
        ['takeout', 'fastfood', 'restaurant', 'staple'].includes(f.category) :
        true;
      return hasGoodRatio && isSuitable;
    });

    for (const food of balancedFoods.slice(0, 2)) {
      recommendations.push({
        food,
        reason: '营养均衡，适合补充热量',
        suggestedGrams: food.servingSize,
        priority: 2
      });
    }
  }

  // 补充碳水
  if (deficit.carbs > 50) {
    const carbFoods = ALL_FOODS.filter(f =>
      f.nutrients.carbs > 20 && f.category === 'staple'
    );

    for (const food of carbFoods.slice(0, 2)) {
      recommendations.push({
        food,
        reason: '优质碳水来源',
        suggestedGrams: food.servingSize,
        priority: 1
      });
    }
  }

  // 按优先级排序并去重
  return recommendations
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 5)
    .map(r => ({ food: r.food, reason: r.reason, suggestedGrams: r.suggestedGrams }));
}

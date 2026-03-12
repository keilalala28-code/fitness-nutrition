// 营养素数据类型
export interface NutrientData {
  calories: number;      // 卡路里 (kcal)
  protein: number;       // 蛋白质 (g)
  carbs: number;         // 碳水化合物 (g)
  fat: number;           // 脂肪 (g)
  fiber?: number;        // 膳食纤维 (g)
  sugar?: number;        // 糖 (g)
  sodium?: number;       // 钠 (mg)
  cholesterol?: number;  // 胆固醇 (mg)
  saturatedFat?: number; // 饱和脂肪 (g)
}

// 食物项目
export interface FoodItem {
  id: string;
  name: string;           // 中文名称
  category: FoodCategory; // 分类
  brand?: string;         // 品牌（如：星巴克、瑞幸等）
  nutrients: NutrientData; // 每100g的营养数据
  servingSize: number;    // 默认份量 (g)
  servingUnit: string;    // 份量单位描述
  tags: string[];         // 搜索标签
}

// 食物分类
export type FoodCategory =
  | 'staple'       // 主食
  | 'grain'        // 谷物/粗粮
  | 'meat'         // 肉类
  | 'seafood'      // 海鲜
  | 'vegetable'    // 蔬菜
  | 'fruit'        // 水果
  | 'dairy'        // 乳制品
  | 'egg'          // 蛋类
  | 'bean'         // 豆类
  | 'nut'          // 坚果
  | 'drink'        // 饮品
  | 'snack'        // 零食
  | 'takeout'      // 外卖
  | 'restaurant'   // 餐厅
  | 'fastfood'     // 快餐
  | 'hotpot'       // 火锅
  | 'bbq'          // 烧烤
  | 'dimsum'       // 点心
  | 'noodle'       // 面食
  | 'soup'         // 汤类
  | 'sauce';       // 调料

// 饮食记录
export interface DiaryEntry {
  id: string;
  date: string;           // YYYY-MM-DD
  foodId: string;
  foodName: string;
  grams: number;          // 实际克数
  nutrients: NutrientData;
  mealType: MealType;
  createdAt: number;
}

// 餐次类型
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

// 运动记录
export interface ExerciseEntry {
  id: string;
  date: string;
  exerciseId: string;
  exerciseName: string;
  duration: number;       // 分钟
  caloriesBurned: number; // 消耗热量
  createdAt: number;
}

// 运动项目
export interface ExerciseItem {
  id: string;
  name: string;
  category: ExerciseCategory;
  met: number;            // MET值
  description: string;
  tags: string[];
}

// 运动分类
export type ExerciseCategory =
  | 'cardio'        // 有氧运动
  | 'strength'      // 力量训练
  | 'flexibility'   // 柔韧性训练
  | 'sports'        // 球类运动
  | 'daily';        // 日常活动

// 力量训练部位
export type MuscleGroup =
  | 'chest'         // 胸
  | 'back'          // 背
  | 'shoulder'      // 肩
  | 'arm'           // 手臂
  | 'core'          // 核心
  | 'glute'         // 臀
  | 'leg'           // 腿
  | 'full';         // 全身

// 用户目标
export interface UserGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

// 用户资料
export interface UserProfile {
  gender: 'male' | 'female';
  age: number;
  height: number;     // cm
  weight: number;     // kg
  activityLevel: ActivityLevel;
  goal: FitnessGoal;
}

// 活动水平
export type ActivityLevel =
  | 'sedentary'      // 久坐
  | 'light'          // 轻度活动
  | 'moderate'       // 中度活动
  | 'active'         // 活跃
  | 'veryActive';    // 非常活跃

// 健身目标
export type FitnessGoal =
  | 'lose'           // 减脂
  | 'maintain'       // 维持
  | 'gain';          // 增肌

// 饮食建议
export interface DietRecommendation {
  type: 'takeout' | 'homemade';
  food: FoodItem;
  reason: string;
  suggestedGrams: number;
}

// 每日汇总
export interface DailySummary {
  date: string;
  consumed: NutrientData;
  burned: number;
  netCalories: number;
  goals: UserGoals;
  deficit: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

// 用户食材库存
export interface UserInventoryItem {
  id: string;
  foodId: string;
  foodName: string;
  brand?: string;
  category: FoodCategory;
  nutrients: NutrientData;
  quantity: number;        // 剩余数量（份）
  expiryDate?: string;     // 过期日期
  addedAt: number;
  tags: string[];
}

// 用户档案（带数字ID）
export interface UserAccount {
  id: number;              // 唯一数字ID
  name: string;
  profile: UserProfile;
  goals: UserGoals;
  createdAt: number;
  lastActiveAt: number;
}

// 餐食组合推荐
export interface MealComboRecommendation {
  mealType: MealType;
  combos: {
    name: string;
    items: Array<{
      food: FoodItem;
      grams: number;
      source: 'inventory' | 'takeout' | 'homemade';
    }>;
    totalNutrients: NutrientData;
    reason: string;
  }[];
}

// 推荐来源类型
export type RecommendationSource = 'inventory' | 'takeout' | 'homemade';


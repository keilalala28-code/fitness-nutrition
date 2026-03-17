import {
  ExerciseItem,
  ExerciseRecommendation,
  UserProfile,
  FitnessGoal,
  ActivityLevel,
  ExerciseCategory,
} from '@/types/nutrition';
import { EXERCISES, calculateCaloriesBurned } from './exercises';
import { getUserProfile } from './storage';

// 年龄组定义
type AgeGroup = 'young' | 'middle' | 'senior';

// 根据年龄获取年龄组
function getAgeGroup(age: number): AgeGroup {
  if (age < 40) return 'young';
  if (age < 50) return 'middle';
  return 'senior';
}

// 年龄组的运动限制
interface AgeGroupLimits {
  maxMet: number;                    // 最大MET值
  avoidCategories: ExerciseCategory[];
  avoidTags: string[];
  preferTags: string[];
  warningMessage?: string;
}

const AGE_GROUP_LIMITS: Record<AgeGroup, AgeGroupLimits> = {
  young: {
    maxMet: 15,
    avoidCategories: [],
    avoidTags: [],
    preferTags: [],
  },
  middle: {
    maxMet: 12,
    avoidCategories: [],
    avoidTags: ['极限'],
    preferTags: ['中等', '有氧'],
    warningMessage: '建议适度控制高强度运动',
  },
  senior: {
    maxMet: 6,
    avoidCategories: [],
    avoidTags: ['高强度', '极限', '冲刺', 'HIIT', '快跑'],
    preferTags: ['低冲击', '休闲', '散步', '太极', '瑜伽', '拉伸'],
    warningMessage: '建议选择低冲击运动，避免剧烈运动',
  },
};

// 目标对应的运动偏好
interface GoalPreferences {
  preferCategories: ExerciseCategory[];
  preferTags: string[];
  metRange: { min: number; max: number };
  cardioRatio: number;  // 有氧运动比例 0-1
}

const GOAL_PREFERENCES: Record<FitnessGoal, GoalPreferences> = {
  lose: {
    preferCategories: ['cardio'],
    preferTags: ['减脂', '燃脂', 'HIIT', '有氧', '高效燃脂'],
    metRange: { min: 5, max: 12 },
    cardioRatio: 0.7,
  },
  gain: {
    preferCategories: ['strength'],
    preferTags: ['增肌', '力量', '无氧', '肌肉'],
    metRange: { min: 3, max: 8 },
    cardioRatio: 0.3,
  },
  maintain: {
    preferCategories: ['cardio', 'strength', 'flexibility'],
    preferTags: ['有氧', '力量', '柔韧'],
    metRange: { min: 3, max: 8 },
    cardioRatio: 0.5,
  },
};

// 活动水平对应的推荐强度
const ACTIVITY_LEVEL_ADJUSTMENT: Record<ActivityLevel, { metMultiplier: number; durationMultiplier: number }> = {
  sedentary: { metMultiplier: 0.6, durationMultiplier: 0.7 },
  light: { metMultiplier: 0.8, durationMultiplier: 0.85 },
  moderate: { metMultiplier: 1.0, durationMultiplier: 1.0 },
  active: { metMultiplier: 1.1, durationMultiplier: 1.1 },
  veryActive: { metMultiplier: 1.2, durationMultiplier: 1.2 },
};

/**
 * 检查运动是否适合特定年龄组
 */
function isExerciseSuitableForAge(exercise: ExerciseItem, ageGroup: AgeGroup): boolean {
  const limits = AGE_GROUP_LIMITS[ageGroup];

  // 检查MET值
  if (exercise.met > limits.maxMet) {
    return false;
  }

  // 检查分类
  if (limits.avoidCategories.includes(exercise.category)) {
    return false;
  }

  // 检查标签
  for (const avoidTag of limits.avoidTags) {
    if (exercise.tags.some(t => t.includes(avoidTag))) {
      return false;
    }
  }

  return true;
}

/**
 * 计算运动的适合度评分
 */
function calculateExerciseSuitability(
  exercise: ExerciseItem,
  profile: UserProfile
): { score: number; suitability: 'high' | 'medium' | 'low' } {
  const ageGroup = getAgeGroup(profile.age);
  const ageLimits = AGE_GROUP_LIMITS[ageGroup];
  const goalPrefs = GOAL_PREFERENCES[profile.goal];
  const activityAdj = ACTIVITY_LEVEL_ADJUSTMENT[profile.activityLevel];

  let score = 50; // 基础分

  // 年龄适合度
  if (!isExerciseSuitableForAge(exercise, ageGroup)) {
    return { score: 0, suitability: 'low' };
  }

  // 年龄偏好标签加分
  for (const tag of ageLimits.preferTags) {
    if (exercise.tags.some(t => t.includes(tag))) {
      score += 15;
    }
  }

  // 目标匹配加分
  if (goalPrefs.preferCategories.includes(exercise.category)) {
    score += 20;
  }

  for (const tag of goalPrefs.preferTags) {
    if (exercise.tags.some(t => t.includes(tag))) {
      score += 10;
    }
  }

  // MET值范围匹配
  const adjustedMetRange = {
    min: goalPrefs.metRange.min * activityAdj.metMultiplier,
    max: goalPrefs.metRange.max * activityAdj.metMultiplier,
  };

  if (exercise.met >= adjustedMetRange.min && exercise.met <= adjustedMetRange.max) {
    score += 15;
  } else if (exercise.met < adjustedMetRange.min) {
    score -= 10;
  } else {
    score -= 15;
  }

  // 确保分数在0-100之间
  score = Math.max(0, Math.min(100, score));

  let suitability: 'high' | 'medium' | 'low';
  if (score >= 70) {
    suitability = 'high';
  } else if (score >= 40) {
    suitability = 'medium';
  } else {
    suitability = 'low';
  }

  return { score, suitability };
}

/**
 * 计算建议运动时长
 */
function calculateSuggestedDuration(
  exercise: ExerciseItem,
  profile: UserProfile,
  targetCalories?: number
): number {
  const activityAdj = ACTIVITY_LEVEL_ADJUSTMENT[profile.activityLevel];
  const ageGroup = getAgeGroup(profile.age);

  // 基础时长
  let baseDuration = 30;

  // 根据目标调整
  if (profile.goal === 'lose') {
    baseDuration = 45;
  } else if (profile.goal === 'gain') {
    baseDuration = 40;
  }

  // 根据活动水平调整
  baseDuration = Math.round(baseDuration * activityAdj.durationMultiplier);

  // 老年人减少时长
  if (ageGroup === 'senior') {
    baseDuration = Math.min(baseDuration, 30);
  }

  // 高强度运动时间更短
  if (exercise.met > 8) {
    baseDuration = Math.round(baseDuration * 0.7);
  }

  // 如果指定目标消耗，计算所需时长
  if (targetCalories && targetCalories > 0) {
    const hours = targetCalories / (exercise.met * profile.weight);
    const calculatedDuration = Math.round(hours * 60);
    baseDuration = Math.min(baseDuration, calculatedDuration);
  }

  // 限制范围
  return Math.max(15, Math.min(60, baseDuration));
}

/**
 * 生成运动推荐理由
 */
function generateReason(
  exercise: ExerciseItem,
  profile: UserProfile,
  suitability: 'high' | 'medium' | 'low'
): string {
  const reasons: string[] = [];
  const ageGroup = getAgeGroup(profile.age);
  const goalPrefs = GOAL_PREFERENCES[profile.goal];

  // 年龄相关理由
  if (ageGroup === 'senior') {
    if (exercise.met <= 4) {
      reasons.push('低强度适合中老年');
    }
    if (exercise.tags.some(t => ['低冲击', '太极', '瑜伽'].some(k => t.includes(k)))) {
      reasons.push('对关节友好');
    }
  }

  // 目标相关理由
  if (profile.goal === 'lose' && exercise.met >= 6) {
    reasons.push('高效燃脂');
  }
  if (profile.goal === 'gain' && exercise.category === 'strength') {
    reasons.push('促进肌肉增长');
  }
  if (profile.goal === 'maintain' && exercise.category === 'flexibility') {
    reasons.push('保持身体柔韧');
  }

  // 运动特点
  if (exercise.tags.includes('全身')) {
    reasons.push('全身训练');
  }
  if (exercise.met >= 8 && ageGroup !== 'senior') {
    reasons.push('消耗热量高');
  }

  if (reasons.length === 0) {
    if (suitability === 'high') {
      reasons.push('非常适合您的身体状况');
    } else {
      reasons.push('适合日常锻炼');
    }
  }

  return reasons.slice(0, 2).join('，');
}

/**
 * 获取运动推荐列表
 */
export function getExerciseRecommendations(
  userProfile?: UserProfile | null,
  targetCalories?: number,
  limit: number = 8
): ExerciseRecommendation[] {
  const profile = userProfile || getUserProfile();

  if (!profile) {
    // 如果没有用户档案，返回通用推荐
    return getDefaultRecommendations(limit);
  }

  const recommendations: ExerciseRecommendation[] = [];

  for (const exercise of EXERCISES) {
    const { score, suitability } = calculateExerciseSuitability(exercise, profile);

    if (score > 0) {
      const suggestedDuration = calculateSuggestedDuration(exercise, profile, targetCalories);
      const estimatedCalories = calculateCaloriesBurned(exercise.met, profile.weight, suggestedDuration);

      recommendations.push({
        exercise,
        reason: generateReason(exercise, profile, suitability),
        suggestedDuration,
        estimatedCalories,
        suitability,
      });
    }
  }

  // 按适合度和评分排序
  recommendations.sort((a, b) => {
    const suitabilityOrder = { high: 3, medium: 2, low: 1 };
    const suitDiff = suitabilityOrder[b.suitability] - suitabilityOrder[a.suitability];
    if (suitDiff !== 0) return suitDiff;
    return b.estimatedCalories - a.estimatedCalories;
  });

  return recommendations.slice(0, limit);
}

/**
 * 默认推荐（无用户档案时）
 */
function getDefaultRecommendations(limit: number): ExerciseRecommendation[] {
  const defaultWeight = 65;
  const defaultDuration = 30;

  // 确保有运动数据可用
  if (!EXERCISES || EXERCISES.length === 0) {
    console.warn('EXERCISES array is empty or undefined');
    return [];
  }

  const filtered = EXERCISES.filter(e => e.met >= 3 && e.met <= 8);

  // 如果过滤后没有数据，使用更宽松的范围
  const exercisesToUse = filtered.length > 0
    ? filtered
    : EXERCISES.filter(e => e.met >= 2 && e.met <= 10);

  return exercisesToUse
    .slice(0, limit)
    .map(exercise => ({
      exercise,
      reason: '适合大多数人',
      suggestedDuration: defaultDuration,
      estimatedCalories: calculateCaloriesBurned(exercise.met, defaultWeight, defaultDuration),
      suitability: 'medium' as const,
    }));
}

/**
 * 根据运动分类获取推荐
 */
export function getRecommendationsByCategory(
  category: ExerciseCategory,
  userProfile?: UserProfile | null,
  limit: number = 5
): ExerciseRecommendation[] {
  const all = getExerciseRecommendations(userProfile, undefined, 50);
  return all.filter(r => r.exercise.category === category).slice(0, limit);
}

/**
 * 获取年龄相关的运动建议提示
 */
export function getAgeExerciseTips(age: number): string[] {
  const ageGroup = getAgeGroup(age);
  const limits = AGE_GROUP_LIMITS[ageGroup];

  const tips: string[] = [];

  if (ageGroup === 'senior') {
    tips.push('推荐散步、太极、游泳等低冲击运动');
    tips.push('运动前充分热身，运动后充分拉伸');
    tips.push('注意监测心率，避免过度疲劳');
    tips.push('建议每周运动3-5次，每次20-30分钟');
  } else if (ageGroup === 'middle') {
    tips.push('保持规律运动习惯');
    tips.push('力量与有氧结合，预防肌肉流失');
    tips.push('注意运动后恢复');
  }

  if (limits.warningMessage) {
    tips.unshift(limits.warningMessage);
  }

  return tips;
}

/**
 * 获取适合度标签
 */
export function getSuitabilityLabel(suitability: 'high' | 'medium' | 'low'): string {
  switch (suitability) {
    case 'high':
      return '非常适合';
    case 'medium':
      return '适合';
    case 'low':
      return '一般';
  }
}

/**
 * 获取适合度颜色
 */
export function getSuitabilityColor(suitability: 'high' | 'medium' | 'low'): string {
  switch (suitability) {
    case 'high':
      return 'bg-green-100 text-green-700';
    case 'medium':
      return 'bg-blue-100 text-blue-700';
    case 'low':
      return 'bg-gray-100 text-gray-600';
  }
}

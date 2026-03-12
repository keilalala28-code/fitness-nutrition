import { ActivityLevel, FitnessGoal, UserProfile, UserGoals } from '@/types/nutrition';

// 活动系数
const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,      // 久坐不动
  light: 1.375,        // 轻度活动 (每周运动1-3天)
  moderate: 1.55,      // 中度活动 (每周运动3-5天)
  active: 1.725,       // 活跃 (每周运动6-7天)
  veryActive: 1.9,     // 非常活跃 (每天高强度运动)
};

// 目标热量调整
const GOAL_ADJUSTMENTS: Record<FitnessGoal, number> = {
  lose: -500,      // 减脂：每日减少500卡
  maintain: 0,     // 维持：不调整
  gain: 300,       // 增肌：每日增加300卡
};

/**
 * 计算BMR (基础代谢率) - 使用 Mifflin-St Jeor 公式
 * 这是目前研究证明最准确的BMR计算公式
 */
export function calculateBMR(profile: UserProfile): number {
  const { gender, age, height, weight } = profile;

  if (gender === 'male') {
    // 男性: BMR = 10 × 体重(kg) + 6.25 × 身高(cm) - 5 × 年龄 + 5
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    // 女性: BMR = 10 × 体重(kg) + 6.25 × 身高(cm) - 5 × 年龄 - 161
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

/**
 * 计算TDEE (每日总能量消耗)
 * TDEE = BMR × 活动系数
 */
export function calculateTDEE(profile: UserProfile): number {
  const bmr = calculateBMR(profile);
  const multiplier = ACTIVITY_MULTIPLIERS[profile.activityLevel];
  return Math.round(bmr * multiplier);
}

/**
 * 根据用户资料计算每日营养目标
 */
export function calculateDailyGoals(profile: UserProfile): UserGoals {
  const tdee = calculateTDEE(profile);
  const adjustment = GOAL_ADJUSTMENTS[profile.goal];
  const targetCalories = Math.round(tdee + adjustment);

  // 根据目标调整宏量营养素比例
  let proteinRatio: number;
  let carbRatio: number;
  let fatRatio: number;

  switch (profile.goal) {
    case 'lose':
      // 减脂：高蛋白，中碳水，中脂肪
      proteinRatio = 0.35;
      carbRatio = 0.35;
      fatRatio = 0.30;
      break;
    case 'gain':
      // 增肌：高蛋白，高碳水，低脂肪
      proteinRatio = 0.30;
      carbRatio = 0.45;
      fatRatio = 0.25;
      break;
    default:
      // 维持：均衡比例
      proteinRatio = 0.25;
      carbRatio = 0.45;
      fatRatio = 0.30;
  }

  // 计算各营养素克数
  // 蛋白质和碳水: 4卡/克，脂肪: 9卡/克
  const protein = Math.round((targetCalories * proteinRatio) / 4);
  const carbs = Math.round((targetCalories * carbRatio) / 4);
  const fat = Math.round((targetCalories * fatRatio) / 9);

  return {
    calories: targetCalories,
    protein,
    carbs,
    fat,
  };
}

/**
 * 根据体重计算蛋白质需求
 * 健身人群推荐: 0.8-1g/磅体重 (1.8-2.2g/kg体重)
 */
export function calculateProteinNeeds(weightKg: number, goal: FitnessGoal): { min: number; max: number } {
  let multiplierMin: number;
  let multiplierMax: number;

  switch (goal) {
    case 'gain':
      // 增肌需要更多蛋白质
      multiplierMin = 1.8;
      multiplierMax = 2.2;
      break;
    case 'lose':
      // 减脂时保持高蛋白防止肌肉流失
      multiplierMin = 1.6;
      multiplierMax = 2.0;
      break;
    default:
      // 维持
      multiplierMin = 1.4;
      multiplierMax = 1.8;
  }

  return {
    min: Math.round(weightKg * multiplierMin),
    max: Math.round(weightKg * multiplierMax),
  };
}

/**
 * 活动水平描述（中文）
 */
export const ACTIVITY_DESCRIPTIONS: Record<ActivityLevel, string> = {
  sedentary: '久坐不动（办公室工作，很少运动）',
  light: '轻度活动（每周运动1-3天）',
  moderate: '中度活动（每周运动3-5天）',
  active: '活跃（每周运动6-7天）',
  veryActive: '非常活跃（每天高强度运动或体力劳动）',
};

/**
 * 目标描述（中文）
 */
export const GOAL_DESCRIPTIONS: Record<FitnessGoal, string> = {
  lose: '减脂',
  maintain: '维持体重',
  gain: '增肌',
};

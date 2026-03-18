import { getAllExerciseEntries, getWeightRecords, getExerciseStreak, getBodyMeasurements, getMeasurementStreak } from './storage';

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: 'exercise' | 'weight' | 'measurement';
  condition: string;
}

export interface EarnedBadge {
  badgeId: string;
  earnedAt: number;
}

export interface BlindboxPrize {
  type: 'quote' | 'title' | 'tip' | 'medal';
  icon: string;
  title: string;
  content: string;
  rarity: 'common' | 'rare' | 'epic';
}

export interface OpenedBlindbox {
  prize: BlindboxPrize;
  openedAt: number;
}

export const BLINDBOX_COST = 50;

const STORAGE_KEYS = {
  EARNED_BADGES: 'fitness_earned_badges',
  BLINDBOX_POINTS: 'fitness_blindbox_points',
  OPENED_BLINDBOXES: 'fitness_opened_blindboxes',
};

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export const ALL_BADGES: Badge[] = [
  // Exercise badges (9)
  { id: 'first_exercise', name: '破冰行动', icon: '🎯', description: '第一次运动打卡', category: 'exercise', condition: '完成1次运动打卡' },
  { id: 'streak_3', name: '三日不倦', icon: '🔥', description: '连续打卡3天', category: 'exercise', condition: '连续打卡3天' },
  { id: 'streak_7', name: '周冠军', icon: '🏆', description: '连续打卡7天', category: 'exercise', condition: '连续打卡7天' },
  { id: 'streak_14', name: '两周达人', icon: '💫', description: '连续打卡14天', category: 'exercise', condition: '连续打卡14天' },
  { id: 'streak_30', name: '铁人传说', icon: '🦸', description: '连续打卡30天', category: 'exercise', condition: '连续打卡30天' },
  { id: 'total_10', name: '十战老将', icon: '⚡', description: '累计打卡10次', category: 'exercise', condition: '累计打卡10次' },
  { id: 'total_50', name: '百炼成钢', icon: '🚀', description: '累计打卡50次', category: 'exercise', condition: '累计打卡50次' },
  { id: 'big_burn', name: '燃脂冠军', icon: '💥', description: '单日消耗超过500卡', category: 'exercise', condition: '单日运动消耗≥500卡' },
  { id: 'early_bird', name: '早起鸟儿', icon: '🌅', description: '8点前完成运动打卡', category: 'exercise', condition: '8点前完成打卡' },
  // Weight badges (6)
  { id: 'first_weight', name: '数字开门', icon: '📏', description: '第一次记录体重', category: 'weight', condition: '记录第1次体重' },
  { id: 'weight_7days', name: '坚持管理', icon: '📅', description: '连续7天记录体重', category: 'weight', condition: '连续记录体重7天' },
  { id: 'weight_30days', name: '体重大师', icon: '🎖️', description: '连续30天记录体重', category: 'weight', condition: '连续记录体重30天' },
  { id: 'lost_1kg', name: '轻盈启程', icon: '📉', description: '体重减少1kg', category: 'weight', condition: '累计减重≥1kg' },
  { id: 'lost_5kg', name: '蜕变勇士', icon: '🦋', description: '体重减少5kg', category: 'weight', condition: '累计减重≥5kg' },
  { id: 'bmi_normal', name: '黄金体重', icon: '⚖️', description: 'BMI达到正常范围', category: 'weight', condition: 'BMI在18.5-24之间' },
  // Measurement badges (6)
  { id: 'first_measurement', name: '量出新生', icon: '📐', description: '第一次记录身体维度', category: 'measurement', condition: '记录第1次维度数据' },
  { id: 'measure_streak_7', name: '坚持一周', icon: '📆', description: '连续7天记录维度', category: 'measurement', condition: '连续记录维度7天' },
  { id: 'measure_streak_30', name: '蜕变达人', icon: '🌈', description: '连续30天记录维度', category: 'measurement', condition: '连续记录维度30天' },
  { id: 'waist_minus_2cm', name: '腰细一圈', icon: '🎀', description: '腰围减少2cm', category: 'measurement', condition: '腰围累计减少≥2cm' },
  { id: 'waist_minus_5cm', name: '小蛮腰', icon: '💃', description: '腰围减少5cm', category: 'measurement', condition: '腰围累计减少≥5cm' },
  { id: 'measure_multi_improve', name: '全面蜕变', icon: '✨', description: '3个以上维度同时减小', category: 'measurement', condition: '3项以上维度均有改善' },
];

export const BLINDBOX_PRIZES: BlindboxPrize[] = [
  // common (prob 0.6)
  { type: 'quote', icon: '💬', title: '励志语录', content: '每一滴汗水，都是对未来自己的投资。', rarity: 'common' },
  { type: 'quote', icon: '💬', title: '励志语录', content: '坚持就是胜利，你比昨天更强！', rarity: 'common' },
  { type: 'quote', icon: '💬', title: '励志语录', content: '身体是革命的本钱，健康是最大的财富。', rarity: 'common' },
  { type: 'tip', icon: '💡', title: '健康贴士', content: '运动后30分钟内补充蛋白质，肌肉合成效率最高！', rarity: 'common' },
  { type: 'tip', icon: '💡', title: '健康贴士', content: '每天喝够1500-2000ml水，新陈代谢更顺畅。', rarity: 'common' },
  { type: 'tip', icon: '💡', title: '健康贴士', content: '深蹲时膝盖不超过脚尖，关节保护第一位。', rarity: 'common' },
  { type: 'tip', icon: '💡', title: '健康贴士', content: '有氧运动20分钟后才开始高效燃脂，坚持下去！', rarity: 'common' },
  // rare (prob 0.3)
  { type: 'title', icon: '🎖️', title: '专属称号', content: '健康生活家', rarity: 'rare' },
  { type: 'title', icon: '🎖️', title: '专属称号', content: '减脂小勇士', rarity: 'rare' },
  { type: 'title', icon: '🎖️', title: '专属称号', content: '运动小达人', rarity: 'rare' },
  { type: 'title', icon: '🎖️', title: '专属称号', content: '自律超人', rarity: 'rare' },
  { type: 'medal', icon: '🥈', title: '银色奖章', content: '坚持运动的人值得拥有这枚银色奖章！', rarity: 'rare' },
  // epic (prob 0.1)
  { type: 'title', icon: '👑', title: '传奇称号', content: '健身之神', rarity: 'epic' },
  { type: 'title', icon: '🌟', title: '传奇称号', content: '不败健将', rarity: 'epic' },
  { type: 'medal', icon: '🥇', title: '金色奖章', content: '你是最厉害的！送你一枚金牌！', rarity: 'epic' },
  { type: 'medal', icon: '💎', title: '钻石奖章', content: '百万分之一的幸运！你的坚持感动了宇宙！', rarity: 'epic' },
];

// ====== Storage ======

export function getEarnedBadges(): EarnedBadge[] {
  if (!isBrowser()) return [];
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.EARNED_BADGES) || '[]'); } catch { return []; }
}

export function getBlindboxPoints(): number {
  if (!isBrowser()) return 0;
  return parseInt(localStorage.getItem(STORAGE_KEYS.BLINDBOX_POINTS) || '0');
}

export function addBlindboxPoints(points: number): number {
  if (!isBrowser()) return 0;
  const newTotal = getBlindboxPoints() + points;
  localStorage.setItem(STORAGE_KEYS.BLINDBOX_POINTS, String(newTotal));
  return newTotal;
}

export function getOpenedBlindboxes(): OpenedBlindbox[] {
  if (!isBrowser()) return [];
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.OPENED_BLINDBOXES) || '[]'); } catch { return []; }
}

function saveOpenedBlindbox(item: OpenedBlindbox) {
  if (!isBrowser()) return;
  const items = getOpenedBlindboxes();
  items.push(item);
  if (items.length > 20) items.splice(0, items.length - 20);
  localStorage.setItem(STORAGE_KEYS.OPENED_BLINDBOXES, JSON.stringify(items));
}

function awardBadge(badgeId: string): boolean {
  if (!isBrowser()) return false;
  const earned = getEarnedBadges();
  if (earned.some(b => b.badgeId === badgeId)) return false;
  earned.push({ badgeId, earnedAt: Date.now() });
  localStorage.setItem(STORAGE_KEYS.EARNED_BADGES, JSON.stringify(earned));
  return true;
}

// ====== Badge check ======

export function checkAndAwardBadges(userHeightCm?: number): string[] {
  if (!isBrowser()) return [];
  const newlyEarned: string[] = [];
  const exercises = getAllExerciseEntries();
  const weightRecords = getWeightRecords();
  const streak = getExerciseStreak();

  // Exercise badges
  if (exercises.length >= 1 && awardBadge('first_exercise')) newlyEarned.push('first_exercise');
  if (streak >= 3 && awardBadge('streak_3')) newlyEarned.push('streak_3');
  if (streak >= 7 && awardBadge('streak_7')) newlyEarned.push('streak_7');
  if (streak >= 14 && awardBadge('streak_14')) newlyEarned.push('streak_14');
  if (streak >= 30 && awardBadge('streak_30')) newlyEarned.push('streak_30');
  if (exercises.length >= 10 && awardBadge('total_10')) newlyEarned.push('total_10');
  if (exercises.length >= 50 && awardBadge('total_50')) newlyEarned.push('total_50');

  // big_burn: any day with total burned >= 500
  const burnByDate: Record<string, number> = {};
  exercises.forEach(e => { burnByDate[e.date] = (burnByDate[e.date] || 0) + e.caloriesBurned; });
  if (Object.values(burnByDate).some(v => v >= 500) && awardBadge('big_burn')) newlyEarned.push('big_burn');

  // early_bird: any exercise logged before 8am
  if (exercises.some(e => new Date(e.createdAt).getHours() < 8) && awardBadge('early_bird')) newlyEarned.push('early_bird');

  // Weight badges
  if (weightRecords.length >= 1 && awardBadge('first_weight')) newlyEarned.push('first_weight');

  // Weight streak
  const weightDates = new Set(weightRecords.map(r => r.date));
  let weightStreak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    if (weightDates.has(dateStr)) { weightStreak++; } else if (i > 0) { break; }
  }
  if (weightStreak >= 7 && awardBadge('weight_7days')) newlyEarned.push('weight_7days');
  if (weightStreak >= 30 && awardBadge('weight_30days')) newlyEarned.push('weight_30days');

  // Weight loss
  if (weightRecords.length >= 2) {
    const first = weightRecords[0].weight;
    const latest = weightRecords[weightRecords.length - 1].weight;
    if (first - latest >= 1 && awardBadge('lost_1kg')) newlyEarned.push('lost_1kg');
    if (first - latest >= 5 && awardBadge('lost_5kg')) newlyEarned.push('lost_5kg');
  }

  // BMI normal
  if (userHeightCm && weightRecords.length > 0) {
    const h = userHeightCm / 100;
    const bmi = weightRecords[weightRecords.length - 1].weight / (h * h);
    if (bmi >= 18.5 && bmi < 24 && awardBadge('bmi_normal')) newlyEarned.push('bmi_normal');
  }

  // Measurement badges
  const measurements = getBodyMeasurements();
  const measureStreak = getMeasurementStreak();
  if (measurements.length >= 1 && awardBadge('first_measurement')) newlyEarned.push('first_measurement');
  if (measureStreak >= 7 && awardBadge('measure_streak_7')) newlyEarned.push('measure_streak_7');
  if (measureStreak >= 30 && awardBadge('measure_streak_30')) newlyEarned.push('measure_streak_30');

  if (measurements.length >= 2) {
    const first = measurements[0];
    const latest = measurements[measurements.length - 1];
    // Waist reduction badges
    if (first.waist && latest.waist) {
      const waistLoss = first.waist - latest.waist;
      if (waistLoss >= 2 && awardBadge('waist_minus_2cm')) newlyEarned.push('waist_minus_2cm');
      if (waistLoss >= 5 && awardBadge('waist_minus_5cm')) newlyEarned.push('waist_minus_5cm');
    }
    // Multi-dimension improvement
    const dimensions: Array<keyof typeof first> = ['chest', 'waist', 'hips', 'thigh', 'arm', 'calf'];
    let improvedCount = 0;
    for (const dim of dimensions) {
      const f = first[dim] as number | undefined;
      const l = latest[dim] as number | undefined;
      if (f && l && f > l) improvedCount++;
    }
    if (improvedCount >= 3 && awardBadge('measure_multi_improve')) newlyEarned.push('measure_multi_improve');
  }

  return newlyEarned;
}

// ====== Measurement reward points ======

/** 记录一次维度后给予积分，若有改善则额外奖励 */
export function awardMeasurementPoints(): number {
  const measurements = getBodyMeasurements();
  let points = 5; // 基础打卡积分
  if (measurements.length >= 2) {
    const prev = measurements[measurements.length - 2];
    const cur = measurements[measurements.length - 1];
    const dimensions: Array<keyof typeof prev> = ['chest', 'waist', 'hips', 'thigh', 'arm', 'calf'];
    let improvedCount = 0;
    for (const dim of dimensions) {
      const p = prev[dim] as number | undefined;
      const c = cur[dim] as number | undefined;
      if (p && c && p > c) improvedCount++;
    }
    if (improvedCount > 0) points += improvedCount * 3; // 每改善一项+3分
  }
  addBlindboxPoints(points);
  return points;
}

// ====== Blind box ======

export function openBlindbox(): BlindboxPrize | null {
  if (!isBrowser()) return null;
  const current = getBlindboxPoints();
  if (current < BLINDBOX_COST) return null;
  localStorage.setItem(STORAGE_KEYS.BLINDBOX_POINTS, String(current - BLINDBOX_COST));

  const rand = Math.random();
  let pool: BlindboxPrize[];
  if (rand < 0.6) {
    pool = BLINDBOX_PRIZES.filter(p => p.rarity === 'common');
  } else if (rand < 0.9) {
    pool = BLINDBOX_PRIZES.filter(p => p.rarity === 'rare');
  } else {
    pool = BLINDBOX_PRIZES.filter(p => p.rarity === 'epic');
  }

  const prize = pool[Math.floor(Math.random() * pool.length)];
  saveOpenedBlindbox({ prize, openedAt: Date.now() });
  return prize;
}

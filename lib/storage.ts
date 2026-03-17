import { DiaryEntry, ExerciseEntry, UserProfile, UserGoals, UserInventoryItem, UserAccount, MealType } from '@/types/nutrition';

const STORAGE_KEYS = {
  DIARY: 'fitness_diary',
  EXERCISE: 'fitness_exercise',
  PROFILE: 'fitness_profile',
  GOALS: 'fitness_goals',
  INVENTORY: 'fitness_inventory',
  ACCOUNTS: 'fitness_accounts',
  CURRENT_USER: 'fitness_current_user',
  USER_ID_COUNTER: 'fitness_user_id_counter',
};

/**
 * 检查是否在浏览器环境
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

// ==================== 饮食日记操作 ====================

/**
 * 获取所有饮食记录
 */
export function getAllDiaryEntries(): DiaryEntry[] {
  if (!isBrowser()) return [];

  const data = localStorage.getItem(STORAGE_KEYS.DIARY);
  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/**
 * 获取指定日期的饮食记录
 */
export function getDiaryEntriesByDate(date: string): DiaryEntry[] {
  const entries = getAllDiaryEntries();
  return entries.filter(entry => entry.date === date);
}

/**
 * 添加饮食记录
 */
export function addDiaryEntry(entry: Omit<DiaryEntry, 'id' | 'createdAt'>): DiaryEntry {
  const entries = getAllDiaryEntries();

  const newEntry: DiaryEntry = {
    ...entry,
    id: generateId(),
    createdAt: Date.now(),
  };

  entries.push(newEntry);
  localStorage.setItem(STORAGE_KEYS.DIARY, JSON.stringify(entries));

  return newEntry;
}

/**
 * 更新饮食记录
 */
export function updateDiaryEntry(id: string, updates: Partial<DiaryEntry>): DiaryEntry | null {
  const entries = getAllDiaryEntries();
  const index = entries.findIndex(e => e.id === id);

  if (index === -1) return null;

  entries[index] = { ...entries[index], ...updates };
  localStorage.setItem(STORAGE_KEYS.DIARY, JSON.stringify(entries));

  return entries[index];
}

/**
 * 删除饮食记录
 */
export function deleteDiaryEntry(id: string): boolean {
  const entries = getAllDiaryEntries();
  const filtered = entries.filter(e => e.id !== id);

  if (filtered.length === entries.length) return false;

  localStorage.setItem(STORAGE_KEYS.DIARY, JSON.stringify(filtered));
  return true;
}

// ==================== 运动记录操作 ====================

/**
 * 获取所有运动记录
 */
export function getAllExerciseEntries(): ExerciseEntry[] {
  if (!isBrowser()) return [];

  const data = localStorage.getItem(STORAGE_KEYS.EXERCISE);
  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/**
 * 获取指定日期的运动记录
 */
export function getExerciseEntriesByDate(date: string): ExerciseEntry[] {
  const entries = getAllExerciseEntries();
  return entries.filter(entry => entry.date === date);
}

/**
 * 添加运动记录
 */
export function addExerciseEntry(entry: Omit<ExerciseEntry, 'id' | 'createdAt'>): ExerciseEntry {
  const entries = getAllExerciseEntries();

  const newEntry: ExerciseEntry = {
    ...entry,
    id: generateId(),
    createdAt: Date.now(),
  };

  entries.push(newEntry);
  localStorage.setItem(STORAGE_KEYS.EXERCISE, JSON.stringify(entries));

  return newEntry;
}

/**
 * 删除运动记录
 */
export function deleteExerciseEntry(id: string): boolean {
  const entries = getAllExerciseEntries();
  const filtered = entries.filter(e => e.id !== id);

  if (filtered.length === entries.length) return false;

  localStorage.setItem(STORAGE_KEYS.EXERCISE, JSON.stringify(filtered));
  return true;
}

/**
 * 获取指定日期的运动总消耗
 */
export function getTotalCaloriesBurnedByDate(date: string): number {
  const entries = getExerciseEntriesByDate(date);
  return entries.reduce((sum, e) => sum + e.caloriesBurned, 0);
}

// ==================== 用户资料操作 ====================

/**
 * 获取用户资料
 */
export function getUserProfile(): UserProfile | null {
  if (!isBrowser()) return null;

  const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

/**
 * 保存用户资料
 */
export function saveUserProfile(profile: UserProfile): void {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
}

// ==================== 用户目标操作 ====================

/**
 * 获取用户每日目标
 */
export function getUserGoals(): UserGoals | null {
  if (!isBrowser()) return null;

  const data = localStorage.getItem(STORAGE_KEYS.GOALS);
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

/**
 * 保存用户每日目标
 */
export function saveUserGoals(goals: UserGoals): void {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
}

// ==================== 工具函数 ====================

/**
 * 生成唯一ID
 */
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * 获取今天的日期字符串
 */
export function getTodayDateString(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

/**
 * 格式化日期显示
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
}

/**
 * 清除所有数据
 */
export function clearAllData(): void {
  if (!isBrowser()) return;

  localStorage.removeItem(STORAGE_KEYS.DIARY);
  localStorage.removeItem(STORAGE_KEYS.EXERCISE);
  localStorage.removeItem(STORAGE_KEYS.PROFILE);
  localStorage.removeItem(STORAGE_KEYS.GOALS);
  localStorage.removeItem(STORAGE_KEYS.INVENTORY);
}

// ==================== 用户库存操作 ====================

/**
 * 获取用户库存食材
 */
export function getUserInventory(): UserInventoryItem[] {
  if (!isBrowser()) return [];

  const data = localStorage.getItem(STORAGE_KEYS.INVENTORY);
  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/**
 * 添加食材到库存
 */
export function addToInventory(item: Omit<UserInventoryItem, 'id' | 'addedAt'>): UserInventoryItem {
  const inventory = getUserInventory();

  const newItem: UserInventoryItem = {
    ...item,
    id: generateId(),
    addedAt: Date.now(),
  };

  inventory.push(newItem);
  localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inventory));

  return newItem;
}

/**
 * 更新库存数量
 */
export function updateInventoryItem(id: string, updates: Partial<UserInventoryItem>): UserInventoryItem | null {
  const inventory = getUserInventory();
  const index = inventory.findIndex(i => i.id === id);

  if (index === -1) return null;

  inventory[index] = { ...inventory[index], ...updates };
  localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inventory));

  return inventory[index];
}

/**
 * 从库存删除食材
 */
export function removeFromInventory(id: string): boolean {
  const inventory = getUserInventory();
  const filtered = inventory.filter(i => i.id !== id);

  if (filtered.length === inventory.length) return false;

  localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(filtered));
  return true;
}

/**
 * 使用库存食材（减少数量）
 */
export function useInventoryItem(id: string, amount: number = 1): boolean {
  const inventory = getUserInventory();
  const item = inventory.find(i => i.id === id);

  if (!item) return false;

  if (item.quantity <= amount) {
    return removeFromInventory(id);
  } else {
    updateInventoryItem(id, { quantity: item.quantity - amount });
    return true;
  }
}

// ==================== 用户账户操作（数字ID） ====================

/**
 * 生成下一个用户ID
 */
function getNextUserId(): number {
  if (!isBrowser()) return 1;

  const counter = localStorage.getItem(STORAGE_KEYS.USER_ID_COUNTER);
  const nextId = counter ? parseInt(counter) + 1 : 10001; // 从10001开始
  localStorage.setItem(STORAGE_KEYS.USER_ID_COUNTER, nextId.toString());
  return nextId;
}

/**
 * 获取所有用户账户
 */
export function getAllUserAccounts(): UserAccount[] {
  if (!isBrowser()) return [];

  const data = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/**
 * 创建新用户账户
 */
export function createUserAccount(name: string, profile: UserProfile, goals: UserGoals): UserAccount {
  const accounts = getAllUserAccounts();

  const newAccount: UserAccount = {
    id: getNextUserId(),
    name,
    profile,
    goals,
    createdAt: Date.now(),
    lastActiveAt: Date.now(),
  };

  accounts.push(newAccount);
  localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));

  // 自动设为当前用户
  setCurrentUser(newAccount.id);

  return newAccount;
}

/**
 * 获取当前用户ID
 */
export function getCurrentUserId(): number | null {
  if (!isBrowser()) return null;

  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return data ? parseInt(data) : null;
}

/**
 * 设置当前用户
 */
export function setCurrentUser(userId: number): void {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, userId.toString());

  // 更新最后活跃时间
  const accounts = getAllUserAccounts();
  const index = accounts.findIndex(a => a.id === userId);
  if (index !== -1) {
    accounts[index].lastActiveAt = Date.now();
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
  }
}

/**
 * 获取当前用户账户
 */
export function getCurrentUserAccount(): UserAccount | null {
  const userId = getCurrentUserId();
  if (!userId) return null;

  const accounts = getAllUserAccounts();
  return accounts.find(a => a.id === userId) || null;
}

/**
 * 更新用户账户
 */
export function updateUserAccount(userId: number, updates: Partial<Omit<UserAccount, 'id' | 'createdAt'>>): UserAccount | null {
  const accounts = getAllUserAccounts();
  const index = accounts.findIndex(a => a.id === userId);

  if (index === -1) return null;

  accounts[index] = { ...accounts[index], ...updates, lastActiveAt: Date.now() };
  localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));

  return accounts[index];
}

/**
 * 删除用户账户
 */
export function deleteUserAccount(userId: number): boolean {
  const accounts = getAllUserAccounts();
  const filtered = accounts.filter(a => a.id !== userId);

  if (filtered.length === accounts.length) return false;

  localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(filtered));

  // 如果删除的是当前用户，清除当前用户
  if (getCurrentUserId() === userId) {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }

  return true;
}

// ==================== 今日餐次分析 ====================

/**
 * 获取今日已完成的餐次
 */
export function getTodayCompletedMeals(): MealType[] {
  const entries = getDiaryEntriesByDate(getTodayDateString());
  const mealTypes = new Set<MealType>();

  entries.forEach(e => mealTypes.add(e.mealType));

  return Array.from(mealTypes);
}

// ==================== 数据备份与恢复 ====================

/**
 * 导出所有数据为 JSON 字符串，供用户下载备份
 */
export function exportAllData(): string {
  if (!isBrowser()) return '{}';

  const data: Record<string, unknown> = {};
  for (const storageKey of Object.values(STORAGE_KEYS)) {
    const value = localStorage.getItem(storageKey);
    if (value) {
      try {
        data[storageKey] = JSON.parse(value);
      } catch {
        data[storageKey] = value;
      }
    }
  }

  return JSON.stringify({
    version: '1.0',
    exportedAt: new Date().toISOString(),
    data,
  }, null, 2);
}

/**
 * 从 JSON 字符串导入数据（覆盖当前数据）
 */
export function importAllData(jsonString: string): { success: boolean; error?: string } {
  if (!isBrowser()) return { success: false, error: '仅支持浏览器环境' };

  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed.data || typeof parsed.data !== 'object') {
      return { success: false, error: '无效的备份文件格式，请确认文件来自本系统' };
    }

    const validKeys = new Set(Object.values(STORAGE_KEYS));
    for (const [key, value] of Object.entries(parsed.data)) {
      if (validKeys.has(key)) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    }

    return { success: true };
  } catch {
    return { success: false, error: '文件解析失败，请确认文件未损坏' };
  }
}

/**
 * 获取今日剩余需要的餐次
 */
export function getTodayRemainingMeals(): MealType[] {
  const completed = getTodayCompletedMeals();
  const allMeals: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

  return allMeals.filter(m => !completed.includes(m));
}

/**
 * 获取下一个建议餐次
 */
export function getNextSuggestedMeal(): MealType {
  const remaining = getTodayRemainingMeals();
  const hour = new Date().getHours();

  // 根据时间智能推荐
  if (hour < 10 && remaining.includes('breakfast')) return 'breakfast';
  if (hour < 14 && remaining.includes('lunch')) return 'lunch';
  if (hour < 20 && remaining.includes('dinner')) return 'dinner';
  if (remaining.includes('snack')) return 'snack';

  // 默认返回第一个剩余餐次
  return remaining[0] || 'snack';
}

'use client';

import { useState, useEffect } from 'react';
import GamificationPanel from '@/components/GamificationPanel';
import WeeklyReport from '@/components/WeeklyReport';
import MealPresets from '@/components/MealPresets';
import UserAccountManager from '@/components/UserAccountManager';
import InventoryManager from '@/components/InventoryManager';
import DataManager from '@/components/DataManager';
import { UserGoals, DiaryEntry } from '@/types/nutrition';
import { getUserGoals, getDiaryEntriesByDate, getTodayDateString, getCurrentUserAccount } from '@/lib/storage';

export default function MePage() {
  const [goals, setGoals] = useState<UserGoals | null>(null);
  const [todayEntries, setTodayEntries] = useState<DiaryEntry[]>([]);
  const [showInventory, setShowInventory] = useState(false);

  const loadData = () => {
    const account = getCurrentUserAccount();
    setGoals(account?.goals || getUserGoals());
    setTodayEntries(getDiaryEntriesByDate(getTodayDateString()));
  };

  useEffect(() => { loadData(); }, []);

  return (
    <div className="space-y-4">
      {/* 成就与奖励 */}
      <GamificationPanel />

      {/* 本周报告 */}
      {goals && <WeeklyReport goals={goals} />}

      {/* 常用套餐 */}
      <MealPresets todayEntries={todayEntries} onAdded={loadData} />

      {/* 用户管理 */}
      <UserAccountManager onUserChange={() => loadData()} />

      {/* 食材库存（折叠） */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <button
          onClick={() => setShowInventory(!showInventory)}
          className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50 transition-colors"
        >
          <span className="font-semibold text-gray-900 text-sm">📦 食材库存管理</span>
          <span className="text-gray-400 text-sm">{showInventory ? '收起 ∧' : '展开 ∨'}</span>
        </button>
        {showInventory && (
          <div className="px-5 pb-5">
            <InventoryManager onUpdate={() => {}} />
          </div>
        )}
      </div>

      {/* 数据备份 */}
      <DataManager />
    </div>
  );
}

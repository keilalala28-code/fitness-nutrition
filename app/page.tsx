'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DailyProgress from '@/components/DailyProgress';
import FoodSearch from '@/components/FoodSearch';
import DietRecommendations from '@/components/DietRecommendations';
import ConfirmDialog from '@/components/ConfirmDialog';
import OnboardingModal from '@/components/OnboardingModal';
import RecentFoods from '@/components/RecentFoods';
import { useToast } from '@/components/Toast';
import { useMode } from '@/components/ModeContext';
import { UserGoals, NutrientData, DiaryEntry, MealType, UserAccount } from '@/types/nutrition';
import {
  getUserGoals,
  getDiaryEntriesByDate,
  getTodayDateString,
  deleteDiaryEntry,
  getTotalCaloriesBurnedByDate,
  getCurrentUserAccount,
  getAllUserAccounts,
  getNextSuggestedMeal,
  copyYesterdayMeals,
} from '@/lib/storage';

const MEAL_LABELS: Record<MealType, string> = {
  breakfast: '🌅 早餐',
  lunch: '☀️ 午餐',
  dinner: '🌙 晚餐',
  snack: '🍎 加餐',
};

export default function Home() {
  const { showToast } = useToast();
  const { mode } = useMode();
  const isMobile = mode === 'mobile';

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [goals, setGoals] = useState<UserGoals | null>(null);
  const [todayEntries, setTodayEntries] = useState<DiaryEntry[]>([]);
  const [consumed, setConsumed] = useState<NutrientData>({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  const [burned, setBurned] = useState(0);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const loadData = () => {
    const account = getCurrentUserAccount();
    setCurrentUser(account);
    setGoals(account?.goals || getUserGoals());

    const entries = getDiaryEntriesByDate(getTodayDateString());
    setTodayEntries(entries);

    if (entries.length > 0) {
      const total = entries.reduce(
        (acc, e) => ({
          calories: acc.calories + e.nutrients.calories,
          protein: acc.protein + e.nutrients.protein,
          carbs: acc.carbs + e.nutrients.carbs,
          fat: acc.fat + e.nutrients.fat,
        }),
        { calories: 0, protein: 0, carbs: 0, fat: 0 }
      );
      setConsumed({
        calories: Math.round(total.calories),
        protein: Math.round(total.protein * 10) / 10,
        carbs: Math.round(total.carbs * 10) / 10,
        fat: Math.round(total.fat * 10) / 10,
      });
    } else {
      setConsumed({ calories: 0, protein: 0, carbs: 0, fat: 0 });
    }
    setBurned(getTotalCaloriesBurnedByDate(getTodayDateString()));
  };

  useEffect(() => {
    loadData();
    if (getAllUserAccounts().length === 0) setShowOnboarding(true);
  }, []);

  const handleConfirmDelete = () => {
    if (!pendingDeleteId) return;
    deleteDiaryEntry(pendingDeleteId);
    showToast('记录已删除', 'success');
    setPendingDeleteId(null);
    loadData();
  };

  const handleCopyYesterday = () => {
    const count = copyYesterdayMeals();
    if (count > 0) {
      showToast(`已复制昨日 ${count} 条记录`, 'success');
      loadData();
    } else {
      showToast('昨日没有记录可复制', 'info');
    }
  };

  const suggestedMeal = getNextSuggestedMeal();
  const dateObj = new Date();
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const dateLabel = `${dateObj.getMonth() + 1}月${dateObj.getDate()}日 ${weekdays[dateObj.getDay()]}`;

  return (
    <div className="space-y-4">
      {showOnboarding && <OnboardingModal onComplete={() => { setShowOnboarding(false); loadData(); }} />}
      {pendingDeleteId && (
        <ConfirmDialog
          message="确定要删除这条饮食记录吗？"
          onConfirm={handleConfirmDelete}
          onCancel={() => setPendingDeleteId(null)}
        />
      )}

      {/* 紧凑头部 */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl text-white px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-base">
            {currentUser ? `${currentUser.name} 👋` : '今日饮食'}
          </h1>
          <p className="text-primary-100 text-xs mt-0.5">{dateLabel}</p>
        </div>
        {goals && (
          <div className="text-right">
            <div className="text-xs text-primary-200">净摄入</div>
            <div className="font-bold text-sm">{consumed.calories - burned} <span className="text-xs font-normal text-primary-200">卡</span></div>
          </div>
        )}
      </div>

      {/* 营养进度 */}
      {goals ? (
        <DailyProgress consumed={consumed} goals={goals} />
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
          <p className="text-yellow-800 mb-2 text-sm">设置营养目标后，这里会显示今日进度</p>
          <Link href="/calculator" className="inline-block px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm font-medium">
            计算我的TDEE →
          </Link>
        </div>
      )}

      {/* 添加食物（置顶，最核心操作） */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-900">🍽️ 添加今日饮食</h2>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{MEAL_LABELS[suggestedMeal].replace(/.*\s/, '')}</span>
        </div>
        <FoodSearch onFoodAdded={loadData} />
        <RecentFoods onAdded={loadData} currentMealType={suggestedMeal} />
      </div>

      {/* 今日饮食记录 */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-semibold text-gray-900">📝 今日记录</h2>
          <div className="flex items-center gap-3">
            <button onClick={handleCopyYesterday} className="text-xs text-gray-400 hover:text-gray-600">
              📋 复制昨日
            </button>
            <Link href="/diary" className="text-primary-600 text-xs">历史 →</Link>
          </div>
        </div>

        {todayEntries.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-4">还没有记录，从上面搜索开始吧</p>
        ) : (
          <div className="space-y-2">
            {(['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).map(mealType => {
              const mealEntries = todayEntries.filter(e => e.mealType === mealType);
              if (mealEntries.length === 0) return null;
              const mealTotal = mealEntries.reduce((sum, e) => sum + e.nutrients.calories, 0);
              return (
                <div key={mealType} className="border border-gray-100 rounded-lg overflow-hidden">
                  <div className="flex justify-between items-center px-3 py-1.5 bg-gray-50">
                    <span className="text-xs font-medium text-gray-600">{MEAL_LABELS[mealType]}</span>
                    <span className="text-xs text-orange-500 font-medium">{mealTotal} kcal</span>
                  </div>
                  {mealEntries.map(entry => (
                    <div key={entry.id} className="flex justify-between items-center px-3 py-2 text-sm border-t border-gray-50">
                      <div>
                        <span className="font-medium text-gray-800">{entry.foodName}</span>
                        <span className="text-gray-400 ml-1.5 text-xs">{entry.grams}g</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-xs">{entry.nutrients.calories}卡 · 蛋白{entry.nutrients.protein}g</span>
                        <button onClick={() => setPendingDeleteId(entry.id)} className="text-gray-300 hover:text-red-500 text-xs">✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 今日营养建议（折叠） */}
      {goals && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <button
            onClick={() => setShowRecommendations(!showRecommendations)}
            className="w-full flex justify-between items-center px-4 py-3 text-left hover:bg-gray-50"
          >
            <span className="text-sm font-semibold text-gray-900">💡 今日营养建议</span>
            <span className="text-gray-400 text-xs">{showRecommendations ? '收起 ∧' : '展开 ∨'}</span>
          </button>
          {showRecommendations && (
            <div className="px-4 pb-4">
              <DietRecommendations consumed={consumed} burned={burned} goals={goals} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

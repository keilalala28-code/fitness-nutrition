'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import DailyProgress from '@/components/DailyProgress';
import FoodSearch from '@/components/FoodSearch';
import ExerciseSearch from '@/components/ExerciseSearch';
import DietRecommendations from '@/components/DietRecommendations';
import ExerciseRecommendations from '@/components/ExerciseRecommendations';
import UserAccountManager from '@/components/UserAccountManager';
import InventoryManager from '@/components/InventoryManager';
import DataManager from '@/components/DataManager';
import ConfirmDialog from '@/components/ConfirmDialog';
import OnboardingModal from '@/components/OnboardingModal';
import RecentFoods from '@/components/RecentFoods';
import { useToast } from '@/components/Toast';
import { useMode } from '@/components/ModeContext';
import { UserGoals, NutrientData, DiaryEntry, ExerciseEntry, MealType, UserAccount } from '@/types/nutrition';
import {
  getUserGoals,
  getDiaryEntriesByDate,
  getExerciseEntriesByDate,
  getTodayDateString,
  deleteDiaryEntry,
  deleteExerciseEntry,
  getTotalCaloriesBurnedByDate,
  getCurrentUserAccount,
  getAllUserAccounts,
  getNextSuggestedMeal,
} from '@/lib/storage';

const MEAL_LABELS: Record<MealType, string> = {
  breakfast: '🌅 早餐',
  lunch: '☀️ 午餐',
  dinner: '🌙 晚餐',
  snack: '🍎 加餐',
};

interface PendingDelete {
  id: string;
  type: 'food' | 'exercise';
  message: string;
}

export default function Home() {
  const { showToast } = useToast();
  const { mode } = useMode();
  const isMobile = mode === 'mobile';
  const searchRef = useRef<HTMLDivElement>(null);

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [goals, setGoals] = useState<UserGoals | null>(null);
  const [todayEntries, setTodayEntries] = useState<DiaryEntry[]>([]);
  const [todayExercises, setTodayExercises] = useState<ExerciseEntry[]>([]);
  const [consumed, setConsumed] = useState<NutrientData>({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  const [burned, setBurned] = useState(0);
  const [activeTab, setActiveTab] = useState<'food' | 'exercise'>('food');
  const [inventoryKey, setInventoryKey] = useState(0);
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showInventory, setShowInventory] = useState(false);

  const loadData = () => {
    const account = getCurrentUserAccount();
    setCurrentUser(account);
    const savedGoals = account?.goals || getUserGoals();
    setGoals(savedGoals);

    const entries = getDiaryEntriesByDate(getTodayDateString());
    setTodayEntries(entries);
    setTodayExercises(getExerciseEntriesByDate(getTodayDateString()));

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
    // 新用户引导：首次访问且无账户时自动弹出
    if (getAllUserAccounts().length === 0) {
      setShowOnboarding(true);
    }
  }, []);

  const handleDeleteEntry = (id: string) => {
    setPendingDelete({ id, type: 'food', message: '确定要删除这条饮食记录吗？' });
  };

  const handleDeleteExercise = (id: string) => {
    setPendingDelete({ id, type: 'exercise', message: '确定要删除这条运动记录吗？' });
  };

  const handleConfirmDelete = () => {
    if (!pendingDelete) return;
    if (pendingDelete.type === 'food') {
      deleteDiaryEntry(pendingDelete.id);
      showToast('饮食记录已删除', 'success');
    } else {
      deleteExerciseEntry(pendingDelete.id);
      showToast('运动记录已删除', 'success');
    }
    setPendingDelete(null);
    loadData();
  };

  const handleUserChange = (account: UserAccount | null) => {
    setCurrentUser(account);
    if (account) setGoals(account.goals);
    loadData();
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    loadData();
  };

  const scrollToSearch = () => {
    searchRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveTab('food');
  };

  const suggestedMeal = getNextSuggestedMeal();

  return (
    <div className={`space-y-4 ${isMobile ? '' : 'space-y-6'}`}>
      {/* 新手引导弹窗 */}
      {showOnboarding && <OnboardingModal onComplete={handleOnboardingComplete} />}

      {/* 确认删除对话框 */}
      {pendingDelete && (
        <ConfirmDialog
          message={pendingDelete.message}
          onConfirm={handleConfirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}

      {/* 欢迎横幅 */}
      <div className={`bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl text-white ${isMobile ? 'p-4' : 'p-6'}`}>
        <h1 className={`font-bold mb-1 ${isMobile ? 'text-lg' : 'text-2xl'}`}>
          {currentUser ? `你好，${currentUser.name} 👋` : '健康管理'}
        </h1>
        <p className={`text-primary-100 ${isMobile ? 'text-xs' : 'text-sm'}`}>
          {getTodayDateString()} · 追踪营养摄入，科学管理健康
        </p>
      </div>

      {/* 用户管理（无账户时展示，有账户时紧凑显示） */}
      {!showOnboarding && (
        <UserAccountManager onUserChange={handleUserChange} />
      )}

      {/* 今日营养目标进度 */}
      {goals ? (
        <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
          <div className={isMobile ? '' : 'lg:col-span-2'}>
            <DailyProgress consumed={consumed} goals={goals} />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>🔥</span> 今日运动消耗
            </h3>
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {burned} <span className="text-base font-normal text-gray-500">kcal</span>
            </div>
            <div className="text-sm text-gray-500 mb-3">
              净摄入：<span className="font-medium text-gray-700">{consumed.calories - burned}</span> kcal
            </div>
            {todayExercises.length > 0 ? (
              <div className="space-y-2">
                {todayExercises.map(ex => (
                  <div key={ex.id} className="flex justify-between items-center text-sm bg-orange-50 rounded-lg p-2">
                    <span className="text-gray-700">{ex.exerciseName}（{ex.duration}分钟）</span>
                    <div className="flex items-center gap-2">
                      <span className="text-orange-600 font-medium">-{ex.caloriesBurned}</span>
                      <button onClick={() => handleDeleteExercise(ex.id)} className="text-gray-300 hover:text-red-500 transition-colors">✕</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">今天还没有运动记录</p>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-center">
          <p className="text-yellow-800 mb-3 text-sm">设置营养目标后，这里会显示今日进度</p>
          <Link href="/calculator" className="inline-block px-5 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium">
            计算我的TDEE目标 →
          </Link>
        </div>
      )}

      {/* 今日饮食记录（移到中间位置，更突出） */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold text-gray-900">📝 今日饮食记录</h2>
          <Link href="/diary" className="text-primary-600 hover:text-primary-700 text-sm">
            查看历史 →
          </Link>
        </div>

        {todayEntries.length === 0 ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-2">🍽️</div>
            <p className="text-gray-500 text-sm mb-3">今天还没有记录，从第一餐开始吧！</p>
            <button
              onClick={scrollToSearch}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
            >
              + 添加今日{MEAL_LABELS[suggestedMeal].replace(/.*\s/, '')}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {(['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).map(mealType => {
              const mealEntries = todayEntries.filter(e => e.mealType === mealType);
              if (mealEntries.length === 0) return null;
              const mealTotal = mealEntries.reduce((sum, e) => sum + e.nutrients.calories, 0);
              return (
                <div key={mealType} className="border border-gray-100 rounded-lg overflow-hidden">
                  <div className="flex justify-between items-center px-3 py-2 bg-gray-50">
                    <span className="text-sm font-medium text-gray-700">{MEAL_LABELS[mealType]}</span>
                    <span className="text-xs text-orange-600 font-medium">{mealTotal} kcal</span>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {mealEntries.map(entry => (
                      <div key={entry.id} className="flex justify-between items-center px-3 py-2 text-sm">
                        <div>
                          <span className="font-medium text-gray-800">{entry.foodName}</span>
                          <span className="text-gray-400 ml-2 text-xs">{entry.grams}g</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-500 text-xs">
                            {entry.nutrients.calories}卡 · 蛋白{entry.nutrients.protein}g
                          </span>
                          <button onClick={() => handleDeleteEntry(entry.id)} className="text-gray-300 hover:text-red-500 transition-colors text-xs">✕</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 添加食物/运动 */}
      <div ref={searchRef} className="bg-white rounded-xl shadow-sm p-5">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('food')}
            className={`flex-1 py-2.5 rounded-xl font-medium transition-colors text-sm ${
              activeTab === 'food' ? 'bg-primary-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🍽️ 添加食物
          </button>
          <button
            onClick={() => setActiveTab('exercise')}
            className={`flex-1 py-2.5 rounded-xl font-medium transition-colors text-sm ${
              activeTab === 'exercise' ? 'bg-orange-500 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🏃 添加运动
          </button>
        </div>

        {activeTab === 'food' ? (
          <>
            <FoodSearch onFoodAdded={loadData} />
            <RecentFoods onAdded={loadData} currentMealType={suggestedMeal} />
          </>
        ) : (
          <ExerciseSearch onExerciseAdded={loadData} />
        )}
      </div>

      {/* 饮食推荐（可折叠） */}
      {goals && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <button
            onClick={() => setShowRecommendations(!showRecommendations)}
            className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-gray-900 text-sm">🍽️ 智能饮食 & 运动推荐</span>
            <span className="text-gray-400 text-sm">{showRecommendations ? '收起 ∧' : '展开 ∨'}</span>
          </button>
          {showRecommendations && (
            <div className="px-5 pb-5 space-y-4">
              <DietRecommendations key={inventoryKey} consumed={consumed} burned={burned} goals={goals} userProfile={currentUser?.profile} />
              <ExerciseRecommendations
                userProfile={currentUser?.profile}
                targetCalories={goals ? Math.max(0, goals.calories - consumed.calories + burned) : undefined}
              />
            </div>
          )}
        </div>
      )}

      {/* 食材库存（可折叠） */}
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
            <InventoryManager onUpdate={() => { setInventoryKey(k => k + 1); }} />
          </div>
        )}
      </div>

      {/* 数据备份（紧凑） */}
      <DataManager />
    </div>
  );
}

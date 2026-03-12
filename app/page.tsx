'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DailyProgress from '@/components/DailyProgress';
import FoodSearch from '@/components/FoodSearch';
import ExerciseSearch from '@/components/ExerciseSearch';
import DietRecommendations from '@/components/DietRecommendations';
import UserAccountManager from '@/components/UserAccountManager';
import InventoryManager from '@/components/InventoryManager';
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
} from '@/lib/storage';

const MEAL_LABELS: Record<MealType, string> = {
  breakfast: '🌅 早餐',
  lunch: '☀️ 午餐',
  dinner: '🌙 晚餐',
  snack: '🍎 加餐',
};

export default function Home() {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [goals, setGoals] = useState<UserGoals | null>(null);
  const [todayEntries, setTodayEntries] = useState<DiaryEntry[]>([]);
  const [todayExercises, setTodayExercises] = useState<ExerciseEntry[]>([]);
  const [consumed, setConsumed] = useState<NutrientData>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const [burned, setBurned] = useState(0);
  const [activeTab, setActiveTab] = useState<'food' | 'exercise'>('food');
  const [inventoryKey, setInventoryKey] = useState(0);

  const loadData = () => {
    // 优先使用当前用户的目标，否则使用旧系统的目标
    const account = getCurrentUserAccount();
    setCurrentUser(account);
    const savedGoals = account?.goals || getUserGoals();
    setGoals(savedGoals);

    const entries = getDiaryEntriesByDate(getTodayDateString());
    setTodayEntries(entries);

    const exercises = getExerciseEntriesByDate(getTodayDateString());
    setTodayExercises(exercises);

    // 计算摄入营养
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

    // 计算运动消耗
    setBurned(getTotalCaloriesBurnedByDate(getTodayDateString()));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteEntry = (id: string) => {
    if (confirm('确定要删除这条记录吗？')) {
      deleteDiaryEntry(id);
      loadData();
    }
  };

  const handleDeleteExercise = (id: string) => {
    if (confirm('确定要删除这条运动记录吗？')) {
      deleteExerciseEntry(id);
      loadData();
    }
  };

  const handleUserChange = (account: UserAccount | null) => {
    setCurrentUser(account);
    if (account) {
      setGoals(account.goals);
    }
    loadData();
  };

  const handleInventoryUpdate = () => {
    setInventoryKey(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      {/* 欢迎区域 */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-1">健身营养计算器</h1>
        <p className="text-primary-100 text-sm">
          追踪每日营养摄入和运动消耗，科学管理健身饮食
        </p>
      </div>

      {/* 用户账户管理 */}
      <UserAccountManager onUserChange={handleUserChange} />

      {/* 目标进度 + 运动消耗 */}
      {goals ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <DailyProgress consumed={consumed} goals={goals} />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>🔥</span> 今日运动消耗
            </h3>
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {burned} <span className="text-lg font-normal">卡路里</span>
            </div>
            <div className="text-sm text-gray-500 mb-3">
              净摄入：{consumed.calories - burned} 卡路里
            </div>
            {todayExercises.length > 0 ? (
              <div className="space-y-2">
                {todayExercises.map((ex) => (
                  <div key={ex.id} className="flex justify-between items-center text-sm bg-orange-50 rounded-lg p-2">
                    <span>{ex.exerciseName} ({ex.duration}分钟)</span>
                    <div className="flex items-center gap-2">
                      <span className="text-orange-600">-{ex.caloriesBurned}卡</span>
                      <button
                        onClick={() => handleDeleteExercise(ex.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        ✕
                      </button>
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
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
          <p className="text-yellow-800 mb-4">
            您还没有设置每日营养目标，请先计算您的 TDEE
          </p>
          <Link
            href="/calculator"
            className="inline-block px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            设置目标
          </Link>
        </div>
      )}

      {/* 添加食物/运动切换 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('food')}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'food'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🍽️ 添加食物
          </button>
          <button
            onClick={() => setActiveTab('exercise')}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'exercise'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🏃 添加运动
          </button>
        </div>

        {activeTab === 'food' ? (
          <FoodSearch onFoodAdded={loadData} />
        ) : (
          <ExerciseSearch onExerciseAdded={loadData} />
        )}
      </div>

      {/* 饮食建议 */}
      {goals && (
        <DietRecommendations key={inventoryKey} consumed={consumed} burned={burned} goals={goals} />
      )}

      {/* 食材库存管理 */}
      <InventoryManager onUpdate={handleInventoryUpdate} />

      {/* 今日饮食记录 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">📝 今日饮食记录</h2>
          <Link
            href="/diary"
            className="text-primary-600 hover:text-primary-700 text-sm"
          >
            查看历史 →
          </Link>
        </div>

        {todayEntries.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            今天还没有记录，开始添加食物吧！
          </p>
        ) : (
          <div className="space-y-3">
            {(['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).map((mealType) => {
              const mealEntries = todayEntries.filter(e => e.mealType === mealType);
              if (mealEntries.length === 0) return null;

              const mealTotal = mealEntries.reduce((sum, e) => sum + e.nutrients.calories, 0);

              return (
                <div key={mealType} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-700">{MEAL_LABELS[mealType]}</h3>
                    <span className="text-sm text-orange-600">{mealTotal} 卡</span>
                  </div>
                  <div className="space-y-2">
                    {mealEntries.map((entry) => (
                      <div
                        key={entry.id}
                        className="flex justify-between items-center text-sm bg-gray-50 rounded-lg p-3"
                      >
                        <div>
                          <span className="font-medium">{entry.foodName}</span>
                          <span className="text-gray-500 ml-2">{entry.grams}g</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-gray-600">
                            {entry.nutrients.calories}卡 |
                            蛋白质{entry.nutrients.protein}g
                          </span>
                          <button
                            onClick={() => handleDeleteEntry(entry.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            删除
                          </button>
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

      {/* 功能入口 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/search"
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="text-3xl mb-2">🔍</div>
          <h3 className="font-semibold text-gray-900">食物搜索</h3>
          <p className="text-sm text-gray-500 mt-1">搜索中国常见食物营养数据</p>
        </Link>

        <Link
          href="/diary"
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="text-3xl mb-2">📝</div>
          <h3 className="font-semibold text-gray-900">饮食日志</h3>
          <p className="text-sm text-gray-500 mt-1">查看和管理历史饮食记录</p>
        </Link>

        <Link
          href="/calculator"
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="text-3xl mb-2">📊</div>
          <h3 className="font-semibold text-gray-900">TDEE 计算</h3>
          <p className="text-sm text-gray-500 mt-1">计算每日能量消耗和营养目标</p>
        </Link>
      </div>
    </div>
  );
}

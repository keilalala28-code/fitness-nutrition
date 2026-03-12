'use client';

import { useState, useEffect } from 'react';
import { DiaryEntry, ExerciseEntry, MealType, NutrientData } from '@/types/nutrition';
import {
  getAllDiaryEntries,
  getAllExerciseEntries,
  deleteDiaryEntry,
  deleteExerciseEntry,
  formatDate
} from '@/lib/storage';
import NutritionCard from '@/components/NutritionCard';

const MEAL_LABELS: Record<MealType, string> = {
  breakfast: '🌅 早餐',
  lunch: '☀️ 午餐',
  dinner: '🌙 晚餐',
  snack: '🍎 加餐',
};

export default function DiaryPage() {
  const [entriesByDate, setEntriesByDate] = useState<Record<string, DiaryEntry[]>>({});
  const [exercisesByDate, setExercisesByDate] = useState<Record<string, ExerciseEntry[]>>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const loadData = () => {
    // 加载饮食记录
    const allEntries = getAllDiaryEntries();
    const groupedEntries: Record<string, DiaryEntry[]> = {};
    allEntries.forEach((entry) => {
      if (!groupedEntries[entry.date]) {
        groupedEntries[entry.date] = [];
      }
      groupedEntries[entry.date].push(entry);
    });

    // 加载运动记录
    const allExercises = getAllExerciseEntries();
    const groupedExercises: Record<string, ExerciseEntry[]> = {};
    allExercises.forEach((ex) => {
      if (!groupedExercises[ex.date]) {
        groupedExercises[ex.date] = [];
      }
      groupedExercises[ex.date].push(ex);
    });

    // 合并日期并排序
    const allDates = new Set([
      ...Object.keys(groupedEntries),
      ...Object.keys(groupedExercises)
    ]);
    const sortedDates = Array.from(allDates).sort((a, b) => b.localeCompare(a));

    const sortedEntries: Record<string, DiaryEntry[]> = {};
    const sortedExercises: Record<string, ExerciseEntry[]> = {};

    sortedDates.forEach((date) => {
      if (groupedEntries[date]) {
        sortedEntries[date] = groupedEntries[date];
      }
      if (groupedExercises[date]) {
        sortedExercises[date] = groupedExercises[date];
      }
    });

    setEntriesByDate(sortedEntries);
    setExercisesByDate(sortedExercises);
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

  const getDayTotal = (entries: DiaryEntry[]): NutrientData => {
    return entries.reduce(
      (acc, e) => ({
        calories: acc.calories + e.nutrients.calories,
        protein: acc.protein + e.nutrients.protein,
        carbs: acc.carbs + e.nutrients.carbs,
        fat: acc.fat + e.nutrients.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  const getExerciseTotal = (exercises: ExerciseEntry[]): number => {
    return exercises.reduce((sum, e) => sum + e.caloriesBurned, 0);
  };

  const allDates = Array.from(new Set([
    ...Object.keys(entriesByDate),
    ...Object.keys(exercisesByDate)
  ])).sort((a, b) => b.localeCompare(a));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">饮食日志</h1>
        <p className="text-gray-600 mt-1">查看和管理您的历史饮食和运动记录</p>
      </div>

      {allDates.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">暂无记录</h3>
          <p className="text-gray-500">开始记录您的饮食和运动，追踪每日营养摄入</p>
        </div>
      ) : (
        <div className="space-y-4">
          {allDates.map((date) => {
            const entries = entriesByDate[date] || [];
            const exercises = exercisesByDate[date] || [];
            const dayTotal = getDayTotal(entries);
            const exerciseTotal = getExerciseTotal(exercises);
            const isExpanded = selectedDate === date;

            return (
              <div key={date} className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* 日期标题 */}
                <button
                  onClick={() => setSelectedDate(isExpanded ? null : date)}
                  className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {formatDate(date)}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {entries.length} 条饮食记录
                      {exercises.length > 0 && ` · ${exercises.length} 条运动记录`}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-orange-600">
                      摄入 {dayTotal.calories} 卡
                    </div>
                    {exerciseTotal > 0 && (
                      <div className="text-sm text-green-600">
                        消耗 -{exerciseTotal} 卡
                      </div>
                    )}
                    <div className="text-sm text-gray-500">
                      蛋白质 {Math.round(dayTotal.protein)}g
                    </div>
                  </div>
                </button>

                {/* 展开的详细内容 */}
                {isExpanded && (
                  <div className="border-t border-gray-100 p-4 space-y-4">
                    {/* 营养汇总卡片 */}
                    <NutritionCard nutrients={dayTotal} showDetails />

                    {/* 运动记录 */}
                    {exercises.length > 0 && (
                      <div className="bg-orange-50 rounded-lg p-4">
                        <h3 className="font-medium text-orange-800 mb-2">🏃 运动记录</h3>
                        <div className="space-y-2">
                          {exercises.map((ex) => (
                            <div
                              key={ex.id}
                              className="flex justify-between items-center text-sm bg-white rounded-lg p-3"
                            >
                              <span>{ex.exerciseName} ({ex.duration}分钟)</span>
                              <div className="flex items-center gap-4">
                                <span className="text-orange-600">-{ex.caloriesBurned} 卡</span>
                                <button
                                  onClick={() => handleDeleteExercise(ex.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  删除
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 按餐次显示饮食 */}
                    {(['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).map((mealType) => {
                      const mealEntries = entries.filter((e) => e.mealType === mealType);
                      if (mealEntries.length === 0) return null;

                      const mealTotal = mealEntries.reduce((sum, e) => sum + e.nutrients.calories, 0);

                      return (
                        <div key={mealType} className="border border-gray-100 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="font-medium text-gray-700">
                              {MEAL_LABELS[mealType]}
                            </h3>
                            <span className="text-sm text-gray-500">
                              {mealTotal} 卡
                            </span>
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
                                    {entry.nutrients.calories} 卡 |{' '}
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
            );
          })}
        </div>
      )}
    </div>
  );
}

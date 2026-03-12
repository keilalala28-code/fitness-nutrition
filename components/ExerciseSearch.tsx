'use client';

import { useState, useEffect } from 'react';
import { ExerciseItem } from '@/types/nutrition';
import { EXERCISES, EXERCISE_CATEGORY_NAMES, calculateCaloriesBurned } from '@/lib/exercises';
import { addExerciseEntry, getTodayDateString, getUserProfile } from '@/lib/storage';

interface ExerciseSearchProps {
  onExerciseAdded?: () => void;
}

// 热门运动
const HOT_EXERCISES = [
  '跑步', '快走', '力量', '瑜伽',
  '游泳', '动感单车', 'HIIT', '深蹲'
];

export default function ExerciseSearch({ onExerciseAdded }: ExerciseSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ExerciseItem[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseItem | null>(null);
  const [duration, setDuration] = useState<number>(30);
  const [userWeight, setUserWeight] = useState<number>(70);

  // 获取用户体重
  useEffect(() => {
    const profile = getUserProfile();
    if (profile) {
      setUserWeight(profile.weight);
    }
  }, []);

  const searchExercises = (searchQuery: string): ExerciseItem[] => {
    if (!searchQuery.trim()) return [];

    const term = searchQuery.toLowerCase();
    return EXERCISES.filter(ex =>
      ex.name.toLowerCase().includes(term) ||
      ex.tags.some(tag => tag.toLowerCase().includes(term)) ||
      ex.description.toLowerCase().includes(term)
    ).slice(0, 20);
  };

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setResults(searchExercises(searchQuery));
  };

  const handleSelectExercise = (exercise: ExerciseItem) => {
    setSelectedExercise(exercise);
    setDuration(30); // 默认30分钟
  };

  const handleAddExercise = () => {
    if (!selectedExercise) return;

    const caloriesBurned = calculateCaloriesBurned(
      selectedExercise.met,
      userWeight,
      duration
    );

    addExerciseEntry({
      date: getTodayDateString(),
      exerciseId: selectedExercise.id,
      exerciseName: selectedExercise.name,
      duration,
      caloriesBurned,
    });

    // 重置状态
    setSelectedExercise(null);
    setDuration(30);
    setResults([]);
    setQuery('');

    onExerciseAdded?.();
  };

  // 计算消耗的热量
  const calculatedCalories = selectedExercise
    ? calculateCaloriesBurned(selectedExercise.met, userWeight, duration)
    : 0;

  // 按分类分组显示
  const groupedExercises = EXERCISES.reduce((acc, ex) => {
    if (!acc[ex.category]) {
      acc[ex.category] = [];
    }
    acc[ex.category].push(ex);
    return acc;
  }, {} as Record<string, ExerciseItem[]>);

  return (
    <div className="space-y-4">
      {/* 搜索框 */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="搜索运动（如：跑步、深蹲、瑜伽...）"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
        />
        {query && (
          <button
            onClick={() => handleSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* 热门运动 */}
      {!query && !selectedExercise && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-500">热门运动：</span>
          {HOT_EXERCISES.map((term) => (
            <button
              key={term}
              onClick={() => handleSearch(term)}
              className="px-3 py-1 text-sm bg-orange-50 hover:bg-orange-100 rounded-full text-orange-700 transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      )}

      {/* 选中的运动 - 添加表单 */}
      {selectedExercise && (
        <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-orange-800 text-lg">
                {selectedExercise.name}
              </h3>
              <span className="text-xs px-2 py-0.5 bg-orange-100 rounded-full text-orange-700">
                {EXERCISE_CATEGORY_NAMES[selectedExercise.category]}
              </span>
              <span className="ml-2 text-sm text-gray-600">
                MET值: {selectedExercise.met}
              </span>
            </div>
            <button
              onClick={() => setSelectedExercise(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            {selectedExercise.description}
          </p>

          <div className="flex flex-wrap gap-4 items-end">
            {/* 体重 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                体重（kg）
              </label>
              <input
                type="number"
                value={userWeight}
                onChange={(e) => setUserWeight(Math.max(30, parseInt(e.target.value) || 70))}
                min="30"
                max="200"
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-center"
              />
            </div>

            {/* 时长 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                运动时长（分钟）
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 0))}
                min="1"
                step="5"
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-center"
              />
            </div>

            {/* 快捷时长按钮 */}
            <div className="flex gap-2">
              {[15, 30, 45, 60, 90].map((m) => (
                <button
                  key={m}
                  onClick={() => setDuration(m)}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    duration === m
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {m}分钟
                </button>
              ))}
            </div>
          </div>

          {/* 预计消耗 */}
          <div className="mt-4 p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">
              预计消耗热量：
            </p>
            <p className="text-2xl font-bold text-orange-600">
              {calculatedCalories} 卡路里
            </p>
            <p className="text-xs text-gray-500 mt-1">
              计算公式：MET × 体重(kg) × 时间(小时)
            </p>
          </div>

          <button
            onClick={handleAddExercise}
            className="mt-4 w-full py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
          >
            添加到今日运动
          </button>
        </div>
      )}

      {/* 搜索结果列表 */}
      {!selectedExercise && results.length > 0 && (
        <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden max-h-96 overflow-y-auto">
          {results.map((exercise) => (
            <button
              key={exercise.id}
              onClick={() => handleSelectExercise(exercise)}
              className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-medium text-gray-900">{exercise.name}</span>
                  <span className="ml-2 text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                    {EXERCISE_CATEGORY_NAMES[exercise.category]}
                  </span>
                </div>
                <span className="text-sm text-orange-600 font-medium">
                  MET {exercise.met}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{exercise.description}</p>
              <p className="text-xs text-gray-400 mt-1">
                {userWeight}kg×30分钟 ≈ {calculateCaloriesBurned(exercise.met, userWeight, 30)}卡
              </p>
            </button>
          ))}
        </div>
      )}

      {/* 无搜索时显示分类 */}
      {!query && !selectedExercise && (
        <div className="space-y-4">
          {Object.entries(groupedExercises).slice(0, 3).map(([category, exercises]) => (
            <div key={category}>
              <h4 className="font-medium text-gray-700 mb-2">
                {EXERCISE_CATEGORY_NAMES[category]}
              </h4>
              <div className="flex flex-wrap gap-2">
                {exercises.slice(0, 6).map((ex) => (
                  <button
                    key={ex.id}
                    onClick={() => handleSelectExercise(ex)}
                    className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors"
                  >
                    {ex.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 无结果提示 */}
      {query && results.length === 0 && (
        <div className="p-6 text-center text-gray-500 bg-gray-50 rounded-lg">
          未找到 &quot;{query}&quot; 相关的运动
          <p className="text-sm mt-1">试试其他关键词，如：跑步、游泳、力量</p>
        </div>
      )}
    </div>
  );
}

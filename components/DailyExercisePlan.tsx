'use client';

import { useState, useEffect, useCallback } from 'react';
import { ExerciseRecommendation, UserProfile, ExerciseCategory } from '@/types/nutrition';
import {
  getExerciseRecommendations,
  getRecommendationsByCategory,
} from '@/lib/exercise-recommendations';
import { calculateCaloriesBurned } from '@/lib/exercises';
import {
  getCurrentUserAccount,
  getTodayDateString,
  getTotalCaloriesBurnedByDate,
  addExerciseEntry,
} from '@/lib/storage';
import { useToast } from '@/components/Toast';

const GOAL_LABELS: Record<string, string> = {
  lose: '🔥 减脂',
  maintain: '⚖️ 维持',
  gain: '💪 增肌',
};

const GOAL_DEFAULT_BURN: Record<string, number> = {
  lose: 400,
  maintain: 250,
  gain: 150,
};

const CATEGORIES = [
  { key: 'all' as const, label: '全部' },
  { key: 'cardio' as const, label: '有氧' },
  { key: 'strength' as const, label: '力量' },
  { key: 'flexibility' as const, label: '柔韧' },
  { key: 'sports' as const, label: '球类' },
  { key: 'daily' as const, label: '日常' },
];

interface DailyExercisePlanProps {
  onExerciseAdded?: () => void;
}

export default function DailyExercisePlan({ onExerciseAdded }: DailyExercisePlanProps) {
  const { showToast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [fitnessGoal, setFitnessGoal] = useState<string>('maintain');
  const [burned, setBurned] = useState(0);
  const [customTarget, setCustomTarget] = useState<number | null>(null);
  const [editingTarget, setEditingTarget] = useState(false);
  const [tempTarget, setTempTarget] = useState('');
  const [recommendations, setRecommendations] = useState<ExerciseRecommendation[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | 'all'>('all');
  const [addingId, setAddingId] = useState<string | null>(null);

  const loadData = useCallback(() => {
    const account = getCurrentUserAccount();
    const p = account?.profile || null;
    setProfile(p);
    if (account?.profile?.goal) setFitnessGoal(account.profile.goal);
    setBurned(getTotalCaloriesBurnedByDate(getTodayDateString()));
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (!profile) return;
    const target = customTarget ?? GOAL_DEFAULT_BURN[fitnessGoal] ?? 250;
    let recs: ExerciseRecommendation[];
    if (selectedCategory === 'all') {
      recs = getExerciseRecommendations(profile, target, 6);
    } else {
      recs = getRecommendationsByCategory(selectedCategory, profile, 6);
    }
    setRecommendations(recs);
  }, [profile, fitnessGoal, customTarget, selectedCategory]);

  const target = customTarget ?? GOAL_DEFAULT_BURN[fitnessGoal] ?? 250;
  const progress = Math.min(100, Math.round((burned / target) * 100));
  const remaining = Math.max(0, target - burned);

  const handleAddExercise = (rec: ExerciseRecommendation) => {
    if (!profile) return;
    setAddingId(rec.exercise.id);
    const calories = calculateCaloriesBurned(
      rec.exercise.met,
      profile.weight,
      rec.suggestedDuration
    );
    addExerciseEntry({
      date: getTodayDateString(),
      exerciseId: rec.exercise.id,
      exerciseName: rec.exercise.name,
      duration: rec.suggestedDuration,
      caloriesBurned: Math.round(calories),
    });
    showToast(`已记录 ${rec.exercise.name} ${rec.suggestedDuration}分钟，消耗 ${Math.round(calories)} 卡`, 'success');
    loadData();
    onExerciseAdded?.();
    setTimeout(() => setAddingId(null), 800);
  };

  const handleSaveTarget = () => {
    const val = parseInt(tempTarget);
    if (val > 0) setCustomTarget(val);
    setEditingTarget(false);
  };

  if (!profile) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-5 text-center text-sm text-gray-400">
        创建用户档案后，这里会显示个性化每日运动计划
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
      {/* 标题 + 目标标签 */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <span>🗓️</span> 今日运动计划
          <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            {GOAL_LABELS[fitnessGoal]}
          </span>
        </h3>
      </div>

      {/* 今日目标进度 */}
      <div className="bg-orange-50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-orange-800">今日消耗目标</span>
          {!editingTarget ? (
            <button
              onClick={() => { setTempTarget(String(target)); setEditingTarget(true); }}
              className="text-xs text-orange-600 hover:text-orange-700 underline"
            >
              自定义目标
            </button>
          ) : (
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={tempTarget}
                onChange={e => setTempTarget(e.target.value)}
                className="w-16 text-xs border border-orange-300 rounded px-1.5 py-0.5 text-center focus:outline-none focus:ring-1 focus:ring-orange-400"
                placeholder="卡"
                autoFocus
              />
              <span className="text-xs text-orange-600">卡</span>
              <button
                onClick={handleSaveTarget}
                className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded hover:bg-orange-600"
              >
                确定
              </button>
              <button
                onClick={() => setEditingTarget(false)}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                取消
              </button>
            </div>
          )}
        </div>

        <div className="flex items-end gap-2 mb-2">
          <span className="text-3xl font-bold text-orange-600">{burned}</span>
          <span className="text-sm text-orange-400 mb-1">/ {target} 卡</span>
          {burned >= target && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full mb-1">✅ 已达标</span>
          )}
        </div>

        <div className="w-full bg-orange-100 rounded-full h-2.5 mb-1">
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ${burned >= target ? 'bg-green-500' : 'bg-orange-500'}`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-xs text-orange-600">
          {burned >= target
            ? '太棒了！今日运动目标已完成 🎉'
            : `还差 ${remaining} 卡达标，继续加油！`}
        </div>
      </div>

      {/* 分类筛选 */}
      <div className="flex gap-1.5 flex-wrap">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              selectedCategory === cat.key
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 推荐运动列表 */}
      {recommendations.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-2">暂无推荐，请切换分类</p>
      ) : (
        <div className="space-y-2">
          {recommendations.map(rec => {
            const cal = profile
              ? Math.round(calculateCaloriesBurned(rec.exercise.met, profile.weight, rec.suggestedDuration))
              : rec.estimatedCalories;
            const isAdding = addingId === rec.exercise.id;
            return (
              <div
                key={rec.exercise.id}
                className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2.5 hover:border-primary-100 hover:bg-primary-50/30 transition-colors"
              >
                <div className="flex-1 min-w-0 mr-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-gray-800">{rec.exercise.name}</span>
                    <span className="text-xs text-gray-400">{rec.suggestedDuration}分钟</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{rec.reason}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-sm font-medium text-orange-600">-{cal}卡</span>
                  <button
                    onClick={() => handleAddExercise(rec)}
                    disabled={isAdding}
                    className={`text-xs px-2.5 py-1 rounded-lg transition-colors ${
                      isAdding
                        ? 'bg-green-100 text-green-600'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                  >
                    {isAdding ? '✓ 已记录' : '+ 记录'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-xs text-gray-400 text-center">根据您的{GOAL_LABELS[fitnessGoal]}目标和体重智能推荐 · 点击记录即刻计入今日消耗</p>
    </div>
  );
}

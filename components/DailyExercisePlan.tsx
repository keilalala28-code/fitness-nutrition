'use client';

import { useState, useEffect, useCallback } from 'react';
import { ExerciseEntry, ExerciseRecommendation, UserProfile, ExerciseCategory } from '@/types/nutrition';
import {
  getExerciseRecommendations,
  getRecommendationsByCategory,
} from '@/lib/exercise-recommendations';
import { calculateCaloriesBurned } from '@/lib/exercises';
import {
  getCurrentUserAccount,
  getTodayDateString,
  getTotalCaloriesBurnedByDate,
  getExerciseEntriesByDate,
  addExerciseEntry,
  deleteExerciseEntry,
  getExerciseStreak,
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
  const [todayExercises, setTodayExercises] = useState<ExerciseEntry[]>([]);
  const [streak, setStreak] = useState(0);
  const [customTarget, setCustomTarget] = useState<number | null>(null);
  const [editingTarget, setEditingTarget] = useState(false);
  const [tempTarget, setTempTarget] = useState('');
  const [recommendations, setRecommendations] = useState<ExerciseRecommendation[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | 'all'>('all');
  const [addingId, setAddingId] = useState<string | null>(null);
  const [justCheckedIn, setJustCheckedIn] = useState<string | null>(null);

  const today = getTodayDateString();

  const loadData = useCallback(() => {
    const account = getCurrentUserAccount();
    const p = account?.profile || null;
    setProfile(p);
    if (account?.profile?.goal) setFitnessGoal(account.profile.goal);
    setBurned(getTotalCaloriesBurnedByDate(today));
    setTodayExercises(getExerciseEntriesByDate(today));
    setStreak(getExerciseStreak());
  }, [today]);

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
  const goalMet = burned >= target;

  // 今日已打卡的运动 ID 集合（用于推荐列表标记）
  const checkedInIds = new Set(todayExercises.map(e => e.exerciseId));

  const handleCheckIn = (rec: ExerciseRecommendation) => {
    if (!profile) return;
    setAddingId(rec.exercise.id);
    const calories = calculateCaloriesBurned(rec.exercise.met, profile.weight, rec.suggestedDuration);
    addExerciseEntry({
      date: today,
      exerciseId: rec.exercise.id,
      exerciseName: rec.exercise.name,
      duration: rec.suggestedDuration,
      caloriesBurned: Math.round(calories),
    });
    showToast(`✅ 打卡成功！${rec.exercise.name} ${rec.suggestedDuration}分钟，消耗 ${Math.round(calories)} 卡`, 'success');
    setJustCheckedIn(rec.exercise.id);
    setTimeout(() => { setAddingId(null); setJustCheckedIn(null); }, 1500);
    loadData();
    onExerciseAdded?.();
  };

  const handleDeleteExercise = (id: string) => {
    deleteExerciseEntry(id);
    loadData();
    onExerciseAdded?.();
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
      {/* 标题 + streak */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <span>🏃</span> 今日运动打卡
          <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            {GOAL_LABELS[fitnessGoal]}
          </span>
        </h3>
        {streak > 0 && (
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
            streak >= 7 ? 'bg-orange-100 text-orange-600' : 'bg-amber-50 text-amber-600'
          }`}>
            🔥 {streak}天连续打卡
          </div>
        )}
      </div>

      {/* 今日消耗进度条 */}
      <div className={`rounded-xl p-4 ${goalMet ? 'bg-green-50' : 'bg-orange-50'}`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-medium ${goalMet ? 'text-green-800' : 'text-orange-800'}`}>
            今日消耗目标
          </span>
          {!editingTarget ? (
            <button
              onClick={() => { setTempTarget(String(target)); setEditingTarget(true); }}
              className={`text-xs underline ${goalMet ? 'text-green-600' : 'text-orange-600'}`}
            >
              自定义
            </button>
          ) : (
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={tempTarget}
                onChange={e => setTempTarget(e.target.value)}
                className="w-16 text-xs border border-orange-300 rounded px-1.5 py-0.5 text-center focus:outline-none focus:ring-1 focus:ring-orange-400"
                autoFocus
              />
              <span className="text-xs text-orange-600">卡</span>
              <button onClick={handleSaveTarget} className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded">确定</button>
              <button onClick={() => setEditingTarget(false)} className="text-xs text-gray-400">取消</button>
            </div>
          )}
        </div>

        <div className="flex items-end gap-2 mb-2">
          <span className={`text-3xl font-bold ${goalMet ? 'text-green-600' : 'text-orange-600'}`}>{burned}</span>
          <span className={`text-sm mb-1 ${goalMet ? 'text-green-400' : 'text-orange-400'}`}>/ {target} 卡</span>
          {goalMet && (
            <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full mb-1 font-medium animate-pulse">
              🎉 已达标
            </span>
          )}
        </div>

        <div className={`w-full rounded-full h-2.5 mb-1.5 ${goalMet ? 'bg-green-100' : 'bg-orange-100'}`}>
          <div
            className={`h-2.5 rounded-full transition-all duration-700 ${goalMet ? 'bg-green-500' : 'bg-orange-500'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className={`text-xs ${goalMet ? 'text-green-700' : 'text-orange-600'}`}>
          {goalMet ? '今日运动目标已完成，继续保持！💪' : `还差 ${remaining} 卡达标，加油！`}
        </div>
      </div>

      {/* 今日已打卡运动 */}
      {todayExercises.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-700">✅ 今日已打卡</span>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{todayExercises.length} 项</span>
          </div>
          <div className="space-y-1.5">
            {todayExercises.map(ex => (
              <div
                key={ex.id}
                className="flex items-center justify-between bg-green-50 border border-green-100 rounded-lg px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-green-500 text-sm">✓</span>
                  <div>
                    <span className="text-sm font-medium text-gray-800">{ex.exerciseName}</span>
                    <span className="text-xs text-gray-400 ml-1.5">{ex.duration}分钟</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-orange-500">-{ex.caloriesBurned}卡</span>
                  <button
                    onClick={() => handleDeleteExercise(ex.id)}
                    className="text-gray-300 hover:text-red-400 transition-colors text-xs"
                    title="取消打卡"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 分类筛选 */}
      <div>
        <p className="text-xs text-gray-400 mb-2">推荐运动 · 点击打卡即记入今日消耗</p>
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
            const isJustCheckedIn = justCheckedIn === rec.exercise.id;
            const alreadyDone = checkedInIds.has(rec.exercise.id);

            return (
              <div
                key={rec.exercise.id}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 border transition-all ${
                  alreadyDone
                    ? 'bg-green-50 border-green-100'
                    : 'border-gray-100 hover:border-primary-100 hover:bg-primary-50/30'
                }`}
              >
                <div className="flex-1 min-w-0 mr-3">
                  <div className="flex items-center gap-2">
                    {alreadyDone && <span className="text-green-500 text-sm">✓</span>}
                    <span className={`font-medium text-sm ${alreadyDone ? 'text-green-700' : 'text-gray-800'}`}>
                      {rec.exercise.name}
                    </span>
                    <span className="text-xs text-gray-400">{rec.suggestedDuration}分钟</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{rec.reason}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-sm font-medium text-orange-500">-{cal}卡</span>
                  <button
                    onClick={() => handleCheckIn(rec)}
                    disabled={isAdding}
                    className={`text-xs px-3 py-1.5 rounded-lg transition-all font-medium ${
                      isJustCheckedIn
                        ? 'bg-green-500 text-white scale-95'
                        : alreadyDone
                        ? 'bg-green-100 text-green-600 hover:bg-green-200'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                  >
                    {isJustCheckedIn ? '✓ 打卡！' : alreadyDone ? '再来一次' : '打卡'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

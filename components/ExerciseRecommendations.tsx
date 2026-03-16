'use client';

import { useState, useEffect } from 'react';
import { ExerciseRecommendation, UserProfile, ExerciseCategory } from '@/types/nutrition';
import {
  getExerciseRecommendations,
  getRecommendationsByCategory,
  getAgeExerciseTips,
  getSuitabilityLabel,
  getSuitabilityColor,
} from '@/lib/exercise-recommendations';
import { EXERCISE_CATEGORY_NAMES } from '@/lib/exercises';
import { getUserProfile } from '@/lib/storage';

interface ExerciseRecommendationsProps {
  userProfile?: UserProfile | null;
  targetCalories?: number;
  maxItems?: number;
  showCategoryFilter?: boolean;
}

export default function ExerciseRecommendations({
  userProfile,
  targetCalories,
  maxItems = 6,
  showCategoryFilter = true,
}: ExerciseRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<ExerciseRecommendation[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | 'all'>('all');
  const [ageTips, setAgeTips] = useState<string[]>([]);

  useEffect(() => {
    const storedProfile = userProfile || getUserProfile();
    setProfile(storedProfile);

    // 获取运动推荐
    let recs: ExerciseRecommendation[];
    if (selectedCategory === 'all') {
      recs = getExerciseRecommendations(storedProfile, targetCalories, maxItems);
    } else {
      recs = getRecommendationsByCategory(selectedCategory, storedProfile, maxItems);
    }
    setRecommendations(recs);

    // 获取年龄相关提示
    if (storedProfile && storedProfile.age >= 50) {
      setAgeTips(getAgeExerciseTips(storedProfile.age));
    } else {
      setAgeTips([]);
    }
  }, [userProfile, targetCalories, maxItems, selectedCategory]);

  const categories: Array<{ key: ExerciseCategory | 'all'; label: string }> = [
    { key: 'all', label: '全部' },
    { key: 'cardio', label: '有氧' },
    { key: 'strength', label: '力量' },
    { key: 'flexibility', label: '柔韧' },
    { key: 'sports', label: '球类' },
    { key: 'daily', label: '日常' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
        <span className="text-xl">🏃</span>
        运动推荐
        {profile && (
          <span className="text-sm font-normal text-gray-500">
            （根据您的{profile.goal === 'lose' ? '减脂' : profile.goal === 'gain' ? '增肌' : '维持'}目标）
          </span>
        )}
      </h3>

      {/* 年龄相关提示 */}
      {ageTips.length > 0 && (
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">💪</span>
            <span className="font-medium text-purple-800">运动建议</span>
          </div>
          <ul className="text-sm text-purple-700 space-y-1">
            {ageTips.slice(0, 3).map((tip, idx) => (
              <li key={idx}>• {tip}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 分类筛选 */}
      {showCategoryFilter && (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                selectedCategory === cat.key
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* 推荐列表 */}
      <div className="grid gap-3 sm:grid-cols-2">
        {recommendations.map((rec) => (
          <ExerciseCard key={rec.exercise.id} recommendation={rec} />
        ))}
      </div>

      {recommendations.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          暂无适合的运动推荐，请调整筛选条件
        </p>
      )}

      {/* 目标消耗提示 */}
      {targetCalories && targetCalories > 0 && (
        <div className="bg-orange-50 rounded-lg p-3 text-sm text-orange-700">
          <span>🔥 </span>
          今日建议消耗 <strong>{targetCalories}</strong> 卡路里
        </div>
      )}
    </div>
  );
}

function ExerciseCard({ recommendation }: { recommendation: ExerciseRecommendation }) {
  const { exercise, reason, suggestedDuration, estimatedCalories, suitability } = recommendation;

  return (
    <div className="border border-gray-100 rounded-lg p-3 hover:border-primary-200 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs px-2 py-0.5 rounded ${getSuitabilityColor(suitability)}`}
            >
              {getSuitabilityLabel(suitability)}
            </span>
            <span className="text-xs text-gray-500">
              {EXERCISE_CATEGORY_NAMES[exercise.category]}
            </span>
          </div>
          <h4 className="font-medium text-gray-900 mt-1">{exercise.name}</h4>
        </div>
        <div className="text-right">
          <div className="text-orange-600 font-medium text-sm">
            -{estimatedCalories} 卡
          </div>
          <div className="text-xs text-gray-500">{suggestedDuration}分钟</div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-2">{exercise.description}</p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-primary-600">{reason}</span>
        <span className="text-xs text-gray-400">MET {exercise.met}</span>
      </div>
    </div>
  );
}

// 简化版组件，用于在其他地方快速展示
export function ExerciseQuickList({
  userProfile,
  maxItems = 3,
}: {
  userProfile?: UserProfile | null;
  maxItems?: number;
}) {
  const [recommendations, setRecommendations] = useState<ExerciseRecommendation[]>([]);

  useEffect(() => {
    const profile = userProfile || getUserProfile();
    const recs = getExerciseRecommendations(profile, undefined, maxItems);
    setRecommendations(recs);
  }, [userProfile, maxItems]);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {recommendations.map((rec) => (
        <span
          key={rec.exercise.id}
          className={`text-sm px-3 py-1 rounded-full ${getSuitabilityColor(rec.suitability)}`}
        >
          {rec.exercise.name} ({rec.suggestedDuration}分钟)
        </span>
      ))}
    </div>
  );
}

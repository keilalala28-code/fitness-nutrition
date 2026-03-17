'use client';

import { useMemo } from 'react';
import { DiaryEntry, MealType } from '@/types/nutrition';
import { getAllDiaryEntries, addDiaryEntry, getTodayDateString } from '@/lib/storage';
import { useToast } from '@/components/Toast';

interface RecentFoodsProps {
  onAdded: () => void;
  currentMealType: MealType;
}

export default function RecentFoods({ onAdded, currentMealType }: RecentFoodsProps) {
  const { showToast } = useToast();

  const recentFoods = useMemo(() => {
    const entries = getAllDiaryEntries();
    const today = getTodayDateString();
    const seen = new Set<string>();
    const result: DiaryEntry[] = [];

    // 从最近到最早，取不重复的5条（排除今天已记录的）
    for (const entry of [...entries].reverse()) {
      if (entry.date === today) continue;
      if (seen.has(entry.foodId)) continue;
      seen.add(entry.foodId);
      result.push(entry);
      if (result.length >= 5) break;
    }
    return result;
  }, []);

  if (recentFoods.length === 0) return null;

  const handleQuickAdd = (entry: DiaryEntry) => {
    addDiaryEntry({
      date: getTodayDateString(),
      foodId: entry.foodId,
      foodName: entry.foodName,
      grams: entry.grams,
      nutrients: entry.nutrients,
      mealType: currentMealType,
    });
    showToast(`已快速添加 ${entry.foodName}`, 'success');
    onAdded();
  };

  return (
    <div className="mt-3">
      <p className="text-xs text-gray-500 mb-2">最近吃过（点击快速添加）：</p>
      <div className="flex flex-wrap gap-2">
        {recentFoods.map(entry => (
          <button
            key={entry.id}
            onClick={() => handleQuickAdd(entry)}
            className="px-3 py-1.5 text-sm bg-green-50 hover:bg-green-100 border border-green-200 rounded-full text-green-800 transition-colors flex items-center gap-1"
          >
            <span>↩</span>
            <span>{entry.foodName}</span>
            <span className="text-green-600 text-xs">{entry.grams}g</span>
          </button>
        ))}
      </div>
    </div>
  );
}

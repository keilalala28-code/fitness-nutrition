'use client';

import { useMemo } from 'react';
import { getAllDiaryEntries, getTodayDateString } from '@/lib/storage';

interface TrendChartProps {
  targetCalories?: number;
}

export default function TrendChart({ targetCalories }: TrendChartProps) {
  const data = useMemo(() => {
    const entries = getAllDiaryEntries();
    const today = getTodayDateString();

    // 生成最近7天的日期
    const days: { date: string; label: string; calories: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayEntries = entries.filter(e => e.date === dateStr);
      const calories = Math.round(dayEntries.reduce((sum, e) => sum + e.nutrients.calories, 0));
      const label = i === 0 ? '今天' : `${d.getMonth() + 1}/${d.getDate()}`;
      days.push({ date: dateStr, label, calories });
    }
    return days;
  }, []);

  const maxCalories = Math.max(...data.map(d => d.calories), targetCalories || 0, 100);
  const chartHeight = 100;

  const hasData = data.some(d => d.calories > 0);

  if (!hasData) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">📈 近7天热量趋势</h3>
        {targetCalories && (
          <span className="text-xs text-gray-500">目标 {targetCalories} kcal</span>
        )}
      </div>

      <div className="flex items-end gap-1.5 h-28">
        {data.map((day, i) => {
          const barHeight = day.calories > 0
            ? Math.max(4, Math.round((day.calories / maxCalories) * chartHeight))
            : 0;
          const isToday = i === 6;
          const isOver = targetCalories && day.calories > targetCalories;
          const isUnder = targetCalories && day.calories > 0 && day.calories <= targetCalories;

          return (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
              {day.calories > 0 && (
                <span className="text-xs text-gray-500 leading-none">
                  {day.calories >= 1000 ? `${(day.calories / 1000).toFixed(1)}k` : day.calories}
                </span>
              )}
              <div className="w-full flex items-end justify-center" style={{ height: `${chartHeight}px` }}>
                <div
                  className={`w-full rounded-t-md transition-all ${
                    day.calories === 0
                      ? 'bg-gray-100'
                      : isOver
                      ? 'bg-red-400'
                      : isUnder
                      ? 'bg-primary-500'
                      : 'bg-primary-400'
                  } ${isToday ? 'ring-2 ring-primary-600 ring-offset-1' : ''}`}
                  style={{ height: `${barHeight}px`, minHeight: day.calories > 0 ? '4px' : '2px' }}
                />
              </div>
              <span className={`text-xs leading-none ${isToday ? 'text-primary-600 font-semibold' : 'text-gray-400'}`}>
                {day.label}
              </span>
            </div>
          );
        })}
      </div>

      {targetCalories && (
        <div className="flex gap-3 mt-3 text-xs text-gray-500 justify-end">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-primary-500 inline-block"/>达标</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-red-400 inline-block"/>超标</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-gray-100 inline-block"/>无记录</span>
        </div>
      )}
    </div>
  );
}

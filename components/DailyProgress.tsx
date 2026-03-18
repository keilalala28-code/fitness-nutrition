'use client';

import { NutrientData, UserGoals } from '@/types/nutrition';
import { getConsecutiveDays } from '@/lib/storage';
import { useEffect, useState } from 'react';

interface DailyProgressProps {
  consumed: NutrientData;
  goals: UserGoals;
}

export default function DailyProgress({ consumed, goals }: DailyProgressProps) {
  const [streak, setStreak] = useState(0);
  useEffect(() => { setStreak(getConsecutiveDays()); }, [consumed]);

  const progressItems = [
    { label: '热量', consumed: consumed.calories, goal: goals.calories, unit: 'kcal', color: 'bg-orange-500', bgColor: 'bg-orange-100' },
    { label: '蛋白质', consumed: consumed.protein, goal: goals.protein, unit: 'g', color: 'bg-red-500', bgColor: 'bg-red-100' },
    { label: '碳水', consumed: consumed.carbs, goal: goals.carbs, unit: 'g', color: 'bg-blue-500', bgColor: 'bg-blue-100' },
    { label: '脂肪', consumed: consumed.fat, goal: goals.fat, unit: 'g', color: 'bg-yellow-500', bgColor: 'bg-yellow-100' },
  ];

  // 今日总结文字
  const calPct = consumed.calories / goals.calories;
  const proteinOk = consumed.protein >= goals.protein * 0.8;
  let summaryText = '';
  let summaryColor = 'text-gray-500';
  if (consumed.calories === 0) {
    summaryText = '今天还没有记录，开始追踪吧';
  } else if (calPct > 1.1) {
    summaryText = `热量超标 ${Math.round(consumed.calories - goals.calories)} 卡，注意控制`;
    summaryColor = 'text-orange-600';
  } else if (calPct >= 0.8 && proteinOk) {
    summaryText = '热量达标，蛋白质充足，今天做得棒！';
    summaryColor = 'text-primary-600';
  } else if (!proteinOk && consumed.calories > 0) {
    summaryText = `蛋白质还差 ${Math.round(goals.protein - consumed.protein)}g，多补充优质蛋白`;
    summaryColor = 'text-red-600';
  } else {
    summaryText = `还差 ${Math.round(goals.calories - consumed.calories)} 卡达到今日目标`;
    summaryColor = 'text-blue-600';
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      {/* 标题 + 打卡 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-900">今日营养目标</h2>
        {streak > 0 && (
          <div className="flex items-center gap-1 bg-orange-50 border border-orange-200 rounded-full px-2.5 py-1">
            <span className="text-base">🔥</span>
            <span className="text-xs font-bold text-orange-600">{streak}天连续</span>
          </div>
        )}
      </div>

      {/* 今日总结 */}
      {consumed.calories > 0 && (
        <div className={`text-xs mb-4 ${summaryColor} bg-gray-50 rounded-lg px-3 py-2`}>
          {summaryText}
        </div>
      )}

      <div className="space-y-3">
        {progressItems.map((item) => {
          const percentage = Math.min((item.consumed / item.goal) * 100, 100);
          const isOver = item.consumed > item.goal;
          return (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">{item.label}</span>
                <span className={isOver ? 'text-red-600 font-semibold' : 'text-gray-600'}>
                  {item.label === '热量' ? item.consumed : item.consumed.toFixed(1)} / {item.goal} {item.unit}
                  {isOver && ' ↑'}
                </span>
              </div>
              <div className={`h-2.5 rounded-full ${item.bgColor} overflow-hidden`}>
                <div
                  className={`h-full rounded-full transition-all duration-500 ${isOver ? 'bg-red-500' : item.color}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 宏量比例 */}
      {consumed.calories > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex h-3 rounded-full overflow-hidden mb-2">
            {[
              { val: consumed.protein * 4, color: 'bg-red-500' },
              { val: consumed.carbs * 4, color: 'bg-blue-500' },
              { val: consumed.fat * 9, color: 'bg-yellow-500' },
            ].map((m, i) => (
              <div
                key={i}
                className={`${m.color} transition-all duration-300`}
                style={{ width: `${(m.val / (consumed.calories || 1)) * 100}%` }}
              />
            ))}
          </div>
          <div className="flex justify-center gap-4 text-xs text-gray-500">
            <span><span className="text-red-500">●</span> 蛋白 {consumed.calories ? Math.round(consumed.protein * 4 / consumed.calories * 100) : 0}%</span>
            <span><span className="text-blue-500">●</span> 碳水 {consumed.calories ? Math.round(consumed.carbs * 4 / consumed.calories * 100) : 0}%</span>
            <span><span className="text-yellow-500">●</span> 脂肪 {consumed.calories ? Math.round(consumed.fat * 9 / consumed.calories * 100) : 0}%</span>
          </div>
        </div>
      )}
    </div>
  );
}

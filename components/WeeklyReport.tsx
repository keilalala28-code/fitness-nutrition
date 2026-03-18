'use client';

import { useMemo } from 'react';
import { UserGoals } from '@/types/nutrition';
import { getWeeklyStats } from '@/lib/storage';

interface WeeklyReportProps {
  goals: UserGoals;
}

const DAY_NAMES = ['日', '一', '二', '三', '四', '五', '六'];

export default function WeeklyReport({ goals }: WeeklyReportProps) {
  const stats = useMemo(() => getWeeklyStats(), []);

  const daysWithData = stats.filter(s => s.calories > 0).length;
  const avgCalories = daysWithData > 0
    ? Math.round(stats.filter(s => s.calories > 0).reduce((s, d) => s + d.calories, 0) / daysWithData)
    : 0;
  const avgProtein = daysWithData > 0
    ? Math.round(stats.filter(s => s.calories > 0).reduce((s, d) => s + d.protein, 0) / daysWithData * 10) / 10
    : 0;
  const daysOnTarget = stats.filter(s =>
    s.calories >= goals.calories * 0.8 && s.calories <= goals.calories * 1.2
  ).length;

  const maxCal = Math.max(...stats.map(s => s.calories), goals.calories);

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
        <span>📊</span> 本周报告
      </h3>

      {/* 柱状图 */}
      <div className="flex items-end gap-1.5 h-24">
        {stats.map((day, i) => {
          const date = new Date(day.date);
          const dayName = DAY_NAMES[date.getDay()];
          const heightPct = maxCal > 0 ? (day.calories / maxCal) * 100 : 0;
          const onTarget = day.calories >= goals.calories * 0.8 && day.calories <= goals.calories * 1.2;
          const isToday = i === 6;
          return (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end" style={{ height: 80 }}>
                <div
                  className={`w-full rounded-t-md transition-all ${
                    day.calories === 0 ? 'bg-gray-100' :
                    onTarget ? 'bg-primary-500' :
                    day.calories > goals.calories ? 'bg-orange-400' : 'bg-blue-400'
                  } ${isToday ? 'ring-2 ring-primary-600 ring-offset-1' : ''}`}
                  style={{ height: `${Math.max(heightPct, day.calories > 0 ? 8 : 4)}%` }}
                />
              </div>
              <span className={`text-xs ${isToday ? 'font-bold text-primary-600' : 'text-gray-400'}`}>
                {dayName}
              </span>
            </div>
          );
        })}
      </div>

      {/* 目标线说明 */}
      <div className="flex gap-3 text-xs text-gray-500 flex-wrap">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-primary-500 inline-block"></span>达标</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-orange-400 inline-block"></span>超标</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-400 inline-block"></span>不足</span>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-orange-50 rounded-xl p-3 text-center">
          <div className="text-xl font-bold text-orange-600">{avgCalories}</div>
          <div className="text-xs text-gray-500">均日热量</div>
        </div>
        <div className="bg-red-50 rounded-xl p-3 text-center">
          <div className="text-xl font-bold text-red-500">{avgProtein}g</div>
          <div className="text-xs text-gray-500">均日蛋白质</div>
        </div>
        <div className="bg-primary-50 rounded-xl p-3 text-center">
          <div className="text-xl font-bold text-primary-600">{daysOnTarget}/7</div>
          <div className="text-xs text-gray-500">达标天数</div>
        </div>
      </div>

      {/* 文字总结 */}
      <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-600">
        {daysWithData === 0
          ? '本周还没有记录，开始记录吧！'
          : daysOnTarget >= 5
          ? `本周表现优秀！有${daysOnTarget}天热量达标，继续保持 🎉`
          : daysOnTarget >= 3
          ? `本周有${daysOnTarget}天达标，均日热量${avgCalories}卡，还可以更稳定`
          : `本周只有${daysOnTarget}天达标，建议提高记录一致性`}
      </div>
    </div>
  );
}

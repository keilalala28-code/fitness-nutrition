'use client';

import { NutrientData, UserGoals } from '@/types/nutrition';

interface DailyProgressProps {
  consumed: NutrientData;
  goals: UserGoals;
}

export default function DailyProgress({ consumed, goals }: DailyProgressProps) {
  const progressItems = [
    {
      label: '热量',
      consumed: consumed.calories,
      goal: goals.calories,
      unit: 'kcal',
      color: 'bg-orange-500',
      bgColor: 'bg-orange-100',
    },
    {
      label: '蛋白质',
      consumed: consumed.protein,
      goal: goals.protein,
      unit: 'g',
      color: 'bg-red-500',
      bgColor: 'bg-red-100',
    },
    {
      label: '碳水化合物',
      consumed: consumed.carbs,
      goal: goals.carbs,
      unit: 'g',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-100',
    },
    {
      label: '脂肪',
      consumed: consumed.fat,
      goal: goals.fat,
      unit: 'g',
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-100',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">今日营养目标</h2>

      <div className="space-y-4">
        {progressItems.map((item) => {
          const percentage = Math.min((item.consumed / item.goal) * 100, 100);
          const isOver = item.consumed > item.goal;

          return (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">{item.label}</span>
                <span className={isOver ? 'text-red-600 font-semibold' : 'text-gray-600'}>
                  {item.consumed} / {item.goal} {item.unit}
                  {isOver && ' (已超标)'}
                </span>
              </div>
              <div className={`h-3 rounded-full ${item.bgColor} overflow-hidden`}>
                <div
                  className={`h-full rounded-full transition-all duration-300 ${isOver ? 'bg-red-500' : item.color}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 宏量营养素比例 */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <h3 className="text-sm font-medium text-gray-700 mb-2">宏量营养素比例</h3>
        <div className="flex h-4 rounded-full overflow-hidden">
          <MacroBar
            value={consumed.protein * 4}
            total={consumed.calories || 1}
            color="bg-red-500"
            label="蛋白质"
          />
          <MacroBar
            value={consumed.carbs * 4}
            total={consumed.calories || 1}
            color="bg-blue-500"
            label="碳水"
          />
          <MacroBar
            value={consumed.fat * 9}
            total={consumed.calories || 1}
            color="bg-yellow-500"
            label="脂肪"
          />
        </div>
        <div className="flex justify-center gap-4 mt-2 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            蛋白质 {consumed.calories ? Math.round((consumed.protein * 4 / consumed.calories) * 100) : 0}%
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            碳水 {consumed.calories ? Math.round((consumed.carbs * 4 / consumed.calories) * 100) : 0}%
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
            脂肪 {consumed.calories ? Math.round((consumed.fat * 9 / consumed.calories) * 100) : 0}%
          </span>
        </div>
      </div>
    </div>
  );
}

function MacroBar({ value, total, color, label }: { value: number; total: number; color: string; label: string }) {
  const percentage = (value / total) * 100;

  return (
    <div
      className={`${color} transition-all duration-300`}
      style={{ width: `${percentage}%` }}
      title={`${label}: ${Math.round(percentage)}%`}
    />
  );
}

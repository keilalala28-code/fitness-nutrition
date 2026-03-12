'use client';

import { NutrientData, UserGoals, FoodItem, MealType } from '@/types/nutrition';
import { getSmartRecommendations } from '@/lib/recommendations';
import { CATEGORY_NAMES } from '@/lib/foods';
import { getUserInventory } from '@/lib/storage';
import { useState, useEffect } from 'react';

interface DietRecommendationsProps {
  consumed: NutrientData;
  burned: number;
  goals: UserGoals;
}

const MEAL_LABELS: Record<MealType, string> = {
  breakfast: '🌅 早餐',
  lunch: '☀️ 午餐',
  dinner: '🌙 晚餐',
  snack: '🍎 加餐',
};

const SOURCE_LABELS = {
  inventory: '📦 我的库存',
  takeout: '🛵 外卖推荐',
  homemade: '🏠 自制推荐',
};

export default function DietRecommendations({ consumed, burned, goals }: DietRecommendationsProps) {
  const [hasInventory, setHasInventory] = useState(false);

  useEffect(() => {
    const inventory = getUserInventory();
    setHasInventory(inventory.length > 0);
  }, []);

  // 计算营养缺口
  const netCalories = consumed.calories - burned;
  const deficit = {
    calories: Math.max(0, goals.calories - netCalories),
    protein: Math.max(0, goals.protein - consumed.protein),
    carbs: Math.max(0, goals.carbs - consumed.carbs),
    fat: Math.max(0, goals.fat - consumed.fat),
  };

  // 检查是否需要推荐
  const needsRecommendation = deficit.calories > 200 || deficit.protein > 15;

  // 获取智能推荐
  const recommendations = needsRecommendation
    ? getSmartRecommendations(deficit, goals.calories)
    : [];

  if (!needsRecommendation) {
    return (
      <div className="bg-green-50 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">✅</span>
          <h3 className="font-semibold text-green-800">今日营养摄入良好</h3>
        </div>
        <p className="text-sm text-green-700">
          您的营养摄入基本达标，继续保持！
        </p>
        {burned > 0 && (
          <p className="text-sm text-green-600 mt-2">
            今日运动消耗 {burned} 卡路里，做得很棒！
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
        <span className="text-xl">🍽️</span>
        智能餐食推荐
      </h3>

      {/* 营养缺口提示 */}
      <div className="bg-yellow-50 rounded-lg p-4">
        <p className="text-sm text-yellow-800 font-medium mb-2">当前营养缺口：</p>
        <div className="flex flex-wrap gap-3 text-sm">
          {deficit.calories > 200 && (
            <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">
              热量 -{Math.round(deficit.calories)} 卡
            </span>
          )}
          {deficit.protein > 10 && (
            <span className="px-2 py-1 bg-red-100 text-red-700 rounded">
              蛋白质 -{Math.round(deficit.protein)}g
            </span>
          )}
          {deficit.carbs > 30 && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
              碳水 -{Math.round(deficit.carbs)}g
            </span>
          )}
        </div>
        {burned > 0 && (
          <p className="text-xs text-yellow-700 mt-2">
            （已计入运动消耗 {burned} 卡路里）
          </p>
        )}
      </div>

      {/* 库存提示 */}
      {hasInventory && (
        <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-700 flex items-center gap-2">
          <span>📦</span>
          <span>已检测到您的食材库存，优先推荐库存食材</span>
        </div>
      )}

      {/* 餐次推荐 */}
      {recommendations.map((rec) => (
        <div key={rec.mealType} className="border border-gray-100 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 font-medium text-gray-700">
            {MEAL_LABELS[rec.mealType]}
          </div>
          <div className="p-4 space-y-3">
            {rec.combos.map((combo, idx) => (
              <ComboCard
                key={idx}
                name={combo.name}
                items={combo.items}
                totalNutrients={combo.totalNutrients}
                reason={combo.reason}
                isFirst={idx === 0}
              />
            ))}
          </div>
        </div>
      ))}

      {/* 快捷建议 */}
      <div className="pt-4 border-t border-gray-100">
        <p className="text-sm font-medium text-gray-700 mb-2">💡 今日饮食建议：</p>
        <ul className="text-sm text-gray-600 space-y-1">
          {deficit.protein > 30 && (
            <li>• 优先补充蛋白质，推荐即食鸡胸肉或轻食套餐</li>
          )}
          {deficit.calories > 500 && deficit.protein < 20 && (
            <li>• 热量缺口较大，可选择超级碗或沙县套餐饭</li>
          )}
          {deficit.carbs > 50 && (
            <li>• 碳水摄入不足，可搭配糙米或全麦面包</li>
          )}
        </ul>
      </div>
    </div>
  );
}

function ComboCard({
  name,
  items,
  totalNutrients,
  reason,
  isFirst,
}: {
  name: string;
  items: Array<{ food: FoodItem; grams: number; source: 'inventory' | 'takeout' | 'homemade' }>;
  totalNutrients: NutrientData;
  reason: string;
  isFirst: boolean;
}) {
  const sourceType = items[0]?.source || 'takeout';

  return (
    <div className={`p-3 rounded-lg ${isFirst ? 'bg-primary-50 border border-primary-200' : 'bg-gray-50'}`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-2">
            {isFirst && <span className="text-xs bg-primary-600 text-white px-2 py-0.5 rounded">推荐</span>}
            <span className="text-xs text-gray-500">{SOURCE_LABELS[sourceType]}</span>
          </div>
          <h4 className="font-medium text-gray-900 mt-1">{name}</h4>
        </div>
        <div className="text-right text-sm">
          <div className="text-orange-600 font-medium">{totalNutrients.calories} 卡</div>
          <div className="text-gray-500">蛋白质 {totalNutrients.protein}g</div>
        </div>
      </div>

      {/* 组合详情 */}
      <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-2">
        {items.map((item, idx) => (
          <span key={idx} className="bg-white px-2 py-1 rounded border border-gray-200">
            {item.food.name} {item.grams}g
          </span>
        ))}
      </div>

      <p className="text-xs text-gray-500">{reason}</p>
    </div>
  );
}

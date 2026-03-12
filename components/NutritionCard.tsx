'use client';

import { NutrientData } from '@/types/nutrition';

interface NutritionCardProps {
  nutrients: NutrientData;
  showDetails?: boolean;
}

export default function NutritionCard({ nutrients, showDetails = false }: NutritionCardProps) {
  const mainNutrients = [
    { label: '热量', value: nutrients.calories, unit: 'kcal', color: 'bg-orange-500' },
    { label: '蛋白质', value: nutrients.protein, unit: 'g', color: 'bg-red-500' },
    { label: '碳水', value: nutrients.carbs, unit: 'g', color: 'bg-blue-500' },
    { label: '脂肪', value: nutrients.fat, unit: 'g', color: 'bg-yellow-500' },
  ];

  const detailNutrients = [
    { label: '膳食纤维', value: nutrients.fiber, unit: 'g' },
    { label: '糖', value: nutrients.sugar, unit: 'g' },
    { label: '钠', value: nutrients.sodium, unit: 'mg' },
    { label: '胆固醇', value: nutrients.cholesterol, unit: 'mg' },
    { label: '饱和脂肪', value: nutrients.saturatedFat, unit: 'g' },
  ].filter(n => n.value !== undefined && n.value > 0);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      {/* 主要营养素 */}
      <div className="grid grid-cols-4 gap-4">
        {mainNutrients.map((nutrient) => (
          <div key={nutrient.label} className="text-center">
            <div className={`w-12 h-12 mx-auto rounded-full ${nutrient.color} flex items-center justify-center text-white font-bold mb-2`}>
              {nutrient.label[0]}
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {nutrient.value}
              <span className="text-xs text-gray-500 ml-1">{nutrient.unit}</span>
            </div>
            <div className="text-xs text-gray-500">{nutrient.label}</div>
          </div>
        ))}
      </div>

      {/* 详细营养素 */}
      {showDetails && detailNutrients.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {detailNutrients.map((nutrient) => (
              <div key={nutrient.label} className="flex justify-between text-sm">
                <span className="text-gray-600">{nutrient.label}</span>
                <span className="font-medium">
                  {nutrient.value}{nutrient.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useMemo, useCallback } from 'react';
import { FoodItem, MealType, NutrientData } from '@/types/nutrition';
import { searchFoods, CATEGORY_NAMES } from '@/lib/foods';
import { addDiaryEntry, getTodayDateString } from '@/lib/storage';
import { useToast } from '@/components/Toast';

interface FoodSearchProps {
  onFoodAdded?: () => void;
}

const MEAL_TYPES: { value: MealType; label: string }[] = [
  { value: 'breakfast', label: '早餐' },
  { value: 'lunch', label: '午餐' },
  { value: 'dinner', label: '晚餐' },
  { value: 'snack', label: '加餐' },
];

// 热门搜索关键词
const HOT_SEARCHES = [
  '鸡胸肉', '牛肉', '米饭', '鸡蛋',
  '奶茶', '咖啡', '沙拉', '外卖',
  '火锅', '烧烤', '麦当劳', '瑞幸'
];

export default function FoodSearch({ onFoodAdded }: FoodSearchProps) {
  const { showToast } = useToast();
  const [query, setQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [grams, setGrams] = useState<number>(100);
  const [mealType, setMealType] = useState<MealType>('lunch');

  // 缓存搜索结果，仅在 query 变化时重新计算
  const results = useMemo(() => {
    if (query.trim().length === 0) return [];
    return searchFoods(query).slice(0, 30);
  }, [query]);

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    setSelectedFood(null);
  }, []);

  const handleSelectFood = useCallback((food: FoodItem) => {
    setSelectedFood(food);
    setGrams(food.servingSize);
  }, []);

  // 根据克数计算营养素（useMemo 避免重复计算）
  const calculatedNutrients = useMemo((): NutrientData | null => {
    if (!selectedFood) return null;
    const ratio = grams / 100;
    return {
      calories: Math.round(selectedFood.nutrients.calories * ratio),
      protein: Math.round(selectedFood.nutrients.protein * ratio * 10) / 10,
      carbs: Math.round(selectedFood.nutrients.carbs * ratio * 10) / 10,
      fat: Math.round(selectedFood.nutrients.fat * ratio * 10) / 10,
      fiber: selectedFood.nutrients.fiber ? Math.round(selectedFood.nutrients.fiber * ratio * 10) / 10 : undefined,
      sugar: selectedFood.nutrients.sugar ? Math.round(selectedFood.nutrients.sugar * ratio * 10) / 10 : undefined,
      sodium: selectedFood.nutrients.sodium ? Math.round(selectedFood.nutrients.sodium * ratio) : undefined,
    };
  }, [selectedFood, grams]);

  const handleAddFood = useCallback(() => {
    if (!selectedFood || !calculatedNutrients) return;

    addDiaryEntry({
      date: getTodayDateString(),
      foodId: selectedFood.id,
      foodName: selectedFood.name + (selectedFood.brand ? ` (${selectedFood.brand})` : ''),
      grams,
      nutrients: calculatedNutrients,
      mealType,
    });

    showToast(`已添加 ${selectedFood.name} 到今日饮食`, 'success');

    // 重置状态
    setSelectedFood(null);
    setGrams(100);
    setQuery('');

    onFoodAdded?.();
  }, [selectedFood, calculatedNutrients, grams, mealType, onFoodAdded, showToast]);

  return (
    <div className="space-y-4">
      {/* 搜索框 */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="搜索食物（如：鸡胸肉、奶茶、麦当劳...）"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
        />
        {query && (
          <button
            onClick={() => handleSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* 热门搜索 */}
      {!query && !selectedFood && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-500">热门搜索：</span>
          {HOT_SEARCHES.map((term) => (
            <button
              key={term}
              onClick={() => handleSearch(term)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      )}

      {/* 选中的食物 - 添加表单 */}
      {selectedFood && (
        <div className="p-4 bg-primary-50 rounded-xl border border-primary-200">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-primary-800 text-lg">
                {selectedFood.name}
              </h3>
              {selectedFood.brand && (
                <span className="text-sm text-primary-600">{selectedFood.brand}</span>
              )}
              <span className="ml-2 text-xs px-2 py-0.5 bg-primary-100 rounded-full text-primary-700">
                {CATEGORY_NAMES[selectedFood.category]}
              </span>
            </div>
            <button
              onClick={() => setSelectedFood(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {/* 每100g营养信息 */}
          <p className="text-sm text-gray-600 mb-4">
            每100g：{selectedFood.nutrients.calories}卡 |
            蛋白质{selectedFood.nutrients.protein}g |
            碳水{selectedFood.nutrients.carbs}g |
            脂肪{selectedFood.nutrients.fat}g
          </p>

          <div className="flex flex-wrap gap-4 items-end">
            {/* 克数输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                摄入量（克）
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={grams}
                  onChange={(e) => setGrams(Math.max(1, parseInt(e.target.value) || 0))}
                  min="1"
                  step="10"
                  inputMode="numeric"
                  className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-center"
                />
                <span className="text-gray-500">g</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                建议份量：{selectedFood.servingUnit}
              </p>
            </div>

            {/* 快捷份量按钮 */}
            <div className="flex gap-2">
              {[50, 100, 150, 200].map((g) => (
                <button
                  key={g}
                  onClick={() => setGrams(g)}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    grams === g
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {g}g
                </button>
              ))}
              <button
                onClick={() => setGrams(selectedFood.servingSize)}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
              >
                1份
              </button>
            </div>

            {/* 餐次选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                餐次
              </label>
              <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value as MealType)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {MEAL_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 计算后的营养素 */}
          {calculatedNutrients && (
            <div className="mt-4 p-3 bg-white rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">
                实际摄入（{grams}g）：
              </p>
              <div className="flex gap-4 text-sm">
                <span className="text-orange-600 font-semibold">
                  {calculatedNutrients.calories} 卡
                </span>
                <span className="text-red-600">
                  蛋白质 {calculatedNutrients.protein}g
                </span>
                <span className="text-blue-600">
                  碳水 {calculatedNutrients.carbs}g
                </span>
                <span className="text-yellow-600">
                  脂肪 {calculatedNutrients.fat}g
                </span>
              </div>
            </div>
          )}

          <button
            onClick={handleAddFood}
            className="mt-4 w-full py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            添加到今日饮食
          </button>
        </div>
      )}

      {/* 搜索结果列表 */}
      {!selectedFood && results.length > 0 && (
        <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden max-h-96 overflow-y-auto">
          {results.map((food) => (
            <button
              key={food.id}
              onClick={() => handleSelectFood(food)}
              className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-medium text-gray-900">{food.name}</span>
                  {food.brand && (
                    <span className="ml-2 text-sm text-gray-500">{food.brand}</span>
                  )}
                  <span className="ml-2 text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                    {CATEGORY_NAMES[food.category]}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                每100g：{food.nutrients.calories}卡 |
                蛋白质{food.nutrients.protein}g |
                碳水{food.nutrients.carbs}g |
                脂肪{food.nutrients.fat}g
              </div>
            </button>
          ))}
        </div>
      )}

      {/* 无结果提示 */}
      {query && results.length === 0 && (
        <div className="p-6 text-center text-gray-500 bg-gray-50 rounded-lg">
          未找到 &quot;{query}&quot; 相关的食物
          <p className="text-sm mt-1">试试其他关键词，如：鸡肉、米饭、咖啡</p>
        </div>
      )}
    </div>
  );
}

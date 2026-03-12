'use client';

import { useState } from 'react';
import FoodSearch from '@/components/FoodSearch';
import { ALL_FOODS, CATEGORY_NAMES, getFoodsByCategory, getAllBrands, getFoodsByBrand } from '@/lib/foods';

export default function SearchPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const brands = getAllBrands();
  const categories = Object.keys(CATEGORY_NAMES);

  const filteredFoods = selectedCategory
    ? getFoodsByCategory(selectedCategory)
    : selectedBrand
    ? getFoodsByBrand(selectedBrand)
    : [];

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">食物搜索</h1>
        <p className="text-gray-600 mt-1">
          搜索 {ALL_FOODS.length}+ 种中国常见食物的营养数据
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <FoodSearch />
      </div>

      {/* 品牌快捷选择 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-semibold text-gray-900 mb-3">☕ 热门品牌</h3>
        <div className="flex flex-wrap gap-2">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => {
                setSelectedBrand(selectedBrand === brand ? null : brand);
                setSelectedCategory(null);
              }}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                selectedBrand === brand
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* 分类快捷选择 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-semibold text-gray-900 mb-3">📂 按分类浏览</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(selectedCategory === cat ? null : cat);
                setSelectedBrand(null);
              }}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {CATEGORY_NAMES[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* 筛选结果 */}
      {(selectedCategory || selectedBrand) && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900">
              {selectedBrand || CATEGORY_NAMES[selectedCategory!]} ({filteredFoods.length})
            </h3>
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              清除筛选
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
            {filteredFoods.map((food) => (
              <div
                key={food.id}
                className="p-3 bg-gray-50 rounded-lg"
              >
                <div className="font-medium text-gray-900">{food.name}</div>
                {food.brand && (
                  <div className="text-xs text-gray-500">{food.brand}</div>
                )}
                <div className="text-sm text-gray-600 mt-1">
                  每100g：{food.nutrients.calories}卡 |
                  蛋白质{food.nutrients.protein}g |
                  碳水{food.nutrients.carbs}g
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 数据来源说明 */}
      <div className="bg-blue-50 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-2">📊 数据来源</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• 基础食材：《中国食物成分表》（标准版第6版）</li>
          <li>• 品牌饮品：各品牌官方公示营养信息</li>
          <li>• 外卖菜品：美团/饿了么商家数据及第三方检测</li>
          <li>• 快餐食品：麦当劳、肯德基官方营养表</li>
        </ul>
        <p className="text-xs text-blue-600 mt-2">
          * 数据仅供参考，实际营养含量可能因做法、份量而异
        </p>
      </div>
    </div>
  );
}

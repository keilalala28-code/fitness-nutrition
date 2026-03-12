'use client';

import { useState, useEffect } from 'react';
import { UserInventoryItem, FoodCategory } from '@/types/nutrition';
import { getUserInventory, addToInventory, removeFromInventory, updateInventoryItem } from '@/lib/storage';
import { searchFoods, CATEGORY_NAMES } from '@/lib/foods';

interface InventoryManagerProps {
  onUpdate?: () => void;
}

export default function InventoryManager({ onUpdate }: InventoryManagerProps) {
  const [inventory, setInventory] = useState<UserInventoryItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchFoods>>([]);
  const [customMode, setCustomMode] = useState(false);

  // 自定义食材表单
  const [customFood, setCustomFood] = useState({
    name: '',
    brand: '',
    category: 'takeout' as FoodCategory,
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    quantity: '1',
  });

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = () => {
    setInventory(getUserInventory());
    onUpdate?.();
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      setSearchResults(searchFoods(query).slice(0, 10));
    } else {
      setSearchResults([]);
    }
  };

  const handleAddFromSearch = (food: ReturnType<typeof searchFoods>[0]) => {
    addToInventory({
      foodId: food.id,
      foodName: food.name,
      brand: food.brand,
      category: food.category,
      nutrients: food.nutrients,
      quantity: 1,
      tags: food.tags,
    });
    setSearchQuery('');
    setSearchResults([]);
    loadInventory();
  };

  const handleAddCustom = () => {
    if (!customFood.name || !customFood.calories) return;

    addToInventory({
      foodId: `custom-${Date.now()}`,
      foodName: customFood.name,
      brand: customFood.brand || undefined,
      category: customFood.category,
      nutrients: {
        calories: parseFloat(customFood.calories) || 0,
        protein: parseFloat(customFood.protein) || 0,
        carbs: parseFloat(customFood.carbs) || 0,
        fat: parseFloat(customFood.fat) || 0,
      },
      quantity: parseInt(customFood.quantity) || 1,
      tags: [customFood.name, customFood.brand].filter(Boolean),
    });

    setCustomFood({
      name: '',
      brand: '',
      category: 'takeout',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      quantity: '1',
    });
    setCustomMode(false);
    loadInventory();
  };

  const handleRemove = (id: string) => {
    if (confirm('确定要从库存中删除这个食材吗？')) {
      removeFromInventory(id);
      loadInventory();
    }
  };

  const handleQuantityChange = (id: string, delta: number) => {
    const item = inventory.find(i => i.id === id);
    if (!item) return;

    const newQuantity = Math.max(0, item.quantity + delta);
    if (newQuantity === 0) {
      handleRemove(id);
    } else {
      updateInventoryItem(id, { quantity: newQuantity });
      loadInventory();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <span>📦</span> 我的食材库存
        </h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-sm px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          {showAddForm ? '收起' : '+ 添加食材'}
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        录入您手边的食材和即食食品，推荐时会优先展示
      </p>

      {/* 添加表单 */}
      {showAddForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          {/* 模式切换 */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setCustomMode(false)}
              className={`px-3 py-1.5 rounded-lg text-sm ${!customMode ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              从食物库搜索
            </button>
            <button
              onClick={() => setCustomMode(true)}
              className={`px-3 py-1.5 rounded-lg text-sm ${customMode ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              自定义录入
            </button>
          </div>

          {!customMode ? (
            /* 搜索模式 */
            <div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="搜索食物添加到库存..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {searchResults.length > 0 && (
                <div className="mt-2 max-h-60 overflow-y-auto">
                  {searchResults.map((food) => (
                    <div
                      key={food.id}
                      onClick={() => handleAddFromSearch(food)}
                      className="p-3 hover:bg-gray-100 cursor-pointer rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <span className="font-medium">{food.name}</span>
                        {food.brand && <span className="text-gray-500 text-sm ml-2">({food.brand})</span>}
                      </div>
                      <span className="text-sm text-gray-500">
                        {food.nutrients.calories}卡/100g
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* 自定义录入模式 */
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={customFood.name}
                  onChange={(e) => setCustomFood({ ...customFood, name: e.target.value })}
                  placeholder="食物名称 *"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <input
                  type="text"
                  value={customFood.brand}
                  onChange={(e) => setCustomFood({ ...customFood, brand: e.target.value })}
                  placeholder="品牌（可选）"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <select
                value={customFood.category}
                onChange={(e) => setCustomFood({ ...customFood, category: e.target.value as FoodCategory })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {Object.entries(CATEGORY_NAMES).map(([key, name]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>

              <p className="text-xs text-gray-500">每100g营养成分：</p>
              <div className="grid grid-cols-4 gap-2">
                <input
                  type="number"
                  value={customFood.calories}
                  onChange={(e) => setCustomFood({ ...customFood, calories: e.target.value })}
                  placeholder="热量(卡) *"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
                <input
                  type="number"
                  value={customFood.protein}
                  onChange={(e) => setCustomFood({ ...customFood, protein: e.target.value })}
                  placeholder="蛋白质(g)"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
                <input
                  type="number"
                  value={customFood.carbs}
                  onChange={(e) => setCustomFood({ ...customFood, carbs: e.target.value })}
                  placeholder="碳水(g)"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
                <input
                  type="number"
                  value={customFood.fat}
                  onChange={(e) => setCustomFood({ ...customFood, fat: e.target.value })}
                  placeholder="脂肪(g)"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">数量：</span>
                <input
                  type="number"
                  value={customFood.quantity}
                  onChange={(e) => setCustomFood({ ...customFood, quantity: e.target.value })}
                  min="1"
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
                <span className="text-sm text-gray-500">份</span>
              </div>

              <button
                onClick={handleAddCustom}
                disabled={!customFood.name || !customFood.calories}
                className="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                添加到库存
              </button>
            </div>
          )}
        </div>
      )}

      {/* 库存列表 */}
      {inventory.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">📭</div>
          <p>库存为空，添加您的食材吧</p>
          <p className="text-sm mt-1">推荐时会优先展示您库存中的食材</p>
        </div>
      ) : (
        <div className="space-y-2">
          {inventory.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <div className="font-medium text-gray-900">{item.foodName}</div>
                {item.brand && (
                  <span className="text-xs text-gray-500">{item.brand}</span>
                )}
                <div className="text-xs text-gray-500 mt-1">
                  {item.nutrients.calories}卡 | 蛋白质{item.nutrients.protein}g
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="w-7 h-7 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, 1)}
                  className="w-7 h-7 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

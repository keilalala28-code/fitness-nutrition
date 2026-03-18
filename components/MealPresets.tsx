'use client';

import { useState, useEffect } from 'react';
import { MealPreset, MealType, DiaryEntry } from '@/types/nutrition';
import { getMealPresets, saveMealPreset, deleteMealPreset, addDiaryEntry, getTodayDateString } from '@/lib/storage';
import { useToast } from '@/components/Toast';

const MEAL_LABELS: Record<MealType, string> = {
  breakfast: '早餐', lunch: '午餐', dinner: '晚餐', snack: '加餐',
};

interface MealPresetsProps {
  todayEntries: DiaryEntry[];
  onAdded: () => void;
}

export default function MealPresets({ todayEntries, onAdded }: MealPresetsProps) {
  const { showToast } = useToast();
  const [presets, setPresets] = useState<MealPreset[]>([]);
  const [savingMeal, setSavingMeal] = useState<MealType | null>(null);
  const [presetName, setPresetName] = useState('');

  const load = () => setPresets(getMealPresets());
  useEffect(() => { load(); }, []);

  const handleSave = () => {
    if (!savingMeal || !presetName.trim()) return;
    const mealItems = todayEntries
      .filter(e => e.mealType === savingMeal)
      .map(e => ({
        foodId: e.foodId,
        foodName: e.foodName,
        grams: e.grams,
        nutrients: e.nutrients,
      }));
    if (mealItems.length === 0) {
      showToast('该餐次还没有记录', 'error');
      return;
    }
    saveMealPreset(presetName.trim(), mealItems);
    showToast(`套餐"${presetName}"已保存`, 'success');
    setPresetName('');
    setSavingMeal(null);
    load();
  };

  const handleApply = (preset: MealPreset, mealType: MealType) => {
    const today = getTodayDateString();
    for (const item of preset.items) {
      addDiaryEntry({
        date: today,
        foodId: item.foodId,
        foodName: item.foodName,
        grams: item.grams,
        nutrients: item.nutrients,
        mealType,
      });
    }
    showToast(`已添加套餐"${preset.name}"到${MEAL_LABELS[mealType]}`, 'success');
    onAdded();
  };

  const handleDelete = (id: string) => {
    deleteMealPreset(id);
    load();
  };

  const mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <span>⭐</span> 常用套餐
        </h3>
        <div className="relative">
          <select
            value={savingMeal || ''}
            onChange={e => { setSavingMeal(e.target.value as MealType || null); setPresetName(''); }}
            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 focus:outline-none"
          >
            <option value="">保存当前餐次...</option>
            {mealTypes.map(m => (
              <option key={m} value={m}>{MEAL_LABELS[m]}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 保存套餐表单 */}
      {savingMeal && (
        <div className="flex gap-2 p-3 bg-yellow-50 rounded-lg">
          <input
            type="text"
            value={presetName}
            onChange={e => setPresetName(e.target.value)}
            placeholder={`套餐名称，如"我的${MEAL_LABELS[savingMeal]}"`}
            className="flex-1 border border-yellow-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none"
            autoFocus
          />
          <button onClick={handleSave} className="px-3 py-1.5 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600">保存</button>
          <button onClick={() => setSavingMeal(null)} className="px-3 py-1.5 text-gray-400 hover:text-gray-600 text-sm">取消</button>
        </div>
      )}

      {/* 套餐列表 */}
      {presets.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-2">还没有套餐，选择一个餐次保存吧</p>
      ) : (
        <div className="space-y-2">
          {presets.map(preset => (
            <div key={preset.id} className="border border-gray-100 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm text-gray-800">{preset.name}</span>
                <button onClick={() => handleDelete(preset.id)} className="text-gray-300 hover:text-red-500 text-xs">删除</button>
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {preset.items.map((item, i) => (
                  <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {item.foodName} {item.grams}g
                  </span>
                ))}
              </div>
              <div className="flex gap-1.5">
                {mealTypes.map(m => (
                  <button
                    key={m}
                    onClick={() => handleApply(preset, m)}
                    className="flex-1 py-1 text-xs bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors"
                  >
                    加到{MEAL_LABELS[m]}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

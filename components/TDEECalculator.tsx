'use client';

import { useState, useEffect } from 'react';
import { UserProfile, ActivityLevel, FitnessGoal, UserGoals } from '@/types/nutrition';
import {
  calculateBMR,
  calculateTDEE,
  calculateDailyGoals,
  calculateProteinNeeds,
  ACTIVITY_DESCRIPTIONS,
  GOAL_DESCRIPTIONS,
} from '@/lib/formulas';
import { getUserProfile, saveUserProfile, saveUserGoals } from '@/lib/storage';

interface TDEECalculatorProps {
  onGoalsCalculated?: (goals: UserGoals) => void;
}

export default function TDEECalculator({ onGoalsCalculated }: TDEECalculatorProps) {
  const [profile, setProfile] = useState<UserProfile>({
    gender: 'male',
    age: 25,
    height: 170,
    weight: 70,
    activityLevel: 'moderate',
    goal: 'maintain',
  });

  const [results, setResults] = useState<{
    bmr: number;
    tdee: number;
    goals: UserGoals;
    proteinNeeds: { min: number; max: number };
  } | null>(null);

  // 加载保存的用户资料
  useEffect(() => {
    const savedProfile = getUserProfile();
    if (savedProfile) {
      setProfile(savedProfile);
    }
  }, []);

  const handleCalculate = () => {
    const bmr = calculateBMR(profile);
    const tdee = calculateTDEE(profile);
    const goals = calculateDailyGoals(profile);
    const proteinNeeds = calculateProteinNeeds(profile.weight, profile.goal);

    setResults({ bmr: Math.round(bmr), tdee, goals, proteinNeeds });

    // 保存用户资料和目标
    saveUserProfile(profile);
    saveUserGoals(goals);

    onGoalsCalculated?.(goals);
  };

  const handleInputChange = (field: keyof UserProfile, value: string | number) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">TDEE 计算器</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 性别 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">性别</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={profile.gender === 'male'}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="mr-2"
              />
              男性
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={profile.gender === 'female'}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="mr-2"
              />
              女性
            </label>
          </div>
        </div>

        {/* 年龄 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">年龄</label>
          <input
            type="number"
            value={profile.age}
            onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
            min="10"
            max="100"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* 身高 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">身高 (cm)</label>
          <input
            type="number"
            value={profile.height}
            onChange={(e) => handleInputChange('height', parseInt(e.target.value) || 0)}
            min="100"
            max="250"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* 体重 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">体重 (kg)</label>
          <input
            type="number"
            value={profile.weight}
            onChange={(e) => handleInputChange('weight', parseInt(e.target.value) || 0)}
            min="30"
            max="200"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* 活动水平 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">活动水平</label>
          <select
            value={profile.activityLevel}
            onChange={(e) => handleInputChange('activityLevel', e.target.value as ActivityLevel)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {(Object.keys(ACTIVITY_DESCRIPTIONS) as ActivityLevel[]).map((level) => (
              <option key={level} value={level}>
                {ACTIVITY_DESCRIPTIONS[level]}
              </option>
            ))}
          </select>
        </div>

        {/* 健身目标 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">健身目标</label>
          <select
            value={profile.goal}
            onChange={(e) => handleInputChange('goal', e.target.value as FitnessGoal)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {(Object.keys(GOAL_DESCRIPTIONS) as FitnessGoal[]).map((goal) => (
              <option key={goal} value={goal}>
                {GOAL_DESCRIPTIONS[goal]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="mt-6 w-full py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
      >
        计算
      </button>

      {/* 计算结果 */}
      {results && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-4">计算结果</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-white rounded-lg text-center">
              <div className="text-sm text-gray-500">基础代谢率 (BMR)</div>
              <div className="text-2xl font-bold text-gray-900">{results.bmr}</div>
              <div className="text-sm text-gray-500">kcal/天</div>
            </div>
            <div className="p-4 bg-white rounded-lg text-center">
              <div className="text-sm text-gray-500">每日总消耗 (TDEE)</div>
              <div className="text-2xl font-bold text-primary-600">{results.tdee}</div>
              <div className="text-sm text-gray-500">kcal/天</div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg mb-4">
            <div className="text-sm text-gray-500 mb-2">推荐每日摄入目标</div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <div className="text-lg font-bold text-orange-600">{results.goals.calories}</div>
                <div className="text-xs text-gray-500">热量 kcal</div>
              </div>
              <div>
                <div className="text-lg font-bold text-red-600">{results.goals.protein}g</div>
                <div className="text-xs text-gray-500">蛋白质</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-600">{results.goals.carbs}g</div>
                <div className="text-xs text-gray-500">碳水</div>
              </div>
              <div>
                <div className="text-lg font-bold text-yellow-600">{results.goals.fat}g</div>
                <div className="text-xs text-gray-500">脂肪</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-primary-50 rounded-lg">
            <div className="text-sm text-primary-800">
              <strong>蛋白质建议：</strong>
              根据您的体重和目标，建议每日摄入 <strong>{results.proteinNeeds.min}-{results.proteinNeeds.max}g</strong> 蛋白质
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            * 计算使用 Mifflin-St Jeor 公式，这是目前研究证明最准确的BMR计算公式
          </p>
        </div>
      )}
    </div>
  );
}

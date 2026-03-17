'use client';

import { useState } from 'react';
import { ActivityLevel, FitnessGoal, UserProfile } from '@/types/nutrition';
import { calculateDailyGoals, calculateTDEE, calculateBMR } from '@/lib/formulas';
import { createUserAccount } from '@/lib/storage';
import { useToast } from '@/components/Toast';

interface OnboardingModalProps {
  onComplete: () => void;
}

const ACTIVITY_OPTIONS: { value: ActivityLevel; label: string; desc: string }[] = [
  { value: 'sedentary', label: '久坐', desc: '办公室工作，几乎不运动' },
  { value: 'light', label: '轻度', desc: '每周运动1-3天' },
  { value: 'moderate', label: '中度', desc: '每周运动3-5天' },
  { value: 'active', label: '活跃', desc: '每周运动6-7天' },
  { value: 'veryActive', label: '非常活跃', desc: '每天高强度运动' },
];

const GOAL_OPTIONS: { value: FitnessGoal; label: string; desc: string; emoji: string }[] = [
  { value: 'lose', label: '减脂', desc: '减少体脂，塑造身形', emoji: '🔥' },
  { value: 'maintain', label: '维持', desc: '保持当前体重和体型', emoji: '⚖️' },
  { value: 'gain', label: '增肌', desc: '增加肌肉量，提升力量', emoji: '💪' },
];

export default function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    gender: 'male' as 'male' | 'female',
    age: '',
    height: '',
    weight: '',
    activityLevel: 'moderate' as ActivityLevel,
    goal: 'maintain' as FitnessGoal,
  });

  const profile: UserProfile = {
    gender: form.gender,
    age: parseInt(form.age) || 25,
    height: parseFloat(form.height) || 170,
    weight: parseFloat(form.weight) || 65,
    activityLevel: form.activityLevel,
    goal: form.goal,
  };

  const bmr = Math.round(calculateBMR(profile));
  const tdee = calculateTDEE(profile);
  const goals = calculateDailyGoals(profile);

  const handleStep1Next = () => {
    if (!form.name.trim()) { showToast('请输入您的昵称', 'warning'); return; }
    if (!form.age || parseInt(form.age) < 10 || parseInt(form.age) > 100) { showToast('请输入有效的年龄（10-100）', 'warning'); return; }
    if (!form.height || parseFloat(form.height) < 100 || parseFloat(form.height) > 250) { showToast('请输入有效的身高（100-250cm）', 'warning'); return; }
    if (!form.weight || parseFloat(form.weight) < 30 || parseFloat(form.weight) > 300) { showToast('请输入有效的体重（30-300kg）', 'warning'); return; }
    setStep(2);
  };

  const handleComplete = () => {
    const goals = calculateDailyGoals(profile);
    createUserAccount(form.name.trim(), profile, goals);
    showToast(`欢迎，${form.name}！您的目标已设置`, 'success');
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* 进度条 */}
        <div className="flex gap-1 p-4 pb-0">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`flex-1 h-1.5 rounded-full transition-colors ${
                s <= step ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <div className="p-6">
          {/* Step 1：基本信息 */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">欢迎使用健康管理</h2>
                <p className="text-sm text-gray-500 mt-1">填写基本信息，生成专属营养目标</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">您的昵称</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="叫我..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">性别</label>
                <div className="grid grid-cols-2 gap-3">
                  {[{ value: 'male', label: '男性', emoji: '👨' }, { value: 'female', label: '女性', emoji: '👩' }].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setForm({ ...form, gender: opt.value as 'male' | 'female' })}
                      className={`py-3 rounded-xl border-2 font-medium flex items-center justify-center gap-2 transition-colors ${
                        form.gender === opt.value
                          ? 'border-primary-600 bg-primary-50 text-primary-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <span>{opt.emoji}</span> {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">年龄</label>
                  <input
                    type="number"
                    value={form.age}
                    onChange={e => setForm({ ...form, age: e.target.value })}
                    placeholder="25"
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-center"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">身高(cm)</label>
                  <input
                    type="number"
                    value={form.height}
                    onChange={e => setForm({ ...form, height: e.target.value })}
                    placeholder="170"
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-center"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">体重(kg)</label>
                  <input
                    type="number"
                    value={form.weight}
                    onChange={e => setForm({ ...form, weight: e.target.value })}
                    placeholder="65"
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-center"
                  />
                </div>
              </div>

              <button
                onClick={handleStep1Next}
                className="w-full py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors text-lg"
              >
                下一步 →
              </button>
            </div>
          )}

          {/* Step 2：活动水平 + 目标 */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">设置您的目标</h2>
                <p className="text-sm text-gray-500 mt-1">这将影响您的每日营养建议</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">活动水平</label>
                <div className="space-y-2">
                  {ACTIVITY_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setForm({ ...form, activityLevel: opt.value })}
                      className={`w-full px-4 py-3 rounded-xl border-2 text-left transition-colors ${
                        form.activityLevel === opt.value
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`font-medium ${form.activityLevel === opt.value ? 'text-primary-700' : 'text-gray-800'}`}>
                        {opt.label}
                      </div>
                      <div className="text-xs text-gray-500">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">健康目标</label>
                <div className="grid grid-cols-3 gap-2">
                  {GOAL_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setForm({ ...form, goal: opt.value })}
                      className={`py-3 px-2 rounded-xl border-2 text-center transition-colors ${
                        form.goal === opt.value
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl">{opt.emoji}</div>
                      <div className={`font-medium text-sm mt-1 ${form.goal === opt.value ? 'text-primary-700' : 'text-gray-800'}`}>
                        {opt.label}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50"
                >
                  ← 返回
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-2 flex-grow py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700"
                >
                  查看结果 →
                </button>
              </div>
            </div>
          )}

          {/* Step 3：结果展示 */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">🎉 {form.name}，您的专属目标</h2>
                <p className="text-sm text-gray-500 mt-1">基于 Mifflin-St Jeor 公式计算</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-xs text-gray-500 mb-1">基础代谢 BMR</div>
                  <div className="text-2xl font-bold text-gray-900">{bmr}</div>
                  <div className="text-xs text-gray-400">kcal/天</div>
                </div>
                <div className="bg-primary-50 rounded-xl p-4 text-center">
                  <div className="text-xs text-gray-500 mb-1">每日消耗 TDEE</div>
                  <div className="text-2xl font-bold text-primary-600">{tdee}</div>
                  <div className="text-xs text-gray-400">kcal/天</div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="text-sm font-medium text-gray-700 mb-3">每日营养目标</div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div>
                    <div className="text-xl font-bold text-orange-500">{goals.calories}</div>
                    <div className="text-xs text-gray-500">热量</div>
                    <div className="text-xs text-gray-400">kcal</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-red-500">{goals.protein}g</div>
                    <div className="text-xs text-gray-500">蛋白质</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-blue-500">{goals.carbs}g</div>
                    <div className="text-xs text-gray-500">碳水</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-yellow-500">{goals.fat}g</div>
                    <div className="text-xs text-gray-500">脂肪</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50"
                >
                  ← 调整
                </button>
                <button
                  onClick={handleComplete}
                  className="flex-2 flex-grow py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 text-lg"
                >
                  开始记录 🚀
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

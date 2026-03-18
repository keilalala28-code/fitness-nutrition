'use client';

import { useState, useEffect, useCallback } from 'react';
import { BodyMeasurement } from '@/types/nutrition';
import {
  getBodyMeasurements,
  addBodyMeasurement,
  deleteBodyMeasurement,
  getMeasurementStreak,
  getTodayDateString,
} from '@/lib/storage';
import { checkAndAwardBadges, awardMeasurementPoints, ALL_BADGES } from '@/lib/gamification';

type DimKey = 'chest' | 'waist' | 'hips' | 'thigh' | 'arm' | 'calf';

const DIM_LABELS: Record<DimKey, { label: string; icon: string }> = {
  chest: { label: '胸围', icon: '👕' },
  waist: { label: '腰围', icon: '🎀' },
  hips:  { label: '臀围', icon: '🍑' },
  thigh: { label: '大腿围', icon: '🦵' },
  arm:   { label: '手臂围', icon: '💪' },
  calf:  { label: '小腿围', icon: '🦷' },
};

const DIM_KEYS: DimKey[] = ['chest', 'waist', 'hips', 'thigh', 'arm', 'calf'];

interface FormState {
  chest: string;
  waist: string;
  hips: string;
  thigh: string;
  arm: string;
  calf: string;
  note: string;
}

const EMPTY_FORM: FormState = {
  chest: '', waist: '', hips: '', thigh: '', arm: '', calf: '', note: '',
};

export default function BodyMeasurements() {
  const [records, setRecords] = useState<BodyMeasurement[]>([]);
  const [streak, setStreak] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'award' } | null>(null);
  const [newBadges, setNewBadges] = useState<string[]>([]);

  const load = useCallback(() => {
    setRecords(getBodyMeasurements());
    setStreak(getMeasurementStreak());
  }, []);

  useEffect(() => { load(); }, [load]);

  const showToast = (msg: string, type: 'success' | 'award' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = () => {
    const parsed: Partial<Record<DimKey, number>> = {};
    let hasAny = false;
    for (const key of DIM_KEYS) {
      const v = parseFloat(form[key]);
      if (!isNaN(v) && v > 0) { parsed[key] = v; hasAny = true; }
    }
    if (!hasAny) { showToast('请至少填写一项维度数据', 'success'); return; }

    addBodyMeasurement({
      date: getTodayDateString(),
      ...parsed,
      note: form.note || undefined,
    });

    // Award points
    const pts = awardMeasurementPoints();
    // Check badges
    const earned = checkAndAwardBadges();
    setNewBadges(earned);

    load();
    setForm(EMPTY_FORM);
    setShowForm(false);

    if (earned.length > 0) {
      showToast(`🏅 获得新徽章！+${pts}积分`, 'award');
    } else {
      showToast(`✅ 记录成功！+${pts}积分`, 'success');
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('确认删除这条记录？')) {
      deleteBodyMeasurement(id);
      load();
    }
  };

  /** Get change vs first record */
  const getChange = (key: DimKey, value: number | undefined) => {
    if (!value || records.length < 2) return null;
    const first = records[0][key];
    if (!first) return null;
    const diff = value - first;
    return diff;
  };

  const todayStr = getTodayDateString();
  const todayRecord = records.find(r => r.date === todayStr);
  const latest = records.length > 0 ? records[records.length - 1] : null;
  const first = records.length > 0 ? records[0] : null;

  return (
    <div className="space-y-4 pb-4">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full text-white text-sm font-medium shadow-lg transition-all ${
          toast.type === 'award' ? 'bg-yellow-500' : 'bg-green-500'
        }`}>
          {toast.msg}
        </div>
      )}

      {/* New badges popup */}
      {newBadges.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setNewBadges([])}>
          <div className="bg-white rounded-2xl p-6 mx-4 text-center shadow-2xl max-w-xs w-full">
            <div className="text-4xl mb-2">🎉</div>
            <div className="font-bold text-lg mb-3">恭喜获得新徽章！</div>
            {newBadges.map(bid => {
              const badge = ALL_BADGES.find(b => b.id === bid);
              return badge ? (
                <div key={bid} className="flex items-center gap-2 bg-yellow-50 rounded-xl px-3 py-2 mb-2">
                  <span className="text-2xl">{badge.icon}</span>
                  <div className="text-left">
                    <div className="font-semibold text-sm">{badge.name}</div>
                    <div className="text-xs text-gray-500">{badge.description}</div>
                  </div>
                </div>
              ) : null;
            })}
            <button onClick={() => setNewBadges([])} className="mt-2 text-sm text-gray-400">点击关闭</button>
          </div>
        </div>
      )}

      {/* Header stats */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-4 text-white">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm opacity-80">连续记录</div>
            <div className="text-3xl font-bold">{streak} <span className="text-lg font-normal">天</span></div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-80">累计记录</div>
            <div className="text-3xl font-bold">{records.length} <span className="text-lg font-normal">次</span></div>
          </div>
          <div className="text-5xl">📐</div>
        </div>
        {streak >= 7 && <div className="text-xs bg-white/20 rounded-full px-3 py-1 inline-block">🔥 坚持打卡中，继续加油！</div>}
      </div>

      {/* Progress summary - compare first vs latest */}
      {first && latest && records.length >= 2 && (
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="text-sm font-semibold text-gray-700 mb-3">📊 变化对比（初始→最新）</div>
          <div className="grid grid-cols-3 gap-2">
            {DIM_KEYS.map(key => {
              const f = first[key];
              const l = latest[key];
              if (!f || !l) return null;
              const diff = l - f;
              return (
                <div key={key} className={`rounded-xl p-2 text-center ${diff < 0 ? 'bg-green-50' : diff > 0 ? 'bg-red-50' : 'bg-gray-50'}`}>
                  <div className="text-lg">{DIM_LABELS[key].icon}</div>
                  <div className="text-xs text-gray-500">{DIM_LABELS[key].label}</div>
                  <div className="text-sm font-bold">
                    {diff < 0 ? (
                      <span className="text-green-600">-{Math.abs(diff).toFixed(1)}cm</span>
                    ) : diff > 0 ? (
                      <span className="text-red-400">+{diff.toFixed(1)}cm</span>
                    ) : (
                      <span className="text-gray-400">不变</span>
                    )}
                  </div>
                </div>
              );
            }).filter(Boolean)}
          </div>
        </div>
      )}

      {/* Today action */}
      {!todayRecord ? (
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full bg-purple-600 text-white rounded-2xl py-4 font-semibold text-base flex items-center justify-center gap-2 shadow active:scale-95 transition-transform"
        >
          <span className="text-xl">📏</span>
          {showForm ? '收起' : '记录今日维度'}
        </button>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-3 flex items-center gap-2">
          <span className="text-green-500 text-xl">✅</span>
          <div>
            <div className="text-sm font-semibold text-green-700">今日已记录！</div>
            <div className="text-xs text-green-600">继续保持，明天再来打卡</div>
          </div>
        </div>
      )}

      {/* Input form */}
      {showForm && !todayRecord && (
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
          <div className="text-sm font-semibold text-gray-700 mb-1">填写今日维度（cm，至少填一项）</div>
          <div className="grid grid-cols-2 gap-3">
            {DIM_KEYS.map(key => (
              <div key={key}>
                <label className="text-xs text-gray-500 mb-1 block">{DIM_LABELS[key].icon} {DIM_LABELS[key].label}</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={form[key]}
                  onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                  placeholder="如：75.5"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-purple-400"
                />
              </div>
            ))}
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">备注（可选）</label>
            <input
              type="text"
              value={form.note}
              onChange={e => setForm(prev => ({ ...prev, note: e.target.value }))}
              placeholder="如：生理期、刚运动后..."
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-purple-400"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-purple-600 text-white rounded-xl py-3 font-semibold text-sm"
          >
            保存记录
          </button>
        </div>
      )}

      {/* Reward explanation */}
      <div className="bg-yellow-50 rounded-2xl p-4">
        <div className="text-sm font-semibold text-yellow-800 mb-2">🎁 打卡奖励规则</div>
        <div className="space-y-1 text-xs text-yellow-700">
          <div>• 每次记录维度：<span className="font-semibold">+5积分</span></div>
          <div>• 每有一项维度减小：<span className="font-semibold">额外+3积分</span></div>
          <div>• 积分可兑换盲盒（50积分=1次）</div>
          <div>• 连续7/30天记录可解锁专属徽章</div>
          <div>• 腰围减少2cm/5cm可解锁成就</div>
        </div>
      </div>

      {/* History */}
      {records.length > 0 && (
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="text-sm font-semibold text-gray-700 mb-3">📋 历史记录</div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {[...records].reverse().map(record => (
              <div key={record.id} className="border border-gray-100 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold text-gray-700">{record.date}</div>
                  <button
                    onClick={() => handleDelete(record.id)}
                    className="text-gray-300 hover:text-red-400 text-xs"
                  >
                    删除
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {DIM_KEYS.map(key => {
                    const val = record[key];
                    if (!val) return null;
                    const change = getChange(key, val);
                    return (
                      <div key={key} className="text-xs">
                        <span className="text-gray-400">{DIM_LABELS[key].label} </span>
                        <span className="font-medium">{val}cm</span>
                        {change !== null && change !== 0 && (
                          <span className={change < 0 ? 'text-green-500' : 'text-red-400'}>
                            {change < 0 ? `↓${Math.abs(change).toFixed(1)}` : `↑${change.toFixed(1)}`}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
                {record.note && <div className="text-xs text-gray-400 mt-1">备注：{record.note}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {records.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <div className="text-4xl mb-2">📏</div>
          <div className="text-sm">还没有维度记录</div>
          <div className="text-xs mt-1">开始记录，追踪你的身材变化</div>
        </div>
      )}
    </div>
  );
}

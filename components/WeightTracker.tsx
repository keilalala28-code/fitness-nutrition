'use client';

import { useState, useEffect } from 'react';
import { WeightRecord } from '@/types/nutrition';
import { getWeightRecords, addWeightRecord, deleteWeightRecord, getCurrentUserAccount, getTodayDateString } from '@/lib/storage';
import { useToast } from '@/components/Toast';
import { checkAndAwardBadges, addBlindboxPoints, ALL_BADGES } from '@/lib/gamification';

function calcBMI(weight: number, heightCm: number): number {
  const h = heightCm / 100;
  return Math.round((weight / (h * h)) * 10) / 10;
}

function getBMIInfo(bmi: number): { label: string; color: string; bg: string } {
  if (bmi < 18.5) return { label: '偏轻', color: 'text-blue-600', bg: 'bg-blue-50' };
  if (bmi < 24) return { label: '正常', color: 'text-green-600', bg: 'bg-green-50' };
  if (bmi < 28) return { label: '偏重', color: 'text-orange-500', bg: 'bg-orange-50' };
  return { label: '肥胖', color: 'text-red-500', bg: 'bg-red-50' };
}

export default function WeightTracker() {
  const { showToast } = useToast();
  const [records, setRecords] = useState<WeightRecord[]>([]);
  const [inputWeight, setInputWeight] = useState('');
  const [inputNote, setInputNote] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [heightCm, setHeightCm] = useState<number | null>(null);
  const [goalLabel, setGoalLabel] = useState<string>('maintain');

  const load = () => {
    setRecords(getWeightRecords());
    const account = getCurrentUserAccount();
    if (account?.profile) {
      setHeightCm(account.profile.height || null);
      setGoalLabel(account.profile.goal || 'maintain');
    }
  };

  useEffect(() => { load(); }, []);

  const today = getTodayDateString();
  const todayRecord = records.find(r => r.date === today);
  const latest = records[records.length - 1];
  const prev = records[records.length - 2];
  const diff = latest && prev ? Math.round((latest.weight - prev.weight) * 10) / 10 : null;

  // 7日趋势
  const last7 = records.slice(-7);
  let trend: '↗' | '↘' | '→' | null = null;
  let trendKg: number | null = null;
  if (last7.length >= 2) {
    const d = Math.round((last7[last7.length - 1].weight - last7[0].weight) * 10) / 10;
    trendKg = d;
    if (d > 0.2) trend = '↗';
    else if (d < -0.2) trend = '↘';
    else trend = '→';
  }

  const bmi = latest && heightCm ? calcBMI(latest.weight, heightCm) : null;
  const bmiInfo = bmi ? getBMIInfo(bmi) : null;

  // 图表（最近14条）
  const chartRecords = records.slice(-14);
  const weights = chartRecords.map(r => r.weight);
  const minW = weights.length > 0 ? Math.min(...weights) - 1 : 50;
  const maxW = weights.length > 0 ? Math.max(...weights) + 1 : 80;
  const W = 300, H = 80;
  const pts = chartRecords.map((r, i) => {
    const x = chartRecords.length < 2 ? W / 2 : (i / (chartRecords.length - 1)) * W;
    const y = H - ((r.weight - minW) / (maxW - minW + 0.001)) * (H - 12) - 6;
    return { x, y, r };
  });
  const polylinePts = pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const fillPoly = pts.length > 1
    ? `${pts[0].x.toFixed(1)},${H} ${polylinePts} ${pts[pts.length - 1].x.toFixed(1)},${H}`
    : '';

  const handleAdd = () => {
    const w = parseFloat(inputWeight);
    if (!w || w < 20 || w > 300) {
      showToast('请输入有效体重（20-300kg）', 'error');
      return;
    }
    addWeightRecord(w, inputNote || undefined);
    showToast('体重已记录 ✓', 'success');
    const newBadges = checkAndAwardBadges(heightCm || undefined);
    addBlindboxPoints(5);
    if (newBadges.length > 0) {
      const badge = ALL_BADGES.find(b => b.id === newBadges[0]);
      if (badge) setTimeout(() => showToast(`🏆 新徽章解锁：${badge.name} ${badge.icon}`, 'success'), 500);
    }
    setInputWeight('');
    setInputNote('');
    load();
  };

  const handleDelete = (id: string) => {
    deleteWeightRecord(id);
    load();
  };

  const displayRecords = showAll ? [...records].reverse() : [...records].reverse().slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
      {/* 标题行 */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <span>⚖️</span> 体重记录
          {trend && (
            <span className={`text-xs font-normal px-2 py-0.5 rounded-full ${
              trend === '↘' ? 'bg-green-50 text-green-600'
              : trend === '↗' ? 'bg-red-50 text-red-400'
              : 'bg-gray-100 text-gray-500'
            }`}>
              {trend} 近7日{trendKg !== null ? `${trendKg > 0 ? '+' : ''}${trendKg}kg` : ''}
            </span>
          )}
        </h3>
        {latest && (
          <div className="text-right">
            <div className="flex items-baseline gap-1 justify-end">
              <span className="text-2xl font-bold text-gray-800">{latest.weight}</span>
              <span className="text-sm text-gray-400">kg</span>
              {diff !== null && (
                <span className={`text-sm font-medium ${diff > 0 ? 'text-red-400' : diff < 0 ? 'text-green-500' : 'text-gray-400'}`}>
                  {diff > 0 ? `+${diff}` : diff}
                </span>
              )}
            </div>
            {bmi && bmiInfo && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${bmiInfo.bg} ${bmiInfo.color} font-medium`}>
                BMI {bmi} · {bmiInfo.label}
              </span>
            )}
          </div>
        )}
      </div>

      {/* 今日状态提示 */}
      {todayRecord ? (
        <div className="bg-green-50 border border-green-100 rounded-lg px-3 py-2 flex items-center gap-2 text-sm text-green-700">
          <span>✅</span>
          <span>今日已记录 <strong>{todayRecord.weight} kg</strong></span>
          {todayRecord.note && <span className="text-green-500 text-xs">· {todayRecord.note}</span>}
        </div>
      ) : records.length > 0 ? (
        <div className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 text-sm text-amber-700">
          💡 今天还没记录体重，记一下吧
        </div>
      ) : null}

      {/* 折线面积图 */}
      {chartRecords.length >= 2 && (
        <div className="bg-gray-50 rounded-xl px-3 pt-3 pb-2">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 80 }}>
            <defs>
              <linearGradient id="wGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#16a34a" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#16a34a" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            {fillPoly && <polygon points={fillPoly} fill="url(#wGrad)" />}
            <polyline
              points={polylinePts}
              fill="none"
              stroke="#16a34a"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {pts.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="white" stroke="#16a34a" strokeWidth="1.5" />
            ))}
            {/* 首尾标注 */}
            <text x="2" y={H - 2} fontSize="9" fill="#9ca3af">{chartRecords[0]?.date.slice(5)}</text>
            <text x={W - 2} y={H - 2} fontSize="9" fill="#6b7280" textAnchor="end">
              {chartRecords[chartRecords.length - 1]?.date.slice(5)}
            </text>
          </svg>
        </div>
      )}

      {/* 录入区 */}
      <div className="flex gap-2">
        <input
          type="number"
          inputMode="decimal"
          value={inputWeight}
          onChange={e => setInputWeight(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder={todayRecord ? '更新体重 kg' : '今日体重 kg'}
          className="w-28 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <input
          type="text"
          value={inputNote}
          onChange={e => setInputNote(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="备注（可选）"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
        >
          记录
        </button>
      </div>

      {/* 历史记录 */}
      {displayRecords.length > 0 && (
        <div className="space-y-1">
          {displayRecords.map((r, idx) => {
            const nextR = displayRecords[idx + 1]; // 逆序，下一个是更早的
            const d = nextR ? Math.round((r.weight - nextR.weight) * 10) / 10 : null;
            const isToday = r.date === today;
            return (
              <div
                key={r.id}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm ${isToday ? 'bg-green-50' : 'hover:bg-gray-50'}`}
              >
                <span className={`w-16 text-xs flex-shrink-0 ${isToday ? 'text-green-600 font-medium' : 'text-gray-400'}`}>
                  {isToday ? '今天' : r.date.slice(5)}
                </span>
                <span className={`font-medium ${isToday ? 'text-green-700' : 'text-gray-800'}`}>{r.weight} kg</span>
                {d !== null && (
                  <span className={`text-xs ${d > 0 ? 'text-red-400' : d < 0 ? 'text-green-500' : 'text-gray-400'}`}>
                    {d > 0 ? `+${d}` : d}
                  </span>
                )}
                {r.note && <span className="text-gray-400 text-xs flex-1 truncate">{r.note}</span>}
                <button
                  onClick={() => handleDelete(r.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors ml-auto flex-shrink-0"
                >
                  ✕
                </button>
              </div>
            );
          })}
          {records.length > 5 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-xs text-primary-600 hover:underline w-full text-center pt-1"
            >
              {showAll ? '收起' : `查看全部 ${records.length} 条记录`}
            </button>
          )}
        </div>
      )}

      {records.length === 0 && (
        <div className="text-center py-4">
          <div className="text-3xl mb-2">⚖️</div>
          <p className="text-sm text-gray-400">还没有体重记录，今天开始记录吧</p>
        </div>
      )}
    </div>
  );
}

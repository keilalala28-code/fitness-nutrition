'use client';

import { useState, useEffect } from 'react';
import { WeightRecord } from '@/types/nutrition';
import { getWeightRecords, addWeightRecord, deleteWeightRecord } from '@/lib/storage';
import { useToast } from '@/components/Toast';

export default function WeightTracker() {
  const { showToast } = useToast();
  const [records, setRecords] = useState<WeightRecord[]>([]);
  const [inputWeight, setInputWeight] = useState('');
  const [inputNote, setInputNote] = useState('');
  const [showAll, setShowAll] = useState(false);

  const load = () => setRecords(getWeightRecords());
  useEffect(() => { load(); }, []);

  const handleAdd = () => {
    const w = parseFloat(inputWeight);
    if (!w || w < 20 || w > 300) {
      showToast('请输入有效体重（20-300kg）', 'error');
      return;
    }
    addWeightRecord(w, inputNote || undefined);
    showToast('体重记录已保存', 'success');
    setInputWeight('');
    setInputNote('');
    load();
  };

  // SVG折线图
  const chartRecords = records.slice(-14);
  const weights = chartRecords.map(r => r.weight);
  const minW = weights.length > 0 ? Math.min(...weights) - 2 : 50;
  const maxW = weights.length > 0 ? Math.max(...weights) + 2 : 80;
  const W = 300, H = 80;
  const pts = chartRecords.map((r, i) => {
    const x = weights.length < 2 ? W / 2 : (i / (chartRecords.length - 1)) * W;
    const y = H - ((r.weight - minW) / (maxW - minW)) * H;
    return { x, y, r };
  });

  const latest = records[records.length - 1];
  const prev = records[records.length - 2];
  const diff = latest && prev ? (latest.weight - prev.weight) : null;

  const displayRecords = showAll ? [...records].reverse() : [...records].reverse().slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <span>⚖️</span> 体重记录
        </h3>
        {latest && (
          <div className="text-right">
            <span className="text-xl font-bold text-gray-800">{latest.weight}</span>
            <span className="text-sm text-gray-500"> kg</span>
            {diff !== null && (
              <span className={`ml-2 text-sm font-medium ${diff > 0 ? 'text-red-500' : diff < 0 ? 'text-green-500' : 'text-gray-400'}`}>
                {diff > 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1)}
              </span>
            )}
          </div>
        )}
      </div>

      {/* 折线图 */}
      {chartRecords.length >= 2 && (
        <div className="bg-gray-50 rounded-xl p-3">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 80 }}>
            <polyline
              points={pts.map(p => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke="#16a34a"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {pts.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="3" fill="#16a34a" />
            ))}
          </svg>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{chartRecords[0]?.date.slice(5)}</span>
            <span>{chartRecords[chartRecords.length - 1]?.date.slice(5)}</span>
          </div>
        </div>
      )}

      {/* 录入 */}
      <div className="flex gap-2">
        <input
          type="number"
          inputMode="decimal"
          value={inputWeight}
          onChange={e => setInputWeight(e.target.value)}
          placeholder="今日体重 kg"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <input
          type="text"
          value={inputNote}
          onChange={e => setInputNote(e.target.value)}
          placeholder="备注（可选）"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700"
        >
          记录
        </button>
      </div>

      {/* 历史 */}
      {displayRecords.length > 0 && (
        <div className="space-y-1.5">
          {displayRecords.map(r => (
            <div key={r.id} className="flex justify-between items-center text-sm px-2 py-1.5 rounded-lg hover:bg-gray-50">
              <span className="text-gray-500">{r.date}</span>
              <span className="font-medium text-gray-800">{r.weight} kg</span>
              {r.note && <span className="text-gray-400 text-xs">{r.note}</span>}
              <button onClick={() => handleDelete(r.id)} className="text-gray-300 hover:text-red-500 text-xs ml-2">✕</button>
            </div>
          ))}
          {records.length > 5 && (
            <button onClick={() => setShowAll(!showAll)} className="text-xs text-primary-600 hover:underline w-full text-center pt-1">
              {showAll ? '收起' : `查看全部 ${records.length} 条记录`}
            </button>
          )}
        </div>
      )}

      {records.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-2">还没有体重记录，今天开始记录吧</p>
      )}
    </div>
  );

  function handleDelete(id: string) {
    deleteWeightRecord(id);
    load();
  }
}

'use client';

import { useState } from 'react';
import WeightTracker from '@/components/WeightTracker';
import BodyMeasurements from '@/components/BodyMeasurements';

export default function WeightPage() {
  const [tab, setTab] = useState<'weight' | 'measurements'>('weight');

  return (
    <div className="space-y-4">
      {/* Tab switcher */}
      <div className="flex bg-gray-100 rounded-xl p-1">
        <button
          onClick={() => setTab('weight')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
            tab === 'weight'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500'
          }`}
        >
          ⚖️ 体重
        </button>
        <button
          onClick={() => setTab('measurements')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
            tab === 'measurements'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500'
          }`}
        >
          📐 身体维度
        </button>
      </div>

      {tab === 'weight' ? <WeightTracker /> : <BodyMeasurements />}
    </div>
  );
}

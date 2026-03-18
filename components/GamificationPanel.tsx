'use client';

import { useState, useEffect } from 'react';
import {
  ALL_BADGES, EarnedBadge, BlindboxPrize, OpenedBlindbox,
  getEarnedBadges, getBlindboxPoints, getOpenedBlindboxes, openBlindbox, BLINDBOX_COST,
} from '@/lib/gamification';

export default function GamificationPanel() {
  const [earnedBadges, setEarnedBadges] = useState<EarnedBadge[]>([]);
  const [points, setPoints] = useState(0);
  const [openedBoxes, setOpenedBoxes] = useState<OpenedBlindbox[]>([]);
  const [isOpening, setIsOpening] = useState(false);
  const [justOpened, setJustOpened] = useState<BlindboxPrize | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const load = () => {
    setEarnedBadges(getEarnedBadges());
    setPoints(getBlindboxPoints());
    setOpenedBoxes(getOpenedBlindboxes());
  };
  useEffect(() => { load(); }, []);

  const exerciseBadges = ALL_BADGES.filter(b => b.category === 'exercise');
  const weightBadges = ALL_BADGES.filter(b => b.category === 'weight');
  const earnedIds = new Set(earnedBadges.map(b => b.badgeId));
  const totalEarned = earnedBadges.length;

  const handleOpenBox = () => {
    if (points < BLINDBOX_COST || isOpening) return;
    setIsOpening(true);
    setJustOpened(null);
    setTimeout(() => {
      const prize = openBlindbox();
      setIsOpening(false);
      if (prize) { setJustOpened(prize); load(); }
    }, 1000);
  };

  const progressToNext = Math.min(100, Math.round((points % BLINDBOX_COST) / BLINDBOX_COST * 100));
  const canOpen = points >= BLINDBOX_COST;

  const BadgeGrid = ({ badges, color }: { badges: typeof ALL_BADGES; color: 'orange' | 'blue' }) => (
    <div className="grid grid-cols-5 gap-1.5">
      {badges.map(badge => {
        const earned = earnedIds.has(badge.id);
        const earnedInfo = earnedBadges.find(b => b.badgeId === badge.id);
        return (
          <div
            key={badge.id}
            title={badge.condition}
            className={`flex flex-col items-center py-2 px-1 rounded-xl text-center transition-all cursor-default ${
              earned
                ? color === 'orange'
                  ? 'bg-orange-50 border border-orange-200'
                  : 'bg-blue-50 border border-blue-200'
                : 'bg-gray-50 opacity-40 grayscale'
            }`}
          >
            <span className="text-xl leading-none">{badge.icon}</span>
            <span className={`text-xs mt-1 font-medium leading-tight ${
              earned
                ? color === 'orange' ? 'text-orange-700' : 'text-blue-700'
                : 'text-gray-400'
            }`}>
              {badge.name}
            </span>
            {earned && earnedInfo && (
              <span className={`text-xs mt-0.5 ${color === 'orange' ? 'text-orange-400' : 'text-blue-400'}`}>
                {new Date(earnedInfo.earnedAt).toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' })}
              </span>
            )}
            {!earned && (
              <span className="text-xs mt-0.5 text-gray-300">🔒</span>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <span>🎮</span> 成就与奖励
        </h3>
        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-medium">
          {totalEarned}/{ALL_BADGES.length} 已解锁
        </span>
      </div>

      {/* Exercise badges */}
      <div>
        <p className="text-xs text-gray-400 mb-2">
          🏃 运动成就
          <span className="ml-1 text-orange-500 font-medium">
            {earnedBadges.filter(b => exerciseBadges.some(e => e.id === b.badgeId)).length}/{exerciseBadges.length}
          </span>
        </p>
        <BadgeGrid badges={exerciseBadges} color="orange" />
      </div>

      {/* Weight badges */}
      <div>
        <p className="text-xs text-gray-400 mb-2">
          ⚖️ 体重成就
          <span className="ml-1 text-blue-500 font-medium">
            {earnedBadges.filter(b => weightBadges.some(e => e.id === b.badgeId)).length}/{weightBadges.length}
          </span>
        </p>
        <BadgeGrid badges={weightBadges} color="blue" />
      </div>

      {/* Blind box section */}
      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-sm font-semibold text-gray-800">🎁 健康盲盒</p>
            <p className="text-xs text-gray-400 mt-0.5">运动打卡+10分 · 体重记录+5分</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-purple-600">{points}</span>
            <span className="text-xs text-gray-400"> 积分</span>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: canOpen ? '100%' : `${progressToNext}%` }}
            />
          </div>
          <span className="text-xs text-gray-400 flex-shrink-0">
            {canOpen ? `可开 ${Math.floor(points / BLINDBOX_COST)} 个` : `${points}/${BLINDBOX_COST}`}
          </span>
        </div>

        {/* Open button */}
        <button
          onClick={handleOpenBox}
          disabled={!canOpen || isOpening}
          className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
            canOpen && !isOpening
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 active:scale-95 shadow-md shadow-purple-200'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isOpening
            ? '🎁 神秘力量涌现中...'
            : canOpen
            ? `🎁 开盲盒！（消耗${BLINDBOX_COST}分）`
            : `🔒 还差 ${BLINDBOX_COST - (points % BLINDBOX_COST)} 分解锁`}
        </button>

        {/* Just opened prize */}
        {justOpened && (
          <div className={`mt-3 p-4 rounded-xl text-center border-2 transition-all ${
            justOpened.rarity === 'epic'
              ? 'border-yellow-400 bg-gradient-to-b from-yellow-50 to-orange-50'
              : justOpened.rarity === 'rare'
              ? 'border-purple-300 bg-purple-50'
              : 'border-blue-200 bg-blue-50'
          }`}>
            <div className="text-5xl mb-2 animate-bounce inline-block">{justOpened.icon}</div>
            <div className={`text-xs font-bold mb-1 tracking-wide ${
              justOpened.rarity === 'epic' ? 'text-yellow-600'
              : justOpened.rarity === 'rare' ? 'text-purple-600'
              : 'text-blue-500'
            }`}>
              {justOpened.rarity === 'epic' ? '✦ 史诗级 ✦' : justOpened.rarity === 'rare' ? '◆ 稀有' : '普通'}
            </div>
            <div className="font-bold text-gray-800 mb-1 text-base">{justOpened.title}</div>
            <div className="text-sm text-gray-600 leading-relaxed">{justOpened.content}</div>
          </div>
        )}

        {/* History */}
        {openedBoxes.length > 0 && (
          <div className="mt-3">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-xs text-gray-400 hover:text-gray-600 w-full text-center py-1"
            >
              {showHistory ? '收起' : `历史开盒记录 (${openedBoxes.length})`}
            </button>
            {showHistory && (
              <div className="space-y-1.5 mt-2">
                {[...openedBoxes].reverse().slice(0, 6).map((box, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 text-sm">
                    <span className="text-lg flex-shrink-0">{box.prize.icon}</span>
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-gray-700">{box.prize.title}</span>
                      <span className="text-gray-400 text-xs ml-1.5 truncate block">{box.prize.content}</span>
                    </div>
                    <span className="text-xs text-gray-300 flex-shrink-0">
                      {new Date(box.openedAt).toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { UserAccount, UserProfile, UserGoals, ActivityLevel, FitnessGoal } from '@/types/nutrition';
import {
  getAllUserAccounts,
  createUserAccount,
  getCurrentUserAccount,
  setCurrentUser,
  deleteUserAccount,
  updateUserAccount,
} from '@/lib/storage';
import { calculateDailyGoals } from '@/lib/formulas';
import { useToast } from '@/components/Toast';
import ConfirmDialog from '@/components/ConfirmDialog';

interface UserAccountManagerProps {
  onUserChange?: (account: UserAccount | null) => void;
}

export default function UserAccountManager({ onUserChange }: UserAccountManagerProps) {
  const { showToast } = useToast();
  const [accounts, setAccounts] = useState<UserAccount[]>([]);
  const [currentAccount, setCurrentAccount] = useState<UserAccount | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showAccountList, setShowAccountList] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  // 新用户表单
  const [newUser, setNewUser] = useState({
    name: '',
    gender: 'male' as 'male' | 'female',
    age: '',
    height: '',
    weight: '',
    activityLevel: 'moderate' as ActivityLevel,
    goal: 'maintain' as FitnessGoal,
  });

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = () => {
    const allAccounts = getAllUserAccounts();
    setAccounts(allAccounts);

    const current = getCurrentUserAccount();
    setCurrentAccount(current);
    onUserChange?.(current);
  };

  const handleCreateAccount = () => {
    if (!newUser.name || !newUser.age || !newUser.height || !newUser.weight) {
      showToast('请填写完整信息', 'error');
      return;
    }

    const profile: UserProfile = {
      gender: newUser.gender,
      age: parseInt(newUser.age),
      height: parseFloat(newUser.height),
      weight: parseFloat(newUser.weight),
      activityLevel: newUser.activityLevel,
      goal: newUser.goal,
    };

    // 计算目标
    const goals = calculateDailyGoals(profile);

    const account = createUserAccount(newUser.name, profile, goals);

    // 重置表单
    setNewUser({
      name: '',
      gender: 'male',
      age: '',
      height: '',
      weight: '',
      activityLevel: 'moderate',
      goal: 'maintain',
    });
    setShowCreateForm(false);
    showToast(`用户 ${newUser.name} 创建成功`, 'success');
    loadAccounts();
  };

  const handleSwitchUser = (userId: number) => {
    setCurrentUser(userId);
    loadAccounts();
    setShowAccountList(false);
  };

  const handleDeleteAccount = (userId: number) => {
    setPendingDeleteId(userId);
  };

  const handleConfirmDelete = () => {
    if (pendingDeleteId === null) return;
    deleteUserAccount(pendingDeleteId);
    setPendingDeleteId(null);
    showToast('用户已删除', 'success');
    loadAccounts();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      {pendingDeleteId !== null && (
        <ConfirmDialog
          message="确定要删除此用户吗？所有数据将被清除。"
          onConfirm={handleConfirmDelete}
          onCancel={() => setPendingDeleteId(null)}
        />
      )}
      {/* 当前用户信息 */}
      {currentAccount ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">
              {currentAccount.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-medium text-gray-900">{currentAccount.name}</div>
              <div className="text-xs text-gray-500">
                ID: {currentAccount.id} · {currentAccount.profile.weight}kg
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowAccountList(!showAccountList)}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            切换用户
          </button>
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-gray-500 mb-3">还没有创建用户档案</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            创建用户
          </button>
        </div>
      )}

      {/* 用户列表 */}
      {showAccountList && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-700 mb-2">所有用户</h4>
          <div className="space-y-2">
            {accounts.map((account) => (
              <div
                key={account.id}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                  account.id === currentAccount?.id ? 'bg-primary-50 border border-primary-200' : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => handleSwitchUser(account.id)}
              >
                <div>
                  <span className="font-medium">{account.name}</span>
                  <span className="text-xs text-gray-500 ml-2">#{account.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  {account.id === currentAccount?.id && (
                    <span className="text-xs bg-primary-600 text-white px-2 py-0.5 rounded">当前</span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAccount(account.id);
                    }}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    删除
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              setShowCreateForm(true);
              setShowAccountList(false);
            }}
            className="w-full mt-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary-400 hover:text-primary-600"
          >
            + 添加新用户
          </button>
        </div>
      )}

      {/* 创建用户表单 */}
      {showCreateForm && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-700 mb-3">创建新用户</h4>
          <div className="space-y-3">
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="昵称"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />

            <div className="grid grid-cols-2 gap-3">
              <select
                value={newUser.gender}
                onChange={(e) => setNewUser({ ...newUser, gender: e.target.value as 'male' | 'female' })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
              <input
                type="number"
                value={newUser.age}
                onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
                placeholder="年龄"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                value={newUser.height}
                onChange={(e) => setNewUser({ ...newUser, height: e.target.value })}
                placeholder="身高(cm)"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="number"
                value={newUser.weight}
                onChange={(e) => setNewUser({ ...newUser, weight: e.target.value })}
                placeholder="体重(kg)"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <select
              value={newUser.activityLevel}
              onChange={(e) => setNewUser({ ...newUser, activityLevel: e.target.value as ActivityLevel })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="sedentary">久坐（几乎不运动）</option>
              <option value="light">轻度活动（每周1-3天）</option>
              <option value="moderate">中度活动（每周3-5天）</option>
              <option value="active">活跃（每周6-7天）</option>
              <option value="veryActive">非常活跃（体力劳动/高强度训练）</option>
            </select>

            <select
              value={newUser.goal}
              onChange={(e) => setNewUser({ ...newUser, goal: e.target.value as FitnessGoal })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="lose">减脂</option>
              <option value="maintain">维持体重</option>
              <option value="gain">增肌</option>
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => setShowCreateForm(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={handleCreateAccount}
                className="flex-1 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                创建
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

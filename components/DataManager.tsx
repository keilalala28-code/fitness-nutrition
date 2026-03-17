'use client';

import { useRef } from 'react';
import { exportAllData, importAllData } from '@/lib/storage';
import { useToast } from '@/components/Toast';

export default function DataManager() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const handleExport = () => {
    const json = exportAllData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    a.href = url;
    a.download = `健身营养数据备份_${date}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('数据已导出，请保存备份文件', 'success');
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      const result = importAllData(text);
      if (result.success) {
        showToast('数据恢复成功，页面即将刷新', 'success');
        setTimeout(() => window.location.reload(), 1500);
      } else {
        showToast(result.error || '导入失败', 'error');
      }
    };
    reader.readAsText(file);
    // 清空 input，允许重复选同一文件
    e.target.value = '';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="font-semibold text-gray-800 text-sm">数据备份与恢复</h3>
          <p className="text-xs text-gray-500 mt-0.5">定期导出备份，防止数据丢失</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="px-3 py-1.5 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-1"
          >
            <span>⬇️</span> 导出备份
          </button>
          <button
            onClick={handleImportClick}
            className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1"
          >
            <span>⬆️</span> 恢复数据
          </button>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

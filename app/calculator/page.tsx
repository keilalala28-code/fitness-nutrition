'use client';

import { useRouter } from 'next/navigation';
import TDEECalculator from '@/components/TDEECalculator';

export default function CalculatorPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">TDEE 计算器</h1>
        <p className="text-gray-600 mt-1">
          计算您的每日总能量消耗（TDEE），获取个性化的营养目标
        </p>
      </div>

      <TDEECalculator onGoalsCalculated={() => {
        setTimeout(() => router.push('/'), 1200);
      }} />

      {/* 科学说明 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">📚 科学原理</h2>

        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-medium text-gray-900">什么是 BMR？</h3>
            <p className="text-sm mt-1">
              基础代谢率（Basal Metabolic Rate）是您的身体在完全静息状态下维持生命所需的最低能量消耗。
              本工具使用 <strong>Mifflin-St Jeor 公式</strong>，这是目前研究证明最准确的BMR计算公式。
            </p>
          </div>

          <div>
            <h3 className="font-medium text-gray-900">什么是 TDEE？</h3>
            <p className="text-sm mt-1">
              每日总能量消耗（Total Daily Energy Expenditure）是您每天实际消耗的总热量，
              包括基础代谢、日常活动、运动等。TDEE = BMR × 活动系数。
            </p>
          </div>

          <div>
            <h3 className="font-medium text-gray-900">如何设置营养目标？</h3>
            <ul className="text-sm mt-1 space-y-1">
              <li>• <strong>减脂</strong>：摄入低于TDEE约500卡，同时保持高蛋白防止肌肉流失</li>
              <li>• <strong>增肌</strong>：摄入高于TDEE约300卡，配合充足蛋白质和力量训练</li>
              <li>• <strong>维持</strong>：摄入等于TDEE，保持均衡的宏量营养素比例</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900">蛋白质摄入建议</h3>
            <p className="text-sm mt-1">
              健身人群推荐每日蛋白质摄入量为 <strong>1.6-2.2g/kg体重</strong>（约0.8-1g/磅体重），
              具体取决于训练强度和健身目标。增肌期和减脂期需要更高的蛋白质摄入。
            </p>
          </div>
        </div>
      </div>

      {/* 活动水平说明 */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">🏃 活动水平说明</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 font-medium">活动水平</th>
                <th className="text-left py-2 font-medium">描述</th>
                <th className="text-center py-2 font-medium">系数</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2">久坐不动</td>
                <td className="py-2 text-gray-600">办公室工作，很少或不运动</td>
                <td className="py-2 text-center">1.2</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2">轻度活动</td>
                <td className="py-2 text-gray-600">每周运动1-3天</td>
                <td className="py-2 text-center">1.375</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2">中度活动</td>
                <td className="py-2 text-gray-600">每周运动3-5天</td>
                <td className="py-2 text-center">1.55</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2">活跃</td>
                <td className="py-2 text-gray-600">每周运动6-7天</td>
                <td className="py-2 text-center">1.725</td>
              </tr>
              <tr>
                <td className="py-2">非常活跃</td>
                <td className="py-2 text-gray-600">每天高强度运动或体力劳动</td>
                <td className="py-2 text-center">1.9</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

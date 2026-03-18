import { ExerciseItem } from '@/types/nutrition';

// 运动数据库 - 基于MET值（代谢当量）
// 数据来源：
// - ACSM Guidelines for Exercise Testing and Prescription
// - Compendium of Physical Activities
// - 《健康成年人身体活动能量消耗参考值》(T/CSSS 002—2023)
//
// 热量消耗计算公式：消耗卡路里 = MET值 × 体重(kg) × 时长(小时)
// 例如：70kg的人跑步30分钟(MET=8) = 8 × 70 × 0.5 = 280 kcal

export const EXERCISES: ExerciseItem[] = [
  // ==================== 有氧运动 - 走路（平地） ====================
  {
    id: 'walk-slow',
    name: '慢走（3.2km/h）',
    category: 'cardio',
    met: 2.0,
    description: '休闲散步，轻度活动',
    tags: ['走路', '散步', '慢走', '轻度']
  },
  {
    id: 'walk-normal',
    name: '正常走路（4.8km/h）',
    category: 'cardio',
    met: 3.5,
    description: '正常步行速度',
    tags: ['走路', '步行', '中度']
  },
  {
    id: 'walk-fast',
    name: '快走（6.4km/h）',
    category: 'cardio',
    met: 5.0,
    description: '快速步行，有一定出汗',
    tags: ['快走', '走路', '有氧', '减脂']
  },

  // ==================== 跑步机爬坡走 - 详细坡度/速度组合 ====================
  // 数据来源：ACSM代谢公式 + 亚洲人群研究修正
  // 坡度影响：+5%坡度 ≈ +52%热量消耗，+10%坡度 ≈ +116%热量消耗
  {
    id: 'treadmill-walk-4-0',
    name: '跑步机走路 4km/h 坡度0%',
    category: 'cardio',
    met: 2.5,
    description: '跑步机慢走，平地模式',
    tags: ['跑步机', '走路', '平地', '入门', '爬坡']
  },
  {
    id: 'treadmill-walk-4-5',
    name: '跑步机走路 4km/h 坡度5%',
    category: 'cardio',
    met: 3.8,
    description: '跑步机慢走，5%坡度（+52%消耗）',
    tags: ['跑步机', '走路', '爬坡', '5%']
  },
  {
    id: 'treadmill-walk-4-10',
    name: '跑步机走路 4km/h 坡度10%',
    category: 'cardio',
    met: 5.4,
    description: '跑步机慢走，10%坡度（+116%消耗）',
    tags: ['跑步机', '走路', '爬坡', '10%', '高坡度']
  },
  {
    id: 'treadmill-walk-4-15',
    name: '跑步机走路 4km/h 坡度15%',
    category: 'cardio',
    met: 7.0,
    description: '跑步机慢走，15%高坡度（+180%消耗）',
    tags: ['跑步机', '走路', '爬坡', '15%', '极限坡度']
  },
  {
    id: 'treadmill-walk-5-0',
    name: '跑步机走路 5km/h 坡度0%',
    category: 'cardio',
    met: 3.3,
    description: '跑步机正常走，平地模式',
    tags: ['跑步机', '走路', '平地', '中速']
  },
  {
    id: 'treadmill-walk-5-5',
    name: '跑步机走路 5km/h 坡度5%',
    category: 'cardio',
    met: 5.0,
    description: '跑步机中速走，5%坡度',
    tags: ['跑步机', '走路', '爬坡', '5%', '减脂']
  },
  {
    id: 'treadmill-walk-5-10',
    name: '跑步机走路 5km/h 坡度10%',
    category: 'cardio',
    met: 7.1,
    description: '跑步机中速走，10%坡度',
    tags: ['跑步机', '走路', '爬坡', '10%', '高效燃脂']
  },
  {
    id: 'treadmill-walk-5-15',
    name: '跑步机走路 5km/h 坡度15%',
    category: 'cardio',
    met: 9.2,
    description: '跑步机中速走，15%极限坡度',
    tags: ['跑步机', '走路', '爬坡', '15%', '高强度']
  },
  {
    id: 'treadmill-walk-6-0',
    name: '跑步机快走 6km/h 坡度0%',
    category: 'cardio',
    met: 4.5,
    description: '跑步机快走，平地模式',
    tags: ['跑步机', '快走', '平地']
  },
  {
    id: 'treadmill-walk-6-5',
    name: '跑步机快走 6km/h 坡度5%',
    category: 'cardio',
    met: 6.8,
    description: '跑步机快走，5%坡度，热门减脂模式',
    tags: ['跑步机', '快走', '爬坡', '5%', '热门', '减脂']
  },
  {
    id: 'treadmill-walk-6-10',
    name: '跑步机快走 6km/h 坡度10%',
    category: 'cardio',
    met: 9.7,
    description: '跑步机快走，10%坡度，高效燃脂',
    tags: ['跑步机', '快走', '爬坡', '10%', '高效燃脂']
  },
  {
    id: 'treadmill-walk-6-15',
    name: '跑步机快走 6km/h 坡度15%',
    category: 'cardio',
    met: 12.5,
    description: '跑步机快走，15%极限坡度',
    tags: ['跑步机', '快走', '爬坡', '15%', '极限', '高强度']
  },

  // ==================== 跑步机慢跑 - 详细坡度/速度组合 ====================
  {
    id: 'treadmill-jog-6-0',
    name: '跑步机慢跑 6km/h 坡度0%',
    category: 'cardio',
    met: 6.0,
    description: '跑步机入门慢跑，平地',
    tags: ['跑步机', '慢跑', '平地', '入门']
  },
  {
    id: 'treadmill-jog-6-3',
    name: '跑步机慢跑 6km/h 坡度3%',
    category: 'cardio',
    met: 7.2,
    description: '跑步机慢跑，3%坡度模拟户外路感',
    tags: ['跑步机', '慢跑', '爬坡', '3%']
  },
  {
    id: 'treadmill-jog-6-5',
    name: '跑步机慢跑 6km/h 坡度5%',
    category: 'cardio',
    met: 9.1,
    description: '跑步机慢跑，5%坡度',
    tags: ['跑步机', '慢跑', '爬坡', '5%']
  },
  {
    id: 'treadmill-jog-8-0',
    name: '跑步机跑步 8km/h 坡度0%',
    category: 'cardio',
    met: 8.0,
    description: '跑步机中速跑，平地',
    tags: ['跑步机', '跑步', '平地', '中速']
  },
  {
    id: 'treadmill-jog-8-3',
    name: '跑步机跑步 8km/h 坡度3%',
    category: 'cardio',
    met: 9.6,
    description: '跑步机中速跑，3%坡度',
    tags: ['跑步机', '跑步', '爬坡', '3%']
  },
  {
    id: 'treadmill-jog-8-5',
    name: '跑步机跑步 8km/h 坡度5%',
    category: 'cardio',
    met: 12.2,
    description: '跑步机中速跑，5%坡度',
    tags: ['跑步机', '跑步', '爬坡', '5%', '高强度']
  },
  {
    id: 'treadmill-jog-8-8',
    name: '跑步机跑步 8km/h 坡度8%',
    category: 'cardio',
    met: 14.5,
    description: '跑步机中速跑，8%高坡度，极高强度',
    tags: ['跑步机', '跑步', '爬坡', '8%', '极限']
  },
  {
    id: 'treadmill-jog-10-0',
    name: '跑步机快跑 10km/h 坡度0%',
    category: 'cardio',
    met: 10.0,
    description: '跑步机快跑，平地',
    tags: ['跑步机', '快跑', '平地', '高强度']
  },
  {
    id: 'treadmill-jog-10-3',
    name: '跑步机快跑 10km/h 坡度3%',
    category: 'cardio',
    met: 12.0,
    description: '跑步机快跑，3%坡度',
    tags: ['跑步机', '快跑', '爬坡', '3%']
  },
  {
    id: 'treadmill-jog-10-5',
    name: '跑步机快跑 10km/h 坡度5%',
    category: 'cardio',
    met: 15.2,
    description: '跑步机快跑，5%坡度，极高强度',
    tags: ['跑步机', '快跑', '爬坡', '5%', '极限']
  },

  // ==================== 有氧运动 - 户外跑步 ====================
  {
    id: 'jog-slow',
    name: '慢跑（6km/h）',
    category: 'cardio',
    met: 6.0,
    description: '轻松慢跑，能正常交谈',
    tags: ['慢跑', '跑步', '有氧', '入门', '户外']
  },
  {
    id: 'run-normal',
    name: '跑步（8km/h）',
    category: 'cardio',
    met: 8.0,
    description: '中等配速跑步',
    tags: ['跑步', '有氧', '中等', '减脂', '户外']
  },
  {
    id: 'run-fast',
    name: '快跑（10km/h）',
    category: 'cardio',
    met: 10.0,
    description: '较快配速，6分钟配速',
    tags: ['跑步', '快跑', '有氧', '高强度', '户外']
  },
  {
    id: 'run-sprint',
    name: '快速跑（12km/h）',
    category: 'cardio',
    met: 11.5,
    description: '高速跑步，5分钟配速',
    tags: ['快跑', '高强度', '冲刺', '户外']
  },
  {
    id: 'run-very-fast',
    name: '高速冲刺（14km/h+）',
    category: 'cardio',
    met: 14.0,
    description: '接近全力冲刺',
    tags: ['冲刺', 'HIIT', '极限', '户外']
  },
  {
    id: 'hiit',
    name: 'HIIT高强度间歇',
    category: 'cardio',
    met: 12.0,
    description: '高强度间歇训练，间歇冲刺',
    tags: ['HIIT', '间歇', '高强度', '减脂', '燃脂']
  },

  // ==================== 有氧运动 - 骑行 ====================
  {
    id: 'bike-leisure',
    name: '休闲骑车（<16km/h）',
    category: 'cardio',
    met: 4.0,
    description: '通勤或休闲骑行',
    tags: ['骑车', '单车', '自行车', '休闲']
  },
  {
    id: 'bike-normal',
    name: '中速骑行（16-20km/h）',
    category: 'cardio',
    met: 6.0,
    description: '中等强度骑行',
    tags: ['骑车', '单车', '有氧']
  },
  {
    id: 'bike-fast',
    name: '快速骑行（20-25km/h）',
    category: 'cardio',
    met: 8.0,
    description: '较快速度骑行',
    tags: ['骑车', '快速', '有氧']
  },
  {
    id: 'bike-spinning',
    name: '动感单车',
    category: 'cardio',
    met: 8.5,
    description: '室内动感单车课程',
    tags: ['动感单车', 'spinning', '室内', '有氧', '减脂']
  },
  {
    id: 'bike-spinning-hard',
    name: '动感单车（高强度）',
    category: 'cardio',
    met: 11.0,
    description: '高强度动感单车',
    tags: ['动感单车', '高强度', '减脂']
  },

  // ==================== 有氧运动 - 游泳 ====================
  {
    id: 'swim-leisure',
    name: '休闲游泳',
    category: 'cardio',
    met: 5.0,
    description: '轻松游泳，休闲为主',
    tags: ['游泳', '休闲', '有氧']
  },
  {
    id: 'swim-breaststroke',
    name: '蛙泳（中速）',
    category: 'cardio',
    met: 5.3,
    description: '蛙泳中等速度',
    tags: ['游泳', '蛙泳', '有氧']
  },
  {
    id: 'swim-backstroke',
    name: '仰泳（中速）',
    category: 'cardio',
    met: 4.8,
    description: '仰泳中等速度',
    tags: ['游泳', '仰泳', '有氧']
  },
  {
    id: 'swim-freestyle',
    name: '自由泳（中速）',
    category: 'cardio',
    met: 8.0,
    description: '自由泳中等速度',
    tags: ['游泳', '自由泳', '有氧', '减脂']
  },
  {
    id: 'swim-freestyle-fast',
    name: '自由泳（快速）',
    category: 'cardio',
    met: 11.5,
    description: '自由泳高速游',
    tags: ['游泳', '自由泳', '高强度']
  },
  {
    id: 'swim-butterfly',
    name: '蝶泳',
    category: 'cardio',
    met: 11.5,
    description: '蝶泳，高强度',
    tags: ['游泳', '蝶泳', '高强度']
  },

  // ==================== 有氧运动 - 其他 ====================
  {
    id: 'rope-jump-slow',
    name: '跳绳（慢速<100次/分）',
    category: 'cardio',
    met: 8.8,
    description: '慢速跳绳',
    tags: ['跳绳', '有氧', '减脂']
  },
  {
    id: 'rope-jump-fast',
    name: '跳绳（快速100-120次/分）',
    category: 'cardio',
    met: 12.0,
    description: '快速跳绳',
    tags: ['跳绳', '高强度', '燃脂']
  },
  {
    id: 'rope-jump-very-fast',
    name: '跳绳（高速120+次/分）',
    category: 'cardio',
    met: 12.5,
    description: '高速跳绳',
    tags: ['跳绳', '极限', '燃脂']
  },
  {
    id: 'rowing-machine',
    name: '划船机',
    category: 'cardio',
    met: 6.0,
    description: '划船机训练',
    tags: ['划船机', '有氧', '全身']
  },
  {
    id: 'rowing-machine-hard',
    name: '划船机（高强度）',
    category: 'cardio',
    met: 8.5,
    description: '高强度划船机',
    tags: ['划船机', '高强度', '全身']
  },
  {
    id: 'elliptical',
    name: '椭圆机',
    category: 'cardio',
    met: 5.0,
    description: '椭圆机训练',
    tags: ['椭圆机', '有氧', '低冲击']
  },
  {
    id: 'elliptical-hard',
    name: '椭圆机（高强度）',
    category: 'cardio',
    met: 8.0,
    description: '高强度椭圆机',
    tags: ['椭圆机', '高强度', '低冲击']
  },
  {
    id: 'stair-climb',
    name: '爬楼梯',
    category: 'cardio',
    met: 8.0,
    description: '爬楼梯或楼梯机',
    tags: ['爬楼梯', '楼梯机', '有氧', '腿部']
  },
  {
    id: 'stair-climb-fast',
    name: '快速爬楼梯',
    category: 'cardio',
    met: 10.0,
    description: '快速爬楼梯',
    tags: ['爬楼梯', '高强度', '燃脂']
  },
  {
    id: 'aerobics-low',
    name: '低强度有氧操',
    category: 'cardio',
    met: 5.0,
    description: '低冲击有氧操课',
    tags: ['有氧操', '健身操', '团课']
  },
  {
    id: 'aerobics-high',
    name: '高强度有氧操',
    category: 'cardio',
    met: 7.0,
    description: '高强度有氧操课',
    tags: ['有氧操', '健身操', '团课', '减脂']
  },
  {
    id: 'zumba',
    name: 'Zumba/尊巴舞',
    category: 'cardio',
    met: 7.5,
    description: '尊巴舞课程',
    tags: ['尊巴', 'Zumba', '舞蹈', '有氧']
  },
  {
    id: 'dance-general',
    name: '跳舞（一般）',
    category: 'cardio',
    met: 5.0,
    description: '一般舞蹈',
    tags: ['跳舞', '舞蹈', '有氧']
  },
  {
    id: 'dance-intense',
    name: '高强度舞蹈',
    category: 'cardio',
    met: 8.0,
    description: '高强度舞蹈如街舞',
    tags: ['跳舞', '街舞', '高强度']
  },

  // ==================== 力量训练 - 上肢 ====================
  {
    id: 'strength-chest',
    name: '胸部训练',
    category: 'strength',
    met: 5.0,
    description: '卧推、飞鸟、夹胸等胸部训练',
    tags: ['胸', '胸肌', '卧推', '力量', '无氧', '增肌']
  },
  {
    id: 'strength-back',
    name: '背部训练',
    category: 'strength',
    met: 5.0,
    description: '引体向上、划船、下拉等背部训练',
    tags: ['背', '背肌', '引体向上', '划船', '力量', '无氧', '增肌']
  },
  {
    id: 'strength-shoulder',
    name: '肩部训练',
    category: 'strength',
    met: 4.5,
    description: '推举、侧平举等肩部训练',
    tags: ['肩', '肩膀', '三角肌', '推举', '力量', '无氧', '增肌']
  },
  {
    id: 'strength-arm-bicep',
    name: '肱二头肌训练',
    category: 'strength',
    met: 4.0,
    description: '弯举等肱二头肌训练',
    tags: ['手臂', '二头', '弯举', '力量', '无氧', '增肌']
  },
  {
    id: 'strength-arm-tricep',
    name: '肱三头肌训练',
    category: 'strength',
    met: 4.0,
    description: '臂屈伸、下压等肱三头肌训练',
    tags: ['手臂', '三头', '臂屈伸', '力量', '无氧', '增肌']
  },

  // ==================== 力量训练 - 下肢 ====================
  {
    id: 'strength-leg',
    name: '腿部训练',
    category: 'strength',
    met: 6.0,
    description: '深蹲、腿举、腿弯举等腿部训练',
    tags: ['腿', '腿部', '深蹲', '力量', '无氧', '增肌']
  },
  {
    id: 'strength-glute',
    name: '臀部训练',
    category: 'strength',
    met: 5.5,
    description: '臀推、臀桥、硬拉等臀部训练',
    tags: ['臀', '臀部', '臀推', '硬拉', '力量', '无氧', '翘臀']
  },
  {
    id: 'strength-calf',
    name: '小腿训练',
    category: 'strength',
    met: 4.0,
    description: '提踵等小腿训练',
    tags: ['小腿', '提踵', '力量', '无氧']
  },

  // ==================== 力量训练 - 核心/全身 ====================
  {
    id: 'strength-core',
    name: '核心训练',
    category: 'strength',
    met: 4.0,
    description: '卷腹、平板支撑等核心训练',
    tags: ['核心', '腹肌', '卷腹', '平板支撑', '力量', '无氧']
  },
  {
    id: 'strength-full-body',
    name: '全身力量训练',
    category: 'strength',
    met: 6.0,
    description: '全身性复合动作训练',
    tags: ['全身', '复合', '力量', '无氧', '增肌']
  },
  {
    id: 'strength-circuit',
    name: '循环力量训练',
    category: 'strength',
    met: 8.0,
    description: '高强度循环训练',
    tags: ['循环', '力量', 'circuit', '高强度', '燃脂']
  },
  {
    id: 'crossfit',
    name: 'CrossFit训练',
    category: 'strength',
    met: 10.0,
    description: 'CrossFit综合训练',
    tags: ['CrossFit', '综合', '高强度', '全身']
  },
  {
    id: 'kettlebell',
    name: '壶铃训练',
    category: 'strength',
    met: 6.0,
    description: '壶铃摇摆、抓举等',
    tags: ['壶铃', '功能性', '全身', '力量']
  },

  // ==================== 力量训练 - 自重 ====================
  {
    id: 'pushup',
    name: '俯卧撑',
    category: 'strength',
    met: 3.5,
    description: '标准俯卧撑',
    tags: ['俯卧撑', '自重', '胸', '三头']
  },
  {
    id: 'pullup',
    name: '引体向上',
    category: 'strength',
    met: 4.0,
    description: '引体向上',
    tags: ['引体向上', '自重', '背', '二头']
  },
  {
    id: 'squat-bodyweight',
    name: '自重深蹲',
    category: 'strength',
    met: 4.0,
    description: '徒手深蹲',
    tags: ['深蹲', '自重', '腿', '臀']
  },
  {
    id: 'burpee',
    name: '波比跳',
    category: 'strength',
    met: 10.0,
    description: '波比跳/Burpee',
    tags: ['波比跳', 'burpee', '全身', '高强度', '燃脂']
  },
  {
    id: 'plank',
    name: '平板支撑',
    category: 'strength',
    met: 3.0,
    description: '静态平板支撑',
    tags: ['平板支撑', '核心', '自重']
  },
  {
    id: 'lunges',
    name: '弓步蹲',
    category: 'strength',
    met: 4.5,
    description: '弓步蹲/箭步蹲',
    tags: ['弓步蹲', '箭步蹲', '腿', '臀']
  },

  // ==================== 柔韧性训练 ====================
  {
    id: 'yoga-hatha',
    name: '哈他瑜伽',
    category: 'flexibility',
    met: 2.5,
    description: '基础哈他瑜伽',
    tags: ['瑜伽', '哈他', '拉伸', '柔韧']
  },
  {
    id: 'yoga-vinyasa',
    name: '流瑜伽',
    category: 'flexibility',
    met: 4.0,
    description: '流瑜伽/Vinyasa',
    tags: ['瑜伽', '流瑜伽', 'Vinyasa']
  },
  {
    id: 'yoga-power',
    name: '力量瑜伽',
    category: 'flexibility',
    met: 5.5,
    description: '力量瑜伽/阿斯汤加',
    tags: ['瑜伽', '力量瑜伽', '阿斯汤加']
  },
  {
    id: 'yoga-hot',
    name: '高温瑜伽',
    category: 'flexibility',
    met: 5.0,
    description: '高温瑜伽/热瑜伽',
    tags: ['瑜伽', '高温瑜伽', '热瑜伽']
  },
  {
    id: 'pilates',
    name: '普拉提',
    category: 'flexibility',
    met: 3.0,
    description: '垫上普拉提',
    tags: ['普拉提', 'Pilates', '核心']
  },
  {
    id: 'pilates-reformer',
    name: '器械普拉提',
    category: 'flexibility',
    met: 4.0,
    description: '床式器械普拉提',
    tags: ['普拉提', '器械', '核心']
  },
  {
    id: 'stretching',
    name: '拉伸/放松',
    category: 'flexibility',
    met: 2.3,
    description: '静态拉伸放松',
    tags: ['拉伸', '放松', '柔韧']
  },
  {
    id: 'foam-rolling',
    name: '泡沫轴放松',
    category: 'flexibility',
    met: 2.0,
    description: '泡沫轴筋膜放松',
    tags: ['泡沫轴', '筋膜放松', '恢复']
  },
  {
    id: 'taichi',
    name: '太极拳',
    category: 'flexibility',
    met: 3.5,
    description: '太极拳',
    tags: ['太极', '太极拳', '传统']
  },

  // ==================== 球类运动 ====================
  {
    id: 'basketball-casual',
    name: '篮球（休闲）',
    category: 'sports',
    met: 6.0,
    description: '休闲打篮球',
    tags: ['篮球', '球类', '休闲']
  },
  {
    id: 'basketball-game',
    name: '篮球（比赛）',
    category: 'sports',
    met: 8.0,
    description: '篮球比赛',
    tags: ['篮球', '球类', '比赛', '高强度']
  },
  {
    id: 'soccer',
    name: '足球',
    category: 'sports',
    met: 7.0,
    description: '足球运动',
    tags: ['足球', '球类']
  },
  {
    id: 'badminton-casual',
    name: '羽毛球（休闲）',
    category: 'sports',
    met: 4.5,
    description: '休闲打羽毛球',
    tags: ['羽毛球', '球类', '休闲']
  },
  {
    id: 'badminton-game',
    name: '羽毛球（比赛）',
    category: 'sports',
    met: 7.0,
    description: '羽毛球比赛',
    tags: ['羽毛球', '球类', '比赛']
  },
  {
    id: 'tennis-singles',
    name: '网球（单打）',
    category: 'sports',
    met: 7.0,
    description: '网球单打',
    tags: ['网球', '球类', '单打']
  },
  {
    id: 'tennis-doubles',
    name: '网球（双打）',
    category: 'sports',
    met: 5.0,
    description: '网球双打',
    tags: ['网球', '球类', '双打']
  },
  {
    id: 'pingpong',
    name: '乒乓球',
    category: 'sports',
    met: 4.0,
    description: '乒乓球',
    tags: ['乒乓球', '球类']
  },
  {
    id: 'volleyball',
    name: '排球',
    category: 'sports',
    met: 4.0,
    description: '排球运动',
    tags: ['排球', '球类']
  },
  {
    id: 'golf',
    name: '高尔夫',
    category: 'sports',
    met: 3.5,
    description: '高尔夫球',
    tags: ['高尔夫', '球类', '休闲']
  },
  {
    id: 'bowling',
    name: '保龄球',
    category: 'sports',
    met: 3.0,
    description: '保龄球',
    tags: ['保龄球', '球类', '休闲']
  },

  // ==================== 日常活动 ====================
  {
    id: 'housework-light',
    name: '轻度家务',
    category: 'daily',
    met: 2.5,
    description: '打扫、整理等轻度家务',
    tags: ['家务', '日常', '轻度']
  },
  {
    id: 'housework-heavy',
    name: '重度家务',
    category: 'daily',
    met: 4.0,
    description: '搬运、大扫除等重度家务',
    tags: ['家务', '日常', '重度']
  },
  {
    id: 'cooking',
    name: '做饭',
    category: 'daily',
    met: 2.5,
    description: '做饭烹饪',
    tags: ['做饭', '烹饪', '日常']
  },
  {
    id: 'standing-work',
    name: '站立工作',
    category: 'daily',
    met: 2.0,
    description: '站立办公或工作',
    tags: ['站立', '工作', '日常']
  },
  {
    id: 'sitting-work',
    name: '坐姿工作',
    category: 'daily',
    met: 1.5,
    description: '坐着办公或工作',
    tags: ['坐', '工作', '日常', '久坐']
  },
  {
    id: 'shopping',
    name: '逛街购物',
    category: 'daily',
    met: 2.3,
    description: '逛街购物',
    tags: ['逛街', '购物', '日常']
  },
  {
    id: 'gardening',
    name: '园艺活动',
    category: 'daily',
    met: 3.5,
    description: '园艺、种植等',
    tags: ['园艺', '种植', '日常']
  },
  {
    id: 'play-kids',
    name: '陪孩子玩耍',
    category: 'daily',
    met: 4.0,
    description: '与孩子一起活动',
    tags: ['带娃', '孩子', '日常']
  },
  {
    id: 'stroll',
    name: '饭后散步',
    category: 'daily',
    met: 2.5,
    description: '饭后慢悠悠散步，促消化',
    tags: ['散步', '饭后', '溜达', '日常', '轻度']
  },
  {
    id: 'walk-leisure',
    name: '遛弯/休闲散步',
    category: 'daily',
    met: 2.8,
    description: '漫无目的闲逛，轻松散心',
    tags: ['遛弯', '散步', '溜达', '日常']
  },
  {
    id: 'dog-walk',
    name: '遛狗',
    category: 'daily',
    met: 3.0,
    description: '带狗散步，需要时走时停',
    tags: ['遛狗', '散步', '日常', '宠物']
  },
  {
    id: 'commute-walk',
    name: '步行上下班/上下学',
    category: 'daily',
    met: 3.5,
    description: '步行通勤，保持一定速度',
    tags: ['步行', '上班', '通勤', '日常']
  },
  {
    id: 'morning-exercise',
    name: '晨练（广播体操/早操）',
    category: 'daily',
    met: 3.5,
    description: '广播体操、伸展操等早间活动',
    tags: ['早操', '广播体操', '晨练', '日常']
  },
  {
    id: 'square-dance',
    name: '广场舞',
    category: 'daily',
    met: 5.5,
    description: '广场舞，中低强度有节奏舞蹈',
    tags: ['广场舞', '跳舞', '日常', '社交']
  },
  {
    id: 'baduanjin',
    name: '八段锦/气功',
    category: 'daily',
    met: 2.5,
    description: '八段锦、五禽戏等传统功法',
    tags: ['八段锦', '气功', '五禽戏', '传统', '日常']
  },
  {
    id: 'hiking',
    name: '爬山/郊外徒步',
    category: 'daily',
    met: 6.0,
    description: '山地徒步，强度根据地形变化',
    tags: ['爬山', '登山', '徒步', '户外', '日常']
  },
  {
    id: 'hiking-flat',
    name: '户外平地徒步',
    category: 'daily',
    met: 4.0,
    description: '平地郊外徒步，公园长距离步行',
    tags: ['徒步', '公园', '户外', '散步', '日常']
  },
  {
    id: 'stairs-daily',
    name: '日常爬楼梯（步行）',
    category: 'daily',
    met: 4.0,
    description: '日常走楼梯代替电梯',
    tags: ['爬楼梯', '楼梯', '日常', '轻松']
  },
  {
    id: 'supermarket',
    name: '逛超市/菜市场',
    category: 'daily',
    met: 2.3,
    description: '超市或菜市场购物，边走边停',
    tags: ['购物', '超市', '菜市场', '日常']
  },
  {
    id: 'standing-long',
    name: '长时间站立（餐厅/商场）',
    category: 'daily',
    met: 2.0,
    description: '长时间站立，如服务员、导购',
    tags: ['站立', '日常', '工作']
  },
  {
    id: 'bike-commute',
    name: '骑车上下班',
    category: 'daily',
    met: 4.0,
    description: '通勤骑行，中等速度',
    tags: ['骑车', '通勤', '上班', '日常']
  },
  {
    id: 'move-house',
    name: '搬运重物/搬家',
    category: 'daily',
    met: 5.0,
    description: '搬运重物、搬家等体力活动',
    tags: ['搬运', '搬家', '日常', '体力活']
  },

  // ==================== B站跟练 - 帕梅拉 Pamela Reif ====================
  {
    id: 'bilibili-pamela-endorphin',
    name: '帕梅拉·内啡肽有氧（10分钟）',
    category: 'cardio',
    met: 8.5,
    description: '高强度有氧舞步，内啡肽飙升，B站6000万播放',
    tags: ['帕梅拉', 'Pamela', 'B站跟练', '有氧舞蹈', '高强度', '燃脂', '10分钟', '跟练']
  },
  {
    id: 'bilibili-pamela-hiit-10',
    name: '帕梅拉·全身HIIT燃脂（10分钟）',
    category: 'cardio',
    met: 9.0,
    description: '无器械全身HIIT，高效燃脂，B站3000万播放',
    tags: ['帕梅拉', 'Pamela', 'B站跟练', 'HIIT', '高强度', '燃脂', '无器械', '10分钟', '跟练']
  },
  {
    id: 'bilibili-pamela-jump-15',
    name: '帕梅拉·跳跃有氧进阶（15分钟）',
    category: 'cardio',
    met: 7.5,
    description: '中高强度跳跃有氧，全程站立，趣味燃脂',
    tags: ['帕梅拉', 'Pamela', 'B站跟练', '跳跃有氧', '中高强度', '15分钟', '跟练']
  },
  {
    id: 'bilibili-pamela-hiit-best',
    name: '帕梅拉·最佳HIIT合集（10分钟）',
    category: 'cardio',
    met: 9.5,
    description: '帕梅拉精华HIIT合集，极高强度全身燃脂',
    tags: ['帕梅拉', 'Pamela', 'B站跟练', 'HIIT', '极限', '合集', '10分钟', '跟练']
  },
  {
    id: 'bilibili-pamela-cpop-dance',
    name: '帕梅拉×Eleni·千禧中文金曲有氧（12分钟）',
    category: 'cardio',
    met: 6.5,
    description: '《快乐崇拜》《舞娘》《彩虹的微笑》中文金曲有氧舞蹈',
    tags: ['帕梅拉', 'Pamela', 'Eleni', 'B站跟练', '中文歌', '有氧舞蹈', '中强度', '12分钟', '跟练', '快乐']
  },
  {
    id: 'bilibili-pamela-newyear-step',
    name: '帕梅拉·马年踏步舞（10分钟）',
    category: 'cardio',
    met: 5.5,
    description: '2026马年特辑，民乐有氧踏步，老少皆宜',
    tags: ['帕梅拉', 'Pamela', 'B站跟练', '踏步舞', '新年', '低中强度', '10分钟', '跟练', '新手']
  },
  {
    id: 'bilibili-pamela-stretch',
    name: '帕梅拉·每日拉伸放松（8分钟）',
    category: 'flexibility',
    met: 3.0,
    description: '睡前及训练后拉伸放松，拒绝僵硬',
    tags: ['帕梅拉', 'Pamela', 'B站跟练', '拉伸', '放松', '睡前', '低强度', '8分钟', '跟练']
  },
  {
    id: 'bilibili-pamela-40min-cpop',
    name: '帕梅拉·CPOP金曲连跳（40分钟）',
    category: 'cardio',
    met: 6.0,
    description: '40分钟中文流行歌曲连跳，马年直播回放',
    tags: ['帕梅拉', 'Pamela', 'B站跟练', '中文歌', '有氧舞蹈', '中强度', '40分钟', '跟练', '长时间']
  },
  {
    id: 'bilibili-pamela-2000-steps',
    name: '帕梅拉·2000步有氧（20分钟）',
    category: 'cardio',
    met: 5.5,
    description: '20分钟低冲击踏步有氧，以2000步为目标，膝盖友好，适合在家跟练',
    tags: ['帕梅拉', 'Pamela', 'B站跟练', '踏步有氧', '低冲击', '中强度', '20分钟', '跟练', '膝盖友好', '新手']
  },

  // ==================== B站跟练 - Jo姐 (growwithjo) ====================
  {
    id: 'bilibili-jo-morning-30',
    name: 'Jo姐·巨燃脂早操（30分钟）',
    category: 'cardio',
    met: 5.5,
    description: '唤醒活力提高代谢，站立有氧，膝盖友好',
    tags: ['Jo姐', 'growwithjo', 'B站跟练', '早操', '有氧操', '中强度', '30分钟', '跟练', '膝盖友好']
  },
  {
    id: 'bilibili-jo-fullbody-30',
    name: 'Jo姐·全身有氧训练（30分钟）',
    category: 'cardio',
    met: 5.5,
    description: '改善心情提升状态，全身有氧训练',
    tags: ['Jo姐', 'growwithjo', 'B站跟练', '全身有氧', '中强度', '30分钟', '跟练']
  },
  {
    id: 'bilibili-jo-3000step',
    name: 'Jo姐·有氧踏步5km（40分钟）',
    category: 'cardio',
    met: 4.5,
    description: '全是耳熟英文歌，踏步燃脂5km，越跳越有劲',
    tags: ['Jo姐', 'growwithjo', 'B站跟练', '踏步', '有氧步行操', '低中强度', '40分钟', '跟练', '新手', '膝盖友好']
  },
  {
    id: 'bilibili-jo-kpop-30',
    name: 'Jo姐·KPOP晨间训练（30分钟）',
    category: 'cardio',
    met: 6.0,
    description: '9首KPOP男女团MV燃脂，开启新的一天',
    tags: ['Jo姐', 'growwithjo', 'B站跟练', 'KPOP', '有氧舞操', '中强度', '30分钟', '跟练', '韩舞']
  },
  {
    id: 'bilibili-jo-quick-20',
    name: 'Jo姐·省时有氧训练（20分钟）',
    category: 'cardio',
    met: 4.5,
    description: '新手必练，站立有氧，重在坚持',
    tags: ['Jo姐', 'growwithjo', 'B站跟练', '站立有氧', '新手', '20分钟', '跟练', '入门']
  },
  {
    id: 'bilibili-jo-low-8',
    name: 'Jo姐·低强度有氧（8分钟）',
    category: 'cardio',
    met: 3.5,
    description: '适合所有人，包括康复期和老年人',
    tags: ['Jo姐', 'growwithjo', 'B站跟练', '低强度', '8分钟', '跟练', '康复', '新手', '老年人']
  },

  // ==================== B站跟练 - 周六野 Zoey ====================
  {
    id: 'bilibili-zoey-waist-5',
    name: '周六野·5分钟瘦腰运动',
    category: 'cardio',
    met: 5.0,
    description: '快速瘦肚子马甲线，5分钟核心有氧，B站4700万播放',
    tags: ['周六野', 'Zoey', 'B站跟练', '瘦腰', '核心有氧', '马甲线', '5分钟', '跟练', '初学者']
  },
  {
    id: 'bilibili-zoey-hiit-10',
    name: '周六野·10分钟超燃脂HIIT有氧',
    category: 'cardio',
    met: 8.5,
    description: '不伤膝盖，比跑步更有效的燃脂减肥操',
    tags: ['周六野', 'Zoey', 'B站跟练', 'HIIT', '燃脂', '高强度', '10分钟', '跟练', '不伤膝盖']
  },
  {
    id: 'bilibili-zoey-standing-20',
    name: '周六野·20分钟站立燃脂有氧（进阶）',
    category: 'cardio',
    met: 7.0,
    description: '全程站立燃脂有氧，进阶版，中高强度',
    tags: ['周六野', 'Zoey', 'B站跟练', '站立有氧', '中高强度', '20分钟', '跟练', '进阶']
  },
  {
    id: 'bilibili-zoey-low-impact-20',
    name: '周六野·20分钟无跳跃低强度有氧',
    category: 'cardio',
    met: 4.5,
    description: '无跳动不伤膝盖，低强度减肥操，新手友好',
    tags: ['周六野', 'Zoey', 'B站跟练', '无跳跃', '低冲击', '低强度', '20分钟', '跟练', '新手', '膝盖友好']
  },

  // ==================== B站跟练 - Eleni Fit ====================
  {
    id: 'bilibili-eleni-standing-30',
    name: 'Eleni Fit·站立有氧训练（30分钟）',
    category: 'cardio',
    met: 5.5,
    description: '无跳跃无重复，瘦腹瘦大腿，膝盖友好，B站93万播放',
    tags: ['Eleni', 'Eleni Fit', 'B站跟练', '站立有氧', '无跳跃', '中强度', '30分钟', '跟练', '膝盖友好']
  },
  {
    id: 'bilibili-eleni-hiit-30',
    name: 'Eleni Fit·低冲击HIIT有氧（30分钟）',
    category: 'cardio',
    met: 7.0,
    description: '燃脂暴汗，健美操风格，无跳跃无重复，全程站立',
    tags: ['Eleni', 'Eleni Fit', 'B站跟练', '低冲击HIIT', '中高强度', '30分钟', '跟练', '暴汗']
  },

  // ==================== B站跟练 - 刘畊宏 ====================
  {
    id: 'bilibili-liu-aerobic-30',
    name: '刘畊宏·快乐健身操（30分钟）',
    category: 'cardio',
    met: 6.0,
    description: '全家欢乐跟练，B站1400万播放，附带拉伸',
    tags: ['刘畊宏', 'B站跟练', '健身操', '中强度', '30分钟', '跟练', '全家', '快乐']
  },
  {
    id: 'bilibili-liu-bencao-20',
    name: '刘畊宏·本草纲目毽子操（20分钟）',
    category: 'cardio',
    met: 7.0,
    description: '全网播放超10亿的现象级毽子操，中高强度',
    tags: ['刘畊宏', 'B站跟练', '毽子操', '中高强度', '20分钟', '跟练', '本草纲目', '爆款']
  },

  // ==================== B站跟练 - 其他热门UP主 ====================
  {
    id: 'bilibili-dada-aerobic-60',
    name: '达达有氧健身操（60分钟）',
    category: 'cardio',
    met: 5.5,
    description: '传统有氧健身操，适合中老年及全家跟练',
    tags: ['达达', 'B站跟练', '有氧健身操', '中强度', '60分钟', '跟练', '中老年', '传统']
  },
  {
    id: 'bilibili-mizi-standing-25',
    name: 'MIZI·无跳无蹲站立塑形操（25分钟）',
    category: 'cardio',
    met: 4.5,
    description: '腹部无跳跃燃脂，全程站立，适合体态改善',
    tags: ['MIZI', 'B站跟练', '站立塑形', '无跳跃', '低中强度', '25分钟', '跟练', '新手', '体态']
  },
  {
    id: 'bilibili-keep-hiit-20',
    name: 'Keep·燃脂HIIT操（20分钟）',
    category: 'cardio',
    met: 7.5,
    description: 'Keep官方跟练，中高强度燃脂HIIT，打卡减脂',
    tags: ['Keep', 'B站跟练', 'HIIT', '燃脂', '中高强度', '20分钟', '跟练', '打卡']
  },
  {
    id: 'bilibili-keep-aerobic-15',
    name: 'Keep·有氧减脂操（15分钟）',
    category: 'cardio',
    met: 6.0,
    description: 'Keep官方15分钟有氧减脂，适合上班族碎片时间',
    tags: ['Keep', 'B站跟练', '有氧操', '中强度', '15分钟', '跟练', '上班族', '碎片时间']
  },
];

// 运动分类显示名称
export const EXERCISE_CATEGORY_NAMES: Record<string, string> = {
  cardio: '有氧运动',
  strength: '力量训练',
  flexibility: '柔韧性训练',
  sports: '球类运动',
  daily: '日常活动'
};

// 力量训练部位显示名称
export const MUSCLE_GROUP_NAMES: Record<string, string> = {
  chest: '胸部',
  back: '背部',
  shoulder: '肩部',
  arm: '手臂',
  core: '核心',
  glute: '臀部',
  leg: '腿部',
  full: '全身'
};

/**
 * 计算运动消耗的热量
 * @param met MET值
 * @param weightKg 体重(kg)
 * @param durationMinutes 时长(分钟)
 * @returns 消耗的卡路里
 */
export function calculateCaloriesBurned(met: number, weightKg: number, durationMinutes: number): number {
  const hours = durationMinutes / 60;
  return Math.round(met * weightKg * hours);
}

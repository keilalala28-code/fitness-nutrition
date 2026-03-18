import { FoodItem } from '@/types/nutrition';

// 便利店食物数据库
// 数据来源：7-ELEVEN、全家FamilyMart、罗森Lawson等连锁便利店营养标签
// 以及香港/内地便利店车仔面、关东煮等热食数据
// 所有营养数据均为每100g含量（关东煮单品注明每件重量）

export const CONVENIENCE_FOODS: FoodItem[] = [

  // ==================== 车仔面 ====================
  {
    id: 'cv-noodle-clear',
    name: '车仔面（清汤底）',
    category: 'convenience',
    nutrients: { calories: 128, protein: 4.5, carbs: 20.0, fat: 3.2, sodium: 520 },
    servingSize: 300,
    servingUnit: '一碗约300g',
    tags: ['车仔面', '清汤面', '便利店', '面食', '香港', '港式']
  },
  {
    id: 'cv-noodle-curry',
    name: '车仔面（咖喱汤底）',
    category: 'convenience',
    nutrients: { calories: 142, protein: 4.8, carbs: 21.0, fat: 4.5, sodium: 610 },
    servingSize: 300,
    servingUnit: '一碗约300g',
    tags: ['车仔面', '咖喱面', '便利店', '面食', '香港', '港式', '咖喱']
  },
  {
    id: 'cv-noodle-spicy-beef',
    name: '车仔面（香辣牛腩）',
    category: 'convenience',
    nutrients: { calories: 158, protein: 7.5, carbs: 19.5, fat: 5.8, sodium: 680 },
    servingSize: 350,
    servingUnit: '一碗约350g',
    tags: ['车仔面', '牛腩面', '便利店', '面食', '香港', '港式', '辣']
  },
  {
    id: 'cv-noodle-tomato',
    name: '车仔面（番茄汤底）',
    category: 'convenience',
    nutrients: { calories: 118, protein: 4.2, carbs: 19.0, fat: 2.8, sodium: 480 },
    servingSize: 300,
    servingUnit: '一碗约300g',
    tags: ['车仔面', '番茄面', '便利店', '面食', '香港', '港式']
  },
  {
    id: 'cv-noodle-pork-bone',
    name: '车仔面（猪骨浓汤）',
    category: 'convenience',
    nutrients: { calories: 145, protein: 5.5, carbs: 20.5, fat: 4.8, sodium: 590 },
    servingSize: 320,
    servingUnit: '一碗约320g',
    tags: ['车仔面', '猪骨汤面', '便利店', '面食', '香港', '浓汤']
  },

  // ==================== 关东煮 ====================
  {
    id: 'oden-fish-tofu',
    name: '关东煮鱼豆腐',
    category: 'convenience',
    nutrients: { calories: 152, protein: 12.0, carbs: 12.5, fat: 6.0, sodium: 580 },
    servingSize: 50,
    servingUnit: '一块约50g',
    tags: ['关东煮', '鱼豆腐', '便利店', '关东', '鱼糜', '加工食品']
  },
  {
    id: 'oden-daikon',
    name: '关东煮白萝卜',
    category: 'convenience',
    nutrients: { calories: 22, protein: 0.9, carbs: 4.5, fat: 0.1, fiber: 1.6, sodium: 280 },
    servingSize: 100,
    servingUnit: '一块约100g',
    tags: ['关东煮', '白萝卜', '便利店', '低卡', '蔬菜']
  },
  {
    id: 'oden-konjac',
    name: '关东煮魔芋',
    category: 'convenience',
    nutrients: { calories: 12, protein: 0.3, carbs: 2.8, fat: 0.1, fiber: 2.2, sodium: 240 },
    servingSize: 80,
    servingUnit: '一块约80g',
    tags: ['关东煮', '魔芋', '便利店', '低卡', '减脂', '零卡']
  },
  {
    id: 'oden-egg',
    name: '关东煮卤蛋',
    category: 'convenience',
    nutrients: { calories: 158, protein: 13.5, carbs: 1.2, fat: 11.0, sodium: 480 },
    servingSize: 55,
    servingUnit: '一个约55g',
    tags: ['关东煮', '卤蛋', '鸡蛋', '便利店', '高蛋白', '增肌']
  },
  {
    id: 'oden-luncheon-meat',
    name: '关东煮午餐肉',
    category: 'convenience',
    nutrients: { calories: 198, protein: 11.5, carbs: 7.8, fat: 14.0, sodium: 820 },
    servingSize: 60,
    servingUnit: '一块约60g',
    tags: ['关东煮', '午餐肉', '便利店', '猪肉', '加工肉']
  },
  {
    id: 'oden-fish-ball',
    name: '关东煮鱼丸',
    category: 'convenience',
    nutrients: { calories: 118, protein: 10.5, carbs: 10.0, fat: 3.8, sodium: 520 },
    servingSize: 35,
    servingUnit: '一颗约35g',
    tags: ['关东煮', '鱼丸', '便利店', '鱼糜', '港式']
  },
  {
    id: 'oden-pork-ball',
    name: '关东煮贡丸',
    category: 'convenience',
    nutrients: { calories: 158, protein: 13.0, carbs: 7.5, fat: 8.5, sodium: 620 },
    servingSize: 35,
    servingUnit: '一颗约35g',
    tags: ['关东煮', '贡丸', '猪肉丸', '便利店', '肉丸']
  },
  {
    id: 'oden-kelp',
    name: '关东煮海带结',
    category: 'convenience',
    nutrients: { calories: 36, protein: 1.6, carbs: 7.2, fat: 0.2, fiber: 3.8, sodium: 320 },
    servingSize: 40,
    servingUnit: '一结约40g',
    tags: ['关东煮', '海带', '便利店', '低卡', '膳食纤维']
  },
  {
    id: 'oden-sausage',
    name: '关东煮香肠',
    category: 'convenience',
    nutrients: { calories: 272, protein: 11.5, carbs: 5.0, fat: 23.0, sodium: 780 },
    servingSize: 50,
    servingUnit: '一根约50g',
    tags: ['关东煮', '香肠', '便利店', '猪肉', '高热量']
  },
  {
    id: 'oden-fish-dumpling',
    name: '关东煮鱼饺',
    category: 'convenience',
    nutrients: { calories: 132, protein: 11.5, carbs: 10.0, fat: 5.2, sodium: 540 },
    servingSize: 30,
    servingUnit: '一个约30g',
    tags: ['关东煮', '鱼饺', '便利店', '鱼糜']
  },
  {
    id: 'oden-squid-ball',
    name: '关东煮花枝丸',
    category: 'convenience',
    nutrients: { calories: 122, protein: 11.5, carbs: 9.2, fat: 3.8, sodium: 560 },
    servingSize: 35,
    servingUnit: '一颗约35g',
    tags: ['关东煮', '花枝丸', '墨鱼丸', '鱿鱼丸', '便利店', '海鲜']
  },
  {
    id: 'oden-shrimp-ball',
    name: '关东煮虾丸',
    category: 'convenience',
    nutrients: { calories: 92, protein: 14.5, carbs: 5.0, fat: 1.8, sodium: 480 },
    servingSize: 30,
    servingUnit: '一颗约30g',
    tags: ['关东煮', '虾丸', '便利店', '海鲜', '低脂', '高蛋白']
  },
  {
    id: 'oden-beef-tendon',
    name: '关东煮牛筋',
    category: 'convenience',
    nutrients: { calories: 105, protein: 18.5, carbs: 2.0, fat: 2.8, sodium: 520 },
    servingSize: 60,
    servingUnit: '一串约60g',
    tags: ['关东煮', '牛筋', '便利店', '牛肉', '高蛋白', '低脂']
  },
  {
    id: 'oden-tofu',
    name: '关东煮嫩豆腐',
    category: 'convenience',
    nutrients: { calories: 52, protein: 5.8, carbs: 1.8, fat: 2.5, sodium: 280 },
    servingSize: 100,
    servingUnit: '一块约100g',
    tags: ['关东煮', '豆腐', '便利店', '低卡', '植物蛋白']
  },
  {
    id: 'oden-chicken-wing',
    name: '关东煮鸡翅',
    category: 'convenience',
    nutrients: { calories: 188, protein: 16.5, carbs: 3.0, fat: 12.5, sodium: 560 },
    servingSize: 60,
    servingUnit: '一只约60g',
    tags: ['关东煮', '鸡翅', '便利店', '鸡肉']
  },

  // ==================== 烤肠 / 热食 ====================
  {
    id: 'cv-black-pepper-sausage',
    name: '黑椒烤肠',
    category: 'convenience',
    nutrients: { calories: 268, protein: 11.0, carbs: 7.5, fat: 21.5, sodium: 820 },
    servingSize: 80,
    servingUnit: '一根约80g',
    tags: ['黑椒烤肠', '烤肠', '便利店', '热食', '猪肉', '黑胡椒']
  },
  {
    id: 'cv-original-sausage',
    name: '原味热狗肠',
    category: 'convenience',
    nutrients: { calories: 248, protein: 10.5, carbs: 7.8, fat: 19.5, sodium: 750 },
    servingSize: 80,
    servingUnit: '一根约80g',
    tags: ['热狗肠', '原味肠', '烤肠', '便利店', '热食', '猪肉']
  },
  {
    id: 'cv-cheese-sausage',
    name: '芝士烤肠',
    category: 'convenience',
    nutrients: { calories: 285, protein: 12.5, carbs: 5.5, fat: 24.0, sodium: 880 },
    servingSize: 80,
    servingUnit: '一根约80g',
    tags: ['芝士肠', '芝士烤肠', '便利店', '热食', '奶酪', '高热量']
  },
  {
    id: 'cv-chicken-sausage',
    name: '鸡肉肠',
    category: 'convenience',
    nutrients: { calories: 178, protein: 14.5, carbs: 6.2, fat: 11.0, sodium: 680 },
    servingSize: 75,
    servingUnit: '一根约75g',
    tags: ['鸡肉肠', '鸡肉烤肠', '便利店', '热食', '鸡肉', '低脂']
  },
  {
    id: 'cv-crispy-hotdog',
    name: '脆皮热狗',
    category: 'convenience',
    nutrients: { calories: 252, protein: 8.5, carbs: 22.0, fat: 14.5, sodium: 580 },
    servingSize: 120,
    servingUnit: '一个约120g',
    tags: ['脆皮热狗', '热狗', '便利店', '热食', '面包', '猪肉']
  },
  {
    id: 'cv-braised-chicken-wing',
    name: '卤鸡翅',
    category: 'convenience',
    nutrients: { calories: 208, protein: 18.5, carbs: 2.5, fat: 14.0, sodium: 620 },
    servingSize: 60,
    servingUnit: '一只约60g',
    tags: ['卤鸡翅', '便利店', '鸡翅', '热食', '卤味']
  },
  {
    id: 'cv-orleans-chicken-wing',
    name: '奥尔良烤鸡翅',
    category: 'convenience',
    nutrients: { calories: 228, protein: 17.5, carbs: 5.5, fat: 15.5, sodium: 580 },
    servingSize: 60,
    servingUnit: '一只约60g',
    tags: ['奥尔良鸡翅', '烤鸡翅', '便利店', '热食', '鸡翅']
  },
  {
    id: 'cv-fried-chicken-leg',
    name: '便利店炸鸡腿',
    category: 'convenience',
    nutrients: { calories: 238, protein: 16.5, carbs: 11.5, fat: 14.5, sodium: 520 },
    servingSize: 150,
    servingUnit: '一个约150g',
    tags: ['炸鸡腿', '便利店', '炸鸡', '热食', '鸡腿']
  },
  {
    id: 'cv-roasted-sweet-potato',
    name: '烤地瓜',
    category: 'convenience',
    nutrients: { calories: 86, protein: 1.6, carbs: 20.5, fat: 0.1, fiber: 2.5 },
    servingSize: 200,
    servingUnit: '一个约200g',
    tags: ['烤地瓜', '烤红薯', '便利店', '低脂', '健康', '粗粮']
  },
  {
    id: 'cv-corn',
    name: '便利店煮玉米',
    category: 'convenience',
    nutrients: { calories: 112, protein: 4.0, carbs: 22.5, fat: 1.5, fiber: 2.8 },
    servingSize: 250,
    servingUnit: '一根约250g',
    tags: ['玉米', '煮玉米', '便利店', '低脂', '健康', '粗粮']
  },

  // ==================== 饭团 ====================
  {
    id: 'cv-onigiri-tuna',
    name: '金枪鱼饭团',
    category: 'convenience',
    nutrients: { calories: 168, protein: 5.8, carbs: 30.5, fat: 3.0, sodium: 380 },
    servingSize: 110,
    servingUnit: '一个约110g',
    tags: ['饭团', '金枪鱼饭团', '便利店', '主食', '日式', '低脂']
  },
  {
    id: 'cv-onigiri-plum',
    name: '梅子饭团',
    category: 'convenience',
    nutrients: { calories: 155, protein: 3.2, carbs: 33.5, fat: 0.8, sodium: 420 },
    servingSize: 100,
    servingUnit: '一个约100g',
    tags: ['饭团', '梅子饭团', '便利店', '主食', '日式', '低脂']
  },
  {
    id: 'cv-onigiri-salmon',
    name: '三文鱼饭团',
    category: 'convenience',
    nutrients: { calories: 178, protein: 6.5, carbs: 29.5, fat: 4.2, sodium: 360 },
    servingSize: 115,
    servingUnit: '一个约115g',
    tags: ['饭团', '三文鱼饭团', '鲑鱼饭团', '便利店', '主食', '日式']
  },
  {
    id: 'cv-onigiri-bbq-pork',
    name: '叉烧饭团',
    category: 'convenience',
    nutrients: { calories: 188, protein: 7.0, carbs: 30.0, fat: 4.8, sodium: 520 },
    servingSize: 120,
    servingUnit: '一个约120g',
    tags: ['饭团', '叉烧饭团', '便利店', '主食', '猪肉']
  },
  {
    id: 'cv-onigiri-seaweed-beef',
    name: '海苔牛肉饭团',
    category: 'convenience',
    nutrients: { calories: 195, protein: 7.5, carbs: 30.5, fat: 5.0, sodium: 480 },
    servingSize: 120,
    servingUnit: '一个约120g',
    tags: ['饭团', '海苔饭团', '牛肉饭团', '便利店', '主食']
  },

  // ==================== 三明治 / 面包主食 ====================
  {
    id: 'cv-sandwich-tuna',
    name: '金枪鱼三明治',
    category: 'convenience',
    nutrients: { calories: 210, protein: 9.5, carbs: 28.5, fat: 6.5, sodium: 520 },
    servingSize: 130,
    servingUnit: '一个约130g',
    tags: ['三明治', '金枪鱼三明治', '便利店', '主食', '低脂']
  },
  {
    id: 'cv-sandwich-ham-egg',
    name: '火腿蛋三明治',
    category: 'convenience',
    nutrients: { calories: 222, protein: 9.8, carbs: 29.0, fat: 7.5, sodium: 580 },
    servingSize: 135,
    servingUnit: '一个约135g',
    tags: ['三明治', '火腿蛋三明治', '便利店', '主食', '鸡蛋']
  },
  {
    id: 'cv-sandwich-chicken',
    name: '鸡肉三明治',
    category: 'convenience',
    nutrients: { calories: 198, protein: 11.5, carbs: 26.5, fat: 5.5, sodium: 490 },
    servingSize: 130,
    servingUnit: '一个约130g',
    tags: ['三明治', '鸡肉三明治', '便利店', '主食', '鸡肉', '低脂']
  },
  {
    id: 'cv-sandwich-club',
    name: '总汇三明治',
    category: 'convenience',
    nutrients: { calories: 238, protein: 12.5, carbs: 27.5, fat: 9.0, sodium: 620 },
    servingSize: 160,
    servingUnit: '一个约160g',
    tags: ['三明治', '总汇三明治', '便利店', '主食', '鸡蛋', '火腿']
  },

  // ==================== 便当 ====================
  {
    id: 'cv-bento-egg-rice',
    name: '蛋包饭便当',
    category: 'convenience',
    nutrients: { calories: 142, protein: 6.5, carbs: 22.5, fat: 3.8, sodium: 520 },
    servingSize: 350,
    servingUnit: '一盒约350g',
    tags: ['便当', '蛋包饭', '便利店', '主食', '鸡蛋']
  },
  {
    id: 'cv-bento-fried-chicken',
    name: '炸鸡便当',
    category: 'convenience',
    nutrients: { calories: 188, protein: 9.5, carbs: 24.5, fat: 6.0, sodium: 580 },
    servingSize: 380,
    servingUnit: '一盒约380g',
    tags: ['便当', '炸鸡便当', '便利店', '主食', '鸡肉']
  },
  {
    id: 'cv-bento-braised-pork',
    name: '红烧猪肉便当',
    category: 'convenience',
    nutrients: { calories: 168, protein: 8.8, carbs: 23.0, fat: 5.2, sodium: 560 },
    servingSize: 380,
    servingUnit: '一盒约380g',
    tags: ['便当', '猪肉便当', '便利店', '主食', '猪肉']
  },
  {
    id: 'cv-bento-beef',
    name: '红烧牛肉便当',
    category: 'convenience',
    nutrients: { calories: 162, protein: 9.2, carbs: 22.0, fat: 4.5, sodium: 540 },
    servingSize: 380,
    servingUnit: '一盒约380g',
    tags: ['便当', '牛肉便当', '便利店', '主食', '牛肉']
  },

  // ==================== 便利店包点 / 蒸煮 ====================
  {
    id: 'cv-pork-bun',
    name: '猪肉包',
    category: 'convenience',
    nutrients: { calories: 228, protein: 9.5, carbs: 32.5, fat: 7.0, sodium: 480 },
    servingSize: 100,
    servingUnit: '一个约100g',
    tags: ['猪肉包', '肉包', '便利店', '包子', '主食']
  },
  {
    id: 'cv-bbq-pork-bun',
    name: '叉烧包',
    category: 'convenience',
    nutrients: { calories: 242, protein: 9.0, carbs: 34.0, fat: 7.8, sodium: 520 },
    servingSize: 100,
    servingUnit: '一个约100g',
    tags: ['叉烧包', '便利店', '包子', '主食', '港式']
  },
  {
    id: 'cv-red-bean-bun',
    name: '豆沙包',
    category: 'convenience',
    nutrients: { calories: 248, protein: 6.2, carbs: 45.0, fat: 5.0, sodium: 180 },
    servingSize: 90,
    servingUnit: '一个约90g',
    tags: ['豆沙包', '便利店', '包子', '甜点', '豆沙']
  },
  {
    id: 'cv-tea-egg',
    name: '茶叶蛋',
    category: 'convenience',
    nutrients: { calories: 152, protein: 13.5, carbs: 1.5, fat: 10.5, sodium: 620 },
    servingSize: 55,
    servingUnit: '一个约55g',
    tags: ['茶叶蛋', '卤蛋', '便利店', '鸡蛋', '高蛋白', '增肌', '低碳']
  },
  {
    id: 'cv-sticky-rice-dumpling',
    name: '糯米鸡',
    category: 'convenience',
    nutrients: { calories: 228, protein: 8.5, carbs: 32.0, fat: 7.5, sodium: 640 },
    servingSize: 200,
    servingUnit: '一个约200g',
    tags: ['糯米鸡', '便利店', '糯米', '鸡肉', '主食', '港式']
  },

  // ==================== 关东煮配套 / 其他热食 ====================
  {
    id: 'cv-fried-tofu',
    name: '关东煮油豆腐',
    category: 'convenience',
    nutrients: { calories: 185, protein: 10.5, carbs: 4.5, fat: 14.0, sodium: 380 },
    servingSize: 40,
    servingUnit: '一块约40g',
    tags: ['油豆腐', '关东煮', '便利店', '豆腐', '豆制品']
  },
  {
    id: 'cv-crab-stick',
    name: '关东煮蟹柳',
    category: 'convenience',
    nutrients: { calories: 92, protein: 9.5, carbs: 8.5, fat: 2.2, sodium: 520 },
    servingSize: 30,
    servingUnit: '一条约30g',
    tags: ['蟹柳', '蟹肉棒', '关东煮', '便利店', '低脂', '低卡']
  },
  {
    id: 'cv-oden-broth',
    name: '关东煮汤（100ml）',
    category: 'convenience',
    nutrients: { calories: 18, protein: 1.2, carbs: 2.5, fat: 0.2, sodium: 620 },
    servingSize: 100,
    servingUnit: '100ml汤',
    tags: ['关东煮汤', '便利店', '汤底', '低卡']
  },

  // ==================== 即食面 / 杯面 ====================
  {
    id: 'cv-cup-noodle-seafood',
    name: '海鲜杯面',
    category: 'convenience',
    nutrients: { calories: 358, protein: 9.0, carbs: 55.0, fat: 12.5, sodium: 1580 },
    servingSize: 75,
    servingUnit: '一杯约75g（干重）',
    tags: ['杯面', '海鲜杯面', '便利店', '即食', '方便面', '高钠']
  },
  {
    id: 'cv-cup-noodle-spicy',
    name: '香辣牛肉杯面',
    category: 'convenience',
    nutrients: { calories: 368, protein: 9.5, carbs: 55.0, fat: 13.5, sodium: 1650 },
    servingSize: 75,
    servingUnit: '一杯约75g（干重）',
    tags: ['杯面', '牛肉杯面', '便利店', '即食', '方便面', '辣', '高钠']
  },
];

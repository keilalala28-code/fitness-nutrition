import { FoodItem } from '@/types/nutrition';

// 饮品数据库 - 奶茶、咖啡、果汁等
// 数据来源：各品牌官网公示、第三方检测数据
// 营养数据均为每100ml/100g含量

export const DRINK_FOODS: FoodItem[] = [
  // ==================== 喜茶 HEYTEA ====================
  {
    id: 'heytea-grape',
    name: '多肉葡萄',
    brand: '喜茶',
    category: 'drink',
    nutrients: { calories: 55, protein: 0.3, carbs: 13.0, fat: 0.2, sugar: 12.0 },
    servingSize: 500,
    servingUnit: '一杯约500ml',
    tags: ['喜茶', '多肉葡萄', '水果茶', '奶茶']
  },
  {
    id: 'heytea-mango',
    name: '芒芒甘露',
    brand: '喜茶',
    category: 'drink',
    nutrients: { calories: 68, protein: 0.8, carbs: 14.0, fat: 1.2, sugar: 13.0 },
    servingSize: 500,
    servingUnit: '一杯约500ml',
    tags: ['喜茶', '芒芒甘露', '芒果', '奶茶']
  },
  {
    id: 'heytea-cheese',
    name: '芝芝莓莓',
    brand: '喜茶',
    category: 'drink',
    nutrients: { calories: 75, protein: 1.5, carbs: 12.0, fat: 2.8, sugar: 10.0 },
    servingSize: 500,
    servingUnit: '一杯约500ml',
    tags: ['喜茶', '芝芝莓莓', '草莓', '芝士', '奶茶']
  },
  {
    id: 'heytea-green',
    name: '纯绿妍茶后',
    brand: '喜茶',
    category: 'drink',
    nutrients: { calories: 5, protein: 0.1, carbs: 1.0, fat: 0, sugar: 0 },
    servingSize: 500,
    servingUnit: '一杯约500ml',
    tags: ['喜茶', '绿茶', '无糖', '减脂']
  },

  // ==================== 奈雪の茶 ====================
  {
    id: 'nayuki-peach',
    name: '霸气芝士草莓',
    brand: '奈雪の茶',
    category: 'drink',
    nutrients: { calories: 72, protein: 1.2, carbs: 14.5, fat: 1.8, sugar: 12.0 },
    servingSize: 500,
    servingUnit: '一杯约500ml',
    tags: ['奈雪', '草莓', '芝士', '奶茶']
  },
  {
    id: 'nayuki-grape',
    name: '霸气葡萄',
    brand: '奈雪の茶',
    category: 'drink',
    nutrients: { calories: 52, protein: 0.3, carbs: 12.5, fat: 0.2, sugar: 11.0 },
    servingSize: 500,
    servingUnit: '一杯约500ml',
    tags: ['奈雪', '葡萄', '水果茶', '奶茶']
  },
  {
    id: 'nayuki-oat-latte',
    name: '燕麦拿铁',
    brand: '奈雪の茶',
    category: 'drink',
    nutrients: { calories: 48, protein: 1.5, carbs: 8.0, fat: 1.2, sugar: 5.0 },
    servingSize: 480,
    servingUnit: '一杯约480ml',
    tags: ['奈雪', '燕麦', '拿铁', '咖啡']
  },

  // ==================== 蜜雪冰城 ====================
  {
    id: 'mixue-ice-lemon',
    name: '柠檬水',
    brand: '蜜雪冰城',
    category: 'drink',
    nutrients: { calories: 25, protein: 0.1, carbs: 6.0, fat: 0, sugar: 5.5 },
    servingSize: 500,
    servingUnit: '一杯约500ml',
    tags: ['蜜雪冰城', '柠檬水', '便宜', '奶茶']
  },
  {
    id: 'mixue-milk-tea',
    name: '珍珠奶茶',
    brand: '蜜雪冰城',
    category: 'drink',
    nutrients: { calories: 65, protein: 1.0, carbs: 14.0, fat: 1.5, sugar: 12.0 },
    servingSize: 500,
    servingUnit: '一杯约500ml',
    tags: ['蜜雪冰城', '珍珠奶茶', '奶茶', '便宜']
  },
  {
    id: 'mixue-icecream',
    name: '冰淇淋',
    brand: '蜜雪冰城',
    category: 'drink',
    nutrients: { calories: 180, protein: 3.0, carbs: 25.0, fat: 8.0, sugar: 22.0 },
    servingSize: 100,
    servingUnit: '一个约100g',
    tags: ['蜜雪冰城', '冰淇淋', '甜筒']
  },

  // ==================== 茶百道 ====================
  {
    id: 'chabaidao-yangzhi',
    name: '杨枝甘露',
    brand: '茶百道',
    category: 'drink',
    nutrients: { calories: 70, protein: 0.8, carbs: 15.0, fat: 1.2, sugar: 13.5 },
    servingSize: 500,
    servingUnit: '一杯约500ml',
    tags: ['茶百道', '杨枝甘露', '芒果', '奶茶']
  },
  {
    id: 'chabaidao-taro',
    name: '芋圆奶茶',
    brand: '茶百道',
    category: 'drink',
    nutrients: { calories: 78, protein: 1.2, carbs: 16.0, fat: 1.8, sugar: 14.0 },
    servingSize: 500,
    servingUnit: '一杯约500ml',
    tags: ['茶百道', '芋圆', '奶茶']
  },

  // ==================== 古茗 ====================
  {
    id: 'guming-mango',
    name: '超级芒芒',
    brand: '古茗',
    category: 'drink',
    nutrients: { calories: 62, protein: 0.5, carbs: 14.5, fat: 0.5, sugar: 13.0 },
    servingSize: 500,
    servingUnit: '一杯约500ml',
    tags: ['古茗', '芒果', '水果茶', '奶茶']
  },
  {
    id: 'guming-milk-tea',
    name: '招牌芋泥奶茶',
    brand: '古茗',
    category: 'drink',
    nutrients: { calories: 85, protein: 1.5, carbs: 17.0, fat: 2.0, sugar: 15.0 },
    servingSize: 500,
    servingUnit: '一杯约500ml',
    tags: ['古茗', '芋泥', '奶茶']
  },

  // ==================== CoCo都可 ====================
  {
    id: 'coco-pearl',
    name: '珍珠奶茶',
    brand: 'CoCo都可',
    category: 'drink',
    nutrients: { calories: 72, protein: 1.2, carbs: 15.5, fat: 1.5, sugar: 13.0 },
    servingSize: 500,
    servingUnit: '一杯约500ml',
    tags: ['CoCo', '珍珠奶茶', '奶茶']
  },
  {
    id: 'coco-百香果',
    name: '百香双响炮',
    brand: 'CoCo都可',
    category: 'drink',
    nutrients: { calories: 55, protein: 0.3, carbs: 13.0, fat: 0.2, sugar: 11.0 },
    servingSize: 500,
    servingUnit: '一杯约500ml',
    tags: ['CoCo', '百香果', '水果茶']
  },

  // ==================== 霸王茶姬 CHAGEE ====================
  // 数据来源：霸王茶姬官方公示（2024年版）
  // 以下为中杯（M）不另外加糖的热量，数据为每100ml含量
  {
    id: 'chagee-boya',
    name: '伯牙绝弦（中杯·不加糖）',
    brand: '霸王茶姬',
    category: 'drink',
    nutrients: { calories: 26, protein: 0.56, carbs: 1.34, fat: 2.06 },
    servingSize: 500,
    servingUnit: '中杯约500ml',
    tags: ['霸王茶姬', '伯牙绝弦', '茉莉奶茶', '招牌', '低GI']
  },
  {
    id: 'chagee-boya-large',
    name: '伯牙绝弦（大杯·不加糖）',
    brand: '霸王茶姬',
    category: 'drink',
    nutrients: { calories: 26, protein: 0.56, carbs: 1.34, fat: 2.06 },
    servingSize: 660,
    servingUnit: '大杯约660ml',
    tags: ['霸王茶姬', '伯牙绝弦', '茉莉奶茶', '大杯']
  },
  {
    id: 'chagee-guifulan',
    name: '桂馥兰香（中杯·不加糖）',
    brand: '霸王茶姬',
    category: 'drink',
    nutrients: { calories: 28, protein: 0.6, carbs: 1.5, fat: 2.2 },
    servingSize: 500,
    servingUnit: '中杯约500ml',
    tags: ['霸王茶姬', '桂馥兰香', '桂花乌龙', '奶茶']
  },
  {
    id: 'chagee-qingmo',
    name: '青沫观音（中杯·不加糖）',
    brand: '霸王茶姬',
    category: 'drink',
    nutrients: { calories: 24, protein: 0.5, carbs: 1.2, fat: 1.9 },
    servingSize: 500,
    servingUnit: '中杯约500ml',
    tags: ['霸王茶姬', '青沫观音', '铁观音', '奶茶']
  },
  {
    id: 'chagee-huatian',
    name: '花田乌龙（中杯·不加糖）',
    brand: '霸王茶姬',
    category: 'drink',
    nutrients: { calories: 25, protein: 0.5, carbs: 1.3, fat: 2.0 },
    servingSize: 500,
    servingUnit: '中杯约500ml',
    tags: ['霸王茶姬', '花田乌龙', '乌龙', '奶茶']
  },
  {
    id: 'chagee-wanli',
    name: '万里木兰（中杯·不加糖）',
    brand: '霸王茶姬',
    category: 'drink',
    nutrients: { calories: 30, protein: 0.6, carbs: 1.8, fat: 2.3 },
    servingSize: 500,
    servingUnit: '中杯约500ml',
    tags: ['霸王茶姬', '万里木兰', '栀子花', '奶茶']
  },
  {
    id: 'chagee-chunshan',
    name: '春山雾雨（纯茶·不加糖）',
    brand: '霸王茶姬',
    category: 'drink',
    nutrients: { calories: 2, protein: 0.1, carbs: 0.3, fat: 0 },
    servingSize: 500,
    servingUnit: '中杯约500ml',
    tags: ['霸王茶姬', '春山雾雨', '纯茶', '无糖', '减脂']
  },
  {
    id: 'chagee-yulan',
    name: '玉兰小仓（中杯·不加糖）',
    brand: '霸王茶姬',
    category: 'drink',
    nutrients: { calories: 35, protein: 0.7, carbs: 3.5, fat: 2.0 },
    servingSize: 500,
    servingUnit: '中杯约500ml',
    tags: ['霸王茶姬', '玉兰小仓', '红豆', '奶茶']
  },
  {
    id: 'chagee-ziyi',
    name: '紫衣浪漫（中杯·不加糖）',
    brand: '霸王茶姬',
    category: 'drink',
    nutrients: { calories: 32, protein: 0.6, carbs: 2.8, fat: 2.1 },
    servingSize: 500,
    servingUnit: '中杯约500ml',
    tags: ['霸王茶姬', '紫衣浪漫', '芋泥', '奶茶']
  },

  // ==================== 一点点 ====================
  {
    id: 'yidian-four-seasons',
    name: '四季奶青',
    brand: '一点点',
    category: 'drink',
    nutrients: { calories: 58, protein: 1.0, carbs: 11.5, fat: 1.2, sugar: 10.0 },
    servingSize: 500,
    servingUnit: '一杯约500ml',
    tags: ['一点点', '奶青', '奶茶']
  },
  {
    id: 'yidian-波霸',
    name: '波霸奶茶',
    brand: '一点点',
    category: 'drink',
    nutrients: { calories: 75, protein: 1.2, carbs: 16.0, fat: 1.5, sugar: 14.0 },
    servingSize: 500,
    servingUnit: '一杯约500ml',
    tags: ['一点点', '波霸', '奶茶']
  },
  {
    id: 'yidian-red-tea-latte',
    name: '红茶玛奇朵',
    brand: '一点点',
    category: 'drink',
    nutrients: { calories: 82, protein: 1.5, carbs: 14.0, fat: 2.8 },
    servingSize: 500,
    servingUnit: '一杯约500ml',
    tags: ['一点点', '红茶玛奇朵', '奶盖', '奶茶']
  },
  {
    id: 'yidian-cold-dew',
    name: '冰淇淋红茶',
    brand: '一点点',
    category: 'drink',
    nutrients: { calories: 95, protein: 1.8, carbs: 18.0, fat: 2.5 },
    servingSize: 500,
    servingUnit: '一杯约500ml',
    tags: ['一点点', '冰淇淋红茶', '甜品', '奶茶']
  },
  {
    id: 'yidian-3bros',
    name: '三兄弟',
    brand: '一点点',
    category: 'drink',
    nutrients: { calories: 88, protein: 1.5, carbs: 18.5, fat: 1.8 },
    servingSize: 500,
    servingUnit: '一杯约500ml',
    tags: ['一点点', '三兄弟', '珍珠', '布丁', '仙草']
  },
  {
    id: 'yidian-passion-green',
    name: '百香绿茶',
    brand: '一点点',
    category: 'drink',
    nutrients: { calories: 42, protein: 0.2, carbs: 10.0, fat: 0.1 },
    servingSize: 500,
    servingUnit: '一杯约500ml',
    tags: ['一点点', '百香果', '绿茶', '果茶']
  },
  {
    id: 'yidian-lemon-green',
    name: '柠檬养乐多绿',
    brand: '一点点',
    category: 'drink',
    nutrients: { calories: 55, protein: 0.8, carbs: 12.0, fat: 0.3 },
    servingSize: 500,
    servingUnit: '一杯约500ml',
    tags: ['一点点', '柠檬', '养乐多', '果茶']
  },
  {
    id: 'yidian-coco-milk',
    name: '可可芭蕾',
    brand: '一点点',
    category: 'drink',
    nutrients: { calories: 85, protein: 2.0, carbs: 15.0, fat: 2.5 },
    servingSize: 500,
    servingUnit: '一杯约500ml',
    tags: ['一点点', '可可', '巧克力', '奶茶']
  },

  // ==================== 星巴克 Starbucks ====================
  {
    id: 'sbux-latte',
    name: '拿铁',
    brand: '星巴克',
    category: 'drink',
    nutrients: { calories: 42, protein: 2.5, carbs: 4.5, fat: 1.8 },
    servingSize: 354,
    servingUnit: '中杯约354ml',
    tags: ['星巴克', '拿铁', '咖啡', 'Starbucks']
  },
  {
    id: 'sbux-americano',
    name: '美式咖啡',
    brand: '星巴克',
    category: 'drink',
    nutrients: { calories: 5, protein: 0.3, carbs: 0.5, fat: 0 },
    servingSize: 354,
    servingUnit: '中杯约354ml',
    tags: ['星巴克', '美式', '咖啡', '黑咖啡', '减脂']
  },
  {
    id: 'sbux-cappuccino',
    name: '卡布奇诺',
    brand: '星巴克',
    category: 'drink',
    nutrients: { calories: 35, protein: 2.2, carbs: 3.8, fat: 1.5 },
    servingSize: 354,
    servingUnit: '中杯约354ml',
    tags: ['星巴克', '卡布奇诺', '咖啡']
  },
  {
    id: 'sbux-mocha',
    name: '摩卡',
    brand: '星巴克',
    category: 'drink',
    nutrients: { calories: 85, protein: 2.5, carbs: 12.0, fat: 3.5, sugar: 10.0 },
    servingSize: 354,
    servingUnit: '中杯约354ml',
    tags: ['星巴克', '摩卡', '咖啡', '巧克力']
  },
  {
    id: 'sbux-frappuccino',
    name: '星冰乐',
    brand: '星巴克',
    category: 'drink',
    nutrients: { calories: 95, protein: 2.0, carbs: 18.0, fat: 2.5, sugar: 16.0 },
    servingSize: 354,
    servingUnit: '中杯约354ml',
    tags: ['星巴克', '星冰乐', '冰饮', '高糖']
  },
  {
    id: 'sbux-matcha-latte',
    name: '抹茶拿铁',
    brand: '星巴克',
    category: 'drink',
    nutrients: { calories: 65, protein: 2.5, carbs: 11.0, fat: 2.0, sugar: 9.0 },
    servingSize: 354,
    servingUnit: '中杯约354ml',
    tags: ['星巴克', '抹茶', '拿铁']
  },

  // ==================== 瑞幸咖啡 Luckin ====================
  {
    id: 'luckin-latte',
    name: '生椰拿铁',
    brand: '瑞幸咖啡',
    category: 'drink',
    nutrients: { calories: 55, protein: 1.8, carbs: 8.0, fat: 2.5, sugar: 6.0 },
    servingSize: 480,
    servingUnit: '大杯约480ml',
    tags: ['瑞幸', '生椰拿铁', '椰奶', '咖啡']
  },
  {
    id: 'luckin-americano',
    name: '美式咖啡',
    brand: '瑞幸咖啡',
    category: 'drink',
    nutrients: { calories: 5, protein: 0.3, carbs: 0.5, fat: 0 },
    servingSize: 480,
    servingUnit: '大杯约480ml',
    tags: ['瑞幸', '美式', '咖啡', '黑咖啡', '减脂']
  },
  {
    id: 'luckin-dirty',
    name: '生酪拿铁',
    brand: '瑞幸咖啡',
    category: 'drink',
    nutrients: { calories: 72, protein: 2.5, carbs: 10.0, fat: 3.0, sugar: 8.0 },
    servingSize: 480,
    servingUnit: '大杯约480ml',
    tags: ['瑞幸', '生酪拿铁', '芝士', '咖啡']
  },
  {
    id: 'luckin-thick-milk',
    name: '厚乳拿铁',
    brand: '瑞幸咖啡',
    category: 'drink',
    nutrients: { calories: 65, protein: 3.0, carbs: 8.5, fat: 2.8 },
    servingSize: 480,
    servingUnit: '大杯约480ml',
    tags: ['瑞幸', '厚乳', '拿铁', '咖啡']
  },
  {
    id: 'luckin-coconut-milk',
    name: '椰云拿铁',
    brand: '瑞幸咖啡',
    category: 'drink',
    nutrients: { calories: 50, protein: 1.5, carbs: 7.5, fat: 2.2 },
    servingSize: 480,
    servingUnit: '大杯约480ml',
    tags: ['瑞幸', '椰云', '椰奶', '咖啡']
  },

  // ==================== Manner ====================
  {
    id: 'manner-latte',
    name: '拿铁',
    brand: 'Manner',
    category: 'drink',
    nutrients: { calories: 40, protein: 2.5, carbs: 4.2, fat: 1.7 },
    servingSize: 350,
    servingUnit: '一杯约350ml',
    tags: ['Manner', '拿铁', '咖啡']
  },
  {
    id: 'manner-oat',
    name: '燕麦拿铁',
    brand: 'Manner',
    category: 'drink',
    nutrients: { calories: 52, protein: 1.8, carbs: 9.0, fat: 1.5 },
    servingSize: 350,
    servingUnit: '一杯约350ml',
    tags: ['Manner', '燕麦', '拿铁', '咖啡', '植物奶']
  },
  {
    id: 'manner-dirty',
    name: 'Dirty咖啡',
    brand: 'Manner',
    category: 'drink',
    nutrients: { calories: 45, protein: 2.2, carbs: 5.0, fat: 2.0 },
    servingSize: 250,
    servingUnit: '一杯约250ml',
    tags: ['Manner', 'dirty', '咖啡']
  },

  // ==================== 通用奶茶/饮品 ====================
  {
    id: 'generic-milk-tea',
    name: '普通珍珠奶茶',
    category: 'drink',
    nutrients: { calories: 70, protein: 1.0, carbs: 15.0, fat: 1.5, sugar: 13.0 },
    servingSize: 500,
    servingUnit: '一杯约500ml',
    tags: ['珍珠奶茶', '奶茶', '通用']
  },
  {
    id: 'generic-fruit-tea',
    name: '水果茶',
    category: 'drink',
    nutrients: { calories: 45, protein: 0.3, carbs: 10.5, fat: 0.2, sugar: 9.0 },
    servingSize: 500,
    servingUnit: '一杯约500ml',
    tags: ['水果茶', '奶茶', '通用']
  },
  {
    id: 'generic-cheese-tea',
    name: '芝士茶',
    category: 'drink',
    nutrients: { calories: 80, protein: 1.5, carbs: 12.0, fat: 3.5, sugar: 10.0 },
    servingSize: 500,
    servingUnit: '一杯约500ml',
    tags: ['芝士茶', '芝士盖', '奶茶']
  },
  {
    id: 'fresh-orange',
    name: '鲜榨橙汁',
    category: 'drink',
    nutrients: { calories: 45, protein: 0.7, carbs: 10.0, fat: 0.2, sugar: 8.5 },
    servingSize: 300,
    servingUnit: '一杯约300ml',
    tags: ['鲜榨', '橙汁', '果汁', '维C']
  },
  {
    id: 'fresh-watermelon',
    name: '鲜榨西瓜汁',
    category: 'drink',
    nutrients: { calories: 30, protein: 0.5, carbs: 7.0, fat: 0.1, sugar: 6.0 },
    servingSize: 400,
    servingUnit: '一杯约400ml',
    tags: ['鲜榨', '西瓜汁', '果汁']
  },
  {
    id: 'fresh-apple',
    name: '鲜榨苹果汁',
    category: 'drink',
    nutrients: { calories: 46, protein: 0.1, carbs: 11.0, fat: 0.1, sugar: 10.0 },
    servingSize: 300,
    servingUnit: '一杯约300ml',
    tags: ['鲜榨', '苹果汁', '果汁']
  },
  {
    id: 'smoothie-mixed',
    name: '混合水果冰沙',
    category: 'drink',
    nutrients: { calories: 55, protein: 0.8, carbs: 12.0, fat: 0.5, sugar: 10.0 },
    servingSize: 400,
    servingUnit: '一杯约400ml',
    tags: ['冰沙', '水果', '果汁']
  },

  // ==================== 瓶装/罐装饮料 ====================
  {
    id: 'cola',
    name: '可口可乐',
    brand: '可口可乐',
    category: 'drink',
    nutrients: { calories: 43, protein: 0, carbs: 10.6, fat: 0, sugar: 10.6 },
    servingSize: 330,
    servingUnit: '一罐330ml',
    tags: ['可乐', '碳酸', '汽水']
  },
  {
    id: 'cola-zero',
    name: '零度可乐',
    brand: '可口可乐',
    category: 'drink',
    nutrients: { calories: 1, protein: 0, carbs: 0, fat: 0, sugar: 0 },
    servingSize: 330,
    servingUnit: '一罐330ml',
    tags: ['零度', '无糖可乐', '减脂']
  },
  {
    id: 'sprite',
    name: '雪碧',
    brand: '可口可乐',
    category: 'drink',
    nutrients: { calories: 44, protein: 0, carbs: 11.0, fat: 0, sugar: 11.0 },
    servingSize: 330,
    servingUnit: '一罐330ml',
    tags: ['雪碧', '碳酸', '汽水']
  },
  {
    id: 'redbull',
    name: '红牛',
    brand: '红牛',
    category: 'drink',
    nutrients: { calories: 45, protein: 0, carbs: 11.2, fat: 0, sugar: 11.0 },
    servingSize: 250,
    servingUnit: '一罐250ml',
    tags: ['红牛', '功能饮料', '能量']
  },
  {
    id: 'dongpeng',
    name: '东鹏特饮',
    brand: '东鹏',
    category: 'drink',
    nutrients: { calories: 38, protein: 0, carbs: 9.5, fat: 0, sugar: 9.0 },
    servingSize: 500,
    servingUnit: '一瓶500ml',
    tags: ['东鹏', '功能饮料', '能量']
  },
  {
    id: 'vitasoy',
    name: '维他奶',
    brand: '维他奶',
    category: 'drink',
    nutrients: { calories: 40, protein: 2.5, carbs: 5.5, fat: 1.2 },
    servingSize: 250,
    servingUnit: '一盒250ml',
    tags: ['维他奶', '豆奶', '植物奶']
  },
  {
    id: 'vita-lemon-tea',
    name: '维他柠檬茶',
    brand: '维他奶',
    category: 'drink',
    nutrients: { calories: 35, protein: 0, carbs: 8.7, fat: 0, sugar: 8.5 },
    servingSize: 250,
    servingUnit: '一盒250ml',
    tags: ['维他', '柠檬茶', '茶饮料']
  },
  {
    id: 'nongfu-tea',
    name: '东方树叶（无糖）',
    brand: '农夫山泉',
    category: 'drink',
    nutrients: { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0 },
    servingSize: 500,
    servingUnit: '一瓶500ml',
    tags: ['东方树叶', '无糖茶', '减脂', '茶']
  },
  {
    id: 'yuanqi-sparkling',
    name: '元气森林气泡水',
    brand: '元气森林',
    category: 'drink',
    nutrients: { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0 },
    servingSize: 480,
    servingUnit: '一瓶480ml',
    tags: ['元气森林', '气泡水', '无糖', '减脂']
  },

  // ==================== 蛋白质饮品 ====================
  {
    id: 'protein-shake',
    name: '蛋白粉冲泡（水）',
    category: 'drink',
    nutrients: { calories: 120, protein: 24.0, carbs: 3.0, fat: 1.5 },
    servingSize: 35,
    servingUnit: '一勺约35g（干粉）',
    tags: ['蛋白粉', '乳清蛋白', '增肌', '高蛋白']
  },
  {
    id: 'protein-shake-milk',
    name: '蛋白粉冲泡（牛奶）',
    category: 'drink',
    nutrients: { calories: 180, protein: 30.0, carbs: 10.0, fat: 4.0 },
    servingSize: 285,
    servingUnit: '一份35g蛋白粉+250ml奶',
    tags: ['蛋白粉', '乳清蛋白', '牛奶', '增肌']
  },
];

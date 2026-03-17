import { FoodItem } from '@/types/nutrition';

// 中国家常菜数据库
// 营养数据为每100g含量，基于常见家庭烹饪方式估算
// 分类使用 'takeout' 表示成品菜肴，方便推荐系统识别

export const HOMECOOKING_FOODS: FoodItem[] = [

  // ==================== 经典家常炒菜 ====================
  {
    id: 'hc-mapo-tofu',
    name: '麻婆豆腐',
    category: 'takeout',
    nutrients: { calories: 98, protein: 6.2, carbs: 5.8, fat: 6.1 },
    servingSize: 250,
    servingUnit: '一份约250g',
    tags: ['家常菜', '麻婆豆腐', '豆腐', '川菜', '下饭', '麻辣', '烹饪:炒']
  },
  {
    id: 'hc-fish-fragrant-pork',
    name: '鱼香肉丝',
    category: 'takeout',
    nutrients: { calories: 142, protein: 9.5, carbs: 8.2, fat: 8.3 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['家常菜', '鱼香肉丝', '猪肉', '川菜', '下饭', '烹饪:炒']
  },
  {
    id: 'hc-kung-pao-chicken',
    name: '宫保鸡丁',
    category: 'takeout',
    nutrients: { calories: 165, protein: 12.8, carbs: 7.4, fat: 9.6 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['家常菜', '宫保鸡丁', '鸡肉', '花生', '川菜', '下饭', '烹饪:炒']
  },
  {
    id: 'hc-braised-eggplant',
    name: '红烧茄子',
    category: 'takeout',
    nutrients: { calories: 78, protein: 2.1, carbs: 9.4, fat: 3.8 },
    servingSize: 250,
    servingUnit: '一份约250g',
    tags: ['家常菜', '红烧茄子', '茄子', '素菜', '下饭', '烹饪:烧']
  },
  {
    id: 'hc-tomato-egg',
    name: '番茄炒鸡蛋',
    category: 'takeout',
    nutrients: { calories: 95, protein: 5.8, carbs: 6.2, fat: 5.5 },
    servingSize: 250,
    servingUnit: '一份约250g',
    tags: ['家常菜', '番茄炒蛋', '鸡蛋', '西红柿', '素菜', '快手菜', '烹饪:炒']
  },
  {
    id: 'hc-twice-cooked-pork',
    name: '回锅肉',
    category: 'takeout',
    nutrients: { calories: 218, protein: 12.0, carbs: 5.6, fat: 16.5 },
    servingSize: 150,
    servingUnit: '一份约150g',
    tags: ['家常菜', '回锅肉', '猪肉', '川菜', '下饭', '烹饪:炒']
  },
  {
    id: 'hc-green-pepper-pork',
    name: '青椒炒肉',
    category: 'takeout',
    nutrients: { calories: 148, protein: 11.2, carbs: 4.8, fat: 9.4 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['家常菜', '青椒炒肉', '猪肉', '青椒', '快手菜', '烹饪:炒']
  },
  {
    id: 'hc-potato-shreds',
    name: '醋溜土豆丝',
    category: 'takeout',
    nutrients: { calories: 72, protein: 1.8, carbs: 14.2, fat: 1.4 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['家常菜', '土豆丝', '土豆', '素菜', '快手菜', '烹饪:炒']
  },
  {
    id: 'hc-shredded-cabbage',
    name: '手撕包菜',
    category: 'takeout',
    nutrients: { calories: 48, protein: 2.0, carbs: 7.2, fat: 1.5 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['家常菜', '手撕包菜', '卷心菜', '素菜', '快手菜', '烹饪:炒']
  },
  {
    id: 'hc-garlic-spinach',
    name: '蒜蓉菠菜',
    category: 'takeout',
    nutrients: { calories: 38, protein: 2.8, carbs: 4.2, fat: 1.2 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['家常菜', '蒜蓉菠菜', '菠菜', '绿叶菜', '清淡', '素菜', '烹饪:炒']
  },
  {
    id: 'hc-stir-fried-broccoli',
    name: '清炒西兰花',
    category: 'takeout',
    nutrients: { calories: 42, protein: 3.8, carbs: 5.1, fat: 1.0 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['家常菜', '清炒西兰花', '西兰花', '素菜', '清淡', '减脂', '烹饪:炒']
  },
  {
    id: 'hc-chive-egg',
    name: '韭菜炒鸡蛋',
    category: 'takeout',
    nutrients: { calories: 112, protein: 6.8, carbs: 3.4, fat: 7.9 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['家常菜', '韭菜炒蛋', '鸡蛋', '韭菜', '快手菜', '烹饪:炒']
  },
  {
    id: 'hc-bitter-melon-egg',
    name: '苦瓜炒蛋',
    category: 'takeout',
    nutrients: { calories: 82, protein: 5.4, carbs: 4.8, fat: 4.8 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['家常菜', '苦瓜炒蛋', '苦瓜', '鸡蛋', '清热', '降糖', '烹饪:炒']
  },
  {
    id: 'hc-garlic-bok-choy',
    name: '蒜蓉炒青菜',
    category: 'takeout',
    nutrients: { calories: 32, protein: 1.8, carbs: 4.5, fat: 1.0 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['家常菜', '炒青菜', '小白菜', '油菜', '绿叶菜', '素菜', '清淡', '烹饪:炒']
  },
  {
    id: 'hc-green-bean-pork',
    name: '豆角炒肉',
    category: 'takeout',
    nutrients: { calories: 128, protein: 8.6, carbs: 7.8, fat: 7.2 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['家常菜', '豆角炒肉', '豆角', '猪肉', '家常', '烹饪:炒']
  },
  {
    id: 'hc-celery-lily-cashew',
    name: '西芹炒百合',
    category: 'takeout',
    nutrients: { calories: 68, protein: 2.2, carbs: 12.4, fat: 1.4 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['家常菜', '西芹百合', '芹菜', '素菜', '清淡', '烹饪:炒']
  },
  {
    id: 'hc-muxu-pork',
    name: '木须肉',
    category: 'takeout',
    nutrients: { calories: 132, protein: 10.2, carbs: 4.5, fat: 8.5 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['家常菜', '木须肉', '猪肉', '鸡蛋', '黑木耳', '黄瓜', '家常', '烹饪:炒']
  },
  {
    id: 'hc-stir-fried-mushroom',
    name: '香菇炒肉片',
    category: 'takeout',
    nutrients: { calories: 118, protein: 9.4, carbs: 5.8, fat: 6.8 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['家常菜', '香菇炒肉', '香菇', '猪肉', '家常', '烹饪:炒']
  },
  {
    id: 'hc-lotus-root',
    name: '清炒莲藕',
    category: 'takeout',
    nutrients: { calories: 74, protein: 1.8, carbs: 16.4, fat: 0.6 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['家常菜', '莲藕', '清炒藕片', '素菜', '烹饪:炒']
  },
  {
    id: 'hc-shrimp-broccoli',
    name: '西兰花炒虾仁',
    category: 'takeout',
    nutrients: { calories: 78, protein: 10.2, carbs: 4.6, fat: 2.0 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['家常菜', '西兰花炒虾仁', '虾仁', '西兰花', '高蛋白', '减脂', '烹饪:炒']
  },

  // ==================== 红烧/炖煮类 ====================
  {
    id: 'hc-braised-pork',
    name: '红烧肉',
    category: 'takeout',
    nutrients: { calories: 348, protein: 14.2, carbs: 12.8, fat: 27.5 },
    servingSize: 150,
    servingUnit: '一份约150g（3-4块）',
    tags: ['家常菜', '红烧肉', '猪肉', '五花肉', '经典', '下饭', '烹饪:烧']
  },
  {
    id: 'hc-braised-spare-ribs',
    name: '红烧排骨',
    category: 'takeout',
    nutrients: { calories: 268, protein: 15.8, carbs: 10.2, fat: 18.6 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['家常菜', '红烧排骨', '排骨', '猪肉', '下饭', '烹饪:烧']
  },
  {
    id: 'hc-braised-chicken',
    name: '黄焖鸡',
    category: 'takeout',
    nutrients: { calories: 168, protein: 14.5, carbs: 6.8, fat: 9.4 },
    servingSize: 300,
    servingUnit: '一份约300g',
    tags: ['家常菜', '黄焖鸡', '鸡肉', '下饭', '烹饪:焖']
  },
  {
    id: 'hc-cola-wings',
    name: '可乐鸡翅',
    category: 'takeout',
    nutrients: { calories: 195, protein: 14.2, carbs: 14.5, fat: 8.8 },
    servingSize: 150,
    servingUnit: '一份约150g（3-4只）',
    tags: ['家常菜', '可乐鸡翅', '鸡翅', '新手友好', '快手菜', '烹饪:烧']
  },
  {
    id: 'hc-braised-tofu',
    name: '红烧豆腐',
    category: 'takeout',
    nutrients: { calories: 105, protein: 7.8, carbs: 5.2, fat: 6.2 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['家常菜', '红烧豆腐', '豆腐', '素菜', '高蛋白', '烹饪:烧']
  },
  {
    id: 'hc-stewed-pork-ribs',
    name: '排骨炖土豆',
    category: 'takeout',
    nutrients: { calories: 178, protein: 10.5, carbs: 12.4, fat: 9.8 },
    servingSize: 300,
    servingUnit: '一份约300g',
    tags: ['家常菜', '炖排骨', '排骨', '土豆', '家常炖菜', '烹饪:炖']
  },
  {
    id: 'hc-braised-chicken-potato',
    name: '土豆炖鸡',
    category: 'takeout',
    nutrients: { calories: 145, protein: 12.2, carbs: 10.8, fat: 6.5 },
    servingSize: 300,
    servingUnit: '一份约300g',
    tags: ['家常菜', '土豆炖鸡', '鸡肉', '土豆', '家常炖菜', '烹饪:炖']
  },
  {
    id: 'hc-dongpo-pork',
    name: '东坡肉',
    category: 'takeout',
    nutrients: { calories: 415, protein: 13.5, carbs: 16.2, fat: 35.2 },
    servingSize: 100,
    servingUnit: '一块约100g',
    tags: ['家常菜', '东坡肉', '红烧肉', '猪肉', '江南菜', '烹饪:烧']
  },
  {
    id: 'hc-spicy-tofu-casserole',
    name: '砂锅豆腐',
    category: 'takeout',
    nutrients: { calories: 88, protein: 6.8, carbs: 4.5, fat: 4.8 },
    servingSize: 300,
    servingUnit: '一份约300g',
    tags: ['家常菜', '砂锅豆腐', '豆腐', '冬天', '暖心菜', '烹饪:炖']
  },

  // ==================== 蒸煮类 ====================
  {
    id: 'hc-steamed-fish',
    name: '清蒸鲈鱼',
    category: 'takeout',
    nutrients: { calories: 88, protein: 17.2, carbs: 1.8, fat: 2.0 },
    servingSize: 300,
    servingUnit: '一条约300g（可食部分）',
    tags: ['家常菜', '清蒸鱼', '鲈鱼', '清淡', '高蛋白', '减脂', '烹饪:蒸']
  },
  {
    id: 'hc-steamed-pork-ribs',
    name: '粉蒸排骨',
    category: 'takeout',
    nutrients: { calories: 228, protein: 14.5, carbs: 16.8, fat: 11.5 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['家常菜', '粉蒸排骨', '排骨', '蒸菜', '烹饪:蒸']
  },
  {
    id: 'hc-steamed-egg',
    name: '蒸蛋羹',
    category: 'takeout',
    nutrients: { calories: 72, protein: 6.2, carbs: 1.8, fat: 4.5 },
    servingSize: 150,
    servingUnit: '一碗约150g',
    tags: ['家常菜', '蒸蛋', '蛋羹', '水蒸蛋', '清淡', '易消化', '早餐', '烹饪:蒸']
  },
  {
    id: 'hc-steamed-minced-pork',
    name: '肉末蒸蛋',
    category: 'takeout',
    nutrients: { calories: 110, protein: 9.5, carbs: 1.5, fat: 7.2 },
    servingSize: 150,
    servingUnit: '一碗约150g',
    tags: ['家常菜', '肉末蒸蛋', '鸡蛋', '猪肉', '清淡', '易消化', '烹饪:蒸']
  },

  // ==================== 汤类 ====================
  {
    id: 'hc-tomato-egg-soup',
    name: '番茄蛋花汤',
    category: 'soup',
    nutrients: { calories: 38, protein: 2.8, carbs: 4.5, fat: 1.2 },
    servingSize: 300,
    servingUnit: '一碗约300ml',
    tags: ['家常菜', '番茄蛋花汤', '汤', '快手', '清淡', '烹饪:煮']
  },
  {
    id: 'hc-winter-melon-rib-soup',
    name: '冬瓜排骨汤',
    category: 'soup',
    nutrients: { calories: 72, protein: 5.8, carbs: 4.2, fat: 3.2 },
    servingSize: 400,
    servingUnit: '一碗约400ml',
    tags: ['家常菜', '冬瓜排骨汤', '汤', '冬瓜', '排骨', '清淡', '烹饪:炖']
  },
  {
    id: 'hc-luffa-egg-soup',
    name: '丝瓜蛋花汤',
    category: 'soup',
    nutrients: { calories: 35, protein: 2.5, carbs: 4.0, fat: 1.0 },
    servingSize: 300,
    servingUnit: '一碗约300ml',
    tags: ['家常菜', '丝瓜汤', '汤', '丝瓜', '鸡蛋', '清淡', '烹饪:煮']
  },
  {
    id: 'hc-corn-pork-soup',
    name: '玉米排骨汤',
    category: 'soup',
    nutrients: { calories: 85, protein: 6.2, carbs: 8.5, fat: 3.0 },
    servingSize: 400,
    servingUnit: '一碗约400ml',
    tags: ['家常菜', '玉米排骨汤', '汤', '玉米', '排骨', '家常', '烹饪:炖']
  },
  {
    id: 'hc-seaweed-egg-soup',
    name: '紫菜蛋花汤',
    category: 'soup',
    nutrients: { calories: 28, protein: 2.4, carbs: 2.8, fat: 0.8 },
    servingSize: 300,
    servingUnit: '一碗约300ml',
    tags: ['家常菜', '紫菜汤', '汤', '紫菜', '鸡蛋', '快手', '清淡', '烹饪:煮']
  },
  {
    id: 'hc-mushroom-chicken-soup',
    name: '香菇鸡汤',
    category: 'soup',
    nutrients: { calories: 62, protein: 8.5, carbs: 2.8, fat: 2.0 },
    servingSize: 400,
    servingUnit: '一碗约400ml',
    tags: ['家常菜', '香菇鸡汤', '汤', '香菇', '鸡肉', '清淡', '滋补', '烹饪:炖']
  },
  {
    id: 'hc-lotus-root-pork-soup',
    name: '莲藕猪骨汤',
    category: 'soup',
    nutrients: { calories: 78, protein: 6.8, carbs: 6.5, fat: 2.8 },
    servingSize: 400,
    servingUnit: '一碗约400ml',
    tags: ['家常菜', '莲藕汤', '汤', '莲藕', '猪骨', '滋补', '烹饪:炖']
  },
  {
    id: 'hc-tofu-soup',
    name: '豆腐鱼头汤',
    category: 'soup',
    nutrients: { calories: 58, protein: 7.2, carbs: 2.2, fat: 2.5 },
    servingSize: 400,
    servingUnit: '一碗约400ml',
    tags: ['家常菜', '鱼头豆腐汤', '汤', '豆腐', '鱼头', '清淡', '烹饪:煮']
  },

  // ==================== 凉拌类 ====================
  {
    id: 'hc-cold-cucumber',
    name: '拍黄瓜',
    category: 'takeout',
    nutrients: { calories: 28, protein: 1.2, carbs: 4.8, fat: 0.8 },
    servingSize: 150,
    servingUnit: '一份约150g',
    tags: ['家常菜', '拍黄瓜', '凉拌黄瓜', '凉菜', '开胃', '减脂', '烹饪:凉拌']
  },
  {
    id: 'hc-cold-spinach',
    name: '凉拌菠菜',
    category: 'takeout',
    nutrients: { calories: 35, protein: 2.8, carbs: 4.5, fat: 1.0 },
    servingSize: 150,
    servingUnit: '一份约150g',
    tags: ['家常菜', '凉拌菠菜', '凉菜', '菠菜', '清淡', '素菜', '烹饪:凉拌']
  },
  {
    id: 'hc-cold-vermicelli',
    name: '凉拌粉丝',
    category: 'takeout',
    nutrients: { calories: 95, protein: 1.2, carbs: 22.5, fat: 0.8 },
    servingSize: 150,
    servingUnit: '一份约150g',
    tags: ['家常菜', '凉拌粉丝', '凉菜', '粉丝', '开胃', '烹饪:凉拌']
  },
  {
    id: 'hc-cold-wood-ear',
    name: '凉拌木耳',
    category: 'takeout',
    nutrients: { calories: 32, protein: 1.5, carbs: 6.5, fat: 0.4 },
    servingSize: 100,
    servingUnit: '一份约100g',
    tags: ['家常菜', '凉拌木耳', '黑木耳', '凉菜', '健康', '减脂', '烹饪:凉拌']
  },

  // ==================== 主食类（有菜有饭） ====================
  {
    id: 'hc-fried-rice',
    name: '蛋炒饭',
    category: 'staple',
    nutrients: { calories: 185, protein: 6.8, carbs: 28.5, fat: 5.8 },
    servingSize: 250,
    servingUnit: '一碗约250g',
    tags: ['家常菜', '蛋炒饭', '炒饭', '主食', '快手', '烹饪:炒']
  },
  {
    id: 'hc-yangzhou-fried-rice',
    name: '扬州炒饭',
    category: 'staple',
    nutrients: { calories: 198, protein: 8.5, carbs: 28.2, fat: 6.5 },
    servingSize: 250,
    servingUnit: '一碗约250g',
    tags: ['家常菜', '扬州炒饭', '炒饭', '主食', '烹饪:炒']
  },
  {
    id: 'hc-claypot-rice',
    name: '腊肉煲仔饭',
    category: 'staple',
    nutrients: { calories: 215, protein: 9.2, carbs: 30.5, fat: 6.8 },
    servingSize: 300,
    servingUnit: '一煲约300g',
    tags: ['家常菜', '煲仔饭', '腊肉', '主食', '广东', '烹饪:蒸']
  },
  {
    id: 'hc-beef-noodle',
    name: '番茄牛肉面',
    category: 'noodle',
    nutrients: { calories: 148, protein: 9.2, carbs: 20.5, fat: 3.5 },
    servingSize: 400,
    servingUnit: '一碗约400g',
    tags: ['家常菜', '番茄牛肉面', '面条', '牛肉', '主食', '烹饪:煮']
  },
  {
    id: 'hc-zhajiang-noodle',
    name: '炸酱面',
    category: 'noodle',
    nutrients: { calories: 188, protein: 9.5, carbs: 26.8, fat: 5.5 },
    servingSize: 350,
    servingUnit: '一碗约350g',
    tags: ['家常菜', '炸酱面', '面条', '主食', '北京', '烹饪:煮']
  },
  {
    id: 'hc-cold-noodle',
    name: '凉面',
    category: 'noodle',
    nutrients: { calories: 142, protein: 5.2, carbs: 26.5, fat: 2.8 },
    servingSize: 300,
    servingUnit: '一碗约300g',
    tags: ['家常菜', '凉面', '面条', '夏天', '主食', '烹饪:凉拌']
  },
  {
    id: 'hc-sesame-noodle',
    name: '芝麻酱拌面',
    category: 'noodle',
    nutrients: { calories: 218, protein: 7.8, carbs: 28.5, fat: 8.5 },
    servingSize: 300,
    servingUnit: '一碗约300g',
    tags: ['家常菜', '麻酱拌面', '面条', '芝麻酱', '主食', '烹饪:凉拌']
  },

  // ==================== 早餐类 ====================
  {
    id: 'hc-congee-pork',
    name: '皮蛋瘦肉粥',
    category: 'staple',
    nutrients: { calories: 68, protein: 5.2, carbs: 9.5, fat: 1.2 },
    servingSize: 400,
    servingUnit: '一碗约400g',
    tags: ['家常菜', '皮蛋瘦肉粥', '粥', '广东', '早餐', '烹饪:煮']
  },
  {
    id: 'hc-congee-eight-treasure',
    name: '八宝粥',
    category: 'staple',
    nutrients: { calories: 72, protein: 2.8, carbs: 15.5, fat: 0.5 },
    servingSize: 300,
    servingUnit: '一碗约300g',
    tags: ['家常菜', '八宝粥', '粥', '早餐', '健康', '烹饪:煮']
  },
  {
    id: 'hc-egg-noodle-soup',
    name: '鸡蛋面条汤',
    category: 'noodle',
    nutrients: { calories: 135, protein: 7.5, carbs: 20.8, fat: 3.2 },
    servingSize: 400,
    servingUnit: '一碗约400g',
    tags: ['家常菜', '鸡蛋面条', '面条', '早餐', '快手', '烹饪:煮']
  },

  // ==================== 常见家常配菜 ====================
  {
    id: 'hc-braised-egg',
    name: '卤蛋',
    category: 'egg',
    nutrients: { calories: 152, protein: 12.8, carbs: 3.5, fat: 9.5 },
    servingSize: 50,
    servingUnit: '一个约50g',
    tags: ['家常菜', '卤蛋', '鸡蛋', '高蛋白', '卤味', '烹饪:卤']
  },
  {
    id: 'hc-tiger-skin-egg',
    name: '虎皮蛋',
    category: 'egg',
    nutrients: { calories: 168, protein: 12.5, carbs: 5.2, fat: 10.8 },
    servingSize: 50,
    servingUnit: '一个约50g',
    tags: ['家常菜', '虎皮蛋', '鸡蛋', '卤蛋', '高蛋白', '烹饪:卤']
  },
  {
    id: 'hc-spiced-tofu-dry',
    name: '五香豆干',
    category: 'bean',
    nutrients: { calories: 158, protein: 17.8, carbs: 5.5, fat: 7.2 },
    servingSize: 50,
    servingUnit: '几块约50g',
    tags: ['家常菜', '五香豆干', '豆腐干', '高蛋白', '卤味', '烹饪:卤']
  },
  {
    id: 'hc-three-fresh',
    name: '地三鲜',
    category: 'takeout',
    nutrients: { calories: 88, protein: 2.5, carbs: 10.5, fat: 4.2 },
    servingSize: 250,
    servingUnit: '一份约250g',
    tags: ['家常菜', '地三鲜', '茄子', '土豆', '青椒', '素菜', '东北菜', '烹饪:炒']
  },
  {
    id: 'hc-garlic-eggplant',
    name: '蒜泥茄子',
    category: 'takeout',
    nutrients: { calories: 48, protein: 1.8, carbs: 8.5, fat: 1.2 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['家常菜', '蒜泥茄子', '茄子', '凉菜', '清淡', '烹饪:蒸']
  },
  {
    id: 'hc-scrambled-beans',
    name: '干煸四季豆',
    category: 'takeout',
    nutrients: { calories: 92, protein: 4.2, carbs: 8.8, fat: 4.5 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['家常菜', '干煸四季豆', '四季豆', '素菜', '下饭', '烹饪:炒']
  },
  {
    id: 'hc-pumpkin-stir',
    name: '清炒南瓜',
    category: 'takeout',
    nutrients: { calories: 48, protein: 1.2, carbs: 10.5, fat: 0.8 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['家常菜', '清炒南瓜', '南瓜', '素菜', '清淡', '烹饪:炒']
  },
  {
    id: 'hc-yuxiang-eggplant',
    name: '鱼香茄子',
    category: 'takeout',
    nutrients: { calories: 105, protein: 3.5, carbs: 10.8, fat: 5.8 },
    servingSize: 250,
    servingUnit: '一份约250g',
    tags: ['家常菜', '鱼香茄子', '茄子', '川菜', '下饭', '烹饪:炒']
  },
  {
    id: 'hc-celery-stir-pork',
    name: '芹菜炒肉丝',
    category: 'takeout',
    nutrients: { calories: 118, protein: 9.8, carbs: 4.5, fat: 7.2 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['家常菜', '芹菜炒肉丝', '芹菜', '猪肉', '家常', '烹饪:炒']
  },
  {
    id: 'hc-tofu-spinach',
    name: '豆腐菠菜汤',
    category: 'soup',
    nutrients: { calories: 42, protein: 4.2, carbs: 3.5, fat: 1.8 },
    servingSize: 300,
    servingUnit: '一碗约300ml',
    tags: ['家常菜', '豆腐菠菜汤', '汤', '豆腐', '菠菜', '清淡', '烹饪:煮']
  },
];

// 导出烹饪方法标签映射
export const COOKING_METHOD_LABELS: Record<string, string> = {
  '烹饪:炒': '🔥 炒',
  '烹饪:烧': '🍲 红烧',
  '烹饪:炖': '♨️ 炖',
  '烹饪:蒸': '💨 蒸',
  '烹饪:煮': '🫕 煮',
  '烹饪:凉拌': '🥗 凉拌',
  '烹饪:卤': '🫙 卤',
  '烹饪:焖': '🍳 焖',
};

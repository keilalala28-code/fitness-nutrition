import { FoodItem } from '@/types/nutrition';

// 中国食物数据库 - 基于《中国食物成分表》和各品牌官方数据
// 营养数据均为每100g含量

export const CHINESE_FOODS: FoodItem[] = [
  // ==================== 主食类 ====================
  {
    id: 'rice-white',
    name: '白米饭',
    category: 'staple',
    nutrients: { calories: 116, protein: 2.6, carbs: 25.6, fat: 0.3 },
    servingSize: 150,
    servingUnit: '一碗约150g',
    tags: ['米饭', '白饭', '主食', '碳水']
  },
  {
    id: 'rice-brown',
    name: '糙米饭',
    category: 'staple',
    nutrients: { calories: 111, protein: 2.5, carbs: 23.0, fat: 0.9, fiber: 1.6 },
    servingSize: 150,
    servingUnit: '一碗约150g',
    tags: ['糙米', '粗粮', '主食', '健康']
  },
  {
    id: 'congee-white',
    name: '白粥',
    category: 'staple',
    nutrients: { calories: 46, protein: 1.1, carbs: 9.9, fat: 0.1 },
    servingSize: 300,
    servingUnit: '一碗约300g',
    tags: ['粥', '稀饭', '早餐']
  },
  {
    id: 'congee-millet',
    name: '小米粥',
    category: 'staple',
    nutrients: { calories: 46, protein: 1.4, carbs: 8.4, fat: 0.7 },
    servingSize: 300,
    servingUnit: '一碗约300g',
    tags: ['小米', '粥', '养胃', '早餐']
  },
  {
    id: 'mantou',
    name: '馒头',
    category: 'staple',
    nutrients: { calories: 223, protein: 7.0, carbs: 47.0, fat: 1.1 },
    servingSize: 80,
    servingUnit: '一个约80g',
    tags: ['馒头', '面食', '主食']
  },
  {
    id: 'baozi-meat',
    name: '肉包子',
    category: 'staple',
    nutrients: { calories: 227, protein: 8.5, carbs: 30.0, fat: 8.0 },
    servingSize: 80,
    servingUnit: '一个约80g',
    tags: ['包子', '肉包', '早餐', '面食']
  },
  {
    id: 'baozi-veggie',
    name: '素菜包子',
    category: 'staple',
    nutrients: { calories: 180, protein: 5.5, carbs: 32.0, fat: 3.5 },
    servingSize: 80,
    servingUnit: '一个约80g',
    tags: ['包子', '菜包', '素包', '早餐']
  },
  {
    id: 'youtiao',
    name: '油条',
    category: 'staple',
    nutrients: { calories: 386, protein: 6.9, carbs: 51.0, fat: 17.6 },
    servingSize: 50,
    servingUnit: '一根约50g',
    tags: ['油条', '早餐', '油炸']
  },
  {
    id: 'jianbing',
    name: '煎饼果子',
    category: 'staple',
    nutrients: { calories: 220, protein: 8.0, carbs: 28.0, fat: 9.0 },
    servingSize: 200,
    servingUnit: '一个约200g',
    tags: ['煎饼', '果子', '早餐', '街边小吃']
  },
  {
    id: 'shaobing',
    name: '烧饼',
    category: 'staple',
    nutrients: { calories: 326, protein: 8.2, carbs: 59.0, fat: 6.4 },
    servingSize: 60,
    servingUnit: '一个约60g',
    tags: ['烧饼', '早餐', '面食']
  },
  {
    id: 'noodle-plain',
    name: '面条（煮熟）',
    category: 'noodle',
    nutrients: { calories: 110, protein: 4.0, carbs: 22.0, fat: 0.5 },
    servingSize: 200,
    servingUnit: '一碗约200g',
    tags: ['面条', '面', '主食']
  },
  {
    id: 'rice-noodle',
    name: '米粉/米线',
    category: 'noodle',
    nutrients: { calories: 109, protein: 2.3, carbs: 24.3, fat: 0.3 },
    servingSize: 200,
    servingUnit: '一碗约200g',
    tags: ['米粉', '米线', '桂林米粉', '云南米线']
  },
  {
    id: 'dumpling-meat',
    name: '猪肉饺子',
    category: 'staple',
    nutrients: { calories: 240, protein: 9.5, carbs: 28.0, fat: 10.0 },
    servingSize: 25,
    servingUnit: '一个约25g',
    tags: ['饺子', '水饺', '猪肉', '主食']
  },
  {
    id: 'dumpling-veggie',
    name: '素饺子',
    category: 'staple',
    nutrients: { calories: 185, protein: 5.0, carbs: 30.0, fat: 5.0 },
    servingSize: 25,
    servingUnit: '一个约25g',
    tags: ['饺子', '素饺', '蔬菜饺子']
  },
  {
    id: 'wonton',
    name: '馄饨',
    category: 'staple',
    nutrients: { calories: 198, protein: 8.0, carbs: 25.0, fat: 7.0 },
    servingSize: 15,
    servingUnit: '一个约15g',
    tags: ['馄饨', '云吞', '抄手']
  },
  {
    id: 'zongzi-meat',
    name: '肉粽子',
    category: 'staple',
    nutrients: { calories: 195, protein: 6.5, carbs: 30.0, fat: 5.5 },
    servingSize: 150,
    servingUnit: '一个约150g',
    tags: ['粽子', '肉粽', '端午']
  },
  {
    id: 'bread-white',
    name: '白面包/吐司',
    category: 'staple',
    nutrients: { calories: 266, protein: 8.4, carbs: 49.0, fat: 3.4 },
    servingSize: 35,
    servingUnit: '一片约35g',
    tags: ['面包', '吐司', '早餐']
  },
  {
    id: 'bread-whole',
    name: '全麦面包',
    category: 'staple',
    nutrients: { calories: 246, protein: 10.0, carbs: 43.0, fat: 3.5, fiber: 6.0 },
    servingSize: 35,
    servingUnit: '一片约35g',
    tags: ['全麦', '面包', '健康', '减脂']
  },
  {
    id: 'oatmeal',
    name: '燕麦片（干）',
    category: 'staple',
    nutrients: { calories: 377, protein: 13.5, carbs: 66.0, fat: 6.7, fiber: 10.6 },
    servingSize: 40,
    servingUnit: '一份约40g',
    tags: ['燕麦', '麦片', '早餐', '健康', '减脂']
  },
  {
    id: 'sweet-potato',
    name: '红薯/地瓜',
    category: 'staple',
    nutrients: { calories: 86, protein: 1.6, carbs: 20.1, fat: 0.1, fiber: 3.0 },
    servingSize: 200,
    servingUnit: '一个中等约200g',
    tags: ['红薯', '地瓜', '番薯', '粗粮', '减脂']
  },
  {
    id: 'potato',
    name: '土豆',
    category: 'staple',
    nutrients: { calories: 77, protein: 2.0, carbs: 17.0, fat: 0.1 },
    servingSize: 150,
    servingUnit: '一个中等约150g',
    tags: ['土豆', '马铃薯', '洋芋']
  },
  {
    id: 'corn',
    name: '玉米',
    category: 'staple',
    nutrients: { calories: 86, protein: 3.3, carbs: 19.0, fat: 1.2, fiber: 2.7 },
    servingSize: 200,
    servingUnit: '一根约200g（带芯）',
    tags: ['玉米', '苞米', '粗粮']
  },

  // ==================== 肉类 ====================
  {
    id: 'chicken-breast',
    name: '鸡胸肉',
    category: 'meat',
    nutrients: { calories: 133, protein: 19.4, carbs: 2.5, fat: 5.0 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['鸡胸', '鸡肉', '增肌', '高蛋白', '减脂']
  },
  {
    id: 'chicken-leg',
    name: '鸡腿肉',
    category: 'meat',
    nutrients: { calories: 181, protein: 16.0, carbs: 0, fat: 13.0 },
    servingSize: 100,
    servingUnit: '一个约100g',
    tags: ['鸡腿', '鸡肉']
  },
  {
    id: 'chicken-wing',
    name: '鸡翅',
    category: 'meat',
    nutrients: { calories: 194, protein: 17.4, carbs: 0, fat: 13.6 },
    servingSize: 40,
    servingUnit: '一个约40g',
    tags: ['鸡翅', '鸡肉']
  },
  {
    id: 'duck',
    name: '鸭肉',
    category: 'meat',
    nutrients: { calories: 240, protein: 15.5, carbs: 0, fat: 19.7 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['鸭肉', '烤鸭']
  },
  {
    id: 'pork-lean',
    name: '猪瘦肉',
    category: 'meat',
    nutrients: { calories: 143, protein: 20.3, carbs: 1.5, fat: 6.2 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['猪肉', '瘦肉', '里脊']
  },
  {
    id: 'pork-belly',
    name: '五花肉',
    category: 'meat',
    nutrients: { calories: 395, protein: 14.0, carbs: 0, fat: 37.0 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['五花肉', '猪肉', '肥肉']
  },
  {
    id: 'pork-rib',
    name: '排骨',
    category: 'meat',
    nutrients: { calories: 264, protein: 17.0, carbs: 0, fat: 21.5 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['排骨', '猪排骨', '猪肉']
  },
  {
    id: 'beef-lean',
    name: '牛肉（瘦）',
    category: 'meat',
    nutrients: { calories: 106, protein: 20.2, carbs: 0, fat: 2.3 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['牛肉', '牛腱', '增肌', '高蛋白']
  },
  {
    id: 'beef-sirloin',
    name: '牛排/西冷',
    category: 'meat',
    nutrients: { calories: 158, protein: 19.0, carbs: 0, fat: 9.0 },
    servingSize: 150,
    servingUnit: '一块约150g',
    tags: ['牛排', '西冷', '肉眼', '牛肉']
  },
  {
    id: 'lamb',
    name: '羊肉',
    category: 'meat',
    nutrients: { calories: 203, protein: 19.0, carbs: 0, fat: 14.1 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['羊肉', '羊腿', '涮羊肉']
  },

  // ==================== 海鲜类 ====================
  {
    id: 'salmon',
    name: '三文鱼',
    category: 'seafood',
    nutrients: { calories: 139, protein: 21.6, carbs: 0, fat: 5.6 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['三文鱼', '鲑鱼', '刺身', '高蛋白', 'omega-3']
  },
  {
    id: 'tuna',
    name: '金枪鱼',
    category: 'seafood',
    nutrients: { calories: 109, protein: 24.4, carbs: 0, fat: 0.9 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['金枪鱼', '吞拿鱼', '刺身', '高蛋白']
  },
  {
    id: 'bass',
    name: '鲈鱼',
    category: 'seafood',
    nutrients: { calories: 105, protein: 18.6, carbs: 0, fat: 3.4 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['鲈鱼', '海鲈', '清蒸鱼']
  },
  {
    id: 'tilapia',
    name: '罗非鱼',
    category: 'seafood',
    nutrients: { calories: 96, protein: 20.0, carbs: 0, fat: 1.7 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['罗非鱼', '鲷鱼', '鱼']
  },
  {
    id: 'shrimp',
    name: '虾仁',
    category: 'seafood',
    nutrients: { calories: 93, protein: 18.6, carbs: 2.8, fat: 0.8 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['虾', '虾仁', '基围虾', '白灼虾', '高蛋白']
  },
  {
    id: 'crab',
    name: '螃蟹',
    category: 'seafood',
    nutrients: { calories: 103, protein: 17.5, carbs: 2.3, fat: 2.6 },
    servingSize: 100,
    servingUnit: '100g（可食部分）',
    tags: ['螃蟹', '大闸蟹', '海蟹']
  },
  {
    id: 'squid',
    name: '鱿鱼',
    category: 'seafood',
    nutrients: { calories: 84, protein: 17.0, carbs: 1.8, fat: 0.8 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['鱿鱼', '乌贼', '铁板鱿鱼']
  },
  {
    id: 'scallop',
    name: '扇贝',
    category: 'seafood',
    nutrients: { calories: 60, protein: 11.1, carbs: 2.6, fat: 0.6 },
    servingSize: 50,
    servingUnit: '一个约50g（可食部分）',
    tags: ['扇贝', '贝柱', '蒜蓉扇贝']
  },

  // ==================== 蛋类 ====================
  {
    id: 'egg-whole',
    name: '鸡蛋',
    category: 'egg',
    nutrients: { calories: 144, protein: 13.3, carbs: 1.5, fat: 8.8 },
    servingSize: 50,
    servingUnit: '一个约50g',
    tags: ['鸡蛋', '蛋', '水煮蛋', '煎蛋', '高蛋白']
  },
  {
    id: 'egg-white',
    name: '蛋白',
    category: 'egg',
    nutrients: { calories: 52, protein: 11.0, carbs: 0.7, fat: 0.2 },
    servingSize: 33,
    servingUnit: '一个蛋白约33g',
    tags: ['蛋白', '蛋清', '高蛋白', '减脂']
  },
  {
    id: 'egg-yolk',
    name: '蛋黄',
    category: 'egg',
    nutrients: { calories: 328, protein: 15.2, carbs: 3.4, fat: 28.2 },
    servingSize: 17,
    servingUnit: '一个蛋黄约17g',
    tags: ['蛋黄', '蛋']
  },
  {
    id: 'egg-duck',
    name: '鸭蛋',
    category: 'egg',
    nutrients: { calories: 180, protein: 12.6, carbs: 1.0, fat: 14.2 },
    servingSize: 70,
    servingUnit: '一个约70g',
    tags: ['鸭蛋', '咸鸭蛋']
  },
  {
    id: 'egg-quail',
    name: '鹌鹑蛋',
    category: 'egg',
    nutrients: { calories: 160, protein: 12.8, carbs: 0.9, fat: 11.1 },
    servingSize: 10,
    servingUnit: '一个约10g',
    tags: ['鹌鹑蛋', '小蛋']
  },

  // ==================== 乳制品 ====================
  {
    id: 'milk-whole',
    name: '全脂牛奶',
    category: 'dairy',
    nutrients: { calories: 65, protein: 3.0, carbs: 4.9, fat: 3.6 },
    servingSize: 250,
    servingUnit: '一杯约250ml',
    tags: ['牛奶', '全脂', '鲜奶']
  },
  {
    id: 'milk-skim',
    name: '脱脂牛奶',
    category: 'dairy',
    nutrients: { calories: 35, protein: 3.4, carbs: 5.0, fat: 0.1 },
    servingSize: 250,
    servingUnit: '一杯约250ml',
    tags: ['牛奶', '脱脂', '减脂']
  },
  {
    id: 'yogurt-plain',
    name: '原味酸奶',
    category: 'dairy',
    nutrients: { calories: 72, protein: 2.5, carbs: 9.3, fat: 2.7 },
    servingSize: 150,
    servingUnit: '一杯约150g',
    tags: ['酸奶', '原味', '乳酸菌']
  },
  {
    id: 'yogurt-greek',
    name: '希腊酸奶',
    category: 'dairy',
    nutrients: { calories: 97, protein: 9.0, carbs: 3.6, fat: 5.0 },
    servingSize: 150,
    servingUnit: '一杯约150g',
    tags: ['希腊酸奶', '高蛋白酸奶', '增肌']
  },
  {
    id: 'cheese',
    name: '奶酪/芝士',
    category: 'dairy',
    nutrients: { calories: 328, protein: 25.7, carbs: 3.5, fat: 23.5 },
    servingSize: 20,
    servingUnit: '一片约20g',
    tags: ['奶酪', '芝士', '起司', '高蛋白']
  },

  // ==================== 豆制品 ====================
  {
    id: 'tofu-firm',
    name: '老豆腐',
    category: 'bean',
    nutrients: { calories: 81, protein: 8.1, carbs: 4.2, fat: 3.7 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['豆腐', '老豆腐', '高蛋白', '素食']
  },
  {
    id: 'tofu-soft',
    name: '嫩豆腐',
    category: 'bean',
    nutrients: { calories: 62, protein: 6.2, carbs: 2.9, fat: 3.3 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['豆腐', '嫩豆腐', '日本豆腐']
  },
  {
    id: 'tofu-dried',
    name: '豆腐干',
    category: 'bean',
    nutrients: { calories: 140, protein: 16.2, carbs: 4.9, fat: 6.0 },
    servingSize: 50,
    servingUnit: '一块约50g',
    tags: ['豆干', '豆腐干', '香干']
  },
  {
    id: 'soymilk',
    name: '豆浆（无糖）',
    category: 'bean',
    nutrients: { calories: 31, protein: 2.9, carbs: 1.2, fat: 1.6 },
    servingSize: 300,
    servingUnit: '一杯约300ml',
    tags: ['豆浆', '豆奶', '早餐']
  },
  {
    id: 'edamame',
    name: '毛豆',
    category: 'bean',
    nutrients: { calories: 131, protein: 13.1, carbs: 10.2, fat: 5.0 },
    servingSize: 100,
    servingUnit: '100g（去壳）',
    tags: ['毛豆', '盐水毛豆', '高蛋白']
  },

  // ==================== 蔬菜类 ====================
  {
    id: 'broccoli',
    name: '西兰花',
    category: 'vegetable',
    nutrients: { calories: 34, protein: 4.1, carbs: 4.3, fat: 0.6, fiber: 3.3 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['西兰花', '绿花菜', '减脂', '健康', '增肌']
  },
  {
    id: 'spinach',
    name: '菠菜',
    category: 'vegetable',
    nutrients: { calories: 24, protein: 2.6, carbs: 2.8, fat: 0.3, fiber: 2.2 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['菠菜', '绿叶菜']
  },
  {
    id: 'lettuce',
    name: '生菜',
    category: 'vegetable',
    nutrients: { calories: 13, protein: 1.3, carbs: 2.0, fat: 0.3, fiber: 1.1 },
    servingSize: 50,
    servingUnit: '几片约50g',
    tags: ['生菜', '沙拉', '减脂']
  },
  {
    id: 'cabbage',
    name: '卷心菜/包菜',
    category: 'vegetable',
    nutrients: { calories: 22, protein: 1.5, carbs: 4.6, fat: 0.2, fiber: 1.0 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['卷心菜', '包菜', '圆白菜', '手撕包菜']
  },
  {
    id: 'bok-choy',
    name: '青菜/小白菜',
    category: 'vegetable',
    nutrients: { calories: 15, protein: 1.5, carbs: 2.7, fat: 0.2, fiber: 1.1 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['青菜', '小白菜', '油菜', '绿叶菜']
  },
  {
    id: 'cucumber',
    name: '黄瓜',
    category: 'vegetable',
    nutrients: { calories: 15, protein: 0.8, carbs: 2.9, fat: 0.2, fiber: 0.5 },
    servingSize: 150,
    servingUnit: '一根约150g',
    tags: ['黄瓜', '拍黄瓜', '减脂']
  },
  {
    id: 'tomato',
    name: '番茄/西红柿',
    category: 'vegetable',
    nutrients: { calories: 19, protein: 0.9, carbs: 4.0, fat: 0.2, fiber: 0.5 },
    servingSize: 150,
    servingUnit: '一个中等约150g',
    tags: ['番茄', '西红柿', '减脂']
  },
  {
    id: 'carrot',
    name: '胡萝卜',
    category: 'vegetable',
    nutrients: { calories: 37, protein: 1.0, carbs: 8.8, fat: 0.2, fiber: 2.8 },
    servingSize: 100,
    servingUnit: '一根约100g',
    tags: ['胡萝卜', '红萝卜']
  },
  {
    id: 'eggplant',
    name: '茄子',
    category: 'vegetable',
    nutrients: { calories: 21, protein: 1.1, carbs: 4.9, fat: 0.2, fiber: 1.3 },
    servingSize: 150,
    servingUnit: '一根约150g',
    tags: ['茄子', '鱼香茄子', '红烧茄子']
  },
  {
    id: 'pepper-bell',
    name: '甜椒/彩椒',
    category: 'vegetable',
    nutrients: { calories: 22, protein: 1.0, carbs: 5.4, fat: 0.2, fiber: 1.4 },
    servingSize: 100,
    servingUnit: '一个约100g',
    tags: ['甜椒', '彩椒', '灯笼椒']
  },
  {
    id: 'mushroom',
    name: '香菇',
    category: 'vegetable',
    nutrients: { calories: 26, protein: 2.2, carbs: 5.2, fat: 0.3, fiber: 3.3 },
    servingSize: 50,
    servingUnit: '几朵约50g',
    tags: ['香菇', '蘑菇', '菌菇']
  },
  {
    id: 'enoki',
    name: '金针菇',
    category: 'vegetable',
    nutrients: { calories: 32, protein: 2.4, carbs: 6.0, fat: 0.4, fiber: 2.7 },
    servingSize: 100,
    servingUnit: '一把约100g',
    tags: ['金针菇', '火锅', '菌菇']
  },
  {
    id: 'celery',
    name: '芹菜',
    category: 'vegetable',
    nutrients: { calories: 14, protein: 0.8, carbs: 3.0, fat: 0.1, fiber: 1.2 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['芹菜', '西芹', '绿叶菜']
  },
  {
    id: 'chives',
    name: '韭菜',
    category: 'vegetable',
    nutrients: { calories: 26, protein: 2.4, carbs: 4.6, fat: 0.4, fiber: 1.4 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['韭菜', '绿叶菜', '韭菜炒蛋']
  },
  {
    id: 'green-onion',
    name: '大葱',
    category: 'vegetable',
    nutrients: { calories: 30, protein: 1.9, carbs: 6.5, fat: 0.3, fiber: 1.3 },
    servingSize: 50,
    servingUnit: '一根约50g',
    tags: ['大葱', '葱', '调料蔬菜']
  },
  {
    id: 'onion',
    name: '洋葱',
    category: 'vegetable',
    nutrients: { calories: 39, protein: 1.1, carbs: 9.0, fat: 0.1, fiber: 1.7 },
    servingSize: 150,
    servingUnit: '一个约150g',
    tags: ['洋葱', '蔬菜']
  },
  {
    id: 'bitter-melon',
    name: '苦瓜',
    category: 'vegetable',
    nutrients: { calories: 19, protein: 1.0, carbs: 4.3, fat: 0.1, fiber: 1.4 },
    servingSize: 200,
    servingUnit: '一根约200g',
    tags: ['苦瓜', '减脂', '清热']
  },
  {
    id: 'winter-melon',
    name: '冬瓜',
    category: 'vegetable',
    nutrients: { calories: 11, protein: 0.4, carbs: 2.6, fat: 0.2, fiber: 0.7 },
    servingSize: 200,
    servingUnit: '200g',
    tags: ['冬瓜', '减脂', '低热量', '消水肿']
  },
  {
    id: 'loofah',
    name: '丝瓜',
    category: 'vegetable',
    nutrients: { calories: 20, protein: 1.0, carbs: 4.2, fat: 0.2, fiber: 0.6 },
    servingSize: 200,
    servingUnit: '一根约200g',
    tags: ['丝瓜', '蔬菜', '汤']
  },
  {
    id: 'zucchini',
    name: '西葫芦',
    category: 'vegetable',
    nutrients: { calories: 16, protein: 1.1, carbs: 3.0, fat: 0.2, fiber: 1.0 },
    servingSize: 200,
    servingUnit: '一根约200g',
    tags: ['西葫芦', '蔬菜', '低热量']
  },
  {
    id: 'pumpkin',
    name: '南瓜',
    category: 'vegetable',
    nutrients: { calories: 22, protein: 0.7, carbs: 5.3, fat: 0.1, fiber: 0.5 },
    servingSize: 200,
    servingUnit: '200g',
    tags: ['南瓜', '南瓜粥', '蔬菜']
  },
  {
    id: 'lotus-root',
    name: '莲藕',
    category: 'vegetable',
    nutrients: { calories: 70, protein: 1.9, carbs: 16.4, fat: 0.1, fiber: 1.2 },
    servingSize: 150,
    servingUnit: '一节约150g',
    tags: ['莲藕', '藕', '炖汤']
  },
  {
    id: 'white-radish',
    name: '白萝卜',
    category: 'vegetable',
    nutrients: { calories: 21, protein: 0.9, carbs: 4.6, fat: 0.1, fiber: 1.0 },
    servingSize: 200,
    servingUnit: '半根约200g',
    tags: ['白萝卜', '萝卜', '炖汤']
  },
  {
    id: 'chinese-yam',
    name: '山药',
    category: 'vegetable',
    nutrients: { calories: 56, protein: 1.9, carbs: 12.4, fat: 0.2, fiber: 0.8 },
    servingSize: 150,
    servingUnit: '150g',
    tags: ['山药', '淮山', '养胃']
  },
  {
    id: 'taro',
    name: '芋头',
    category: 'vegetable',
    nutrients: { calories: 79, protein: 2.2, carbs: 18.1, fat: 0.2, fiber: 1.0 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['芋头', '芋艿', '主食替代']
  },
  {
    id: 'oyster-mushroom',
    name: '平菇',
    category: 'vegetable',
    nutrients: { calories: 20, protein: 1.9, carbs: 3.6, fat: 0.2, fiber: 2.3 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['平菇', '蘑菇', '菌菇']
  },
  {
    id: 'king-oyster-mushroom',
    name: '杏鲍菇',
    category: 'vegetable',
    nutrients: { calories: 31, protein: 1.3, carbs: 6.6, fat: 0.1, fiber: 2.2 },
    servingSize: 100,
    servingUnit: '一个约100g',
    tags: ['杏鲍菇', '菌菇', '蘑菇']
  },
  {
    id: 'crab-mushroom',
    name: '蟹味菇',
    category: 'vegetable',
    nutrients: { calories: 26, protein: 2.7, carbs: 4.6, fat: 0.3, fiber: 2.0 },
    servingSize: 100,
    servingUnit: '一把约100g',
    tags: ['蟹味菇', '白玉菇', '菌菇', '火锅']
  },
  {
    id: 'black-fungus',
    name: '黑木耳（泡发）',
    category: 'vegetable',
    nutrients: { calories: 21, protein: 1.5, carbs: 3.6, fat: 0.2, fiber: 2.6 },
    servingSize: 80,
    servingUnit: '泡发约80g',
    tags: ['木耳', '黑木耳', '凉拌木耳']
  },
  {
    id: 'white-fungus',
    name: '银耳（泡发）',
    category: 'vegetable',
    nutrients: { calories: 15, protein: 1.4, carbs: 3.1, fat: 0.1, fiber: 2.6 },
    servingSize: 100,
    servingUnit: '泡发约100g',
    tags: ['银耳', '雪耳', '银耳汤']
  },
  {
    id: 'cauliflower',
    name: '花椰菜/花菜',
    category: 'vegetable',
    nutrients: { calories: 24, protein: 1.9, carbs: 5.0, fat: 0.3, fiber: 2.0 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['花菜', '花椰菜', '白花菜', '干锅花菜']
  },
  {
    id: 'purple-cabbage',
    name: '紫甘蓝',
    category: 'vegetable',
    nutrients: { calories: 27, protein: 1.4, carbs: 6.1, fat: 0.2, fiber: 2.1 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['紫甘蓝', '紫包菜', '沙拉']
  },
  {
    id: 'chinese-cabbage',
    name: '大白菜',
    category: 'vegetable',
    nutrients: { calories: 13, protein: 1.5, carbs: 2.1, fat: 0.2, fiber: 0.8 },
    servingSize: 200,
    servingUnit: '200g',
    tags: ['大白菜', '白菜', '炖白菜', '火锅']
  },
  {
    id: 'baby-cabbage',
    name: '娃娃菜',
    category: 'vegetable',
    nutrients: { calories: 12, protein: 1.2, carbs: 2.2, fat: 0.1, fiber: 0.7 },
    servingSize: 200,
    servingUnit: '一棵约200g',
    tags: ['娃娃菜', '白菜', '火锅', '蒸菜']
  },
  {
    id: 'snow-peas',
    name: '荷兰豆',
    category: 'vegetable',
    nutrients: { calories: 42, protein: 2.8, carbs: 7.5, fat: 0.2, fiber: 2.6 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['荷兰豆', '甜豆', '豌豆']
  },
  {
    id: 'cowpea',
    name: '豇豆/长豆角',
    category: 'vegetable',
    nutrients: { calories: 29, protein: 2.7, carbs: 5.8, fat: 0.2, fiber: 1.8 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['豇豆', '豆角', '长豆角', '炒豆角']
  },
  {
    id: 'green-peas',
    name: '豌豆（嫩）',
    category: 'vegetable',
    nutrients: { calories: 73, protein: 5.4, carbs: 13.8, fat: 0.4, fiber: 5.1 },
    servingSize: 80,
    servingUnit: '80g（去荚）',
    tags: ['豌豆', '青豆', '蔬菜']
  },
  {
    id: 'mung-bean-sprout',
    name: '绿豆芽',
    category: 'vegetable',
    nutrients: { calories: 18, protein: 2.1, carbs: 2.9, fat: 0.1, fiber: 0.8 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['绿豆芽', '豆芽', '炒豆芽']
  },
  {
    id: 'soy-sprout',
    name: '黄豆芽',
    category: 'vegetable',
    nutrients: { calories: 44, protein: 4.5, carbs: 4.5, fat: 1.6, fiber: 1.0 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['黄豆芽', '豆芽']
  },
  {
    id: 'asparagus',
    name: '芦笋',
    category: 'vegetable',
    nutrients: { calories: 22, protein: 2.2, carbs: 4.1, fat: 0.1, fiber: 2.1 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['芦笋', '蔬菜', '减脂']
  },
  {
    id: 'bamboo-shoot',
    name: '竹笋',
    category: 'vegetable',
    nutrients: { calories: 19, protein: 2.6, carbs: 3.6, fat: 0.2, fiber: 1.8 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['竹笋', '笋', '冬笋']
  },
  {
    id: 'okra',
    name: '秋葵',
    category: 'vegetable',
    nutrients: { calories: 30, protein: 2.0, carbs: 6.5, fat: 0.1, fiber: 3.2 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['秋葵', '蔬菜', '健康']
  },
  {
    id: 'kelp',
    name: '海带（泡发）',
    category: 'vegetable',
    nutrients: { calories: 12, protein: 1.2, carbs: 2.1, fat: 0.1, fiber: 0.5 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['海带', '昆布', '汤']
  },
  {
    id: 'green-pepper',
    name: '青椒',
    category: 'vegetable',
    nutrients: { calories: 22, protein: 1.0, carbs: 5.2, fat: 0.2, fiber: 1.4 },
    servingSize: 100,
    servingUnit: '一个约100g',
    tags: ['青椒', '辣椒', '炒菜']
  },
  {
    id: 'yellow-chive',
    name: '韭黄',
    category: 'vegetable',
    nutrients: { calories: 22, protein: 2.3, carbs: 3.9, fat: 0.2, fiber: 1.2 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['韭黄', '韭菜', '炒鸡蛋']
  },
  {
    id: 'water-spinach',
    name: '空心菜',
    category: 'vegetable',
    nutrients: { calories: 20, protein: 2.2, carbs: 3.2, fat: 0.3, fiber: 1.4 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['空心菜', '蕹菜', '通菜', '绿叶菜']
  },
  {
    id: 'chrysanthemum-greens',
    name: '茼蒿',
    category: 'vegetable',
    nutrients: { calories: 21, protein: 1.9, carbs: 3.9, fat: 0.3, fiber: 1.2 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['茼蒿', '蓬蒿菜', '绿叶菜', '火锅']
  },
  {
    id: 'romaine',
    name: '油麦菜',
    category: 'vegetable',
    nutrients: { calories: 15, protein: 1.4, carbs: 2.2, fat: 0.3, fiber: 0.6 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['油麦菜', '绿叶菜', '清炒']
  },
  {
    id: 'coriander',
    name: '香菜',
    category: 'vegetable',
    nutrients: { calories: 23, protein: 2.2, carbs: 3.5, fat: 0.5, fiber: 2.8 },
    servingSize: 10,
    servingUnit: '少许约10g',
    tags: ['香菜', '芫荽', '调料']
  },

  // ==================== 水果类 ====================
  {
    id: 'apple',
    name: '苹果',
    category: 'fruit',
    nutrients: { calories: 52, protein: 0.2, carbs: 13.7, fat: 0.2, fiber: 1.2 },
    servingSize: 200,
    servingUnit: '一个中等约200g',
    tags: ['苹果', '水果']
  },
  {
    id: 'banana',
    name: '香蕉',
    category: 'fruit',
    nutrients: { calories: 93, protein: 1.4, carbs: 22.0, fat: 0.2, fiber: 1.2 },
    servingSize: 120,
    servingUnit: '一根约120g（去皮）',
    tags: ['香蕉', '水果', '训练前', '碳水']
  },
  {
    id: 'orange',
    name: '橙子',
    category: 'fruit',
    nutrients: { calories: 48, protein: 0.8, carbs: 11.8, fat: 0.2, fiber: 0.6 },
    servingSize: 200,
    servingUnit: '一个约200g',
    tags: ['橙子', '水果', '维C']
  },
  {
    id: 'grape',
    name: '葡萄',
    category: 'fruit',
    nutrients: { calories: 44, protein: 0.5, carbs: 10.3, fat: 0.2 },
    servingSize: 100,
    servingUnit: '一小串约100g',
    tags: ['葡萄', '提子', '水果']
  },
  {
    id: 'watermelon',
    name: '西瓜',
    category: 'fruit',
    nutrients: { calories: 31, protein: 0.5, carbs: 7.1, fat: 0.1 },
    servingSize: 200,
    servingUnit: '一块约200g',
    tags: ['西瓜', '水果', '夏天']
  },
  {
    id: 'mango',
    name: '芒果',
    category: 'fruit',
    nutrients: { calories: 65, protein: 0.6, carbs: 15.3, fat: 0.3 },
    servingSize: 150,
    servingUnit: '一个约150g（去皮核）',
    tags: ['芒果', '水果']
  },
  {
    id: 'strawberry',
    name: '草莓',
    category: 'fruit',
    nutrients: { calories: 30, protein: 1.0, carbs: 6.2, fat: 0.2, fiber: 1.1 },
    servingSize: 100,
    servingUnit: '几颗约100g',
    tags: ['草莓', '水果', '减脂']
  },
  {
    id: 'blueberry',
    name: '蓝莓',
    category: 'fruit',
    nutrients: { calories: 57, protein: 0.7, carbs: 14.5, fat: 0.3, fiber: 2.4 },
    servingSize: 50,
    servingUnit: '一小盒约50g',
    tags: ['蓝莓', '水果', '抗氧化']
  },
  {
    id: 'kiwi',
    name: '猕猴桃',
    category: 'fruit',
    nutrients: { calories: 56, protein: 0.8, carbs: 11.9, fat: 0.6, fiber: 2.6 },
    servingSize: 80,
    servingUnit: '一个约80g',
    tags: ['猕猴桃', '奇异果', '维C']
  },

  // ==================== 坚果类 ====================
  {
    id: 'almond',
    name: '杏仁',
    category: 'nut',
    nutrients: { calories: 578, protein: 21.2, carbs: 19.7, fat: 50.6, fiber: 11.8 },
    servingSize: 25,
    servingUnit: '一小把约25g',
    tags: ['杏仁', '坚果', '健康脂肪']
  },
  {
    id: 'walnut',
    name: '核桃',
    category: 'nut',
    nutrients: { calories: 654, protein: 14.9, carbs: 9.6, fat: 63.0, fiber: 6.7 },
    servingSize: 25,
    servingUnit: '2-3个约25g',
    tags: ['核桃', '坚果', '补脑']
  },
  {
    id: 'peanut',
    name: '花生',
    category: 'nut',
    nutrients: { calories: 563, protein: 24.8, carbs: 13.1, fat: 44.3, fiber: 7.7 },
    servingSize: 30,
    servingUnit: '一小把约30g',
    tags: ['花生', '坚果', '高蛋白']
  },
  {
    id: 'cashew',
    name: '腰果',
    category: 'nut',
    nutrients: { calories: 559, protein: 17.7, carbs: 32.7, fat: 40.8, fiber: 3.0 },
    servingSize: 25,
    servingUnit: '一小把约25g',
    tags: ['腰果', '坚果']
  },
];

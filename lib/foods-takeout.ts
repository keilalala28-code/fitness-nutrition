import { FoodItem } from '@/types/nutrition';

// 外卖和餐厅食物数据库
// 数据来源：各品牌官网、美团/饿了么商家数据、中国食物成分表
// 营养数据均为每100g含量

export const TAKEOUT_FOODS: FoodItem[] = [
  // ==================== 中式外卖常见菜品 ====================
  {
    id: 'kungpao-chicken',
    name: '宫保鸡丁',
    category: 'takeout',
    nutrients: { calories: 180, protein: 15.0, carbs: 8.0, fat: 10.0 },
    servingSize: 250,
    servingUnit: '一份约250g',
    tags: ['宫保鸡丁', '川菜', '鸡肉', '外卖']
  },
  {
    id: 'yuxiang-shredded',
    name: '鱼香肉丝',
    category: 'takeout',
    nutrients: { calories: 165, protein: 12.0, carbs: 10.0, fat: 9.0 },
    servingSize: 250,
    servingUnit: '一份约250g',
    tags: ['鱼香肉丝', '川菜', '猪肉', '外卖']
  },
  {
    id: 'mapo-tofu',
    name: '麻婆豆腐',
    category: 'takeout',
    nutrients: { calories: 128, protein: 8.5, carbs: 5.0, fat: 8.5 },
    servingSize: 300,
    servingUnit: '一份约300g',
    tags: ['麻婆豆腐', '川菜', '豆腐', '外卖']
  },
  {
    id: 'sweet-sour-pork',
    name: '糖醋里脊',
    category: 'takeout',
    nutrients: { calories: 220, protein: 14.0, carbs: 20.0, fat: 10.0 },
    servingSize: 250,
    servingUnit: '一份约250g',
    tags: ['糖醋里脊', '糖醋排骨', '猪肉', '外卖']
  },
  {
    id: 'braised-pork',
    name: '红烧肉',
    category: 'takeout',
    nutrients: { calories: 320, protein: 12.0, carbs: 8.0, fat: 28.0 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['红烧肉', '五花肉', '外卖', '高热量']
  },
  {
    id: 'scrambled-egg-tomato',
    name: '番茄炒蛋',
    category: 'takeout',
    nutrients: { calories: 110, protein: 7.0, carbs: 6.0, fat: 6.5 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['番茄炒蛋', '西红柿炒蛋', '鸡蛋', '外卖', '家常']
  },
  {
    id: 'stir-fry-beef',
    name: '小炒牛肉',
    category: 'takeout',
    nutrients: { calories: 145, protein: 18.0, carbs: 4.0, fat: 6.5 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['小炒牛肉', '牛肉', '外卖', '增肌']
  },
  {
    id: 'stir-fry-shrimp',
    name: '清炒虾仁',
    category: 'takeout',
    nutrients: { calories: 95, protein: 18.0, carbs: 3.0, fat: 1.5 },
    servingSize: 150,
    servingUnit: '一份约150g',
    tags: ['清炒虾仁', '虾', '海鲜', '外卖', '减脂']
  },
  {
    id: 'dry-fried-beans',
    name: '干煸四季豆',
    category: 'takeout',
    nutrients: { calories: 145, protein: 4.0, carbs: 8.0, fat: 11.0 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['干煸四季豆', '豆角', '蔬菜', '外卖']
  },
  {
    id: 'garlic-greens',
    name: '蒜蓉青菜',
    category: 'takeout',
    nutrients: { calories: 55, protein: 2.0, carbs: 4.0, fat: 3.5 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['蒜蓉青菜', '炒青菜', '蔬菜', '外卖', '减脂']
  },
  {
    id: 'spicy-chicken',
    name: '辣子鸡',
    category: 'takeout',
    nutrients: { calories: 245, protein: 16.0, carbs: 8.0, fat: 17.0 },
    servingSize: 250,
    servingUnit: '一份约250g',
    tags: ['辣子鸡', '川菜', '鸡肉', '外卖']
  },
  {
    id: 'twice-cooked-pork',
    name: '回锅肉',
    category: 'takeout',
    nutrients: { calories: 280, protein: 12.0, carbs: 6.0, fat: 23.0 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['回锅肉', '川菜', '猪肉', '外卖']
  },
  {
    id: 'steamed-fish',
    name: '清蒸鱼',
    category: 'takeout',
    nutrients: { calories: 105, protein: 18.0, carbs: 2.0, fat: 3.0 },
    servingSize: 200,
    servingUnit: '一份约200g（可食部分）',
    tags: ['清蒸鱼', '蒸鱼', '海鲜', '外卖', '健康']
  },
  {
    id: 'braised-chicken',
    name: '黄焖鸡',
    category: 'takeout',
    nutrients: { calories: 165, protein: 14.0, carbs: 5.0, fat: 10.0 },
    servingSize: 300,
    servingUnit: '一份约300g',
    tags: ['黄焖鸡', '黄焖鸡米饭', '鸡肉', '外卖']
  },
  {
    id: 'egg-fried-rice',
    name: '蛋炒饭',
    category: 'takeout',
    nutrients: { calories: 175, protein: 5.5, carbs: 26.0, fat: 5.5 },
    servingSize: 350,
    servingUnit: '一份约350g',
    tags: ['蛋炒饭', '炒饭', '主食', '外卖']
  },
  {
    id: 'yangzhou-fried-rice',
    name: '扬州炒饭',
    category: 'takeout',
    nutrients: { calories: 185, protein: 7.0, carbs: 25.0, fat: 6.5 },
    servingSize: 350,
    servingUnit: '一份约350g',
    tags: ['扬州炒饭', '炒饭', '主食', '外卖']
  },
  {
    id: 'beef-noodle',
    name: '牛肉面',
    category: 'noodle',
    nutrients: { calories: 135, protein: 7.5, carbs: 18.0, fat: 3.5 },
    servingSize: 500,
    servingUnit: '一碗约500g（带汤）',
    tags: ['牛肉面', '面条', '外卖', '兰州拉面']
  },
  {
    id: 'zhajiang-noodle',
    name: '炸酱面',
    category: 'noodle',
    nutrients: { calories: 165, protein: 6.5, carbs: 22.0, fat: 6.0 },
    servingSize: 400,
    servingUnit: '一份约400g',
    tags: ['炸酱面', '面条', '外卖', '北京']
  },
  {
    id: 'wonton-noodle',
    name: '馄饨面',
    category: 'noodle',
    nutrients: { calories: 95, protein: 4.5, carbs: 12.0, fat: 3.0 },
    servingSize: 450,
    servingUnit: '一碗约450g',
    tags: ['馄饨面', '云吞面', '外卖']
  },
  {
    id: 'hot-dry-noodle',
    name: '热干面',
    category: 'noodle',
    nutrients: { calories: 195, protein: 7.5, carbs: 25.0, fat: 8.0 },
    servingSize: 250,
    servingUnit: '一份约250g',
    tags: ['热干面', '武汉', '外卖']
  },
  {
    id: 'spicy-noodle',
    name: '麻辣烫/冒菜',
    category: 'takeout',
    nutrients: { calories: 85, protein: 4.0, carbs: 8.0, fat: 4.0 },
    servingSize: 500,
    servingUnit: '一份约500g（含汤）',
    tags: ['麻辣烫', '冒菜', '外卖', '四川']
  },
  {
    id: 'malatang-dry',
    name: '麻辣拌',
    category: 'takeout',
    nutrients: { calories: 130, protein: 6.0, carbs: 10.0, fat: 7.5 },
    servingSize: 350,
    servingUnit: '一份约350g',
    tags: ['麻辣拌', '干拌', '外卖']
  },

  // ==================== 盖浇饭系列 ====================
  {
    id: 'chicken-rice',
    name: '鸡肉盖浇饭',
    category: 'takeout',
    nutrients: { calories: 155, protein: 10.0, carbs: 20.0, fat: 4.0 },
    servingSize: 450,
    servingUnit: '一份约450g',
    tags: ['鸡肉饭', '盖浇饭', '外卖']
  },
  {
    id: 'pork-rice',
    name: '红烧肉盖浇饭',
    category: 'takeout',
    nutrients: { calories: 195, protein: 8.0, carbs: 22.0, fat: 9.0 },
    servingSize: 450,
    servingUnit: '一份约450g',
    tags: ['红烧肉饭', '盖浇饭', '外卖']
  },
  {
    id: 'curry-rice',
    name: '咖喱鸡肉饭',
    category: 'takeout',
    nutrients: { calories: 165, protein: 9.0, carbs: 22.0, fat: 5.0 },
    servingSize: 450,
    servingUnit: '一份约450g',
    tags: ['咖喱饭', '咖喱鸡', '外卖']
  },
  {
    id: 'teriyaki-chicken',
    name: '照烧鸡腿饭',
    category: 'takeout',
    nutrients: { calories: 175, protein: 11.0, carbs: 23.0, fat: 5.0 },
    servingSize: 450,
    servingUnit: '一份约450g',
    tags: ['照烧鸡', '鸡腿饭', '外卖', '日式']
  },

  // ==================== 沙县小吃 ====================
  // 数据来源：沙县小吃官方、第三方热量测评（2025-2026）
  {
    id: 'shaxian-steamed-dumpling',
    name: '柳叶蒸饺（一笼）',
    brand: '沙县小吃',
    category: 'takeout',
    nutrients: { calories: 200, protein: 8.0, carbs: 28.0, fat: 6.5 },
    servingSize: 160,
    servingUnit: '一笼约160g（8个，326卡）',
    tags: ['沙县小吃', '蒸饺', '主食', '早餐']
  },
  {
    id: 'shaxian-meat-dumpling',
    name: '鲜肉蒸饺（一笼）',
    brand: '沙县小吃',
    category: 'takeout',
    nutrients: { calories: 195, protein: 9.0, carbs: 26.0, fat: 6.0 },
    servingSize: 165,
    servingUnit: '一笼约165g（8个，320卡）',
    tags: ['沙县小吃', '蒸饺', '鲜肉', '早餐']
  },
  {
    id: 'shaxian-bianrou-soup',
    name: '扁肉/馄饨汤',
    brand: '沙县小吃',
    category: 'takeout',
    nutrients: { calories: 85, protein: 5.0, carbs: 10.0, fat: 2.5 },
    servingSize: 350,
    servingUnit: '一碗约350g（含汤）',
    tags: ['沙县小吃', '扁肉', '馄饨', '汤', '低卡']
  },
  {
    id: 'shaxian-wonton-dry',
    name: '拌馄饨/麻酱云吞',
    brand: '沙县小吃',
    category: 'takeout',
    nutrients: { calories: 155, protein: 7.0, carbs: 18.0, fat: 6.5 },
    servingSize: 280,
    servingUnit: '一份约280g（427卡）',
    tags: ['沙县小吃', '馄饨', '拌', '麻酱']
  },
  {
    id: 'shaxian-noodle-dry',
    name: '拌面（干拌）',
    brand: '沙县小吃',
    category: 'noodle',
    nutrients: { calories: 195, protein: 6.0, carbs: 32.0, fat: 5.5 },
    servingSize: 240,
    servingUnit: '一份约240g（467卡）',
    tags: ['沙县小吃', '拌面', '干拌', '主食']
  },
  {
    id: 'shaxian-noodle-peanut',
    name: '花生酱拌面',
    brand: '沙县小吃',
    category: 'noodle',
    nutrients: { calories: 255, protein: 8.0, carbs: 35.0, fat: 10.0 },
    servingSize: 260,
    servingUnit: '一份约260g（680卡）',
    tags: ['沙县小吃', '拌面', '花生酱', '高热量']
  },
  {
    id: 'shaxian-noodle-scallion',
    name: '葱香拌面',
    brand: '沙县小吃',
    category: 'noodle',
    nutrients: { calories: 265, protein: 6.5, carbs: 38.0, fat: 10.5 },
    servingSize: 265,
    servingUnit: '一份约265g（706卡）',
    tags: ['沙县小吃', '拌面', '葱香', '高热量']
  },
  {
    id: 'shaxian-chicken-rice',
    name: '鸡腿饭套餐',
    brand: '沙县小吃',
    category: 'takeout',
    nutrients: { calories: 145, protein: 10.0, carbs: 18.0, fat: 4.0 },
    servingSize: 450,
    servingUnit: '一份约450g（650卡）',
    tags: ['沙县小吃', '鸡腿饭', '套餐', '减脂推荐']
  },
  {
    id: 'shaxian-chicken-rice-half',
    name: '鸡腿饭（半份米饭）',
    brand: '沙县小吃',
    category: 'takeout',
    nutrients: { calories: 128, protein: 12.0, carbs: 12.0, fat: 4.0 },
    servingSize: 350,
    servingUnit: '一份约350g（451卡）',
    tags: ['沙县小吃', '鸡腿饭', '减脂', '半份饭']
  },
  {
    id: 'shaxian-pork-rice',
    name: '卤肉饭套餐',
    brand: '沙县小吃',
    category: 'takeout',
    nutrients: { calories: 165, protein: 8.0, carbs: 22.0, fat: 5.5 },
    servingSize: 400,
    servingUnit: '一份约400g',
    tags: ['沙县小吃', '卤肉饭', '套餐']
  },
  {
    id: 'shaxian-duck-rice',
    name: '鸭腿饭套餐',
    brand: '沙县小吃',
    category: 'takeout',
    nutrients: { calories: 155, protein: 11.0, carbs: 18.0, fat: 5.0 },
    servingSize: 450,
    servingUnit: '一份约450g',
    tags: ['沙县小吃', '鸭腿饭', '套餐']
  },
  {
    id: 'shaxian-stew-pot',
    name: '炖罐（排骨汤）',
    brand: '沙县小吃',
    category: 'soup',
    nutrients: { calories: 45, protein: 4.0, carbs: 2.0, fat: 2.5 },
    servingSize: 300,
    servingUnit: '一罐约300ml',
    tags: ['沙县小吃', '炖罐', '汤', '排骨', '低卡']
  },
  {
    id: 'shaxian-stew-chicken',
    name: '炖罐（鸡汤）',
    brand: '沙县小吃',
    category: 'soup',
    nutrients: { calories: 40, protein: 5.0, carbs: 1.5, fat: 2.0 },
    servingSize: 300,
    servingUnit: '一罐约300ml',
    tags: ['沙县小吃', '炖罐', '鸡汤', '低卡']
  },
  {
    id: 'shaxian-beef-noodle',
    name: '牛肉面',
    brand: '沙县小吃',
    category: 'noodle',
    nutrients: { calories: 125, protein: 8.0, carbs: 16.0, fat: 3.5 },
    servingSize: 480,
    servingUnit: '一碗约480g',
    tags: ['沙县小吃', '牛肉面', '面条']
  },
  {
    id: 'shaxian-egg-fried-rice',
    name: '蛋炒饭',
    brand: '沙县小吃',
    category: 'takeout',
    nutrients: { calories: 185, protein: 6.0, carbs: 28.0, fat: 6.0 },
    servingSize: 350,
    servingUnit: '一份约350g',
    tags: ['沙县小吃', '蛋炒饭', '炒饭', '高热量']
  },

  // ==================== 轻食/健康餐外卖 ====================
  // ==================== FOODBOWL 超级碗 ====================
  // 数据来源：超级碗官方小程序公示营养数据
  {
    id: 'foodbowl-honey-chicken',
    name: '蜜汁鸡腿超级碗',
    brand: 'FOODBOWL超级碗',
    category: 'takeout',
    nutrients: { calories: 138, protein: 12.0, carbs: 14.0, fat: 4.5 },
    servingSize: 473,
    servingUnit: '一份约473g（651卡）',
    tags: ['超级碗', 'FOODBOWL', '轻食', '减脂', '鸡腿']
  },
  {
    id: 'foodbowl-tuna-egg',
    name: '金枪鱼温泉蛋超级碗',
    brand: 'FOODBOWL超级碗',
    category: 'takeout',
    nutrients: { calories: 142, protein: 14.0, carbs: 12.0, fat: 5.0 },
    servingSize: 407,
    servingUnit: '一份约407g（577卡）',
    tags: ['超级碗', 'FOODBOWL', '轻食', '金枪鱼', '减脂']
  },
  {
    id: 'foodbowl-salmon',
    name: '香煎三文鱼超级碗',
    brand: 'FOODBOWL超级碗',
    category: 'takeout',
    nutrients: { calories: 155, protein: 15.0, carbs: 10.0, fat: 7.0 },
    servingSize: 420,
    servingUnit: '一份约420g',
    tags: ['超级碗', 'FOODBOWL', '轻食', '三文鱼', '高蛋白']
  },
  {
    id: 'foodbowl-beef',
    name: '黑椒牛肉超级碗',
    brand: 'FOODBOWL超级碗',
    category: 'takeout',
    nutrients: { calories: 148, protein: 14.5, carbs: 12.5, fat: 5.5 },
    servingSize: 450,
    servingUnit: '一份约450g',
    tags: ['超级碗', 'FOODBOWL', '轻食', '牛肉', '增肌']
  },
  {
    id: 'foodbowl-shrimp',
    name: '鲜虾超级碗',
    brand: 'FOODBOWL超级碗',
    category: 'takeout',
    nutrients: { calories: 125, protein: 13.0, carbs: 11.0, fat: 3.5 },
    servingSize: 400,
    servingUnit: '一份约400g',
    tags: ['超级碗', 'FOODBOWL', '轻食', '虾', '低脂']
  },
  {
    id: 'foodbowl-tofu',
    name: '香煎豆腐超级碗',
    brand: 'FOODBOWL超级碗',
    category: 'takeout',
    nutrients: { calories: 118, protein: 8.5, carbs: 13.0, fat: 4.0 },
    servingSize: 420,
    servingUnit: '一份约420g',
    tags: ['超级碗', 'FOODBOWL', '轻食', '豆腐', '素食']
  },

  // ==================== 超模厨房 ====================
  // 数据来源：超模厨房官方公示、外卖平台标注（2025-2026）
  {
    id: 'superbody-chicken-breast',
    name: '即食鸡胸肉（原味）',
    brand: '超模厨房',
    category: 'takeout',
    nutrients: { calories: 110, protein: 24.0, carbs: 1.0, fat: 1.5 },
    servingSize: 100,
    servingUnit: '一袋约100g',
    tags: ['超模厨房', '鸡胸肉', '高蛋白', '增肌', '减脂']
  },
  {
    id: 'superbody-chicken-breast-spicy',
    name: '即食鸡胸肉（香辣味）',
    brand: '超模厨房',
    category: 'takeout',
    nutrients: { calories: 118, protein: 23.0, carbs: 2.5, fat: 2.0 },
    servingSize: 100,
    servingUnit: '一袋约100g',
    tags: ['超模厨房', '鸡胸肉', '香辣', '高蛋白']
  },
  {
    id: 'superbody-chicken-breast-orleans',
    name: '即食鸡胸肉（奥尔良味）',
    brand: '超模厨房',
    category: 'takeout',
    nutrients: { calories: 120, protein: 22.5, carbs: 3.0, fat: 2.2 },
    servingSize: 100,
    servingUnit: '一袋约100g',
    tags: ['超模厨房', '鸡胸肉', '奥尔良', '高蛋白']
  },
  {
    id: 'superbody-chicken-breast-blackpepper',
    name: '即食鸡胸肉（黑胡椒味）',
    brand: '超模厨房',
    category: 'takeout',
    nutrients: { calories: 115, protein: 23.5, carbs: 2.0, fat: 1.8 },
    servingSize: 100,
    servingUnit: '一袋约100g',
    tags: ['超模厨房', '鸡胸肉', '黑胡椒', '高蛋白']
  },
  {
    id: 'superbody-chicken-breast-teriyaki',
    name: '即食鸡胸肉（照烧味）',
    brand: '超模厨房',
    category: 'takeout',
    nutrients: { calories: 125, protein: 22.0, carbs: 4.5, fat: 2.0 },
    servingSize: 100,
    servingUnit: '一袋约100g',
    tags: ['超模厨房', '鸡胸肉', '照烧', '高蛋白']
  },
  {
    id: 'superbody-beef-steak',
    name: '即食牛排',
    brand: '超模厨房',
    category: 'takeout',
    nutrients: { calories: 135, protein: 22.0, carbs: 2.0, fat: 4.5 },
    servingSize: 100,
    servingUnit: '一袋约100g',
    tags: ['超模厨房', '牛排', '高蛋白', '增肌']
  },
  {
    id: 'superbody-beef-cubes',
    name: '即食牛肉粒',
    brand: '超模厨房',
    category: 'takeout',
    nutrients: { calories: 140, protein: 21.0, carbs: 3.0, fat: 5.0 },
    servingSize: 100,
    servingUnit: '一袋约100g',
    tags: ['超模厨房', '牛肉粒', '高蛋白', '零食']
  },
  {
    id: 'superbody-whole-wheat',
    name: '全麦面包',
    brand: '超模厨房',
    category: 'grain',
    nutrients: { calories: 245, protein: 9.0, carbs: 45.0, fat: 3.5, fiber: 6.0 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['超模厨房', '全麦面包', '粗粮', '低GI', '减脂']
  },
  {
    id: 'superbody-whole-wheat-toast',
    name: '全麦吐司（无蔗糖）',
    brand: '超模厨房',
    category: 'grain',
    nutrients: { calories: 235, protein: 10.0, carbs: 42.0, fat: 3.0, fiber: 7.0 },
    servingSize: 100,
    servingUnit: '100g（约4片）',
    tags: ['超模厨房', '全麦吐司', '无糖', '早餐']
  },
  {
    id: 'superbody-oatmeal',
    name: '即食燕麦片',
    brand: '超模厨房',
    category: 'grain',
    nutrients: { calories: 367, protein: 13.5, carbs: 62.0, fat: 7.0, fiber: 10.5 },
    servingSize: 40,
    servingUnit: '一份约40g',
    tags: ['超模厨房', '燕麦', '早餐', '粗粮', '减脂']
  },
  {
    id: 'superbody-oatmeal-fruit',
    name: '水果燕麦片',
    brand: '超模厨房',
    category: 'grain',
    nutrients: { calories: 380, protein: 11.0, carbs: 68.0, fat: 6.5, fiber: 8.0 },
    servingSize: 40,
    servingUnit: '一份约40g',
    tags: ['超模厨房', '燕麦', '水果', '早餐']
  },
  {
    id: 'superbody-nuts-mix',
    name: '每日坚果（混合）',
    brand: '超模厨房',
    category: 'snack',
    nutrients: { calories: 580, protein: 15.0, carbs: 20.0, fat: 50.0 },
    servingSize: 25,
    servingUnit: '一袋约25g（145卡）',
    tags: ['超模厨房', '坚果', '零食', '健康脂肪']
  },
  {
    id: 'superbody-nuts-lowcarb',
    name: '低碳坚果（无干果）',
    brand: '超模厨房',
    category: 'snack',
    nutrients: { calories: 620, protein: 18.0, carbs: 12.0, fat: 55.0 },
    servingSize: 25,
    servingUnit: '一袋约25g（155卡）',
    tags: ['超模厨房', '坚果', '低碳', '生酮']
  },
  {
    id: 'superbody-salad-chicken',
    name: '鸡胸肉沙拉套餐',
    brand: '超模厨房',
    category: 'takeout',
    nutrients: { calories: 95, protein: 14.0, carbs: 5.0, fat: 2.5 },
    servingSize: 350,
    servingUnit: '一份约350g',
    tags: ['超模厨房', '沙拉', '鸡胸肉', '减脂', '轻食']
  },
  {
    id: 'superbody-salad-shrimp',
    name: '鲜虾沙拉套餐',
    brand: '超模厨房',
    category: 'takeout',
    nutrients: { calories: 88, protein: 13.0, carbs: 5.5, fat: 2.0 },
    servingSize: 320,
    servingUnit: '一份约320g',
    tags: ['超模厨房', '沙拉', '虾', '减脂', '轻食']
  },
  {
    id: 'superbody-salad-beef',
    name: '牛肉沙拉套餐',
    brand: '超模厨房',
    category: 'takeout',
    nutrients: { calories: 105, protein: 15.0, carbs: 5.0, fat: 3.5 },
    servingSize: 350,
    servingUnit: '一份约350g',
    tags: ['超模厨房', '沙拉', '牛肉', '减脂', '轻食']
  },
  {
    id: 'superbody-quinoa-bowl',
    name: '藜麦能量碗',
    brand: '超模厨房',
    category: 'takeout',
    nutrients: { calories: 135, protein: 10.0, carbs: 18.0, fat: 3.5 },
    servingSize: 350,
    servingUnit: '一份约350g（472卡）',
    tags: ['超模厨房', '藜麦', '能量碗', '减脂', '轻食']
  },
  {
    id: 'superbody-brown-rice-bowl',
    name: '糙米饭能量碗',
    brand: '超模厨房',
    category: 'takeout',
    nutrients: { calories: 145, protein: 9.0, carbs: 22.0, fat: 3.0 },
    servingSize: 380,
    servingUnit: '一份约380g',
    tags: ['超模厨房', '糙米', '能量碗', '轻食']
  },
  {
    id: 'superbody-protein-bar',
    name: '蛋白棒',
    brand: '超模厨房',
    category: 'snack',
    nutrients: { calories: 380, protein: 30.0, carbs: 35.0, fat: 12.0 },
    servingSize: 60,
    servingUnit: '一根约60g（228卡）',
    tags: ['超模厨房', '蛋白棒', '高蛋白', '代餐', '增肌']
  },
  {
    id: 'superbody-protein-bar-choco',
    name: '蛋白棒（巧克力味）',
    brand: '超模厨房',
    category: 'snack',
    nutrients: { calories: 390, protein: 28.0, carbs: 38.0, fat: 13.0 },
    servingSize: 60,
    servingUnit: '一根约60g（234卡）',
    tags: ['超模厨房', '蛋白棒', '巧克力', '高蛋白']
  },
  {
    id: 'superbody-konjac-noodle',
    name: '魔芋面',
    brand: '超模厨房',
    category: 'takeout',
    nutrients: { calories: 12, protein: 0.5, carbs: 2.5, fat: 0.1, fiber: 3.0 },
    servingSize: 200,
    servingUnit: '一袋约200g（24卡）',
    tags: ['超模厨房', '魔芋面', '低卡', '减脂', '代餐']
  },
  {
    id: 'superbody-konjac-rice',
    name: '魔芋米饭',
    brand: '超模厨房',
    category: 'takeout',
    nutrients: { calories: 10, protein: 0.3, carbs: 2.0, fat: 0.1, fiber: 2.5 },
    servingSize: 200,
    servingUnit: '一袋约200g（20卡）',
    tags: ['超模厨房', '魔芋米', '低卡', '减脂', '代餐']
  },
  {
    id: 'superbody-egg-white',
    name: '蛋白液（即饮）',
    brand: '超模厨房',
    category: 'takeout',
    nutrients: { calories: 50, protein: 11.0, carbs: 0.5, fat: 0.1 },
    servingSize: 100,
    servingUnit: '一瓶约100ml',
    tags: ['超模厨房', '蛋白液', '蛋清', '高蛋白', '增肌']
  },

  // ==================== 优形 YOUXING ====================
  // 数据来源：优形官方（2025-2026）
  {
    id: 'youxing-chicken-original',
    name: '即食鸡胸肉（原味）',
    brand: '优形',
    category: 'takeout',
    nutrients: { calories: 105, protein: 31.0, carbs: 1.0, fat: 1.2 },
    servingSize: 100,
    servingUnit: '一袋约100g',
    tags: ['优形', '鸡胸肉', '高蛋白', '增肌', '减脂']
  },
  {
    id: 'youxing-chicken-blackpepper',
    name: '即食鸡胸肉（黑胡椒味）',
    brand: '优形',
    category: 'takeout',
    nutrients: { calories: 110, protein: 30.0, carbs: 2.0, fat: 1.5 },
    servingSize: 100,
    servingUnit: '一袋约100g',
    tags: ['优形', '鸡胸肉', '黑胡椒', '高蛋白']
  },
  {
    id: 'youxing-chicken-orleans',
    name: '即食鸡胸肉（奥尔良味）',
    brand: '优形',
    category: 'takeout',
    nutrients: { calories: 115, protein: 29.0, carbs: 3.0, fat: 1.8 },
    servingSize: 100,
    servingUnit: '一袋约100g',
    tags: ['优形', '鸡胸肉', '奥尔良', '高蛋白']
  },
  {
    id: 'youxing-chicken-cumin',
    name: '即食鸡胸肉（孜然味）',
    brand: '优形',
    category: 'takeout',
    nutrients: { calories: 112, protein: 30.0, carbs: 2.5, fat: 1.5 },
    servingSize: 100,
    servingUnit: '一袋约100g',
    tags: ['优形', '鸡胸肉', '孜然', '高蛋白']
  },

  // ==================== 鲨鱼菲特 ====================
  // 数据来源：鲨鱼菲特官方（2025-2026）
  {
    id: 'sharkfit-chicken-original',
    name: '即食鸡胸肉（原味）',
    brand: '鲨鱼菲特',
    category: 'takeout',
    nutrients: { calories: 108, protein: 26.0, carbs: 1.5, fat: 0.0 },
    servingSize: 100,
    servingUnit: '一袋约100g',
    tags: ['鲨鱼菲特', '鸡胸肉', '零脂肪', '高蛋白', '减脂']
  },
  {
    id: 'sharkfit-chicken-spicy',
    name: '即食鸡胸肉（香辣味）',
    brand: '鲨鱼菲特',
    category: 'takeout',
    nutrients: { calories: 112, protein: 25.0, carbs: 2.5, fat: 0.0 },
    servingSize: 100,
    servingUnit: '一袋约100g',
    tags: ['鲨鱼菲特', '鸡胸肉', '香辣', '零脂肪']
  },
  {
    id: 'sharkfit-chicken-orleans',
    name: '即食鸡胸肉（奥尔良味）',
    brand: '鲨鱼菲特',
    category: 'takeout',
    nutrients: { calories: 115, protein: 25.5, carbs: 3.0, fat: 0.6 },
    servingSize: 100,
    servingUnit: '一袋约100g',
    tags: ['鲨鱼菲特', '鸡胸肉', '奥尔良']
  },
  {
    id: 'sharkfit-chicken-cumin',
    name: '即食鸡胸肉（孜然味）',
    brand: '鲨鱼菲特',
    category: 'takeout',
    nutrients: { calories: 118, protein: 24.0, carbs: 4.0, fat: 0.6 },
    servingSize: 100,
    servingUnit: '一袋约100g',
    tags: ['鲨鱼菲特', '鸡胸肉', '孜然']
  },
  {
    id: 'sharkfit-beef-original',
    name: '即食牛肉（原味）',
    brand: '鲨鱼菲特',
    category: 'takeout',
    nutrients: { calories: 130, protein: 28.0, carbs: 2.0, fat: 2.5 },
    servingSize: 100,
    servingUnit: '一袋约100g',
    tags: ['鲨鱼菲特', '牛肉', '高蛋白', '增肌']
  },

  // ==================== 肌肉小王子 ====================
  {
    id: 'muscleprince-chicken',
    name: '即食鸡胸肉（原味）',
    brand: '肌肉小王子',
    category: 'takeout',
    nutrients: { calories: 106, protein: 27.0, carbs: 1.2, fat: 0.8, sodium: 125 },
    servingSize: 100,
    servingUnit: '一袋约100g',
    tags: ['肌肉小王子', '鸡胸肉', '低钠', '高蛋白']
  },
  {
    id: 'muscleprince-chicken-spicy',
    name: '即食鸡胸肉（香辣味）',
    brand: '肌肉小王子',
    category: 'takeout',
    nutrients: { calories: 112, protein: 26.0, carbs: 2.5, fat: 1.2, sodium: 180 },
    servingSize: 100,
    servingUnit: '一袋约100g',
    tags: ['肌肉小王子', '鸡胸肉', '香辣', '低钠']
  },

  // ==================== Keep ====================
  {
    id: 'keep-chicken-spicy',
    name: '即食鸡胸肉（香辣味）',
    brand: 'Keep',
    category: 'takeout',
    nutrients: { calories: 118, protein: 32.7, carbs: 2.0, fat: 1.5 },
    servingSize: 100,
    servingUnit: '一袋约100g',
    tags: ['Keep', '鸡胸肉', '高蛋白', '增肌']
  },
  {
    id: 'keep-protein-bar',
    name: '蛋白棒（可可味）',
    brand: 'Keep',
    category: 'snack',
    nutrients: { calories: 395, protein: 32.0, carbs: 32.0, fat: 14.0 },
    servingSize: 55,
    servingUnit: '一根约55g（217卡）',
    tags: ['Keep', '蛋白棒', '高蛋白', '代餐']
  },

  // ==================== 其他轻食品牌 ====================
  {
    id: 'wagas-chicken-salad',
    name: '鸡胸肉蔬菜沙拉',
    brand: 'Wagas',
    category: 'takeout',
    nutrients: { calories: 90, protein: 12.5, carbs: 5.0, fat: 2.8 },
    servingSize: 320,
    servingUnit: '一份约320g',
    tags: ['Wagas', '沙拉', '轻食', '减脂']
  },
  {
    id: 'wagas-salmon-bowl',
    name: '三文鱼藜麦碗',
    brand: 'Wagas',
    category: 'takeout',
    nutrients: { calories: 145, protein: 13.0, carbs: 15.0, fat: 5.0 },
    servingSize: 380,
    servingUnit: '一份约380g',
    tags: ['Wagas', '三文鱼', '藜麦', '轻食']
  },
  {
    id: 'shayeqingshi-chicken',
    name: '鸡胸肉沙拉',
    brand: '沙野轻食',
    category: 'takeout',
    nutrients: { calories: 85, protein: 13.0, carbs: 4.5, fat: 2.0 },
    servingSize: 300,
    servingUnit: '一份约300g',
    tags: ['沙野轻食', '沙拉', '鸡胸肉', '减脂']
  },
  {
    id: 'shayeqingshi-beef',
    name: '黑椒牛肉沙拉',
    brand: '沙野轻食',
    category: 'takeout',
    nutrients: { calories: 98, protein: 14.0, carbs: 5.0, fat: 3.0 },
    servingSize: 320,
    servingUnit: '一份约320g',
    tags: ['沙野轻食', '沙拉', '牛肉', '减脂']
  },

  // ==================== 沙拉轻食 ====================
  {
    id: 'chicken-salad',
    name: '鸡胸肉沙拉',
    category: 'takeout',
    nutrients: { calories: 85, protein: 12.0, carbs: 5.0, fat: 2.5 },
    servingSize: 300,
    servingUnit: '一份约300g',
    tags: ['沙拉', '鸡胸肉', '减脂', '轻食', '健康']
  },
  {
    id: 'caesar-salad',
    name: '凯撒沙拉',
    category: 'takeout',
    nutrients: { calories: 120, protein: 8.0, carbs: 6.0, fat: 8.0 },
    servingSize: 280,
    servingUnit: '一份约280g',
    tags: ['凯撒沙拉', '沙拉', '轻食']
  },
  {
    id: 'quinoa-salad',
    name: '藜麦蔬菜沙拉',
    category: 'takeout',
    nutrients: { calories: 105, protein: 5.0, carbs: 15.0, fat: 3.0, fiber: 3.5 },
    servingSize: 280,
    servingUnit: '一份约280g',
    tags: ['藜麦', '沙拉', '轻食', '减脂', '健康']
  },
  {
    id: 'poke-bowl',
    name: 'Poke碗/戳碗',
    category: 'takeout',
    nutrients: { calories: 130, protein: 12.0, carbs: 14.0, fat: 3.5 },
    servingSize: 350,
    servingUnit: '一份约350g',
    tags: ['poke', '戳碗', '三文鱼', '轻食', '健康']
  },

  // ==================== 快餐类 ====================
  // 麦当劳
  {
    id: 'mcd-bigmac',
    name: '巨无霸',
    brand: '麦当劳',
    category: 'fastfood',
    nutrients: { calories: 250, protein: 12.5, carbs: 22.0, fat: 13.0 },
    servingSize: 215,
    servingUnit: '一个约215g',
    tags: ['巨无霸', '麦当劳', '汉堡', '快餐']
  },
  {
    id: 'mcd-mcchicken',
    name: '麦辣鸡腿堡',
    brand: '麦当劳',
    category: 'fastfood',
    nutrients: { calories: 265, protein: 14.0, carbs: 24.0, fat: 13.5 },
    servingSize: 180,
    servingUnit: '一个约180g',
    tags: ['麦辣鸡腿堡', '麦当劳', '汉堡', '快餐']
  },
  {
    id: 'mcd-fries-m',
    name: '薯条（中）',
    brand: '麦当劳',
    category: 'fastfood',
    nutrients: { calories: 323, protein: 3.5, carbs: 40.0, fat: 16.5 },
    servingSize: 114,
    servingUnit: '中份约114g',
    tags: ['薯条', '麦当劳', '快餐']
  },
  {
    id: 'mcd-nuggets-6',
    name: '麦乐鸡（6块）',
    brand: '麦当劳',
    category: 'fastfood',
    nutrients: { calories: 280, protein: 16.0, carbs: 17.0, fat: 17.0 },
    servingSize: 100,
    servingUnit: '6块约100g',
    tags: ['麦乐鸡', '鸡块', '麦当劳', '快餐']
  },
  // 肯德基
  {
    id: 'kfc-original',
    name: '吮指原味鸡',
    brand: '肯德基',
    category: 'fastfood',
    nutrients: { calories: 265, protein: 18.0, carbs: 10.0, fat: 18.0 },
    servingSize: 110,
    servingUnit: '一块约110g',
    tags: ['原味鸡', '肯德基', 'KFC', '快餐']
  },
  {
    id: 'kfc-zinger',
    name: '香辣鸡腿堡',
    brand: '肯德基',
    category: 'fastfood',
    nutrients: { calories: 258, protein: 15.0, carbs: 24.0, fat: 12.0 },
    servingSize: 195,
    servingUnit: '一个约195g',
    tags: ['香辣鸡腿堡', '肯德基', 'KFC', '汉堡', '快餐']
  },
  {
    id: 'kfc-popcorn',
    name: '上校鸡块',
    brand: '肯德基',
    category: 'fastfood',
    nutrients: { calories: 295, protein: 17.0, carbs: 18.0, fat: 18.0 },
    servingSize: 85,
    servingUnit: '一份约85g',
    tags: ['上校鸡块', '鸡米花', '肯德基', 'KFC', '快餐']
  },
  {
    id: 'kfc-egg-tart',
    name: '蛋挞',
    brand: '肯德基',
    category: 'fastfood',
    nutrients: { calories: 285, protein: 5.0, carbs: 25.0, fat: 18.5 },
    servingSize: 52,
    servingUnit: '一个约52g',
    tags: ['蛋挞', '肯德基', 'KFC', '甜点']
  },

  // ==================== 火锅类（按每100g计算） ====================
  {
    id: 'hotpot-beef',
    name: '火锅牛肉卷',
    category: 'hotpot',
    nutrients: { calories: 125, protein: 19.0, carbs: 0.5, fat: 5.5 },
    servingSize: 150,
    servingUnit: '一盘约150g',
    tags: ['火锅', '牛肉卷', '肥牛', '涮肉']
  },
  {
    id: 'hotpot-lamb',
    name: '火锅羊肉卷',
    category: 'hotpot',
    nutrients: { calories: 203, protein: 19.0, carbs: 0, fat: 14.0 },
    servingSize: 150,
    servingUnit: '一盘约150g',
    tags: ['火锅', '羊肉卷', '涮羊肉']
  },
  {
    id: 'hotpot-meatball',
    name: '牛肉丸',
    category: 'hotpot',
    nutrients: { calories: 185, protein: 15.0, carbs: 8.0, fat: 10.5 },
    servingSize: 100,
    servingUnit: '一份约100g',
    tags: ['火锅', '牛肉丸', '丸子']
  },
  {
    id: 'hotpot-fishball',
    name: '鱼丸',
    category: 'hotpot',
    nutrients: { calories: 110, protein: 10.0, carbs: 10.0, fat: 3.5 },
    servingSize: 100,
    servingUnit: '一份约100g',
    tags: ['火锅', '鱼丸', '丸子']
  },
  {
    id: 'hotpot-tofu',
    name: '冻豆腐',
    category: 'hotpot',
    nutrients: { calories: 98, protein: 9.5, carbs: 2.5, fat: 5.5 },
    servingSize: 100,
    servingUnit: '一份约100g',
    tags: ['火锅', '冻豆腐', '豆腐']
  },
  {
    id: 'hotpot-noodle',
    name: '火锅粉/宽粉',
    category: 'hotpot',
    nutrients: { calories: 95, protein: 0.5, carbs: 23.0, fat: 0.2 },
    servingSize: 100,
    servingUnit: '一份约100g',
    tags: ['火锅', '粉条', '宽粉', '红薯粉']
  },
  {
    id: 'hotpot-base-spicy',
    name: '麻辣锅底（喝汤）',
    category: 'hotpot',
    nutrients: { calories: 85, protein: 1.0, carbs: 3.0, fat: 8.0 },
    servingSize: 100,
    servingUnit: '100ml汤底',
    tags: ['火锅', '锅底', '麻辣']
  },

  // ==================== 烧烤类 ====================
  {
    id: 'bbq-lamb-skewer',
    name: '羊肉串',
    category: 'bbq',
    nutrients: { calories: 220, protein: 18.0, carbs: 2.0, fat: 16.0 },
    servingSize: 30,
    servingUnit: '一串约30g',
    tags: ['烧烤', '羊肉串', '撸串']
  },
  {
    id: 'bbq-beef-skewer',
    name: '牛肉串',
    category: 'bbq',
    nutrients: { calories: 175, protein: 20.0, carbs: 2.0, fat: 10.0 },
    servingSize: 30,
    servingUnit: '一串约30g',
    tags: ['烧烤', '牛肉串', '撸串']
  },
  {
    id: 'bbq-chicken-wing',
    name: '烤鸡翅',
    category: 'bbq',
    nutrients: { calories: 235, protein: 19.0, carbs: 3.0, fat: 17.0 },
    servingSize: 45,
    servingUnit: '一个约45g',
    tags: ['烧烤', '烤翅', '鸡翅']
  },
  {
    id: 'bbq-enoki',
    name: '烤金针菇',
    category: 'bbq',
    nutrients: { calories: 65, protein: 2.5, carbs: 8.0, fat: 3.0 },
    servingSize: 100,
    servingUnit: '一份约100g',
    tags: ['烧烤', '金针菇', '蔬菜']
  },
  {
    id: 'bbq-eggplant',
    name: '烤茄子',
    category: 'bbq',
    nutrients: { calories: 85, protein: 1.5, carbs: 7.0, fat: 6.0 },
    servingSize: 150,
    servingUnit: '一个约150g',
    tags: ['烧烤', '烤茄子', '蔬菜']
  },

  // ==================== 日料 ====================
  {
    id: 'sushi-salmon',
    name: '三文鱼寿司',
    category: 'restaurant',
    nutrients: { calories: 135, protein: 8.5, carbs: 18.0, fat: 3.5 },
    servingSize: 35,
    servingUnit: '一个约35g',
    tags: ['寿司', '三文鱼', '日料']
  },
  {
    id: 'sashimi-salmon',
    name: '三文鱼刺身',
    category: 'restaurant',
    nutrients: { calories: 139, protein: 21.6, carbs: 0, fat: 5.6 },
    servingSize: 100,
    servingUnit: '一份约100g（6-8片）',
    tags: ['刺身', '三文鱼', '日料', '生鱼片']
  },
  {
    id: 'ramen',
    name: '日式拉面',
    category: 'restaurant',
    nutrients: { calories: 95, protein: 5.0, carbs: 12.0, fat: 3.0 },
    servingSize: 550,
    servingUnit: '一碗约550g（含汤）',
    tags: ['拉面', '日式拉面', '日料', '豚骨拉面']
  },
  {
    id: 'tempura-shrimp',
    name: '天妇罗虾',
    category: 'restaurant',
    nutrients: { calories: 225, protein: 12.0, carbs: 18.0, fat: 12.0 },
    servingSize: 30,
    servingUnit: '一只约30g',
    tags: ['天妇罗', '炸虾', '日料']
  },
  {
    id: 'katsudon',
    name: '炸猪排饭',
    category: 'restaurant',
    nutrients: { calories: 175, protein: 10.0, carbs: 20.0, fat: 6.5 },
    servingSize: 400,
    servingUnit: '一份约400g',
    tags: ['猪排饭', '日料', '炸猪排', '盖饭']
  },
  {
    id: 'udon',
    name: '乌冬面',
    category: 'restaurant',
    nutrients: { calories: 105, protein: 2.5, carbs: 22.0, fat: 0.5 },
    servingSize: 200,
    servingUnit: '一碗面约200g（不含汤）',
    tags: ['乌冬面', '日料', '面条']
  },

  // ==================== 韩料 ====================
  {
    id: 'bibimbap',
    name: '石锅拌饭',
    category: 'restaurant',
    nutrients: { calories: 145, protein: 7.0, carbs: 22.0, fat: 3.5 },
    servingSize: 450,
    servingUnit: '一份约450g',
    tags: ['石锅拌饭', '韩料', '拌饭']
  },
  {
    id: 'korean-bbq-beef',
    name: '韩式烤牛肉',
    category: 'restaurant',
    nutrients: { calories: 165, protein: 22.0, carbs: 5.0, fat: 6.5 },
    servingSize: 150,
    servingUnit: '一份约150g',
    tags: ['韩式烤肉', '韩料', '牛肉']
  },
  {
    id: 'kimchi-stew',
    name: '泡菜汤/豆腐汤',
    category: 'restaurant',
    nutrients: { calories: 55, protein: 4.0, carbs: 5.0, fat: 2.5 },
    servingSize: 350,
    servingUnit: '一份约350g',
    tags: ['泡菜汤', '韩料', '豆腐汤']
  },
  {
    id: 'fried-chicken-korean',
    name: '韩式炸鸡',
    category: 'restaurant',
    nutrients: { calories: 255, protein: 18.0, carbs: 12.0, fat: 16.0 },
    servingSize: 100,
    servingUnit: '100g',
    tags: ['炸鸡', '韩式炸鸡', '韩料']
  },
  {
    id: 'tteokbokki',
    name: '炒年糕',
    category: 'restaurant',
    nutrients: { calories: 165, protein: 3.5, carbs: 35.0, fat: 2.0 },
    servingSize: 200,
    servingUnit: '一份约200g',
    tags: ['炒年糕', '韩料', '年糕']
  },

  // ==================== 西餐 ====================
  {
    id: 'steak-sirloin',
    name: '西冷牛排',
    category: 'restaurant',
    nutrients: { calories: 158, protein: 19.0, carbs: 0, fat: 9.0 },
    servingSize: 200,
    servingUnit: '一块约200g',
    tags: ['牛排', '西冷', '西餐']
  },
  {
    id: 'pasta-carbonara',
    name: '培根奶油意面',
    category: 'restaurant',
    nutrients: { calories: 185, protein: 8.5, carbs: 22.0, fat: 7.5 },
    servingSize: 300,
    servingUnit: '一份约300g',
    tags: ['意面', '意大利面', '西餐', '培根']
  },
  {
    id: 'pasta-bolognese',
    name: '肉酱意面',
    category: 'restaurant',
    nutrients: { calories: 145, protein: 7.5, carbs: 18.0, fat: 5.0 },
    servingSize: 300,
    servingUnit: '一份约300g',
    tags: ['意面', '意大利面', '西餐', '肉酱']
  },
  {
    id: 'pizza-pepperoni',
    name: '意式香肠披萨',
    category: 'restaurant',
    nutrients: { calories: 270, protein: 11.0, carbs: 28.0, fat: 13.0 },
    servingSize: 100,
    servingUnit: '一块约100g',
    tags: ['披萨', 'pizza', '西餐']
  },
  {
    id: 'fish-chips',
    name: '炸鱼薯条',
    category: 'restaurant',
    nutrients: { calories: 235, protein: 12.0, carbs: 22.0, fat: 11.5 },
    servingSize: 300,
    servingUnit: '一份约300g',
    tags: ['炸鱼', '薯条', '西餐', '英式']
  },

  // ==================== 早茶点心 ====================
  {
    id: 'shumai',
    name: '烧麦',
    category: 'dimsum',
    nutrients: { calories: 210, protein: 8.0, carbs: 25.0, fat: 9.0 },
    servingSize: 35,
    servingUnit: '一个约35g',
    tags: ['烧麦', '点心', '早茶', '粤式']
  },
  {
    id: 'har-gow',
    name: '虾饺',
    category: 'dimsum',
    nutrients: { calories: 145, protein: 9.0, carbs: 18.0, fat: 4.5 },
    servingSize: 25,
    servingUnit: '一个约25g',
    tags: ['虾饺', '点心', '早茶', '粤式']
  },
  {
    id: 'char-siu-bao',
    name: '叉烧包',
    category: 'dimsum',
    nutrients: { calories: 235, protein: 7.5, carbs: 35.0, fat: 7.5 },
    servingSize: 80,
    servingUnit: '一个约80g',
    tags: ['叉烧包', '点心', '早茶', '粤式']
  },
  {
    id: 'cheung-fun',
    name: '肠粉',
    category: 'dimsum',
    nutrients: { calories: 125, protein: 4.0, carbs: 20.0, fat: 3.5 },
    servingSize: 150,
    servingUnit: '一份约150g',
    tags: ['肠粉', '点心', '早茶', '粤式']
  },
  {
    id: 'egg-tart-hk',
    name: '港式蛋挞',
    category: 'dimsum',
    nutrients: { calories: 305, protein: 5.5, carbs: 28.0, fat: 19.0 },
    servingSize: 55,
    servingUnit: '一个约55g',
    tags: ['蛋挞', '点心', '甜点', '粤式']
  },
  {
    id: 'lotus-wrap',
    name: '糯米鸡',
    category: 'dimsum',
    nutrients: { calories: 175, protein: 6.5, carbs: 25.0, fat: 5.5 },
    servingSize: 200,
    servingUnit: '一个约200g',
    tags: ['糯米鸡', '点心', '早茶', '粤式']
  },
  {
    id: 'rice-roll-beef',
    name: '牛肉肠粉',
    category: 'dimsum',
    nutrients: { calories: 145, protein: 7.0, carbs: 18.0, fat: 5.0 },
    servingSize: 180,
    servingUnit: '一份约180g',
    tags: ['牛肉肠粉', '肠粉', '早茶', '粤式']
  },
];

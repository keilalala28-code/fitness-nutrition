/**
 * 数据更新辅助脚本
 *
 * 使用方法：
 * 1. 直接编辑 data/foods.json 文件
 * 2. 运行 npm run build 验证数据格式
 * 3. 运行 npm run dev 测试功能
 *
 * 或使用此脚本添加数据：
 * npx ts-node scripts/add-food.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const DATA_FILE = path.join(__dirname, '../data/foods.json');

interface Product {
  id: string;
  name: string;
  servingSize: number;
  servingUnit: string;
  nutrients: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
  };
  tags: string[];
}

interface FoodsData {
  _meta: {
    version: string;
    lastUpdated: string;
    description: string;
    dataSource: string[];
  };
  brands: Record<string, {
    category: string;
    updateDate: string;
    products: Product[];
  }>;
}

function loadData(): FoodsData {
  const content = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(content);
}

function saveData(data: FoodsData): void {
  // 更新版本信息
  const now = new Date();
  data._meta.lastUpdated = now.toISOString().split('T')[0];
  data._meta.version = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}`;

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`✅ 数据已保存到 ${DATA_FILE}`);
}

function addProduct(brandName: string, product: Product): void {
  const data = loadData();

  if (!data.brands[brandName]) {
    console.log(`⚠️ 品牌 "${brandName}" 不存在，请先添加品牌`);
    return;
  }

  // 检查ID是否重复
  const existingIds = data.brands[brandName].products.map(p => p.id);
  if (existingIds.includes(product.id)) {
    console.log(`⚠️ 产品ID "${product.id}" 已存在`);
    return;
  }

  data.brands[brandName].products.push(product);
  data.brands[brandName].updateDate = new Date().toISOString().split('T')[0].slice(0, 7);

  saveData(data);
  console.log(`✅ 已添加产品: ${product.name} 到 ${brandName}`);
}

function addBrand(brandName: string, category: string): void {
  const data = loadData();

  if (data.brands[brandName]) {
    console.log(`⚠️ 品牌 "${brandName}" 已存在`);
    return;
  }

  data.brands[brandName] = {
    category,
    updateDate: new Date().toISOString().split('T')[0].slice(0, 7),
    products: []
  };

  saveData(data);
  console.log(`✅ 已添加品牌: ${brandName} (分类: ${category})`);
}

function listBrands(): void {
  const data = loadData();
  console.log('\n📋 当前品牌列表:\n');
  for (const [name, brand] of Object.entries(data.brands)) {
    console.log(`  ${name} (${brand.category}) - ${brand.products.length}个产品 - 更新于${brand.updateDate}`);
  }
  console.log('');
}

function listProducts(brandName: string): void {
  const data = loadData();
  const brand = data.brands[brandName];

  if (!brand) {
    console.log(`⚠️ 品牌 "${brandName}" 不存在`);
    return;
  }

  console.log(`\n📋 ${brandName} 产品列表:\n`);
  for (const product of brand.products) {
    console.log(`  ${product.name}`);
    console.log(`    ID: ${product.id}`);
    console.log(`    营养(每100g): ${product.nutrients.calories}卡 | 蛋白质${product.nutrients.protein}g | 碳水${product.nutrients.carbs}g | 脂肪${product.nutrients.fat}g`);
    console.log('');
  }
}

// 交互式命令行
async function interactive(): Promise<void> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (prompt: string): Promise<string> => {
    return new Promise(resolve => rl.question(prompt, resolve));
  };

  console.log('\n🍽️ 食物数据更新工具\n');
  console.log('命令:');
  console.log('  1. 查看品牌列表');
  console.log('  2. 查看品牌产品');
  console.log('  3. 添加新品牌');
  console.log('  4. 添加新产品');
  console.log('  5. 退出\n');

  while (true) {
    const cmd = await question('请输入命令编号: ');

    switch (cmd.trim()) {
      case '1':
        listBrands();
        break;

      case '2': {
        const brand = await question('请输入品牌名: ');
        listProducts(brand.trim());
        break;
      }

      case '3': {
        const name = await question('品牌名称: ');
        const category = await question('分类(drink/takeout/fastfood): ');
        addBrand(name.trim(), category.trim());
        break;
      }

      case '4': {
        const brand = await question('品牌名称: ');
        const id = await question('产品ID (英文): ');
        const name = await question('产品名称: ');
        const servingSize = await question('份量(g或ml): ');
        const servingUnit = await question('份量描述(如"一杯约500ml"): ');
        const calories = await question('热量(每100g): ');
        const protein = await question('蛋白质(每100g): ');
        const carbs = await question('碳水(每100g): ');
        const fat = await question('脂肪(每100g): ');
        const tags = await question('标签(逗号分隔): ');

        addProduct(brand.trim(), {
          id: id.trim(),
          name: name.trim(),
          servingSize: parseFloat(servingSize),
          servingUnit: servingUnit.trim(),
          nutrients: {
            calories: parseFloat(calories),
            protein: parseFloat(protein),
            carbs: parseFloat(carbs),
            fat: parseFloat(fat)
          },
          tags: tags.split(',').map(t => t.trim())
        });
        break;
      }

      case '5':
        console.log('👋 再见!');
        rl.close();
        return;

      default:
        console.log('无效命令，请输入1-5');
    }
  }
}

// 命令行参数处理
const args = process.argv.slice(2);

if (args.length === 0) {
  interactive();
} else if (args[0] === 'list') {
  listBrands();
} else if (args[0] === 'products' && args[1]) {
  listProducts(args[1]);
} else {
  console.log('用法:');
  console.log('  npx ts-node scripts/add-food.ts          # 交互模式');
  console.log('  npx ts-node scripts/add-food.ts list     # 列出品牌');
  console.log('  npx ts-node scripts/add-food.ts products 霸王茶姬  # 列出产品');
}

'use client';

import { useState, useEffect } from 'react';
import { RecipeMatch, MealType } from '@/types/nutrition';
import {
  getRecipeRecommendations,
  getMatchStatusLabel,
  getMatchStatusColor,
  hasRecipeRecommendations,
} from '@/lib/recipe-matcher';
import { getUserInventory } from '@/lib/storage';

interface RecipeRecommendationsProps {
  mealType?: MealType;
  maxItems?: number;
}

const DIFFICULTY_LABELS = {
  easy: '简单',
  medium: '中等',
  hard: '较难',
};

const DIFFICULTY_COLORS = {
  easy: 'text-green-600',
  medium: 'text-yellow-600',
  hard: 'text-red-600',
};

export default function RecipeRecommendations({
  mealType,
  maxItems = 5,
}: RecipeRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<RecipeMatch[]>([]);
  const [hasInventory, setHasInventory] = useState(false);
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null);

  useEffect(() => {
    const inventory = getUserInventory();
    setHasInventory(inventory.length > 0);

    if (inventory.length > 0) {
      let matches = getRecipeRecommendations(0.5);

      // 按餐次过滤
      if (mealType) {
        matches = matches.filter(m => m.recipe.mealTypes.includes(mealType));
      }

      setRecommendations(matches.slice(0, maxItems));
    }
  }, [mealType, maxItems]);

  // 如果没有库存，不显示
  if (!hasInventory) {
    return null;
  }

  // 如果没有匹配的菜谱，显示提示
  if (recommendations.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center gap-2 text-gray-500">
          <span>🍳</span>
          <span className="text-sm">暂无匹配的菜谱，可以添加更多食材到库存</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
        <span className="text-xl">🍳</span>
        可制作的家常菜
        <span className="text-sm font-normal text-gray-500">
          （根据您的库存推荐）
        </span>
      </h3>

      <div className="space-y-3">
        {recommendations.map((match) => (
          <RecipeCard
            key={match.recipe.id}
            match={match}
            isExpanded={expandedRecipe === match.recipe.id}
            onToggle={() =>
              setExpandedRecipe(
                expandedRecipe === match.recipe.id ? null : match.recipe.id
              )
            }
          />
        ))}
      </div>

      {recommendations.length >= maxItems && (
        <p className="text-xs text-gray-500 text-center">
          显示前 {maxItems} 个推荐，添加更多食材可解锁更多菜谱
        </p>
      )}
    </div>
  );
}

function RecipeCard({
  match,
  isExpanded,
  onToggle,
}: {
  match: RecipeMatch;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const { recipe, matchedIngredients, missingIngredients, status } = match;

  return (
    <div className="border border-gray-100 rounded-lg overflow-hidden">
      {/* 标题行 */}
      <div
        className="p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs px-2 py-0.5 rounded ${getMatchStatusColor(
                status
              )}`}
            >
              {getMatchStatusLabel(status)}
            </span>
            <h4 className="font-medium text-gray-900">{recipe.name}</h4>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className={DIFFICULTY_COLORS[recipe.difficulty]}>
              {DIFFICULTY_LABELS[recipe.difficulty]}
            </span>
            <span>{recipe.cookingTime}分钟</span>
            <span className="text-gray-400">{isExpanded ? '▲' : '▼'}</span>
          </div>
        </div>

        {/* 食材概览 */}
        <div className="mt-2 flex flex-wrap gap-1">
          {matchedIngredients.map((ing) => (
            <span
              key={ing}
              className="text-xs px-2 py-0.5 bg-green-50 text-green-600 rounded"
            >
              ✓ {ing}
            </span>
          ))}
          {missingIngredients.map((ing) => (
            <span
              key={ing}
              className="text-xs px-2 py-0.5 bg-red-50 text-red-500 rounded"
            >
              ✗ {ing}
            </span>
          ))}
        </div>
      </div>

      {/* 展开详情 */}
      {isExpanded && (
        <div className="p-4 border-t border-gray-100 space-y-3">
          {/* 营养信息 */}
          <div className="flex gap-4 text-sm">
            <div className="text-center">
              <div className="text-orange-600 font-medium">
                {recipe.nutrients.calories}
              </div>
              <div className="text-gray-500 text-xs">卡路里</div>
            </div>
            <div className="text-center">
              <div className="text-red-600 font-medium">
                {recipe.nutrients.protein}g
              </div>
              <div className="text-gray-500 text-xs">蛋白质</div>
            </div>
            <div className="text-center">
              <div className="text-blue-600 font-medium">
                {recipe.nutrients.carbs}g
              </div>
              <div className="text-gray-500 text-xs">碳水</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-600 font-medium">
                {recipe.nutrients.fat}g
              </div>
              <div className="text-gray-500 text-xs">脂肪</div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 font-medium">{recipe.servings}</div>
              <div className="text-gray-500 text-xs">份</div>
            </div>
          </div>

          {/* 做法步骤 */}
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-2">做法步骤：</h5>
            <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
              {recipe.instructions.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>

          {/* 标签 */}
          <div className="flex flex-wrap gap-1">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// 简化版组件，用于在其他地方展示
export function RecipeQuickList({ maxItems = 3 }: { maxItems?: number }) {
  const [recommendations, setRecommendations] = useState<RecipeMatch[]>([]);

  useEffect(() => {
    const inventory = getUserInventory();
    if (inventory.length > 0) {
      const matches = getRecipeRecommendations(0.5);
      setRecommendations(matches.slice(0, maxItems));
    }
  }, [maxItems]);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {recommendations.map((match) => (
        <span
          key={match.recipe.id}
          className={`text-sm px-3 py-1 rounded-full ${getMatchStatusColor(
            match.status
          )}`}
        >
          {match.recipe.name}
          {match.status === 'complete' && ' ✓'}
        </span>
      ))}
    </div>
  );
}

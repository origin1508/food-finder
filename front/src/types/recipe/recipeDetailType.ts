export interface RecipeDetailValue extends RecipeStepsValue, IngredientValue {
  dishId: number;
  name: string;
  method: string;
  category: string;
  smallThumbnailUrl: string;
  largeThumbnailUrl: string;
  ingredient: IngredientValue[];
  serving: number;
  cookingTime: number;
  views: number;
  recipeLikes: number;
  steps: RecipeStepsValue[];
  recipeComments: undefined[];
  recipeStars: undefined[];
  writer: {
    userId: number;
    email: string;
    nickname: string;
    profileUrl: string;
  };
}

export interface RecipeStepsValue {
  stepId?: number;
  content?: string;
  imageUrl?: string;
  step?: number;
}

export interface IngredientValue {
  name?: string;
  amount?: string;
}

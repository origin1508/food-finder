import { UseFormRegister } from 'react-hook-form';

export interface CreateRecipeProps {
  register: UseFormRegister<CreateRecipeValue>;
}

export interface CreateRecipeValue {
  name: string;
  mainImage: FileList;
  serving: string;
  cookingTime: string;
  category: string;
  method: string;
  ingredients: { name: string; amount: string }[];
  instructions: {
    description: string;
    image: FileList;
    preview?: string;
  }[];
}

export interface CreateRecipeInstructionProps {
  fields: Record<'id', string>[];
  fileInput: React.RefObject<HTMLInputElement>;
}

export interface RecipeFormValue {
  name: string;
  method: string;
  category: string;
  ingredient: string;
  serving: string;
  cookingTime: string;
  recipeThumbnail: Blob;
  stepImages: Blob[];
  steps: string;
}

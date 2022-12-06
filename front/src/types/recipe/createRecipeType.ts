import { UseFormRegister } from 'react-hook-form';

export interface CreateRecipeProps {
  register: UseFormRegister<CreateRecipeValue>;
}

export interface CreateRecipeValue {
  name: string;
  mainImage: File;
  serving: number;
  cookingTime: number;
  category: string;
  method: string;
  ingredients: { name: string; amount: string }[];
  instructions: {
    description: string;
    image: File;
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
  serving: number;
  cookingTime: number;
  recipeThumbnail: Blob;
  stepImage: Blob[];
  steps: { [step: number]: string };
}

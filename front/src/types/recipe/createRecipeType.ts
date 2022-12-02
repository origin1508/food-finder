import { UseFormRegister } from 'react-hook-form';

export interface CreateRecipeProps {
  register: UseFormRegister<CreateRecipeValue>;
}

export interface CreateRecipeValue {
  title: string;
  mainImg: File;
  category: string;
  cookingMethod: string;
  ingredients: { name: string; amount: string }[];
  instructions: { step: number; description: string; image: File }[];
}

export interface CreateRecipeInstructionProps {
  fields: Record<'id', string>[];
  fileInput: React.RefObject<HTMLInputElement>;
}

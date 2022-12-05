import { UseFormRegister } from 'react-hook-form';

export interface CreateRecipeProps {
  register: UseFormRegister<CreateRecipeValue>;
}

export interface CreateRecipeValue {
  title: string;
  mainImg: Blob;
  category: string;
  cookingMethod: string;
  ingredients: { name: string; amount: string }[];
  instructions: {
    description: string;
    image: Blob;
    preview?: string;
  }[];
}

export interface CreateRecipeInstructionProps {
  fields: Record<'id', string>[];
  fileInput: React.RefObject<HTMLInputElement>;
}

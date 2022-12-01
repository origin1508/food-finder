import { UseFormRegister } from 'react-hook-form';

export interface CreateRecipeProps {
  register: UseFormRegister<CreateRecipeValue>;
}

export interface CreateRecipeValue {
  title: string;
  category: string;
  cookingMethod: string;
  instruction: { step: number; description: string; image?: File }[];
}

export interface CreateRecipeInstructionProps {
  fields: Record<'id', string>[];
  fileInput: React.RefObject<HTMLInputElement>;
}

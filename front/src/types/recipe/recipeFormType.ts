export interface RecipeFormProps {
  onSubmit: (data: RecipeFormDefaultValue) => void;
}

export interface RecipeFormDefaultValue {
  name: string;
  mainImage: { files: FileList; preview?: string };
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

export interface RecipeFormInstructionProps {
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

export interface Step {
  step: number;
  content?: string;
  imageUrl?: string;
}

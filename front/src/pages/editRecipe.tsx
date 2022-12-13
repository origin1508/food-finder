import styled from 'styled-components';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useEditRecipe from '../hooks/Recipe/useEditRecipe';
import { useRecipeDetail } from '../hooks/Recipe/useRecipes';
import BasePageComponent from '../hoc/BasePageComponent';
import RecipeForm from '../components/recipeForm/RecipeForm';
import { RecipeFormDefaultValue } from '../types/recipe/recipeFormType';
import Auth from '../hoc/Auth';

const EditRecipe = () => {
  const { recipeId } = useParams();
  const { data: recipeDetail } = useRecipeDetail(recipeId!);
  const {
    name,
    serving,
    cookingTime,
    category,
    method,
    largeThumbnailUrl,
    ingredient,
    Steps,
  } = recipeDetail!;
  const instructions = Steps.reduce<
    { description?: string; preview?: string }[]
  >((acc, cur) => {
    return [
      ...acc,
      {
        description: cur.content,
        preview: cur.imageUrl,
      },
    ];
  }, []);

  const editRecipeSchema = yup.object().shape({
    name: yup.string().required('레시피 제목을 입력해주세요.'),
    mainImage: yup.object().shape({
      files: yup.mixed(),
      preview: yup.string().required(),
    }),
    serving: yup.string().required('몇인분인지 선택해주세요.'),
    cookingTime: yup.string().required('조리시간을 적어주세요.'),
    category: yup.string().required('분류를 선택해주세요.'),
    method: yup.string().required('조리방법을 선택해주세요.'),
    ingredients: yup.array().of(
      yup.object().shape({
        name: yup.string().required(),
        amount: yup.string().required(),
      }),
    ),
    instructions: yup.array().of(
      yup.object().shape({
        description: yup.string().required(),
        image: yup.mixed(),
        preview: yup.string().required(),
      }),
    ),
  });

  const methods = useForm<RecipeFormDefaultValue>({
    mode: 'onChange',
    defaultValues: {
      name: name,
      mainImage: { preview: largeThumbnailUrl },
      serving: String(serving),
      cookingTime: String(cookingTime),
      category: category,
      method: method,
      ingredients: JSON.parse(ingredient),
      instructions: instructions,
    },
    resolver: yupResolver(editRecipeSchema),
  });
  const { formState } = methods;
  const {
    recipeUpdateMutation: { mutate: editRecipe },
  } = useEditRecipe(recipeId!, formState);

  return (
    <Auth>
      <BasePageComponent>
        <FormProvider {...methods}>
          <RecipeFormContainer>
            <RecipeForm onSubmit={editRecipe} />
          </RecipeFormContainer>
        </FormProvider>
      </BasePageComponent>
    </Auth>
  );
};

export default EditRecipe;

const RecipeFormContainer = styled.article`
  width: 110rem;
  margin: auto;
`;

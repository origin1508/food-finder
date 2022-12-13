import styled from 'styled-components';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useCreateRecipe from '../hooks/Recipe/useCreateRecipe';
import Auth from '../hoc/Auth';
import BasePageComponent from '../hoc/BasePageComponent';
import RecipeForm from '../components/recipeForm/RecipeForm';
import { RecipeFormDefaultValue } from '../types/recipe/recipeFormType';

const CreateRecipe = () => {
  const createRecipeSchema = yup.object().shape({
    name: yup.string().required('레시피 제목을 입력해주세요.'),
    mainImage: yup.object().shape({
      files: yup
        .mixed()
        .test('file', '요리 대표 사진을 등록해주세요.', (value) => {
          return value.length > 0 ? true : false;
        }),
      preview: yup.string(),
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
        image: yup.mixed().test('file', '사진을 등록해주세요.', (value) => {
          return value.length > 0 ? true : false;
        }),
        preview: yup.string(),
      }),
    ),
  });

  const methods = useForm<RecipeFormDefaultValue>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      serving: '',
      cookingTime: '',
      category: '',
      method: '',
      ingredients: [
        { name: '', amount: '' },
        { name: '', amount: '' },
        { name: '', amount: '' },
      ],
      instructions: [{ description: '' }],
    },
    resolver: yupResolver(createRecipeSchema),
  });
  const { formState } = methods;
  const { mutate: createRecipe } = useCreateRecipe(formState);
  return (
    <Auth>
      <BasePageComponent>
        <FormProvider {...methods}>
          <RecipeFormContainer>
            <RecipeForm onSubmit={createRecipe} />
          </RecipeFormContainer>
        </FormProvider>
      </BasePageComponent>
    </Auth>
  );
};

export default CreateRecipe;

const RecipeFormContainer = styled.article`
  width: 110rem;
  margin: auto;
`;

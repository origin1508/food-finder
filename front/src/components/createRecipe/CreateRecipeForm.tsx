import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import CreateRecipeInfo from './info/CreateRecipeInfo';
import CreateRecipeIngredient from './ingredient/CreateRecipeIngredient';
import CreateRecipeInstruction from './instruction/CreateRecipeInstruction';
import { CreateRecipeContainerStyle } from '../../styles/createRecipeStyle';
import { createRecipeRequest } from '../../api/recipeFetcher';
import imageResize from '../../util/imageResize';
import { CreateRecipeValue } from '../../types/recipe/createRecipeType';

const CreateRecipeForm = () => {
  const { handleSubmit } = useFormContext<CreateRecipeValue>();
  const handleCreateRecipe = async (data: CreateRecipeValue) => {
    const {
      name,
      mainImage,
      serving,
      cookingTime,
      category,
      method,
      ingredients,
      instructions,
    } = data;
    console.log(data);

    const ingredient = 'test';

    const stepImages = Array<Blob>();

    const recipeThumbnail = await imageResize(mainImage[0]);
    const steps = instructions.reduce(async (acc, cur, idx) => {
      const { description, image } = cur;
      const compressedImage = await imageResize(image[0]);
      compressedImage && stepImages.push(compressedImage);
      return { ...acc, [idx + 1]: description };
    }, {});

    const res = await createRecipeRequest({
      name,
      method,
      category,
      ingredient,
      serving,
      cookingTime,
      recipeThumbnail,
      stepImages,
      steps,
    });
  };
  return (
    <CreateRecipeFormConatiner onSubmit={handleSubmit(handleCreateRecipe)}>
      <CreateRecipeInfo />
      <CreateRecipeIngredient />
      <CreateRecipeInstruction />
      <CreateRecipeFormButtonContainer>
        <CreatRecipeSubmitButton type="submit">저장</CreatRecipeSubmitButton>
        <CreateRecipeCancleButton type="button">취소</CreateRecipeCancleButton>
      </CreateRecipeFormButtonContainer>
    </CreateRecipeFormConatiner>
  );
};

export default CreateRecipeForm;

const CreateRecipeFormConatiner = styled.form`
  ${({ theme }) => theme.mixins.flexBox('column')};
  margin: ${({ theme }) => theme.spacingLarge} 0;
  gap: ${({ theme }) => theme.spacingRegular};
`;

const CreateRecipeFormButtonContainer = styled.section`
  ${CreateRecipeContainerStyle};
  ${({ theme }) => theme.mixins.flexBox()};
  gap: ${({ theme }) => theme.spacingLarge};
`;

const CreatRecipeSubmitButton = styled.button`
  ${({ theme }) => theme.mixins.button()}
  background-color: ${({ theme }) => theme.themeColor};
  color: ${({ theme }) => theme.mainWhite};
`;

const CreateRecipeCancleButton = styled.button`
  ${({ theme }) => theme.mixins.button()};
`;

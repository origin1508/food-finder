import styled from 'styled-components';
import { useFieldArray, useFormContext } from 'react-hook-form';
import CustomIcon from '../../icons/CustomIcon';
import {
  RecipeFormHeader,
  RecipeFormInputStyle,
  RecipeFormRemoveButton,
} from '../../../styles/recipeFormStyle';
import { MediumTitle } from '../../../styles/commonStyle';
import { INGREDIENT_PLACEHOLDERS } from '../../../constants/recipeForm';

const RecipeFormIngredient = () => {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'ingredients',
  });
  return (
    <RecipeFormIngredientContainer>
      <RecipeFormIngredientHeader>
        <RecipeFormIngredienTitle>재료</RecipeFormIngredienTitle>
      </RecipeFormIngredientHeader>
      {fields.map((item, index) => {
        return (
          <RecipeFormIngredientInputContainer key={item.id}>
            <RecipeFormIngredientInput
              {...register(`ingredients.${index}.name`)}
              placeholder={INGREDIENT_PLACEHOLDERS[index % 3].name}
            />
            <RecipeFormIngredientInput
              {...register(`ingredients.${index}.amount`)}
              placeholder={INGREDIENT_PLACEHOLDERS[index % 3].amount}
            />
            <IngredientRemoveButton
              top="25%"
              type="button"
              onClick={() => {
                remove(index);
              }}
            >
              <CustomIcon name="remove" size="20" color="white" />
            </IngredientRemoveButton>
          </RecipeFormIngredientInputContainer>
        );
      })}
      <IngredientAddButton
        type="button"
        onClick={() => {
          append({ name: '', amount: '' });
        }}
      >
        <CustomIcon name="plusCircle" size="20" /> 추가
      </IngredientAddButton>
    </RecipeFormIngredientContainer>
  );
};

export default RecipeFormIngredient;

const RecipeFormIngredientContainer = styled.section`
  ${({ theme }) => theme.mixins.flexBox('column')}
  width: 100%;
  padding: ${({ theme }) => theme.spacingLarge};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.mainWhite};
  box-shadow: 2px 2px 5px ${({ theme }) => theme.lightDarkGrey};
`;

const RecipeFormIngredientHeader = styled(RecipeFormHeader)``;

const RecipeFormIngredienTitle = styled.h2`
  ${MediumTitle}
  color: ${({ theme }) => theme.mainBlack}
`;

const RecipeFormIngredientInputContainer = styled.section`
  ${({ theme }) => theme.mixins.flexBox()}
  position: relative;
  width: 65rem;
  padding: 0 ${({ theme }) => theme.spacingLarge};
  gap: ${({ theme }) => theme.spacingMedium};
`;

const RecipeFormIngredientInput = styled.input`
  ${RecipeFormInputStyle}
`;

const IngredientRemoveButton = styled(RecipeFormRemoveButton)`
  ${RecipeFormIngredientInputContainer}:hover & {
    visibility: visible;
  }
`;

const IngredientAddButton = styled.button``;

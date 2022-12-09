import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { RecipeFormInputStyle } from '../../../styles/recipeFormStyle';
import { ErrorMessage } from '../../../styles/authStyle';
import {
  SERVING_OPTIONS,
  CATEGORY_OPTIONS,
  METHOD_OPTIONS,
} from '../../../constants/recipeForm';
import { RecipeFormDefaultValue } from '../../../types/recipe/recipeFormType';

const RecipeFormInfoLeft = () => {
  const { register } = useFormContext<RecipeFormDefaultValue>();

  return (
    <RecipeFormInfoLeftContainer>
      <RecipeFormInfoInputContainer>
        <RecipeFormInfoInputLabel>레시피 제목</RecipeFormInfoInputLabel>
        <RecipeFormInfoInput
          {...register('name', { required: '레시피 제목을 입력해주세요.' })}
          placeholder="예) 소고기 미역국"
        />
      </RecipeFormInfoInputContainer>
      <RecipeFormInfoInputContainer>
        <RecipeFormInfoInputLabel>요리 정보</RecipeFormInfoInputLabel>
        <RecipeFormSelect
          {...register('serving', { required: '인원을 선택해주세요.' })}
        >
          <RecipeFormOption value="" hidden>
            인원
          </RecipeFormOption>
          {SERVING_OPTIONS.map((serving, index) => (
            <RecipeFormOption key={serving} value={index + 1}>
              {serving}
            </RecipeFormOption>
          ))}
        </RecipeFormSelect>
        <RecipeFormInfoInput
          {...register('cookingTime', {
            required: '조리시간을 입력해주세요.',
            min: 1,
            max: 999,
          })}
          placeholder="조리시간"
          type="number"
          min="1"
          max="999"
        />
      </RecipeFormInfoInputContainer>
      <RecipeFormInfoSelectContainer>
        <RecipeFormInfoInputLabel>카테고리</RecipeFormInfoInputLabel>
        <RecipeFormSelect
          {...register('category', { required: '분류를 선택해주세요.' })}
        >
          <RecipeFormOption value="" hidden>
            분류별
          </RecipeFormOption>
          {CATEGORY_OPTIONS.map((category) => (
            <RecipeFormOption key={category}>{category}</RecipeFormOption>
          ))}
        </RecipeFormSelect>
        <RecipeFormSelect
          {...register('method', { required: '조리방법을 선택해주세요.' })}
        >
          <RecipeFormOption value="" hidden>
            조리방법별
          </RecipeFormOption>
          {METHOD_OPTIONS.map((method) => (
            <RecipeFormOption key={method}>{method}</RecipeFormOption>
          ))}
        </RecipeFormSelect>
      </RecipeFormInfoSelectContainer>
    </RecipeFormInfoLeftContainer>
  );
};

export default RecipeFormInfoLeft;

const RecipeFormInfoLeftContainer = styled.section`
  width: 60%;
`;

const RecipeFormInfoInputContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox()}
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacingMedium};
`;

const RecipeFormInfoInput = styled.input`
  ${RecipeFormInputStyle}
  margin: 0 ${({ theme }) => theme.spacingRegular};
`;

const RecipeFormInfoInputLabel = styled.span`
  flex-shrink: 0;
  width: 16rem;
  font-size: 2.25rem;
`;

const RecipeFormInfoSelectContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox()}
`;

const RecipeFormSelect = styled.select`
  ${RecipeFormInputStyle}
  margin: 0 ${({ theme }) => theme.spacingRegular};
`;

const RecipeFormOption = styled.option``;

const RecipeFormText = styled.p``;

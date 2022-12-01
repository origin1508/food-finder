import styled from 'styled-components';
import { TextOne } from '../../../styles/commonStyle';
import { CreateRecipeInputStyle } from '../../../styles/createRecipeStyle';

const CreateRecipeMainLeft = () => {
  return (
    <CreateRecipeMainLeftContainer>
      <CreateRecipeMainInputContainer>
        <CreateRecipeMainInputTitle>레시피 제목</CreateRecipeMainInputTitle>
        <CreateRecipeMainInput placeholder="예) 소고기 미역국" />
      </CreateRecipeMainInputContainer>
      <CreateRecipeMainInputContainer>
        <CreateRecipeMainInputTitle>요리 정보</CreateRecipeMainInputTitle>
        <CreateRecipeMainTextarea placeholder="예) 구수한 소고기 미역국이에요. 실패없이 간편하게 만들 수 있는 레시피랍니다." />
      </CreateRecipeMainInputContainer>
      <CreateRecipeMainSelectContainer>
        <CreateRecipeCategorySelect>
          <option disabled selected>
            종류별
          </option>
          <option>밥</option>
          <option>반찬</option>
          <option>후식</option>
          <option>국 & 찌개</option>
        </CreateRecipeCategorySelect>
        <CreateRecipeCategorySelect>
          <option disabled selected>
            조리방법별
          </option>
          <option>밥</option>
          <option>반찬</option>
          <option>후식</option>
          <option>국 & 찌개</option>
        </CreateRecipeCategorySelect>
      </CreateRecipeMainSelectContainer>
    </CreateRecipeMainLeftContainer>
  );
};

export default CreateRecipeMainLeft;

const CreateRecipeMainLeftContainer = styled.div`
  width: 60%;
`;

const CreateRecipeMainInputContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox()}
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacingMedium};
`;

const CreateRecipeMainInput = styled.input`
  ${CreateRecipeInputStyle}
`;

const CreateRecipeMainTextarea = styled.textarea`
  ${CreateRecipeInputStyle}
  height: 15rem;
`;

const CreateRecipeMainInputTitle = styled.span`
  width: 20rem;
  font-size: 2.25rem;
`;

const CreateRecipeMainSelectContainer = styled.div`
  ${({ theme }) => theme.mixins.flexBox()}
  gap: ${({ theme }) => theme.spacingRegular};
`;

const CreateRecipeCategorySelect = styled.select`
  ${CreateRecipeInputStyle}
`;

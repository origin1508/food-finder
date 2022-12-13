import styled, { css } from 'styled-components';

export const RecipeFormContainerStyle = css`
  ${({ theme }) => theme.mixins.flexBox('column')}
  width: 100%;
  padding: ${({ theme }) => theme.spacingLarge};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.mainWhite};
  box-shadow: 2px 2px 5px ${({ theme }) => theme.lightDarkGrey};
`;

export const RecipeFormHeader = styled.header`
  width: 100%;
  padding: ${({ theme }) => theme.spacingMedium};
  margin-bottom: ${({ theme }) => theme.spacingLarge};
  border-bottom: 1px solid ${({ theme }) => theme.lightDarkGrey};
`;

export const RecipeFormInputStyle = css`
  ${({ theme }) => theme.mixins.input()}
  outline: none;
  resize: none;
  box-shadow: inset 2px 2px 5px ${({ theme }) => theme.lightDarkGrey};
  background-color: ${({ theme }) => theme.lightGrey};
  font-family: inherit;
`;

export const RecipeFormImageInput = styled.input`
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 999;
`;

export const RecipeFormImageUploadStyle = css`
  ${({ theme }) => theme.mixins.flexBox()}
  flex-shrink: 0;
  width: 20rem;
  height: 20rem;
  margin-bottom: ${({ theme }) => theme.spacingRegular};
  margin-left: ${({ theme }) => theme.spacingRegular};
  border-radius: 0.5rem;
  box-shadow: inset 2px 2px 5px ${({ theme }) => theme.lightDarkGrey};
  background-color: ${({ theme }) => theme.lightGrey};
  cursor: pointer;
  position: relative;
`;

export const RecipeFormRemoveButton = styled.button<{ top: string }>`
  ${({ theme }) => theme.mixins.flexBox()}
  visibility: hidden;
  position: absolute;
  top: ${({ top }) => top};
  right: 0.3rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.lightRed};
`;

export const ImageUploadIcon = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column')}
  width: 100%;
  height: 100%;
  gap: ${({ theme }) => theme.spacingRegular};
  color: ${({ theme }) => theme.darkGrey};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

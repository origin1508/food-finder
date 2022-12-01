import styled, { css } from 'styled-components';

export const CreateRecipeContainerStyle = css`
  ${({ theme }) => theme.mixins.flexBox('column')}
  width: 100%;
  padding: ${({ theme }) => theme.spacingLarge};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.mainWhite};
  box-shadow: 2px 2px 5px ${({ theme }) => theme.lightDarkGrey};
`;

export const CreateRecipeHeader = styled.div`
  width: 100%;
  padding-bottom: ${({ theme }) => theme.spacingLarge};
  margin-bottom: ${({ theme }) => theme.spacingMedium};
`;

export const CreateRecipeInputStyle = css`
  ${({ theme }) => theme.mixins.input()}
  outline: none;
  resize: none;
  box-shadow: inset 2px 2px 5px ${({ theme }) => theme.lightDarkGrey};
  background-color: ${({ theme }) => theme.lightGrey};
  font-family: inherit;
`;

export const CreateRecipeImgUploadStyle = css`
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
`;

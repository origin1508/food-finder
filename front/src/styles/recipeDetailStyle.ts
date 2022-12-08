import { css } from 'styled-components';
import { MediumTitle, MediumSubTitle } from './commonStyle';

export const RecipeDetailContainerStyle = css`
  ${({ theme }) => theme.mixins.flexBox('column')}
  width: 100%;
  padding: ${({ theme }) => theme.spacingLarge};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.mainWhite};
  box-shadow: 2px 2px 5px ${({ theme }) => theme.lightDarkGrey};
  margin-bottom: ${({ theme }) => theme.spacingMedium};
`;

export const RecipeDetailHeader = css`
  ${({ theme }) => theme.mixins.flexBox('row', 'end', 'start')}
  gap:${({ theme }) => theme.spacingRegular};
  width: 90%;
  padding: ${({ theme }) => theme.spacingMedium};
  margin-bottom: ${({ theme }) => theme.spacingLarge};
  border-bottom: 1px solid ${({ theme }) => theme.lightDarkGrey};
`;

export const RecipeDetailTitleStyle = css`
  ${MediumTitle}
  color: ${({ theme }) => theme.mainBlack};
`;

export const RecipeDetailSubTitleStyle = css`
  ${MediumSubTitle}
  color: ${({ theme }) => theme.darkGrey};
`;

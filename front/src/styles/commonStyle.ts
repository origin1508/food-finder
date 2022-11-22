import { css } from 'styled-components';

export const BigTitle = css`
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontLargest,
      theme.weightSemiBold,
      theme.mainWhite,
    )}
`;

export const MediumTitle = css`
  ${({ theme }) =>
    theme.mixins.title(theme.fontMedium, theme.weightSemiBold, theme.lightGrey)}
`;

export const SmallTitle = css`
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontSemiRegular,
      theme.weightSemiBold,
      theme.mainBlack,
    )}
`;

export const BigSubTitle = css`
  ${({ theme }) =>
    theme.mixins.title(theme.fontLarge, theme.weightRegular, theme.lightGrey)}
`;

export const SmallSubTitle = css`
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontSemiRegular,
      theme.weightRegular,
      theme.darkGrey,
    )}
`;

export const TextOne = css`
  ${({ theme }) =>
    theme.mixins.title(theme.fontMedium, theme.weightRegular, theme.lightGrey)}
`;

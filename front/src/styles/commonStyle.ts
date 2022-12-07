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

export const MediumSubTitle = css`
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontSemiMedium,
      theme.weightRegular,
      theme.darkGrey,
    )}
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

export const TextTwo = css`
  font-size: ${({ theme }) => theme.fontRegular};
  line-height: 1.7;
  margin: 0;
`;

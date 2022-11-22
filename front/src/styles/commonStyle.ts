import styled, { css } from 'styled-components';

export const BigTitle = css`
  ${({ theme }) =>
    theme.mixins.title(
      theme.fontLargest,
      theme.weightSemiBold,
      theme.mainWhite,
    )}
`;

export const BigSubTitle = css`
  ${({ theme }) =>
    theme.mixins.title(theme.fontLarge, theme.weightRegular, theme.lightGrey)}
`;

export const MediumTitle = css`
  ${({ theme }) =>
    theme.mixins.title(theme.fontMedium, theme.weightRegular, theme.lightGrey)}
`;

export const TextOne = css`
  ${({ theme }) =>
    theme.mixins.title(theme.fontMedium, theme.weightRegular, theme.lightGrey)}
`;

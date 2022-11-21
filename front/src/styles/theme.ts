import { css } from 'styled-components';

export const theme = {
  mainBlack: '#222',
  mainWhite: '#FFFFFF',
  mainPink: '#FF385C',
  mainGrey: '#F7F7F7',
  lightGrey: '#F3F4F6',
  lightDarkGrey: '#d1d5db',
  darkGrey: '#797979',
  lightRed: '#ff0000',
  themeColor: '#464442',

  fontLogo: "'Song Myung', serif",

  fontLarge: '4rem',
  fontMedium: '2.8rem',
  fontSemiMedium: '2.0rem',
  fontRegular: '1.6rem',
  fontSmall: '1.4rem',
  fontMicro: '1.2rem',
  fontSmallest: '0.8rem',

  weightBold: 700,
  weightSemiBold: 600,
  weightRegular: 400,

  spacingLarge: '5rem',
  spacingMedium: '3rem',
  spacingSemiMedium: '2rem',
  spacingRegular: '1rem',
  spacingSmall: '0.5',

  absoluteCenter: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};

export const mixins = {
  // flex
  flexBox: (direction = 'row', align = 'center', justify = 'center') => `
    display: flex;
    flex-direction: ${direction};
    align-items: ${align};
    justify-content: ${justify};
  `,
};

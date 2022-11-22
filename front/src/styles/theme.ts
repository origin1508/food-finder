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
  themeColor: '#2E83F5',

  fontLogo: "'Song Myung', serif",

  fontLargest: '5rem',
  fontLarge: '4rem',
  fontMoreMeium: '3.5rem',
  fontMedium: '2.8rem',
  fontSemiMedium: '2.0rem',
  fontRegular: '1.6rem',
  fontSmall: '1.4rem',
  fontMicro: '1.2rem',
  fontSmallest: '0.8rem',

  weightBold: 700,
  weightSemiBold: 600,
  weightRegular: 400,

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

  title: (size = '2rem', weight = '400', color = '#222', mb = '0') => `
    font-size: ${size};
    font-weight: ${weight};
    color: ${color};
    margin-bottom: ${mb};
  `,

  button: (
    size = '2rem',
    bgColor = '400',
    color = '#2E83F5',
    padding = '1rem 2rem',
    radius = '0.5rem',
    border = 'none',
  ) => `
    font-size: ${size};  
    background-color: ${bgColor};
    color: ${color};
    cursor: pointer;
    padding: ${padding};
    border-radius: ${radius};
    border:${border};
    
  `,
  bigButton: (bgColor = '400', color = '#2E83F5', border = 'none') => `
    font-size: ${theme.fontLargest};  
    background-color: ${bgColor};
    color: ${color};
    cursor: pointer;
    padding: 2rem 4rem;
    border-radius: 1rem;
    border:${border};
  `,
};

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
  errorColor: '#ef4444',
  successColor: '#21c55d',
  themeColor: '#2E83F5',

  fontLogo: "'Song Myung', serif",

  fontLargest: '5rem',
  fontLarge: '4rem',
  fontMoreMeium: '3.5rem',
  fontMedium: '2.8rem',
  fontSemiMedium: '2.0rem',
  fontRegular: '1.6rem',
  fontSemiRegular: '1.4rem',
  fontSmall: '1.2rem',
  fontMicro: '1.0rem',
  fontSmallest: '0.8rem',

  weightBold: 700,
  weightSemiBold: 600,
  weightRegular: 400,

  maxWidth5xl: '102.4rem', // 1024px

  spacingLargest: '5rem',
  spacingLarge: '3rem',
  spacingMedium: '2rem',
  spacingSemiMedium: '1.5rem',
  spacingRegular: '1rem',
  spacingSmall: '0.5rem',
  spacingSmallest: '0.3rem',

  bpLargest: '75em', //1200px
  bpLarge: '68.75em', //1000px
  bpMedium: '50.25em', // 800px
  bpSmall: '40.5em', // 640px
  bpSmallest: '30em', // 500px

  absoluteCenter: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
  fixedCenter: css`
    position: fixed;
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

  bigButton: (
    bgColor = theme.themeColor,
    color = theme.mainWhite,
    border = 'none',
  ) => `
    font-size: ${theme.fontSemiMedium};  
    background-color: ${bgColor};
    color: ${color};
    cursor: pointer;
    padding: 2rem 4rem;
    border-radius: 1rem;
    border:${border};
  `,

  mediumButton: (
    bgColor = theme.themeColor,
    color = theme.mainWhite,
    border = 'none',
  ) => `
    font-size: ${theme.fontRegular};  
    background-color: ${bgColor};
    color: ${color};
    cursor: pointer;
    padding: 1.5rem 3rem;
    border-radius: 0.7rem;
    border:${border};
  `,

  smallButton: (
    bgColor = theme.themeColor,
    color = theme.mainWhite,
    border = 'none',
  ) => `
    font-size: ${theme.fontMicro};  
    background-color: ${bgColor};
    color: ${color};
    cursor: pointer;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    border:${border};
    `,
  input: (
    width = '100%',
    height = '5rem',
    size = theme.fontRegular,
    mb = theme.spacingRegular,
  ) => `
    width: ${width};
    height: ${height};
    font-size: ${size};
    padding: ${theme.spacingSemiMedium};
    margin-bottom: ${mb};
    border: none;
    border-radius: 0.5rem;
    box-shadow: 2px 2px 5px ${theme.lightDarkGrey};
  `,
};

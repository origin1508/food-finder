import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle` 
  ${reset} 

    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
        
    }
    html{
        font-size: 62.5%; 
    }
    body{
        font-family: 'Noto Sans KR', sans-serif;
        background-color: #F7F7F7;
        font-size:1.6rem;
    }
    input, textarea { 
      -moz-user-select: auto;
      -webkit-user-select: auto;
      -ms-user-select: auto;
      user-select: auto;
    }
    input:focus {
      outline: none;
    }

    button {
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
    }
`;

export default GlobalStyles;

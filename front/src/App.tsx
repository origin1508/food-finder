import React from 'react';
import CustomRouter from './customRouter';
import GlobalStyle from './styles/globalStyle';
import { ThemeProvider } from 'styled-components';
import { theme, mixins } from './styles/theme';

const App = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <ThemeProvider theme={{ ...theme, mixins }}>
        <CustomRouter />
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;

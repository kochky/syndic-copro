import "../styles/globals.css";
import React from 'react';
import { ThemeProvider } from 'styled-components';
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
const theme= {
  primary:"#162049",
  secondary:"#4c34ff",
  tertiary:"#959bb1",
  fourth:'#212121'
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
];
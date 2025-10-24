// src/styles/global.js
import { createGlobalStyle } from 'styled-components';

export const darkTheme = {
  background: '#121212', // Um preto um pouco mais suave
  surface: '#1E1E1E', // Cor dos cards
  primary: '#BB86FC', // Roxo para o modo escuro
  text: '#FFFFFF',
  textSecondary: '#B3B3B3',
  border: '#2C2C2C',
};

export const lightTheme = {
  background: '#F0F2F5', // Fundo cinza claro
  surface: '#FFFFFF', // Cards brancos
  primary: '#6200EE', // Roxo para o modo claro
  text: '#000000',
  textSecondary: '#5F6368',
  border: '#D1D1D1',
};

// ... O GlobalStyle continua o mesmo ...
export const GlobalStyle = createGlobalStyle`
    /* ... seu código do GlobalStyle aqui ... */
    /* Importante: agora use as cores do tema dinamicamente */
    body {
        background-color: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.text};
        font-family: 'Roboto', sans-serif;
        transition: background-color 0.3s, color 0.3s; /* Adiciona uma transição suave */
    }
`;
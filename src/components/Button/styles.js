// src/components/Button/styles.js
import styled from 'styled-components';

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;

  // Estilo primário (padrão)
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;

  &:hover {
    filter: brightness(0.9);
  }

  // Estilo secundário
  ${({ $variant, theme }) => $variant === 'secondary' && `
    background-color: ${theme.surface}; /* Usamos surface para o fundo */
    color: ${theme.text};
    border: 1px solid ${theme.border};

    &:hover {
      background-color: ${theme.background}; /* Escurece um pouco no hover */
      border-color: ${theme.textSecondary};
    }
  `}
`;
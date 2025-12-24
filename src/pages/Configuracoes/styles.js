// src/pages/Configuracoes/styles.js
import styled from 'styled-components';

export const Container = styled.div`
`;

export const Title = styled.h2`
  margin-bottom: 8px;
`;

export const SettingsCard = styled.div`
  background-color: ${({ theme }) => theme.surface};
  border-radius: 12px;
  margin-top: 32px;
`;

export const CardHeader = styled.div`
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  svg {
    font-size: 20px;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

export const CardBody = styled.div`
  padding: 24px;
`;

export const OptionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    gap: 4px;

    span {
      font-size: 14px;
      color: ${({ theme }) => theme.textSecondary};
    }
  }
`;

export const Select = styled.select`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  
  /* Ajuste para garantir visibilidade no modo escuro: fundo claro e texto escuro */
  background-color: ${({ theme, $isDarkMode }) => $isDarkMode ? '#f0f0f5' : theme.background};
  color: ${({ theme, $isDarkMode }) => $isDarkMode ? '#121214' : theme.textPrimary};
  
  font-size: 14px;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;
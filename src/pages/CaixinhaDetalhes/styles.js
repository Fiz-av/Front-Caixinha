// src/pages/CaixinhaDetalhes/styles.js
import styled from 'styled-components';
import { Link } from 'react-router-dom'; 

export const Container = styled.div`
  /* Estilos do container principal da página */
`;

export const PageTitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px; // Espaço entre o botão de voltar e o texto
  margin-bottom: 24px;

  h2 {
    font-size: 28px;
    margin: 0; // Remove margens padrão
  }
  p {
    color: ${({ theme }) => theme.textSecondary};
    font-size: 16px;
    margin: 0;
  }
`;

// ✅ NOVO ESTILO PARA O BOTÃO VOLTAR
export const BackButton = styled(Link)`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  color: ${({ theme }) => theme.textSecondary};
  text-decoration: none; // Remover sublinhado padrão do link

  &:hover {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }

  svg {
    font-size: 20px;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end; // Alinha os itens na parte de baixo
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  margin-bottom: 32px; // Adiciona um espaço entre o header e as despesas
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 12px; // Espaço entre os botões
`;

export const ExpensesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px; /* Mantém o espaçamento se usado */
  margin-bottom: 16px;
`;

export const DespesasList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;

  li {
    background-color: ${({ theme }) => theme.surface};
    padding: 16px 20px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.border};

    div {
      display: flex;
      flex-direction: column;
      gap: 4px;

      span {
        font-size: 14px;
        color: ${({ theme }) => theme.textSecondary};
      }
    }
  }
`;

// src/pages/NovaCaixinha/styles.js
import styled from 'styled-components';

export const Container = styled.div`
`;

export const Header = styled.div`
  margin-bottom: 32px;
`;

export const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 8px;
`;

export const Form = styled.form`
  background-color: ${({ theme }) => theme.surface};
  padding: 40px; 
  border-radius: 16px;
  width: 100%; /* Ocupa a largura total do container */
  max-width: 700px; /* Aumenta um pouco a largura máxima */
  display: flex;
  flex-direction: column;
  gap: 24px;

  /* Estilo para garantir que a área de texto pareça um input */
  textarea {
    background-color: ${({ theme }) => theme.background};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 8px;
    padding: 12px 16px;
    color: ${({ theme }) => theme.text};
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
    resize: vertical; /* Permite redimensionar apenas verticalmente */

    &::placeholder {
      color: ${({ theme }) => theme.textSecondary};
    }

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.primary};
    }
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr; 
  gap: 24px;
  align-items: flex-start;
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  label {
    font-size: 14px;
    color: ${({ theme }) => theme.textSecondary};
  }

  select {
    background-color: ${({ theme }) => theme.background};
    border: 1px solid ${({ theme }) => theme.border};
    color: ${({ theme }) => theme.text};
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 16px;
    height: 48px; /* Mesma altura do input */
  }

  span {
    font-size: 12px;
    color: ${({ theme }) => theme.textSecondary};
    margin-top: -4px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end; 
  gap: 12px;
  margin-top: 8px;
`;
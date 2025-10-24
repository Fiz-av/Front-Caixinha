// src/components/Input/styles.js
import styled from 'styled-components';

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary};
`;

export const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 12px 16px;
  color: ${({ theme }) => theme.text};
  font-size: 16px;

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;
// src/components/ExpenseListItem/styles.js
import styled from 'styled-components';

export const ListItem = styled.li`
  background-color: ${({ theme }) => theme.surface};
  padding: 16px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.border};
  gap: 16px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;

  span {
    font-size: 14px;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

export const Amount = styled.strong`
  font-size: 16px;
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;

  button {
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.textSecondary};
    cursor: pointer;
    font-size: 16px;
    transition: color 0.2s;

    &:hover {
      color: ${({ theme }) => theme.text};
    }
  }
`;
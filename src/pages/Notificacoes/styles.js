// src/pages/Notificacoes/styles.js 
import styled from 'styled-components';

export const Container = styled.div`
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
`;

export const Title = styled.h1`
  font-size: 32px;
  /* margin-bottom: 30px; // Removido, PageHeader já tem margem */
  margin-top: 0;
  margin-right: 0;
  margin-left: 0;
`;

export const UnreadCount = styled.span`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 4px 10px;
  border-radius: 12px;
`;

export const ActionsRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
`;

export const NotificationList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const NotificationItem = styled.li`
  background-color: ${({ theme, $isUnread }) => $isUnread ? theme.surface : theme.background};
  padding: 20px 24px;
  border-radius: 8px;
  border-left: 5px solid ${({ theme, $isUnread }) => $isUnread ? theme.primary : 'transparent'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  p { margin: 0; line-height: 1.5; }
  small { color: ${({ theme }) => theme.textSecondary}; margin-top: 8px; display: block; }
`;

export const ItemActions = styled.div`
  display: flex;
  gap: 12px;
  flex-shrink: 0; /* Impede que os botões encolham */
`;

export const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 16px;
  cursor: pointer;
  padding: 4px;

  &:hover {
    color: ${({ theme }) => theme.text};
  }
`;
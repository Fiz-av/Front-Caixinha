// src/components/CaixinhaCard/styles.js
import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  h3 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 20px;
  }
`;

// O status 'Fechada' terá uma cor diferente
const getStatusColor = ($status, theme) => {
  return $status === 'Ativa' ? '#2E7D32' : theme.textSecondary;
};

export const StatusBadge = styled.span`
  background-color: ${({ $status, theme }) => getStatusColor($status, theme)};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 14px;
  margin-top: 8px;
  min-height: 40px; /* Garante uma altura mínima */
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${({ theme }) => theme.textSecondary};
  }

  strong {
    font-size: 18px;
    color: ${({ theme }) => theme.text};
  }
`;
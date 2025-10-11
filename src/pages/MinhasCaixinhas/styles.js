// src/pages/MinhasCaixinhas/styles.js
import styled from 'styled-components';

export const Container = styled.div`
`;

export const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

  p {
    color: ${({ theme }) => theme.textSecondary};
    margin-top: 4px;
  }
`;

export const Actions = styled.div`
  margin-bottom: 32px;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
`;
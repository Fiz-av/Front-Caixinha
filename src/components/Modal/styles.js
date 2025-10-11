// src/components/Modal/styles.js
import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Container = styled.div`
  background: ${({ theme }) => theme.surface};
  padding: 32px;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h2 {
    font-size: 24px;
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 20px;
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.text};
  }
`;
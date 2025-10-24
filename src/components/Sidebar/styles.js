// src/components/Sidebar/styles.js (VERSÃO FINAL COM BOTÃO CONSISTENTE)
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavLabel = styled.span`
  white-space: nowrap;
`;

// ... (Container, Header, Logo, AppIcon - sem alterações)

export const Container = styled.aside`
  width: ${({ $isOpen }) => ($isOpen ? '260px' : '80px')};
  height: 100vh;
  background-color: ${({ theme }) => theme.surface};
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  left: 0; top: 0;
  z-index: 1001;
  transition: width 0.3s ease;
  border-right: 1px solid ${({ theme }) => theme.border};
  box-sizing: border-box;

  @media (max-width: 1024px) {
    width: 280px;
    transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '-100%')});
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: ${({ $isOpen }) => ($isOpen ? 'space-between' : 'left')};
  margin-bottom: 32px;
`;

export const Logo = styled(Link)`
  display: flex; 
  align-items: center; 
  gap: 12px;
  text-decoration: none; 
  color: ${({ theme }) => theme.text};
  font-size: 24px; 
  font-weight: bold;
`;

export const AppIcon = styled.div`
  min-width: 40px; height: 40px;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 8px;
  display: flex; justify-content: center; align-items: center;
  color: white; font-weight: bold; font-size: 20px;
  flex-shrink: 0;
  &::before { content: 'C'; }
`;

// ✅ ESTILOS DO BOTÃO ATUALIZADOS
export const ToggleButton = styled.button`
  /* Estilos copiados do NavItem para consistência */
  display: flex;
  align-items: center;
  gap: 16px;
  height: 48px;
  width: 100%;
  padding: 0 12px;
  border-radius: 8px;
  margin-bottom: 16px; /* Espaço abaixo do botão */

  /* Estilos próprios do botão */
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.textSecondary};
  cursor: pointer;
  font-size: 16px;
  
  &:hover { 
    background-color: ${({ theme }) => theme.background}; 
    color: ${({ theme }) => theme.text};
  }
  
  /* Lógica de alinhamento */
  justify-content: ${({ $isOpen }) => ($isOpen ? 'flex-start' : 'center')};

  svg { 
    font-size: 20px; 
    flex-shrink: 0;
  }
`;


export const Nav = styled.nav`
  display: flex; flex-direction: column;
  gap: 4px;
`;

export const NavItem = styled(Link)`
  display: flex; align-items: center;
  gap: 16px; height: 48px;
  padding: 0 12px; text-decoration: none;
  border-radius: 8px;
  color: ${({ $active, theme }) => $active ? theme.text : theme.textSecondary};
  background-color: ${({ $active, theme }) => $active ? theme.background : 'transparent'};
  
  &:hover { 
    background-color: ${({ theme }) => theme.background}; 
    color: ${({ theme }) => theme.text}; 
  }
  
  justify-content: ${({ $isOpen }) => ($isOpen ? 'flex-start' : 'center')};
  svg { font-size: 20px; flex-shrink: 0; }
`;

// ... (Footer, Profile, UserInfo, Logout - sem alterações)
export const Footer = styled.footer``;

export const Profile = styled.a`
  display: flex; align-items: center; gap: 16px;
  text-decoration: none; border-top: 1px solid ${({ theme }) => theme.border};
  padding: 16px 0; margin-top: 16px;
  justify-content: ${({ $isOpen }) => ($isOpen ? 'flex-start' : 'center')};
  svg { flex-shrink: 0; color: ${({theme}) => theme.textSecondary}; }
`;

export const UserInfo = styled.div`
  display: flex; flex-direction: column;
  white-space: nowrap;
  strong { color: ${({ theme }) => theme.text}; }
  span { font-size: 12px; color: ${({ theme }) => theme.textSecondary}; }
`;

export const Logout = styled.a`
  display: flex; align-items: center; gap: 16px;
  padding: 12px 0; text-decoration: none;
  border-radius: 8px; color: ${({ theme }) => theme.textSecondary};
  
  &:hover { 
    color: ${({ theme }) => theme.text}; 
    background-color: ${({ theme }) => theme.background};
  }
  
  justify-content: ${({ $isOpen }) => ($isOpen ? 'flex-start' : 'center')};
  svg { font-size: 20px; flex-shrink: 0; }
`;
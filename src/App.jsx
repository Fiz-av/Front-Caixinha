// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { useTheme } from './hooks/useTheme';
import { lightTheme, darkTheme, GlobalStyle } from './styles/global';
import { Sidebar } from './components/Sidebar';
import { FaBars } from 'react-icons/fa';

// Importando todas as páginas
import { MinhasCaixinhas } from './pages/MinhasCaixinhas';
import { NovaCaixinha } from './pages/NovaCaixinha';
import { Notificacoes } from './pages/Notificacoes';
import { Relatorios } from './pages/Relatorios';
import { Configuracoes } from './pages/Configuracoes';
import { CaixinhaDetalhes } from './pages/CaixinhaDetalhes';

const AppLayout = styled.div`
  display: flex;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
`;

const MobileHeader = styled.header`
  display: none;
  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 60px;
    background-color: ${({ theme }) => theme.surface};
    border-bottom: 1px solid ${({ theme }) => theme.border};
    position: sticky;
    top: 0;
    z-index: 999;
  }
`;

const HamburgerButton = styled.button`
  background: none; border: none; color: ${({ theme }) => theme.text}; font-size: 20px; cursor: pointer;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 80px;
  margin-left: ${({ $isSidebarOpen }) => ($isSidebarOpen ? '260px' : '80px')};
  transition: margin-left 0.3s ease;

  @media (max-width: 1024px) {
    margin-left: 0;
    padding: 20px;
  }
`;

const Overlay = styled.div`
  display: none;
  @media (max-width: 1024px) {
    display: ${({ $isSidebarOpen }) => ($isSidebarOpen ? 'block' : 'none')};
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
`;

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const { theme, toggleTheme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Executa uma vez no início
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <AppLayout>
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          <Overlay $isSidebarOpen={isSidebarOpen} onClick={() => setIsSidebarOpen(false)} />
          <ContentWrapper>
            <MobileHeader>
              <HamburgerButton onClick={() => setIsSidebarOpen(true)}><FaBars /></HamburgerButton>
              {/* Você pode adicionar a logo aqui se quiser */}
            </MobileHeader>
            <MainContent $isSidebarOpen={isSidebarOpen}>
              <Routes>
                <Route path="/" element={<MinhasCaixinhas />} />
                <Route path="/nova-caixinha" element={<NovaCaixinha />} />
                <Route path="/notificacoes" element={<Notificacoes />} />
                <Route path="/relatorios" element={<Relatorios />} />
                <Route path="/configuracoes" element={<Configuracoes currentTheme={theme} toggleTheme={toggleTheme} />} />
                <Route path="/caixinha/:caixinhaId" element={<CaixinhaDetalhes />} />
              </Routes>
            </MainContent>
          </ContentWrapper>
        </AppLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
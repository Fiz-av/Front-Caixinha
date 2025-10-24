// src/components/Sidebar/index.jsx (VERSÃO FINAL COM BOTÃO REPOSICIONADO)

import { useLocation, Link } from 'react-router-dom';
import { 
  Container, Header, Logo, Nav, NavItem, Profile, UserInfo, Logout, 
  AppIcon, NavLabel, ToggleButton, Footer
} from './styles';
import { 
  FaBoxes, FaPlus, FaBell, FaChartBar, FaCog, 
  FaSignOutAlt, FaUserCircle, FaChevronLeft, FaChevronRight 
} from 'react-icons/fa';

export function Sidebar({ isOpen, setIsOpen }) { 
  const location = useLocation();

  return (
    <Container $isOpen={isOpen}> 
        <div>
          <Header>
            <Logo to="/" $isOpen={isOpen}>
              <AppIcon />
              {isOpen && <NavLabel>Caixinha</NavLabel>} 
            </Logo>
            {/* O botão de recolher foi removido daqui */}
          </Header>
          
          {/* ✅ O BOTÃO DE ABRIR/FECHAR AGORA FICA AQUI */}
          <ToggleButton onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen}>
            {/* O ícone muda dependendo do estado */}
            {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
            {isOpen && <NavLabel>Recolher</NavLabel>}
          </ToggleButton>

          <Nav>
            <NavItem to="/" $active={location.pathname === '/'} $isOpen={isOpen}>
              <FaBoxes /> {isOpen && <NavLabel>Minhas Caixinhas</NavLabel>}
            </NavItem>
            <NavItem to="/nova-caixinha" $active={location.pathname === '/nova-caixinha'} $isOpen={isOpen}>
              <FaPlus /> {isOpen && <NavLabel>Nova Caixinha</NavLabel>}
            </NavItem>
            <NavItem to="/notificacoes" $active={location.pathname === '/notificacoes'} $isOpen={isOpen}>
              <FaBell /> {isOpen && <NavLabel>Notificações</NavLabel>}
            </NavItem>
            <NavItem to="/relatorios" $active={location.pathname === '/relatorios'} $isOpen={isOpen}>
              <FaChartBar /> {isOpen && <NavLabel>Relatórios</NavLabel>}
            </NavItem>
            <NavItem to="/configuracoes" $active={location.pathname === '/configuracoes'} $isOpen={isOpen}>
              <FaCog /> {isOpen && <NavLabel>Configurações</NavLabel>}
            </NavItem>
          </Nav>
        </div>

        <Footer>
          <Profile as={Link} to="/perfil" $isOpen={isOpen}> 
            <FaUserCircle size={28} />
            {isOpen && (
              <UserInfo>
                <strong>Fiz</strong>
                <span>fiz@gmail.com</span>
              </UserInfo>
            )}
          </Profile>
          <Logout href="#" $isOpen={isOpen}> 
            <FaSignOutAlt />
            {isOpen && <NavLabel>Sair</NavLabel>}
          </Logout>
        </Footer>
    </Container>
  );
}
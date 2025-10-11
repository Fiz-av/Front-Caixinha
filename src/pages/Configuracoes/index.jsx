// src/pages/Configuracoes/index.jsx
import { ToggleSwitch } from '../../components/ToggleSwitch';
import { Container, Title, SettingsCard, CardHeader, CardBody, OptionRow } from './styles';
import { FaMoon, FaGlobe } from 'react-icons/fa';

// 1. A função agora recebe as props { currentTheme, toggleTheme }
export function Configuracoes({ currentTheme, toggleTheme }) {
  
  // 2. 'isDarkMode' agora é dinâmico. 
  // Ele será 'true' se o tema atual for 'dark', e 'false' caso contrário.
  const isDarkMode = currentTheme === 'dark';

  return (
    <Container>
      <h1>Configurações</h1>
      <p>Personalize sua experiência no Caixinha</p>

      <SettingsCard>
        <CardHeader>
          <FaMoon />
          <h3>Aparência</h3>
        </CardHeader>
        <CardBody>
          <OptionRow>
            <div>
              <strong>Modo Escuro</strong>
              <span>Ative o tema escuro para reduzir o cansaço visual</span>
            </div>
            
            {/* 3. O ToggleSwitch agora usa os valores dinâmicos.
                'isToggled' reflete o estado real do tema.
                'onToggle' chama a função que realmente troca o tema. */}
            <ToggleSwitch isToggled={isDarkMode} onToggle={toggleTheme} />

          </OptionRow>
        </CardBody>
      </SettingsCard>

      <SettingsCard>
        <CardHeader>
          <FaGlobe />
          <h3>Idioma</h3>
        </CardHeader>
        <CardBody>
          {/* O seletor de idioma será um passo futuro */}
          <p>Em breve você poderá selecionar outros idiomas.</p>
        </CardBody>
      </SettingsCard>
    </Container>
  );
}

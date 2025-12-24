// src/pages/Configuracoes/index.jsx
import { ToggleSwitch } from '../../components/ToggleSwitch';
import { Container, Title, SettingsCard, CardHeader, CardBody, OptionRow, Select } from './styles';
import { FaSun, FaMoon, FaGlobe } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';

// 1. A função agora recebe as props { currentTheme, toggleTheme }
export function Configuracoes({ currentTheme, toggleTheme }) {
  const { language, setLanguage, t } = useLanguage();
  
  // 2. 'isDarkMode' agora é dinâmico. 
  // Ele será 'true' se o tema atual for 'dark', e 'false' caso contrário.
  const isDarkMode = currentTheme === 'dark';

  return (
    <Container>
      <h1>{t('settings')}</h1>
      <p>{t('settings_subtitle')}</p>

      <SettingsCard>
        <CardHeader>
          {isDarkMode ? <FaMoon /> : <FaSun />}
          <h3>{t('appearance')}</h3>
        </CardHeader>
        <CardBody>
          <OptionRow>
            <div>
              <strong>{t('dark_mode')}</strong>
              <span>{t('dark_mode_desc')}</span>
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
          <h3>{t('language')}</h3>
        </CardHeader>
        <CardBody>
          <OptionRow>
            <div>
              <strong>{t('select_language')}</strong>
            </div>
            <Select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              $isDarkMode={isDarkMode}
            >
              <option value="pt-BR">{t('portuguese')}</option>
              <option value="en-US">{t('english')}</option>
              <option value="fr-FR">{t('french')}</option>
            </Select>
          </OptionRow>
        </CardBody>
      </SettingsCard>
    </Container>
  );
}

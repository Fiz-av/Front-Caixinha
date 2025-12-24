// src/pages/Perfil/index.jsx (Estrutura inicial)
import React, { useState, useEffect } from 'react';
import { Container, Title, SectionCard, FormGrid, Actions, DangerZone } from './styles';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useLanguage } from '../../contexts/LanguageContext';

export function Perfil() {
  const { t } = useLanguage();
  // Estados para os dados do usuário (carregados do localStorage)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Estados para mudança de senha
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Simular carregamento dos dados ao montar o componente
  useEffect(() => {
    // No futuro, isso viria de uma API ou contexto de autenticação
    const userData = JSON.parse(localStorage.getItem('@caixinha:user')) || {
      name: 'Fiz',
      email: 'fiz@gmail.com',
      phone: '(31) 99999-9999' 
    };
    setName(userData.name);
    setEmail(userData.email);
    setPhone(userData.phone);
  }, []);

  // Funções para salvar (serão implementadas)
  const handleSaveChanges = (event) => {
    event.preventDefault();
    const updatedUser = { name, email, phone };
    localStorage.setItem('@caixinha:user', JSON.stringify(updatedUser));
    alert(t('alert_saved'));
    // Atualizar a sidebar? (Avançado)
  };

  const handleChangePassword = (event) => {
     event.preventDefault();
     if (newPassword !== confirmPassword) {
        alert(t('alert_password_mismatch'));
        return;
     }
     alert(t('alert_password_changed'));
     // Limpar campos
     setCurrentPassword('');
     setNewPassword('');
     setConfirmPassword('');
  };

  const handleDeleteAccount = () => {
    if (window.confirm(t('confirm_delete_account'))) {
       alert('Conta excluída com sucesso! (Simulado)');
       // Limpar localStorage e redirecionar para login (Futuro)
    }
  };

  return (
    <Container>
      <Title>{t('my_profile')}</Title>

      {/* --- Seção de Dados Pessoais --- */}
      <SectionCard>
        <h2>{t('personal_data')}</h2>
        <FormGrid onSubmit={handleSaveChanges}>
          <Input label={t('name')} value={name} onChange={e => setName(e.target.value)} />
          <Input label={t('phone')} placeholder="(XX) XXXXX-XXXX" value={phone} onChange={e => setPhone(e.target.value)} />
          <Input label={t('email')} type="email" value={email} onChange={e => setEmail(e.target.value)} className="full-width" />
          <Actions className="full-width">
            <Button type="submit">{t('save_changes')}</Button>
          </Actions>
        </FormGrid>
      </SectionCard>

      {/* --- Seção de Alterar Senha --- */}
      <SectionCard>
        <h2>{t('change_password')}</h2>
        <FormGrid onSubmit={handleChangePassword}>
           <Input label={t('current_password')} type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="full-width"/>
           <Input label={t('new_password')} type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
           <Input label={t('confirm_new_password')} type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
           <Actions className="full-width">
              <Button type="submit">{t('change_password')}</Button>
           </Actions>
        </FormGrid>
      </SectionCard>

      {/* --- Seção de Excluir Conta --- */}
      <DangerZone>
        <h2>{t('delete_account')}</h2>
        <p>{t('delete_account_desc')}</p>
        <Actions>
           <Button 
             onClick={handleDeleteAccount} 
             style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}
           >
             {t('delete_account_button')}
           </Button>
        </Actions>
      </DangerZone>

    </Container>
  );
}
// src/pages/Perfil/index.jsx (Estrutura inicial)
import React, { useState, useEffect } from 'react';
import { Container, Title, SectionCard, FormGrid, Actions, DangerZone } from './styles';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export function Perfil() {
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
    alert('Dados salvos com sucesso! (Simulado)');
    // Atualizar a sidebar? (Avançado)
  };

  const handleChangePassword = (event) => {
     event.preventDefault();
     if (newPassword !== confirmPassword) {
        alert("As novas senhas não coincidem!");
        return;
     }
     alert('Senha alterada com sucesso! (Simulado)');
     // Limpar campos
     setCurrentPassword('');
     setNewPassword('');
     setConfirmPassword('');
  };

  const handleDeleteAccount = () => {
    if (window.confirm("TEM CERTEZA? Esta ação é irreversível e excluirá todos os seus dados.")) {
       alert('Conta excluída com sucesso! (Simulado)');
       // Limpar localStorage e redirecionar para login (Futuro)
    }
  };

  return (
    <Container>
      <Title>Meu Perfil</Title>

      {/* --- Seção de Dados Pessoais --- */}
      <SectionCard>
        <h2>Dados Pessoais</h2>
        <FormGrid onSubmit={handleSaveChanges}>
          <Input label="Nome" value={name} onChange={e => setName(e.target.value)} />
          <Input label="Telefone" placeholder="(XX) XXXXX-XXXX" value={phone} onChange={e => setPhone(e.target.value)} />
          <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="full-width" />
          <Actions className="full-width">
            <Button type="submit">Salvar Alterações</Button>
          </Actions>
        </FormGrid>
      </SectionCard>

      {/* --- Seção de Alterar Senha --- */}
      <SectionCard>
        <h2>Alterar Senha</h2>
        <FormGrid onSubmit={handleChangePassword}>
           <Input label="Senha Atual" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="full-width"/>
           <Input label="Nova Senha" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
           <Input label="Confirmar Nova Senha" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
           <Actions className="full-width">
              <Button type="submit">Alterar Senha</Button>
           </Actions>
        </FormGrid>
      </SectionCard>

      {/* --- Seção de Excluir Conta --- */}
      <DangerZone>
        <h2>Excluir Conta</h2>
        <p>Esta ação é permanente e não pode ser desfeita. Todas as suas caixinhas e dados associados serão removidos.</p>
        <Actions>
           <Button 
             onClick={handleDeleteAccount} 
             style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}
           >
             Excluir Minha Conta Permanentemente
           </Button>
        </Actions>
      </DangerZone>

    </Container>
  );
}
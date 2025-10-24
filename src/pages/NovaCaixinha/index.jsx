// src/pages/NovaCaixinha/index.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { 
  Container, 
  Form, 
  Title, 
  Header, 
  FormRow, 
  SelectContainer,  
  ButtonsContainer 
} from './styles';

export function NovaCaixinha() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataFechamento, setDataFechamento] = useState('');
  const [tipoPagamento, setTipoPagamento] = useState('Simplificado');

  function handleCreateCaixinha(event) {
    event.preventDefault();

    if (!nome) {
      return alert("O nome da caixinha é obrigatório!");
    }

    const savedCaixinhas = JSON.parse(localStorage.getItem('@caixinha:caixinhas')) || [];

    const newCaixinha = {
      id: Date.now(),
      title: nome,
      description: descricao,
      isOwner: true,
      members: 1,
      totalValue: 0,
      status: 'Ativa',
      closingDate: dataFechamento,
      paymentType: tipoPagamento,
    };

    const updatedCaixinhas = [...savedCaixinhas, newCaixinha];
    localStorage.setItem('@caixinha:caixinhas', JSON.stringify(updatedCaixinhas));

    alert("Caixinha criada com sucesso!");
    navigate('/');
  }

  return (
    <Container>
        <Header>
            <h1>Nova Caixinha</h1>
            <p>Crie um novo grupo para dividir despesas</p>
        </Header>
        <Form onSubmit={handleCreateCaixinha}>
            <Input 
                label="Nome da Caixinha *"
                placeholder="Ex: Viagem para Búzios..."
                value={nome}
                onChange={e => setNome(e.target.value)}
            />
            
            <label style={{ fontSize: '14px', color: '#A9A9B2', marginBottom: '-16px' }}>Descrição</label>
            <textarea
                rows={4}
                placeholder="Descrição opcional..."
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
            />

            <FormRow>
              <Input 
                type="date"
                label="Data de Fechamento (Opcional)"
                value={dataFechamento}
                onChange={e => setDataFechamento(e.target.value)}
              />
              <SelectContainer>
                <label>Tipo de Pagamento</label>
                <select 
                  value={tipoPagamento} 
                  onChange={e => setTipoPagamento(e.target.value)}
                >
                  <option value="Simplificado">Simplificado</option>
                  <option value="Completo">Completo</option>
                </select>
                <span>Otimiza os pagamentos</span>
              </SelectContainer>
            </FormRow>
            
            <ButtonsContainer>
              <Button type="button" $variant="secondary" onClick={() => navigate('/')}>Cancelar</Button>
              <Button type="submit">Criar Caixinha</Button>
            </ButtonsContainer>
        </Form>
    </Container>
  );
}
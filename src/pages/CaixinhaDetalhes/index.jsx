// src/pages/CaixinhaDetalhes/index.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CAIXINHAS_MOCK } from '../../data/caixinhas';
import { DESPESAS_MOCK } from '../../data/despesas';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { Input } from '../../components/Input';
import { ExpenseListItem } from '../../components/ExpenseListItem';

// Importa os novos componentes de estilo
import { 
  Container, 
  Header, 
  PageTitleSection, // Novo!
  BackButton,       // Novo estilo para o botão
  HeaderActions,    // Novo!
  DespesasList, 
  ExpensesHeader    // Este pode ser removido ou alterado dependendo do design final
} from './styles';

import { FaArrowLeft, FaUserFriends } from 'react-icons/fa'; // Importa o ícone de amigos

export function CaixinhaDetalhes() {
  const { caixinhaId } = useParams();
  const [isNewExpenseModalOpen, setIsNewExpenseModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null); // ✅ Estado para edição

  // Estados do formulário de NOVA despesa
  const [newDescription, setNewDescription] = useState('');
  const [newAmount, setNewAmount] = useState('');

  // Estados do formulário de EDIÇÃO de despesa
  const [editDescription, setEditDescription] = useState('');
  const [editAmount, setEditAmount] = useState('');

  const caixinha = CAIXINHAS_MOCK.find(c => c.id === parseInt(caixinhaId));
  const [despesas, setDespesas] = useState(() =>
    DESPESAS_MOCK.filter(d => d.caixinhaId === parseInt(caixinhaId))
  );

  // Efeito para popular o formulário de edição quando uma despesa é selecionada
  useEffect(() => {
    if (editingExpense) {
      setEditDescription(editingExpense.description);
      setEditAmount(editingExpense.amount);
    }
  }, [editingExpense]);

  // --- Funções do Modal de Adicionar ---
  function handleOpenNewExpenseModal() { setIsNewExpenseModalOpen(true); }
  function handleCloseNewExpenseModal() {
    setNewDescription('');
    setNewAmount('');
    setIsNewExpenseModalOpen(false);
  }

  // --- Funções do Modal de Editar ---
  function handleOpenEditModal(despesa) { setEditingExpense(despesa); }
  function handleCloseEditModal() { setEditingExpense(null); }

  // --- Lógica CRUD ---
  function handleAddNewExpense(event) {
    event.preventDefault();
    if (!newDescription || !newAmount) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const newExpense = {
      id: Math.random(),
      caixinhaId: caixinha.id,
      description: newDescription,
      amount: parseFloat(newAmount),
      paidBy: 'Você',
      date: new Date().toISOString().split('T')[0],
    };

    setDespesas(prevState => [...prevState, newExpense]);
    handleCloseNewExpenseModal();
  }

  function handleDeleteExpense(expenseId) {
    if (window.confirm("Tem certeza que deseja excluir esta despesa?")) {
      setDespesas(prevState => prevState.filter(d => d.id !== expenseId));
    }
  }

  function handleUpdateExpense(event) {
    event.preventDefault();
    setDespesas(prevState => prevState.map(d => 
      d.id === editingExpense.id 
      ? { ...d, description: editDescription, amount: parseFloat(editAmount) } 
      : d
    ));
    handleCloseEditModal();
  }

  if (!caixinha) {
    return (
      <Container>
        <h1>Caixinha não encontrada!</h1>
        <Link to="/">Voltar para a página inicial</Link>
      </Container>
    );
  }

  return (
    <Container>
      <Modal 
        title="Adicionar Nova Despesa"
        visible={isNewExpenseModalOpen}
        onClose={handleCloseNewExpenseModal}
      >
        <form onSubmit={handleAddNewExpense} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input 
            label="Descrição" 
            placeholder="Ex: Jantar, Gasolina..."
            value={newDescription}
            onChange={e => setNewDescription(e.target.value)}
          />
          <Input 
            label="Valor" 
            type="number" 
            placeholder="R$ 0,00"
            step="0.01"
            value={newAmount}
            onChange={e => setNewAmount(e.target.value)}
          />
          <Button type="submit">Salvar Despesa</Button>
        </form>
      </Modal>

      <Modal
        title="Editar Despesa"
        visible={!!editingExpense}
        onClose={handleCloseEditModal}
      >
        <form onSubmit={handleUpdateExpense} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input 
            label="Descrição" 
            value={editDescription}
            onChange={e => setEditDescription(e.target.value)}
          />
          <Input 
            label="Valor" 
            type="number"
            step="0.01"
            value={editAmount}
            onChange={e => setEditAmount(e.target.value)}
          />
          <Button type="submit">Salvar Alterações</Button>
        </form>
      </Modal>

      <Header>
        <PageTitleSection>
          <BackButton to="/"> {/* Usa o novo estilo de botão de voltar */}
            <FaArrowLeft />
          </BackButton>
          <div>
            <h2>{caixinha.title}</h2>
            <p>{caixinha.description}</p>
          </div>
        </PageTitleSection>

        <HeaderActions>
          {/* O botão de adicionar despesa fica aqui agora */}
          <Button onClick={handleOpenNewExpenseModal}>+ Adicionar Despesa</Button>
          {/* Novo botão de convidar membros */}
          <Button $variant="secondary">
            <FaUserFriends /> Convidar Membros
          </Button>
        </HeaderActions>
      </Header>

      <DespesasList>
        {despesas.length > 0 ? (
          despesas.map(despesa => (
            <ExpenseListItem 
              key={despesa.id} 
              data={despesa}
              onDelete={handleDeleteExpense} // Passando a função de deletar
              onEdit={handleOpenEditModal}   // Passando a função de editar
            />
          ))
        ) : (
          <p>Nenhuma despesa foi adicionada ainda.</p>
        )}
      </DespesasList>
    </Container>
  );
}
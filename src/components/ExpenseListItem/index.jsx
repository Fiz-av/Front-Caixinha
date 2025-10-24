// src/components/ExpenseListItem/index.jsx
import { ListItem, Info, Amount, Actions } from './styles';
import { FaPen, FaTrash } from 'react-icons/fa';

export function ExpenseListItem({ data, onEdit, onDelete }) {
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(data.amount);

  return (
    <ListItem>
      <Info>
        <strong>{data.description}</strong>
        <span>{data.paidBy} pagou</span>
      </Info>
      <Amount>{formattedAmount}</Amount>
      <Actions>
        <button onClick={() => onEdit(data)}><FaPen /></button>
        <button onClick={() => onDelete(data.id)}><FaTrash /></button>
      </Actions>
    </ListItem>
  );
}
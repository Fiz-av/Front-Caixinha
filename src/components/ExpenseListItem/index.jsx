// src/components/ExpenseListItem/index.jsx
import { ListItem, Info, Amount, Actions } from './styles';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';

export function ExpenseListItem({ data, onEdit, onDelete }) {
  const { t } = useLanguage();

  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(data.amount);

  return (
    <ListItem>
      <Info>
        <strong>{data.description}</strong>
        {/* Onde exibe quem pagou: */}
        <span>
          {data.paidBy === 'Você' ? t('you_paid') : `${t('paid_by')} ${data.paidBy}`}
        </span>
      </Info>
      <Amount>{formattedAmount}</Amount>
      <Actions>
        <button onClick={() => onEdit(data)}><FaPen /></button>
        <button onClick={() => onDelete(data.id)}><FaTrash /></button>
      </Actions>
    </ListItem>
  );
}
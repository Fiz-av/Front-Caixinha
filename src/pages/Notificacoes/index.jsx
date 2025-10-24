// src/pages/Notificacoes/index.jsx 

import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Title, 
  NotificationList, 
  NotificationItem, 
  PageHeader,        // Import PageHeader
  ActionsRow, 
  UnreadCount,
  ItemActions,       // Import ItemActions
  ActionButton       // Import ActionButton
} from './styles'; 
import { NOTIFICACOES_MOCK } from '../../data/notificacoes';
import { formatDistanceToNow } from 'date-fns'; 
import { ptBR } from 'date-fns/locale';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { FaTrash, FaUndo, FaCheckDouble } from 'react-icons/fa';

export function Notificacoes() {
  const [allNotifications, setAllNotifications] = useState(() => {
    const saved = localStorage.getItem('@caixinha:notificacoes');
    if (saved) return JSON.parse(saved);
    localStorage.setItem('@caixinha:notificacoes', JSON.stringify(NOTIFICACOES_MOCK));
    return NOTIFICACOES_MOCK;
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNotifications, setFilteredNotifications] = useState(allNotifications);

  useEffect(() => {
    localStorage.setItem('@caixinha:notificacoes', JSON.stringify(allNotifications));
  }, [allNotifications]);

  useEffect(() => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = allNotifications.filter(notification =>
      notification.message.toLowerCase().includes(lowerCaseSearch)
    );
    setFilteredNotifications(filtered);
  }, [searchTerm, allNotifications]);

  const handleMark = (id, readStatus) => {
    setAllNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, read: readStatus } : notif)
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Excluir esta notificação?")) {
      setAllNotifications(prev => prev.filter(notif => notif.id !== id));
    }
  };

  const handleMarkAllRead = () => {
    setAllNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const handleClearAll = () => {
    if (window.confirm("Limpar todas as notificações? Esta ação não pode ser desfeita.")) {
      setAllNotifications([]);
    }
  };

  const unreadCount = allNotifications.filter(n => !n.read).length;

  return (
    <Container>
      {/* ✅ Using PageHeader correctly */}
      <PageHeader>
        <Title>Notificações</Title>
        {unreadCount > 0 && <UnreadCount>{unreadCount}</UnreadCount>} 
      </PageHeader>

      <ActionsRow>
        <Input 
          placeholder="Buscar notificação..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ flex: 1 }}
        />
        <Button onClick={handleMarkAllRead} disabled={unreadCount === 0} $variant="secondary">
          <FaCheckDouble /> Marcar todas como lidas
        </Button>
        <Button onClick={handleClearAll} disabled={allNotifications.length === 0} $variant="secondary" style={{ backgroundColor: '#dc3545', color: 'white', borderColor: '#dc3545' }}> 
          <FaTrash /> Limpar tudo
        </Button>
      </ActionsRow>

      {filteredNotifications.length > 0 ? (
        <NotificationList>
          {filteredNotifications.map(notification => (
            <NotificationItem 
              key={notification.id} 
              $isUnread={!notification.read}
            >
              <div> 
                <p>{notification.message}</p>
                <small>
                  {formatDistanceToNow(new Date(notification.date), { addSuffix: true, locale: ptBR })}
                </small>
              </div>
              {/* ✅ Using ItemActions and ActionButton correctly */}
              <ItemActions>
                {notification.read ? (
                   <ActionButton title="Marcar como não lida" onClick={() => handleMark(notification.id, false)}>
                     <FaUndo />
                   </ActionButton>
                 ) : (
                   <ActionButton title="Marcar como lida" onClick={() => handleMark(notification.id, true)}>
                     <FaCheckDouble />
                   </ActionButton>
                 )}
                <ActionButton title="Excluir" onClick={() => handleDelete(notification.id)}>
                  <FaTrash />
                </ActionButton>
              </ItemActions>
            </NotificationItem>
          ))}
        </NotificationList>
      ) : (
        <p style={{ marginTop: '30px', textAlign: 'center' }}>{searchTerm ? 'Nenhuma notificação encontrada.' : 'Nenhuma notificação por enquanto.'}</p>
      )}
    </Container>
  );
}
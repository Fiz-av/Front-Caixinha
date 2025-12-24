// src/pages/Notificacoes/index.jsx 

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
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
import { ptBR, enUS, fr } from 'date-fns/locale'; // Import fr
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { FaTrash, FaUndo, FaCheckDouble } from 'react-icons/fa';

export function Notificacoes() {
  const { t, language } = useLanguage(); // Pegue o language do contexto
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
    if (window.confirm(t('confirm_delete_notification'))) {
      setAllNotifications(prev => prev.filter(notif => notif.id !== id));
    }
  };

  const handleMarkAllRead = () => {
    setAllNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const handleClearAll = () => {
    if (window.confirm(t('confirm_clear_all'))) {
      setAllNotifications([]);
    }
  };

  const unreadCount = allNotifications.filter(n => !n.read).length;

  // Defina o locale do date-fns com base no idioma selecionado
  const dateLocale = language === 'pt-BR' ? ptBR : (language === 'fr-FR' ? fr : enUS);

  return (
    <Container>
      {/* ✅ Using PageHeader correctly */}
      <PageHeader>
        <Title>{t('notifications_title')}</Title>
        {unreadCount > 0 && <UnreadCount>{unreadCount}</UnreadCount>} 
      </PageHeader>

      <ActionsRow>
        <Input 
          placeholder={t('search_notifications_placeholder')}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ flex: 1 }}
        />
        <Button onClick={handleMarkAllRead} disabled={unreadCount === 0} $variant="secondary">
          <FaCheckDouble /> {t('mark_all_read')}
        </Button>
        <Button onClick={handleClearAll} disabled={allNotifications.length === 0} $variant="secondary" style={{ backgroundColor: '#dc3545', color: 'white', borderColor: '#dc3545' }}> 
          <FaTrash /> {t('clear_all')}
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
                  {/* Use a variável dateLocale aqui */}
                  {formatDistanceToNow(new Date(notification.date), { addSuffix: true, locale: dateLocale })}
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
        <p style={{ marginTop: '30px', textAlign: 'center' }}>{searchTerm ? t('no_notifications_found') : t('no_notifications_yet')}</p>
      )}
    </Container>
  );
}
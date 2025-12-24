// src/components/CaixinhaCard/index.jsx
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import { Container, Header, StatusBadge, Description, InfoRow, Footer } from './styles';
import { FaCrown, FaUserFriends } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';

export function CaixinhaCard({ data }) {
  const { t } = useLanguage();

  // Formata o valor para o padrão brasileiro (R$ 1.250,75)
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(data.totalValue);

  return (
    <Container>
      <div>
        <Header>
          <h3>
            {data.title} {data.isOwner && <FaCrown size={14} color="#FFD700" />}
          </h3>
          <StatusBadge $status={data.status}>
            {data.status === 'Ativa' ? t('active') : t('closed')}
          </StatusBadge>
        </Header>
        <Description>{data.description}</Description>
      </div>
      <Footer>
        <InfoRow>
          <div>
            <FaUserFriends />
            <span>
              {data.members} {t('members')}
            </span>
          </div>
          <strong>{formattedValue}</strong>
        </InfoRow>
        <Link to={`/caixinha/${data.id}`} style={{ textDecoration: 'none' }}>
          <Button>{t('see_details')}</Button>
        </Link>
      </Footer>
    </Container>
  );
}
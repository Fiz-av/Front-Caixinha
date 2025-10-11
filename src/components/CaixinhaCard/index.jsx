// src/components/CaixinhaCard/index.jsx
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import { Container, Header, StatusBadge, Description, InfoRow, Footer } from './styles';
import { FaCrown, FaUserFriends } from 'react-icons/fa';

export function CaixinhaCard({ data }) {
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
          <StatusBadge $status={data.status}>{data.status}</StatusBadge>
        </Header>
        <Description>{data.description}</Description>
      </div>
      <Footer>
        <InfoRow>
          <div>
            <FaUserFriends />
            <span>{data.members} membros</span>
          </div>
          <strong>{formattedValue}</strong>
        </InfoRow>
        <Link to={`/caixinha/${data.id}`} style={{ textDecoration: 'none' }}>
          <Button>Ver Detalhes</Button>
        </Link>
      </Footer>
    </Container>
  );
}
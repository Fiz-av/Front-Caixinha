// src/pages/MinhasCaixinhas/index.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { CAIXINHAS_MOCK } from '../../data/caixinhas';
import { CaixinhaCard } from '../../components/CaixinhaCard';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Container, PageHeader, Actions, CardGrid } from './styles';

export function MinhasCaixinhas() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [caixinhas, setCaixinhas] = useState(() => {
    const savedCaixinhas = localStorage.getItem('@caixinha:caixinhas');
    
    if (savedCaixinhas) {
      return JSON.parse(savedCaixinhas);
    }
    
    localStorage.setItem('@caixinha:caixinhas', JSON.stringify(CAIXINHAS_MOCK));
    return CAIXINHAS_MOCK;
  });

  const [filteredCaixinhas, setFilteredCaixinhas] = useState(caixinhas);

  useEffect(() => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = caixinhas.filter(caixinha => 
      caixinha.title.toLowerCase().includes(lowerCaseSearch) ||
      caixinha.description.toLowerCase().includes(lowerCaseSearch)
    );
    setFilteredCaixinhas(filtered);
  }, [searchTerm, caixinhas]);

  return (
    <Container>
      <PageHeader>
        <div>
          <h1>Minhas Caixinhas</h1>
          <p>Gerencie suas despesas em grupo de forma simples</p>
        </div>
        <Link to={"/nova-caixinha"} style={{ textDecoration: 'none' }}>
          <Button>Nova Caixinha</Button>
        </Link>
      </PageHeader>

      <Actions>
        <Input 
          placeholder="Buscar caixinha pelo nome ou descrição..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Actions>

      <CardGrid>
        {filteredCaixinhas.map(caixinha => (
          <CaixinhaCard key={caixinha.id} data={caixinha} />
        ))}
      </CardGrid>
    </Container>
  );
}
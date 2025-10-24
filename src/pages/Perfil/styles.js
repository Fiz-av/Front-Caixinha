// src/pages/Perfil/styles.js
import styled from 'styled-components';

export const Container = styled.div`
  /* Sem padding local */
`;

export const Title = styled.h1`
  margin-bottom: 32px;
`;

// Vamos usar cards para organizar as seções
export const SectionCard = styled.section`
  background-color: ${({ theme }) => theme.surface};
  padding: 32px;
  border-radius: 12px;
  margin-bottom: 32px;

  h2 {
    font-size: 20px;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }
`;

export const FormGrid = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr; /* Duas colunas */
  gap: 24px;
  margin-bottom: 24px;

  /* Faz um input ocupar as duas colunas */
  .full-width {
    grid-column: 1 / -1;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

// Estilo específico para a seção de perigo (excluir conta)
export const DangerZone = styled(SectionCard)`
  border: 1px solid #dc3545; /* Vermelho perigo */

  h2 {
    color: #dc3545;
    border-bottom-color: rgba(220, 53, 69, 0.3);
  }

  p {
    color: ${({ theme }) => theme.textSecondary};
    margin-bottom: 24px;
  }
`;
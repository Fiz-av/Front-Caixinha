// src/data/notificacoes.js
export const NOTIFICACOES_MOCK = [
  {
    id: 1,
    message: 'Ana te adicionou à despesa "Hospedagem AirBnb" na caixinha "Viagem para a Praia".',
    date: '2025-10-06T10:30:00',
    read: false,
    link: '/caixinha/1', // Opcional: Link para a caixinha relevante
  },
  {
    id: 2,
    message: 'Você criou a despesa "Supermercado" na caixinha "Viagem para a Praia".',
    date: '2025-10-06T15:15:00',
    read: true,
    link: '/caixinha/1',
  },
  {
    id: 3,
    message: 'João te adicionou à despesa "Aluguel" na caixinha "Apartamento".',
    date: '2025-10-01T09:00:00',
    read: false,
    link: '/caixinha/2',
  },
  {
    id: 4,
    message: 'Carlos pagou a despesa "Gasolina" na caixinha "Viagem para a Praia".',
    date: '2025-10-05T18:00:00',
    read: true,
  },
];
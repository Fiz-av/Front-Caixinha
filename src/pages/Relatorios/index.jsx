// src/pages/Relatorios/index.jsx (Com processamento de dados)

import { Container, Title, ChartContainer } from './styles';
import { DESPESAS_MOCK } from '../../data/despesas'; // Importa nossos dados de exemplo

// Funções e componentes necessários do Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle, // Renomeado para evitar conflito com nosso Title
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registra os componentes que o Chart.js vai usar
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

export function Relatorios() {
  
  // --- LÓGICA DE PROCESSAMENTO DOS DADOS ---
  const monthlyTotals = DESPESAS_MOCK.reduce((acc, expense) => {
    // Pega o ano e mês da data (ex: "2025-10")
    const yearMonth = expense.date.substring(0, 7); 
    
    // Se o mês ainda não existe no acumulador, inicializa com 0
    if (!acc[yearMonth]) {
      acc[yearMonth] = 0;
    }
    
    // Soma o valor da despesa ao total do mês
    acc[yearMonth] += expense.amount;
    
    return acc;
  }, {}); // Começa com um objeto vazio

  // Ordena os meses (as chaves do objeto)
  const sortedMonths = Object.keys(monthlyTotals).sort();

  // Prepara os dados no formato que o Chart.js espera
  const chartData = {
    labels: sortedMonths.map(month => {
      // Formata "2025-10" para "Out/2025" (Exemplo)
      const [year, monthNum] = month.split('-');
      const monthName = new Date(year, monthNum - 1, 1).toLocaleString('pt-BR', { month: 'short' });
      return `${monthName.charAt(0).toUpperCase() + monthName.slice(1)}/${year}`;
    }),
    datasets: [
      {
        label: 'Total Gasto (R$)',
        data: sortedMonths.map(month => monthlyTotals[month]),
        backgroundColor: 'rgba(108, 99, 255, 0.6)', // Cor das barras (nosso roxo primário com transparência)
        borderColor: 'rgba(108, 99, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  // --- OPÇÕES DE CONFIGURAÇÃO DO GRÁFICO ---
  const chartOptions = {
    responsive: true, // Torna o gráfico responsivo
    plugins: {
      legend: {
        position: 'top', // Posição da legenda
      },
      title: {
        display: false, // Já temos nosso título na página
      },
    },
    scales: {
        y: {
            beginAtZero: true // Garante que o eixo Y comece em 0
        }
    }
  };

  // --- RENDERIZAÇÃO ---
  return (
    <Container>
      <Title>Relatórios</Title>
      <ChartContainer>
        <h2>Total de Gastos por Mês</h2>
        {/* ✅ Renderiza o componente Bar com os dados e opções */}
        <Bar options={chartOptions} data={chartData} />
      </ChartContainer>
    </Container>
  );
}
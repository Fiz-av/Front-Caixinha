// src/pages/NovaCaixinha/index.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import DatePicker from 'react-datepicker';
import { enUS, fr, ptBR } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { 
  Container, 
  Form, 
  Header, 
  FormRow, 
  SelectContainer,  
  ButtonsContainer 
} from './styles';

export function NovaCaixinha() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataFechamentoIso, setDataFechamentoIso] = useState('');
  const [tipoPagamento, setTipoPagamento] = useState('Simplificado');

  const datepickerLocale = useMemo(() => {
    switch (language) {
      case 'en-US':
        return enUS;
      case 'fr-FR':
        return fr;
      case 'pt-BR':
      default:
        return ptBR;
    }
  }, [language]);

  const datepickerDateFormat = useMemo(() => {
    // react-datepicker usa padrões do date-fns
    switch (language) {
      case 'en-US':
        return 'mm / dd / yyyy';
      case 'fr-FR':
      case 'pt-BR':
      default:
        return 'dd / mm / yyyy';
    }
  }, [language]);
  
  // Força o input nativo de data a respeitar o idioma (lang é aplicado no elemento e na tag html pelo Provider)
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const isoToLocalMiddayDate = (iso) => {
    if (!iso) return null;
    const [y, m, d] = iso.split('-').map(Number);
    if (!y || !m || !d) return null;
    // Meio-dia reduz chance de “voltar um dia” por fuso/horário de verão.
    return new Date(y, m - 1, d, 12, 0, 0);
  };

  const dateToIso = (date) => {
    if (!date) return '';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  function handleCreateCaixinha(event) {
    event.preventDefault();

    if (!nome) {
      return alert(t('alert_name_required'));
    }

    const savedCaixinhas = JSON.parse(localStorage.getItem('@caixinha:caixinhas')) || [];

    const newCaixinha = {
      id: Date.now(),
      title: nome,
      description: descricao,
      isOwner: true,
      members: 1,
      totalValue: 0,
      status: 'Ativa',
      closingDate: dataFechamentoIso,
      paymentType: tipoPagamento,
    };

    const updatedCaixinhas = [...savedCaixinhas, newCaixinha];
    localStorage.setItem('@caixinha:caixinhas', JSON.stringify(updatedCaixinhas));

    alert(t('alert_success'));
    navigate('/');
  }

  return (
    <Container>
        <Header>
            <h1>{t('new_box_title')}</h1>
            <p>{t('new_box_subtitle')}</p>
        </Header>
        <Form onSubmit={handleCreateCaixinha} lang={language}>
            <Input 
                label={t('box_name_label')}
                placeholder={t('box_name_placeholder')}
                value={nome}
                onChange={e => setNome(e.target.value)}
            />
            
            <label style={{ fontSize: '14px', color: '#A9A9B2', marginBottom: '-16px' }}>{t('description_label')}</label>
            <textarea
                rows={4}
                placeholder={t('description_placeholder')}
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
            />

            <FormRow>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 14, color: '#A9A9B2' }}>{t('closing_date_label')}</label>
                <DatePicker
                  selected={isoToLocalMiddayDate(dataFechamentoIso)}
                  onChange={(date) => setDataFechamentoIso(dateToIso(date))}
                  placeholderText={datepickerDateFormat}
                  dateFormat={datepickerDateFormat}
                  locale={datepickerLocale}
                  showPopperArrow={false}
                  isClearable
                  // força re-render pra aplicar locale/format ao trocar idioma
                  key={language}
                  customInput={<Input />}
                />
              </div>
              <SelectContainer>
                <label>{t('payment_type_label')}</label>
                <select 
                  value={tipoPagamento} 
                  onChange={e => setTipoPagamento(e.target.value)}
                >
                  <option value="Simplificado">{t('simplified')}</option>
                  <option value="Completo">{t('complete')}</option>
                </select>
                <span>{t('payment_type_hint')}</span>
              </SelectContainer>
            </FormRow>
            
            <ButtonsContainer>
              <Button type="button" $variant="secondary" onClick={() => navigate('/')}>{t('cancel')}</Button>
              <Button type="submit">{t('create_box')}</Button>
            </ButtonsContainer>
        </Form>
    </Container>
  );
}
import React, { createContext, useState, useContext, useEffect } from 'react';

// Adicionamos valores padrão aqui para evitar o crash se o Provider faltar
const LanguageContext = createContext({
  language: 'pt-BR',
  setLanguage: () => {},
  t: (key) => key,
  formatDate: (date) => date, // Valor padrão
});

const translations = {
  'pt-BR': {
    // Settings
    settings: 'Configurações',
    settings_subtitle: 'Personalize sua experiência no Caixinha',
    appearance: 'Aparência',
    dark_mode: 'Modo Escuro',
    dark_mode_desc: 'Ative o tema escuro para reduzir o cansaço visual',
    language: 'Idioma',
    select_language: 'Selecionar Idioma',
    portuguese: 'Português (Brasil)',
    english: 'English (US)',
    french: 'Français (France)',
    
    // Sidebar
    my_boxes: 'Minhas Caixinhas',
    new_box: 'Nova Caixinha',
    notifications: 'Notificações',
    reports: 'Relatórios',
    profile: 'Perfil',
    logout: 'Sair',
    collapse: 'Recolher',
    
    // Minhas Caixinhas
    my_boxes_title: 'Minhas Caixinhas',
    my_boxes_subtitle: 'Gerencie suas despesas em grupo de forma simples',
    search_boxes_placeholder: 'Buscar caixinha pelo nome ou descrição...',
    new_box_button: 'Nova Caixinha',

    // Nova Caixinha
    new_box_title: 'Nova Caixinha',
    new_box_subtitle: 'Crie um novo grupo para dividir despesas',
    box_name_label: 'Nome da Caixinha *',
    box_name_placeholder: 'Ex: Viagem para Búzios...',
    description_label: 'Descrição',
    description_placeholder: 'Descrição opcional...',
    closing_date_label: 'Data de Fechamento (Opcional)',
    payment_type_label: 'Tipo de Pagamento',
    simplified: 'Simplificado',
    complete: 'Completo',
    payment_type_hint: 'Otimiza os pagamentos',
    cancel: 'Cancelar',
    create_box: 'Criar Caixinha',
    alert_name_required: 'O nome da caixinha é obrigatório!',
    alert_success: 'Caixinha criada com sucesso!',

    // Notificações
    notifications_title: 'Notificações',
    search_notifications_placeholder: 'Buscar notificação...',
    mark_all_read: 'Marcar todas como lidas',
    clear_all: 'Limpar tudo',
    no_notifications_found: 'Nenhuma notificação encontrada.',
    no_notifications_yet: 'Nenhuma notificação por enquanto.',
    confirm_delete_notification: 'Excluir esta notificação?',
    confirm_clear_all: 'Limpar todas as notificações? Esta ação não pode ser desfeita.',

    // Relatórios
    reports_title: 'Relatórios',
    total_expenses_month: 'Total de Gastos por Mês',
    total_spent: 'Total Gasto (R$)',

    // Perfil
    my_profile: 'Meu Perfil',
    personal_data: 'Dados Pessoais',
    name: 'Nome',
    phone: 'Telefone',
    email: 'Email',
    save_changes: 'Salvar Alterações',
    change_password: 'Alterar Senha',
    current_password: 'Senha Atual',
    new_password: 'Nova Senha',
    confirm_new_password: 'Confirmar Nova Senha',
    delete_account: 'Excluir Conta',
    delete_account_desc: 'Esta ação é permanente e não pode ser desfeita. Todas as suas caixinhas e dados associados serão removidos.',
    delete_account_button: 'Excluir Minha Conta Permanentemente',
    confirm_delete_account: 'TEM CERTEZA? Esta ação é irreversível e excluirá todos os seus dados.',
    alert_saved: 'Dados salvos com sucesso! (Simulado)',
    alert_password_mismatch: 'As novas senhas não coincidem!',
    alert_password_changed: 'Senha alterada com sucesso! (Simulado)',

    // Caixinha Detalhes
    box_not_found: 'Caixinha não encontrada!',
    back_home: 'Voltar para a página inicial',
    add_expense: 'Adicionar Despesa',
    invite_members: 'Convidar Membros',
    no_expenses: 'Nenhuma despesa foi adicionada ainda.',
    add_new_expense_modal: 'Adicionar Nova Despesa',
    edit_expense_modal: 'Editar Despesa',
    description: 'Descrição',
    amount: 'Valor',
    save_expense: 'Salvar Despesa',
    confirm_delete_expense: 'Tem certeza que deseja excluir esta despesa?',
    fill_all_fields: 'Por favor, preencha todos os campos.',

    // Caixinha Card
    members: 'membros',
    active: 'Ativa',
    closed: 'Fechada',
    see_details: 'Ver detalhes',
    
    // Expense List Item
    you_paid: 'Você pagou',
    paid_by: 'Pago por',
  },
  'en-US': {
    // Settings
    settings: 'Settings',
    settings_subtitle: 'Customize your Caixinha experience',
    appearance: 'Appearance',
    dark_mode: 'Dark Mode',
    dark_mode_desc: 'Enable dark mode to reduce eye strain',
    language: 'Language',
    select_language: 'Select Language',
    portuguese: 'Português (Brasil)',
    english: 'English (US)',
    french: 'Français (France)',

    // Sidebar
    my_boxes: 'My Caixinhas',
    new_box: 'New Caixinha',
    notifications: 'Notifications',
    reports: 'Reports',
    profile: 'Profile',
    logout: 'Logout',
    collapse: 'Collapse',

    // Minhas Caixinhas
    my_boxes_title: 'My Caixinhas',
    my_boxes_subtitle: 'Manage your group expenses simply',
    search_boxes_placeholder: 'Search Caixinha by name or description...',
    new_box_button: 'New Caixinha',

    // Nova Caixinha
    new_box_title: 'New Caixinha',
    new_box_subtitle: 'Create a new group to split expenses',
    box_name_label: 'Caixinha Name *',
    box_name_placeholder: 'Ex: Trip to Búzios...',
    description_label: 'Description',
    description_placeholder: 'Optional description...',
    closing_date_label: 'Closing Date (Optional)',
    payment_type_label: 'Payment Type',
    simplified: 'Simplified',
    complete: 'Complete',
    payment_type_hint: 'Optimizes payments',
    cancel: 'Cancel',
    create_box: 'Create Box',
    alert_name_required: 'Box name is required!',
    alert_success: 'Box created successfully!',

    // Notificações
    notifications_title: 'Notifications',
    search_notifications_placeholder: 'Search notification...',
    mark_all_read: 'Mark all as read',
    clear_all: 'Clear all',
    no_notifications_found: 'No notifications found.',
    no_notifications_yet: 'No notifications yet.',
    confirm_delete_notification: 'Delete this notification?',
    confirm_clear_all: 'Clear all notifications? This action cannot be undone.',

    // Relatórios
    reports_title: 'Reports',
    total_expenses_month: 'Total Expenses by Month',
    total_spent: 'Total Spent (R$)',

    // Perfil
    my_profile: 'My Profile',
    personal_data: 'Personal Data',
    name: 'Name',
    phone: 'Phone',
    email: 'Email',
    save_changes: 'Save Changes',
    change_password: 'Change Password',
    current_password: 'Current Password',
    new_password: 'New Password',
    confirm_new_password: 'Confirm New Password',
    delete_account: 'Delete Account',
    delete_account_desc: 'This action is permanent and cannot be undone. All your boxes and associated data will be removed.',
    delete_account_button: 'Delete My Account Permanently',
    confirm_delete_account: 'ARE YOU SURE? This action is irreversible and will delete all your data.',
    alert_saved: 'Data saved successfully! (Simulated)',
    alert_password_mismatch: 'New passwords do not match!',
    alert_password_changed: 'Password changed successfully! (Simulated)',

    // Caixinha Detalhes
    box_not_found: 'Box not found!',
    back_home: 'Back to home page',
    add_expense: 'Add Expense',
    invite_members: 'Invite Members',
    no_expenses: 'No expenses added yet.',
    add_new_expense_modal: 'Add New Expense',
    edit_expense_modal: 'Edit Expense',
    description: 'Description',
    amount: 'Amount',
    save_expense: 'Save Expense',
    confirm_delete_expense: 'Are you sure you want to delete this expense?',
    fill_all_fields: 'Please fill in all fields.',

    // Caixinha Card
    members: 'members',
    active: 'Active',
    closed: 'Closed',
    see_details: 'See details',

    // Expense List Item
    you_paid: 'You paid',
    paid_by: 'Paid by',
  },
  'fr-FR': {
    // Settings
    settings: 'Paramètres',
    settings_subtitle: 'Personnalisez votre expérience Caixinha',
    appearance: 'Apparence',
    dark_mode: 'Mode Sombre',
    dark_mode_desc: 'Activez le mode sombre pour réduire la fatigue visuelle',
    language: 'Langue',
    select_language: 'Choisir la langue',
    portuguese: 'Português (Brasil)',
    english: 'English (US)',
    french: 'Français (France)',

    // Sidebar
    my_boxes: 'Mes Caixinhas',
    new_box: 'Nouvelle Caixinha',
    notifications: 'Notifications',
    reports: 'Rapports',
    profile: 'Profil',
    logout: 'Se déconnecter',
    collapse: 'Réduire',

    // Minhas Caixinhas
    my_boxes_title: 'Mes Caixinhas',
    my_boxes_subtitle: 'Gérez vos dépenses de groupe simplement',
    search_boxes_placeholder: 'Rechercher par nom ou description...',
    new_box_button: 'Nouvelle Caixinha',

    // Nova Caixinha
    new_box_title: 'Nouvelle Caixinha',
    new_box_subtitle: 'Créez un nouveau groupe pour partager les dépenses',
    box_name_label: 'Nom de la Caixinha *',
    box_name_placeholder: 'Ex: Voyage à Paris...',
    description_label: 'Description',
    description_placeholder: 'Description optionnelle...',
    closing_date_label: 'Date de clôture (Optionnel)',
    payment_type_label: 'Type de paiement',
    simplified: 'Simplifié',
    complete: 'Complet',
    payment_type_hint: 'Optimise les paiements',
    cancel: 'Annuler',
    create_box: 'Créer Caixinha',
    alert_name_required: 'Le nom de la caixinha est obligatoire !',
    alert_success: 'Caixinha créée avec succès !',

    // Notificações
    notifications_title: 'Notifications',
    search_notifications_placeholder: 'Rechercher une notification...',
    mark_all_read: 'Tout marquer comme lu',
    clear_all: 'Tout effacer',
    no_notifications_found: 'Aucune notification trouvée.',
    no_notifications_yet: 'Pas de notifications pour le moment.',
    confirm_delete_notification: 'Supprimer cette notification ?',
    confirm_clear_all: 'Effacer toutes les notifications ? Cette action est irréversible.',

    // Relatórios
    reports_title: 'Rapports',
    total_expenses_month: 'Total des dépenses par mois',
    total_spent: 'Total Dépensé (€)',

    // Perfil
    my_profile: 'Mon Profil',
    personal_data: 'Données Personnelles',
    name: 'Nom',
    phone: 'Téléphone',
    email: 'Email',
    save_changes: 'Enregistrer les modifications',
    change_password: 'Changer le mot de passe',
    current_password: 'Mot de passe actuel',
    new_password: 'Nouveau mot de passe',
    confirm_new_password: 'Confirmer le nouveau mot de passe',
    delete_account: 'Supprimer le compte',
    delete_account_desc: 'Cette action est permanente et irréversible. Toutes vos caixinhas et données associées seront supprimées.',
    delete_account_button: 'Supprimer mon compte définitivement',
    confirm_delete_account: 'ÊTES-VOUS SÛR ? Cette action est irréversible et supprimera toutes vos données.',
    alert_saved: 'Données enregistrées avec succès ! (Simulé)',
    alert_password_mismatch: 'Les nouveaux mots de passe ne correspondent pas !',
    alert_password_changed: 'Mot de passe modifié avec succès ! (Simulé)',

    // Caixinha Detalhes
    box_not_found: 'Caixinha non trouvée !',
    back_home: 'Retour à l\'accueil',
    add_expense: 'Ajouter une dépense',
    invite_members: 'Inviter des membres',
    no_expenses: 'Aucune dépense ajoutée pour le moment.',
    add_new_expense_modal: 'Ajouter une nouvelle dépense',
    edit_expense_modal: 'Modifier la dépense',
    description: 'Description',
    amount: 'Montant',
    save_expense: 'Enregistrer la dépense',
    confirm_delete_expense: 'Êtes-vous sûr de vouloir supprimer cette dépense ?',
    fill_all_fields: 'Veuillez remplir tous les champs.',

    // Caixinha Card
    members: 'membres',
    active: 'Active',
    closed: 'Fermée',
    see_details: 'Voir détails',

    // Expense List Item
    you_paid: 'Vous avez payé',
    paid_by: 'Payé par',
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('pt-BR');

  // Atualiza o atributo lang do HTML para ajudar o navegador a formatar inputs nativos
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  // Função para formatar datas de acordo com o idioma selecionado
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
        let dateObj;
        // Se for string YYYY-MM-DD, criamos a data localmente para evitar problemas de fuso horário
        if (typeof dateString === 'string' && dateString.includes('-') && dateString.length === 10) {
            const [y, m, d] = dateString.split('-').map(Number);
            dateObj = new Date(y, m - 1, d);
        } else {
            dateObj = new Date(dateString);
        }
        
        if (isNaN(dateObj.getTime())) return dateString;

        // Usamos opções explícitas para garantir a formatação correta
        return new Intl.DateTimeFormat(language, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(dateObj);
  } catch {
        return dateString;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, formatDate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

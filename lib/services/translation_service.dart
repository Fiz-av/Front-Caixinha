import 'package:flutter/material.dart';

class TranslationService extends ChangeNotifier {
  static final TranslationService _instance = TranslationService._internal();
  factory TranslationService() => _instance;

  TranslationService._internal();

  Locale _locale = const Locale('pt', 'BR');
  Locale get locale => _locale;

  void changeLocale(Locale newLocale) {
    _locale = newLocale;
    notifyListeners(); // Isso força a reconstrução do MaterialApp
  }

  String translate(String key) {
    return _localizedValues[_locale.languageCode]?[key] ?? key;
  }

  static final Map<String, Map<String, String>> _localizedValues = {
    'en': {
      'home': 'Home',
      'settings': 'Settings',
      'language': 'Language',
      'portuguese': 'Português (Brasil)',
      'english': 'English (US)',
      'loans': 'Loans',
      'deposits': 'Deposits',
      'profile': 'Profile',
      'logout': 'Logout',
      'welcome': 'Welcome',
      'balance': 'Balance',
      'new_loan': 'New Loan',
      'my_loans': 'My Loans',
      'pay': 'Pay',
      'extract': 'Extract',
      'admin': 'Admin',
      'users': 'Users',
      'approve_loans': 'Approve Loans',
      'dark_mode': 'Dark Mode',
    },
    'pt': {
      'home': 'Início',
      'settings': 'Configurações',
      'language': 'Idioma',
      'portuguese': 'Português (Brasil)',
      'english': 'English (US)',
      'loans': 'Empréstimos',
      'deposits': 'Depósitos',
      'profile': 'Perfil',
      'logout': 'Sair',
      'welcome': 'Bem-vindo',
      'balance': 'Saldo',
      'new_loan': 'Novo Empréstimo',
      'my_loans': 'Meus Empréstimos',
      'pay': 'Pagar',
      'extract': 'Extrato',
      'admin': 'Admin',
      'users': 'Usuários',
      'approve_loans': 'Aprovar Empréstimos',
      'dark_mode': 'Modo Escuro',
    },
  };
}

// Helper extension for easier usage
extension StringTranslation on String {
  String get tr => TranslationService().translate(this);
}

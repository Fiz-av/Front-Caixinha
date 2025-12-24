import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../services/translation_service.dart';

class SettingsPage extends StatelessWidget {
  const SettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final t = context.watch<TranslationService>();
    
    return Scaffold(
      appBar: AppBar(
        title: Text('settings'.tr),
      ),
      body: ListView(
        children: [
          ListTile(
            leading: const Icon(Icons.language),
            title: Text('language'.tr),
            trailing: DropdownButton<String>(
              value: t.locale.languageCode,
              onChanged: (String? newValue) {
                if (newValue != null) {
                  final locale = newValue == 'pt' 
                      ? const Locale('pt', 'BR') 
                      : const Locale('en', 'US');
                  t.changeLocale(locale);
                }
              },
              items: [
                DropdownMenuItem(
                  value: 'pt',
                  child: Text('portuguese'.tr),
                ),
                DropdownMenuItem(
                  value: 'en',
                  child: Text('english'.tr),
                ),
              ],
            ),
          ),
          // ...existing code...
        ],
      ),
    );
  }
}
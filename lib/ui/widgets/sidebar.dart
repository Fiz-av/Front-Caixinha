import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../services/translation_service.dart';

class Sidebar extends StatelessWidget {
  const Sidebar({super.key});

  @override
  Widget build(BuildContext context) {
    // Watch for changes to rebuild sidebar when language changes
    context.watch<TranslationService>(); 

    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          // ...existing code...
          ListTile(
            leading: const Icon(Icons.home),
            title: Text('home'.tr),
            onTap: () {
              // ...existing code...
            },
          ),
          ListTile(
            leading: const Icon(Icons.monetization_on),
            title: Text('loans'.tr),
            onTap: () {
              // ...existing code...
            },
          ),
          ListTile(
            leading: const Icon(Icons.settings),
            title: Text('settings'.tr),
            onTap: () {
              // ...existing code...
            },
          ),
          // ...existing code...
        ],
      ),
    );
  }
}
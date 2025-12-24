import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../services/translation_service.dart';
import '../widgets/sidebar.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    context.watch<TranslationService>(); // Rebuild on language change

    return Scaffold(
      appBar: AppBar(
        title: Text('home'.tr),
      ),
      drawer: const Sidebar(),
      body: Center(
        child: Column(
          children: [
            Text('welcome'.tr),
          ],
        ),
      ),
    );
  }
}
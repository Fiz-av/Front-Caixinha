import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'services/translation_service.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => TranslationService()),
      ],
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<TranslationService>(
      builder: (context, translation, child) {
        return MaterialApp(
          title: 'Caixinha App',
          debugShowCheckedModeBanner: false,
          locale: translation.locale,
          supportedLocales: const [
            Locale('pt', 'BR'),
            Locale('en', 'US'),
          ],
          home: const HomePage(),
        );
      },
    );
  }
}
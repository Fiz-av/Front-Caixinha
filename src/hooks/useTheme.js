// src/hooks/useTheme.js
import { useState, useEffect } from 'react';

export function useTheme() {
  // Tenta pegar o tema do localStorage, ou usa 'dark' como padrão
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem('theme');
    return savedTheme || 'dark';
  });

  // Efeito para salvar o tema no localStorage toda vez que ele mudar
  useEffect(() => {
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
}
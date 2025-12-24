// src/utils/inputValidation.js
// Helpers simples para reduzir risco de XSS/abuso via campos de texto.
// Observação: React já escapa texto por padrão. Aqui focamos em:
// - limitar tamanho
// - normalizar espaços
// - remover caracteres de controle

/** Remove caracteres de controle (exceto quebra de linha/tab) */
export function stripControlChars(value) {
  if (value == null) return '';
  // ESLint (no-control-regex) bloqueia ranges de caracteres de controle em regex.
  // Fazemos a filtragem por código numérico para manter o mesmo efeito.
  return Array.from(String(value))
    .filter((ch) => {
      const code = ch.charCodeAt(0);
      // Mantém TAB (9), LF (10) e CR (13). Remove demais controles + DEL (127).
      if (code === 9 || code === 10 || code === 13) return true;
      if (code < 32) return false;
      if (code === 127) return false;
      return true;
    })
    .join('');
}

/** Normaliza espaços: remove espaços duplicados e trim */
export function normalizeSpaces(value) {
  return stripControlChars(value).replace(/\s+/g, ' ').trim();
}

/** Aplica limite de tamanho (hard cap) */
export function enforceMaxLen(value, maxLen) {
  const v = stripControlChars(value);
  if (!maxLen || maxLen <= 0) return v;
  return v.length > maxLen ? v.slice(0, maxLen) : v;
}

/** Normalização padrão para campos "texto puro" */
export function sanitizePlainText(value, { maxLen, normalize = true } = {}) {
  const limited = enforceMaxLen(value, maxLen);
  return normalize ? normalizeSpaces(limited) : stripControlChars(limited);
}

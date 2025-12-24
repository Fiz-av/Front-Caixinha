# Security notes (Caixinha)

Este projeto é uma SPA em React. Os riscos mais prováveis no front-end são XSS, abuso de dados no cliente e supply-chain.

Este documento consolida as decisões e recomendações de segurança para que o time consiga:

- entender o que é risco real (vs. mitos)
- escolher um backend com clareza
- preparar o projeto para um teste estilo CTF (Capture The Flag)

## Ameaças mais prováveis

- **XSS (Cross‑Site Scripting)**: execução de JS malicioso no browser.
- **Armazenamento inseguro no cliente**: dados/tokens em `localStorage` ficam expostos se houver XSS.
- **Clickjacking**: app carregado em iframe para enganar usuário.
- **Supply-chain**: dependências npm maliciosas ou vulneráveis.

## O que um input de texto consegue (e não consegue) fazer

- Um usuário malicioso **não consegue “virar root”** ou executar comandos no seu Linux só por digitar algo num campo de texto do React.
- O risco real é no **navegador**:
  - XSS pode roubar dados que estejam acessíveis ao JavaScript (ex.: `localStorage`), manipular a UI, fazer requisições em nome do usuário.

Em React, renderizar texto como `{texto}` é **seguro por padrão** (o React escapa HTML). O risco cresce quando:

- usamos `dangerouslySetInnerHTML`
- renderizamos HTML/markdown sem sanitização
- colocamos texto do usuário em `href`, `src`, `style` sem validação

## Regras do projeto

- **Texto de usuário é sempre “texto puro”**
  - Renderize sempre por JSX: `{"texto"}`.
  - **Proibido**: `dangerouslySetInnerHTML` (a menos que haja sanitização forte e exceção documentada).

- **Validação e limites**
  - Campos de texto devem ter limite de tamanho.
  - Remover caracteres de controle e normalizar entradas conforme necessário.

- **Não guardar segredos no cliente**
  - Sem tokens/sessão em `localStorage` em produção.
  - Preferir cookies `HttpOnly` + `Secure` + `SameSite` (dependente do backend).

## Domínio, subdomínio, CORS e cookies (explicação simples)

Quando houver backend, geralmente teremos duas partes:

- **Front-end (SPA)**: onde o usuário acessa a interface
- **API (backend)**: endpoints para dados/autenticação

Exemplos comuns:

- Opção A (**mais simples**): mesmo domínio
  - `https://caixinha.com` (SPA)
  - `https://caixinha.com/api/...` (API)
  - Vantagens: evita dor de cabeça com CORS e cookies.

- Opção B: subdomínios separados
  - `https://app.caixinha.com` (SPA)
  - `https://api.caixinha.com` (API)
  - Vantagens: separação e deploy independente
  - Atenção: exige configurar **CORS** e **cookies** corretamente.

**CORS** define “de quais origens” o navegador permite chamar a API. No CTF, CORS frouxo costuma virar porta para abuso.

Se o backend usar cookies (recomendado), também devemos configurar `SameSite` e, possivelmente, proteção **CSRF**.

## Login via Google (fluxo recomendado e seguro)

Objetivo: o Google diz *“quem é o usuário”* (identidade), e o **backend** decide *“o que ele pode fazer”*.

### Regra de ouro

> **Nunca confie no front para validar login.** O front só recebe um token; quem valida é o servidor.

### Fluxo sugerido

1) Front faz o login com Google e obtém um **ID Token** (OIDC)
2) Front envia esse `id_token` para o backend (`POST /auth/google`)
3) Backend valida:
   - assinatura do token (chave pública do Google)
   - `aud` (seu Google Client ID)
   - `iss` (issuer esperado)
   - `exp` (não expirado)
4) Backend cria/atualiza o usuário no banco
5) Backend cria **sessão do seu app** e devolve um cookie:
   - `HttpOnly` (JS não lê)
   - `Secure` (apenas HTTPS)
   - `SameSite` (reduz CSRF)

### Por que cookie HttpOnly é melhor que localStorage

- Se um dia existir XSS, o atacante consegue ler `localStorage`, mas **não consegue ler** cookies `HttpOnly`.
- Isso não impede que ele faça ações se o XSS rodar na mesma origem, mas reduz muito roubo de token e persistência.

## Autorização e IDOR (o alvo #1 em CTF web)

Mesmo com login perfeito, um time bom costuma quebrar por **IDOR/BOLA**:

- usuário A acessa/edita dados do usuário B mudando um `id` na URL ou no payload.

### Regra de ouro

> Toda operação que lê/altera dados deve checar **no backend**: “o usuário autenticado pode acessar este recurso?”

Padrões úteis:

- toda entidade tem um `ownerId`
- toda query/alteração faz filtro por `ownerId = userId`
- se existir “grupo”, checar membership do usuário no grupo

Isso vale independentemente de stack.

## Headers recomendados (produção)

Hoje adicionamos uma CSP básica via `<meta>` para reduzir impacto de XSS no ambiente atual.
No backend (quando existir), preferir enviar via **response headers**:

- `Content-Security-Policy` (sem `unsafe-inline` se possível)
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: no-referrer` (ou `strict-origin-when-cross-origin`)
- `Permissions-Policy` (reduzir APIs)
- `Strict-Transport-Security` (HSTS)
- `X-Frame-Options: DENY` (ou `frame-ancestors 'none'` via CSP)

## Proteções recomendadas no backend (agnóstico)

Mesmo sem escolher stack, dá para planejar o essencial:

- **Validação server-side** (schema) em **todas** as entradas (body/query/params)
- **Rate limiting** (principalmente auth e endpoints “caros”)
- **Logs** com correlação de request (request-id), sem vazar secrets
- **CORS restrito** (nada de `*` com credenciais)
- **CSRF** (se usar cookies + requests mutáveis)
- **Upload / arquivos**: validar tipo/tamanho, armazenar fora do webroot
- **Segredos**: nunca no repo; usar env/secret manager
- **Headers**: CSP, HSTS, nosniff, referrer-policy, permissions-policy

## Roadmap sugerido até o CTF

1) Definir arquitetura de domínio:
  - preferir mesma origem (`/api`) no começo, para reduzir complexidade
2) Implementar auth Google + sessão HttpOnly
3) Implementar autorização por recurso (anti-IDOR) desde o primeiro endpoint
4) Adicionar rate limit e logs
5) Ajustar CSP/headers via backend
6) Automatizar checks:
  - `npm audit` e update de deps
  - lint/build
  - testes de API (incluindo casos de autorização negada)

## Checklist para o CTF (antes de entregar)

### Front-end
- [ ] Buscar por `dangerouslySetInnerHTML` e justificar qualquer ocorrência
- [ ] Validar URLs (bloquear `javascript:`) antes de usar em `href/src`
- [ ] Confirmar CSP em produção (idealmente via header)
- [ ] Rodar `npm audit` e corrigir vulnerabilidades
- [ ] Rodar lint/build e revisar console errors

### Backend (independente de stack)
- [ ] Validação server-side (schema) em **todas** as entradas
- [ ] Auth + autorização (RBAC/ABAC) por endpoint
- [ ] Rate limiting e proteção de brute force
- [ ] Logs auditáveis + correlação de request
- [ ] CORS restrito e CSRF (se usar cookies)
- [ ] Secrets via env/secret manager, nunca no repo
- [ ] Proteções contra SSRF/IDOR/SQLi conforme stack

## Sobre roles (admin/user) e como decidir depois

Você não precisa decidir agora. O importante é o código já nascer com:

- *autenticação* (quem é)
- *autorização* (o que pode)

Mesmo sem roles, você já pode ter autorização por propriedade/relacionamento (ex.: owner/membro).

## Relato responsável

Se o time encontrar vulnerabilidades, registrar:
- Passos para reproduzir
- Impacto
- Evidência mínima (sem dados sensíveis)
- Sugestão de correção

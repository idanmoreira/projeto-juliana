# AGENT.md

## Visão Geral
- **Nome:** Juliana Manduca Astro project  
- **Repositório:** https://github.com/idanmoreira/projeto-juliana  
- **Descrição:** Site pessoal de Juliana Manduca construído com, React e Supabase.

## Setup
1. `git clone https://github.com/idanmoreira/projeto-juliana.git`  
2. `cd projeto-juliana`  
3. `cp .env.example .env`  
4. Preencha em `.env`:  
   - `VITE_SUPABASE_URL`  
   - `VITE_SUPABASE_ANON_KEY`  
5. `npm install`

## Comandos de Desenvolvimento
- `npm run dev`

## Build
- `npm run build`

## Testes & Qualidade
- `npm run lint`  
- `npm run typecheck`  
- `npm test` (se houver testes configurados)  

## Convenções & Ferramentas
- **Indentação:** 2 espaços  
- **Formatação:** Prettier on save, linha ≤ 100 cols  
- **Lint:** ESLint configurado em `eslint.config.js`  
- **TypeScript:** `strict: true` em `tsconfig.json`  
- **Commits:** Conventional Commits  
- **RLS Supabase:** obrigatório para operações em dados de usuário  
- **CI/CD:** GitHub Actions faz lint, typecheck, testes e build antes do merge; deploy automático no Vercel/Netlify

## Project-Specific Rules & Best Practices
1. **Atomic, Incremental Changes**  
   - Cada commit faz uma única mudança clara.  
   - Descreva o “porquê” no commit.  
2. **Pre-Analysis Before Patches**  
   - Verifique dependências antes de editar.  
   - Confirme que não quebra nada — rode build e testes.  
3. **Type Safety & Error Handling**  
   - Modo estrito no TS.  
   - Centralize erros de API com `useApiErrorHandler`.  
   - Novo fluxo → crie/update testes.  
4. **Security & Data Access**  
   - RLS Supabase em todas queries de usuário.  
   - Proteja rotas privadas com guards.  
   - Rode `npm audit` e corrija vulnerabilidades críticas.  
5. **CI/CD**  
   - PR só mergeia se passar lint, typecheck, testes e build.  
   - Deploy automático pós-CI.  
6. **Testing & Coverage**  
   - Use Jest + React Testing Library; flows críticos → Cypress/Playwright.  
   - Cobertura não pode cair.  
7. **Docs & Changelog**  
   - Atualize `README.md` e `CHANGELOG.md` (Keep a Changelog).  
   - Se novo padrão/ferramenta, docs em `/docs/knowledge-base/`.

## Coding Style Preferences
- **Indentação:** 2 espaços  
- **Naming:**  
  - Componentes: PascalCase  
  - Funções/vars: camelCase  
  - Hooks: prefixo `use`  
  - Constantes: UPPER_SNAKE_CASE  
- **Estrutura de Pastas:** (Atomic Design)  
src/
├── components/
│ ├── atoms/
│ ├── molecules/
│ ├── organisms/
│ └── templates/
├── hooks/
├── pages/
├── services/
├── utils/
└── styles/
- **TS Typing:**  
- Sempre anote tipos de retorno.  
- Evite `any` (use `// TODO:` se necessário).  
- **ESLint & Prettier:**  
- Extende `eslint:recommended`, `plugin:react/recommended`, `plugin:@typescript-eslint/recommended`, `prettier`.  
- Strings em single quotes, semânticos de ponto-e-vírgula.

## External Documentation & Style Guides
- TypeScript Handbook: https://www.typescriptlang.org/docs/  
- React Query: https://tanstack.com/query/latest  
- Supabase RLS: https://supabase.com/docs/guides/auth#row-level-security  
- Atomic Design: https://atomicdesign.bradfrost.com/  
- Keep a Changelog: https://keepachangelog.com/en/1.0.0/  
- Prettier Config: https://prettier.io/docs/en/configuration.html  
- ESLint Rules: https://eslint.org/docs/rules/  
- WAI-ARIA Practices: https://www.w3.org/TR/wai-aria-practices/  

## PR Checklist
- [ ] Lint passou  
- [ ] Typecheck passou  
- [ ] Todos os testes passam  
- [ ] Build bem-sucedido  
- [ ] README/CHANGELOG atualizados  
- [ ] Commit atomic e com descrição do “porquê”

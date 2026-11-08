# Bíblia Quest — conexão inicial com Supabase

Projeto Next.js com cadastro, login por e-mail/senha, recuperação de senha e dashboard que lê o perfil em `public.profiles`.

## Credenciais
O arquivo `.env.local` já foi preparado com a Project URL e a Publishable Key fornecidas pelo proprietário do projeto. A chave publicável é própria para frontend. Nenhuma Secret Key/service_role deve ser adicionada aqui.

Se a URL estiver diferente da exibida em Supabase > Project Settings > API, corrija `NEXT_PUBLIC_SUPABASE_URL` em `.env.local`.

## Executar
Requer Node.js 20.9 ou superior.

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

Para validar uma versão de produção:

```bash
npm run build
```

## Supabase
1. O schema inicial já foi executado pelo usuário.
2. Em Authentication > URL Configuration, configure Site URL e Redirect URLs para o domínio local `http://localhost:3000/**` e, após publicar, o domínio HTTPS real.
3. Em Authentication > Providers > Email, confirme que Email está habilitado. Se a confirmação de e-mail estiver ligada, o usuário precisa confirmar a mensagem antes de entrar.
4. O trigger `bq_on_auth_user_created` deve criar o perfil em `public.profiles` após o signup.
5. O dashboard lê `full_name`, `plan` e `xp` com RLS. O cliente não atualiza plano ou XP.

## Segurança e limitações
- A Publishable Key é exposta no navegador por definição e depende das políticas RLS.
- Não coloque `sb_secret_` nem `service_role` em variáveis `NEXT_PUBLIC_*` ou no frontend.
- Este é o primeiro corte funcional de autenticação. Ainda não inclui middleware SSR para proteção avançada de rotas, fluxo completo de redefinição de senha, gravação de XP via função segura, conteúdo de jornadas, integração Asaas, painel administrativo ou deploy público.
- Não há confirmação de conexão em produção até executar e testar com as credenciais do projeto.

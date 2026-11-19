# Ligar o login do Materiais Usadosbr

Arquitetura: **GitHub Pages = tela** (sem vídeos dentro) · **Apps Script = cofre** (login Google + lista de quem pode ver o quê) · **Planilha = cadastro** (vídeos e e-mails autorizados).

Quem entra:
- Contas **@usadosbr.com**: entram sempre e veem tudo, inclusive os vídeos marcados como internos.
- Outras contas: só se o e-mail estiver na aba **Autorizados**. Nunca recebem vídeos internos.

---

## Etapa 1: Planilha e Apps Script (5 min)

1. No Google Drive, crie uma planilha chamada **Materiais Usadosbr - Cadastro**.
2. Menu **Extensões → Apps Script**.
3. Apague o conteúdo do `Código.gs` e cole o conteúdo de `apps_script/Codigo.gs`.
4. Clique em **+ → Script**, dê o nome `Dados_iniciais` e cole o conteúdo de `apps_script/Dados_iniciais.gs`.
   (Esse arquivo só existe no seu computador, porque tem os links do Drive. Ele não vai para o GitHub.)
5. **Configurações do projeto** (engrenagem) → **Propriedades do script** → adicione:
   - `CLIENT_ID` = `247320070903-o9no17j5afatdd7rcr535es2543kfe0s.apps.googleusercontent.com`
6. Volte ao editor, escolha a função **configurar** e clique em **Executar**. Autorize quando o Google pedir.
   A planilha ganha as abas **Videos** (com os 4 vídeos) e **Autorizados** (vazia).

## Etapa 2: Publicar o cofre

1. **Implantar → Nova implantação** → engrenagem ao lado de "Selecionar tipo" → **App da Web**.
2. Descrição: `v1` · **Executar como: Eu** · **Quem pode acessar: Qualquer pessoa**.
3. **Implantar** → copie a **URL do app da web** (termina em `/exec`) e mande para o Claude.

## Etapa 3: Liberar o site no login do Google (Google Cloud)

O botão "Entrar com Google" usa o mesmo Client ID do CRM Credicarro.

1. Abra console.cloud.google.com → projeto do CRM → **APIs e serviços → Credenciais**.
2. Abra o **ID do cliente OAuth** do CRM.
3. Em **Origens JavaScript autorizadas**, adicione `https://danielsilva-bit.github.io` e salve.
4. Em **Tela de consentimento OAuth** (ou "Público-alvo"), confira o **Tipo de usuário**:
   - **Externo** e **Em produção**: qualquer conta Google consegue fazer login (o cofre decide quem vê).
   - **Interno**: só contas @usadosbr.com conseguem fazer login. Pessoas de fora vão ser barradas pelo Google.

## Etapa 4: Proteger o vídeo interno no Drive

No Drive, no arquivo **egv-auto-service-cadastrando-corretoras.mp4** → Compartilhar → Acesso geral:
troque **"Qualquer pessoa com o link"** por **"Usadosbr"** (só a organização).
Assim, mesmo que alguém consiga o link, só contas @usadosbr.com assistem.

## Etapa 5: Claude liga o site

Com a URL `/exec` em mãos, o Claude coloca no `config.js` e publica.

---

## No dia a dia

- **Novo vídeo:** nova linha na aba **Videos**. `passos` = um passo por linha dentro da célula (Ctrl+Enter quebra a linha).
  `interno` = `SIM` para vídeos só da Usadosbr. Não precisa publicar nada: vale no próximo login.
- **Liberar uma pessoa de fora:** e-mail na aba **Autorizados**.
- **Tirar o acesso:** apague a linha. A pessoa perde o acesso na próxima vez que abrir ou recarregar a página.
- **Mudou o código do Apps Script?** Implantar → **Gerenciar implantações** → lápis → Versão: **Nova versão** → Implantar.

## Limites

- Os vídeos não internos continuam como "Qualquer pessoa com o link" no Drive. O login esconde a lista e os links,
  mas quem já tiver o link de um vídeo consegue assistir direto no Drive.
- Os links dos 4 vídeos atuais aparecem no histórico do repositório público (versão de antes do login).
  Por isso a Etapa 4 é importante para o vídeo interno.

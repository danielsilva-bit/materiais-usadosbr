# Materiais Usadosbr

Canal de vídeos tutoriais da Usadosbr, no estilo YouTube. Publicado no GitHub Pages; depois também no Netlify, ligado ao mesmo repositório.
Dono: Daniel (Usadosbr). Textos da página em português do Brasil.

## Como trabalhar
- Faça só o que o Daniel pedir. Ao terminar, resuma o que mudou, faça commit com mensagem clara e push na main.
- Antes de apagar arquivos ou mudar a estrutura, confirme com ele.
- Nunca coloque na página dados pessoais reais, senhas, tokens ou links privados.

## Tecnologia
- HTML, CSS e JavaScript puros, sem build e sem dependências. A página tem que abrir direto no GitHub Pages.
- Arquivos: index.html (página), config.js (URL do cofre e Client ID do Google), assets/ (logo-usadosbr.png e icone-u.png),
  apps_script/Codigo.gs (cofre), PUBLICAR_LOGIN.md (passo a passo de publicação).
- apps_script/Dados_iniciais.gs tem os links do Drive e fica fora do git (.gitignore). Nunca commitar links do Drive.
- No dia a dia, vídeos e e-mails autorizados são editados na planilha "Materiais Usadosbr - Cadastro", não no código.

## Login (Google)
- A página não tem vídeos dentro. Depois do "Entrar com Google", ela manda o token ao Apps Script (cofre),
  que confere o e-mail e devolve só a lista que a pessoa pode ver. Mesmo modelo do CRM Credicarro.
- Contas @usadosbr.com entram sempre e veem tudo. Outras contas só entram se estiverem na aba Autorizados
  e nunca recebem vídeos internos.
- Apps Script implantado como "Executar como: Eu" e "Qualquer pessoa". Propriedade do script: CLIENT_ID.

## Visual
- Cores: azul-marinho #0B2D4E, verde #19C267, lima #A9E34B.
- Fontes: Poppins (títulos) e Nunito Sans (texto), do Google Fonts.
- O logo tem texto branco: usar só sobre fundo escuro.
- Responsivo (celular primeiro), com modo escuro e foco visível no teclado.

## Layout
- Barra do topo azul-marinho com o logo e a busca.
- Filtros: Todos, EGV, Lojas.
- Grade de miniaturas 16:9, com a duração no canto, o título e o canal "Usadosbr".
- Ao clicar: tela de assistir com o player grande, título, descrição, "Neste vídeo" (passos numerados), botão "Copiar link do vídeo" e a coluna "Mais vídeos".
- Cada vídeo tem link próprio por hash (ex.: #relatorio-pre-aprovados).

## Vídeos (Google Drive)
- Cada vídeo fica no Drive com compartilhamento "Qualquer pessoa com o link" (Leitor).
- Na planilha o Daniel cola o link inteiro; a página extrai o ID.
- Vídeos internos ficam no Drive compartilhados só com a organização Usadosbr.
- Player: https://drive.google.com/file/d/ID/preview
- Miniatura: https://drive.google.com/thumbnail?id=ID&sz=w640. Se falhar, usar uma capa azul-marinho com o título.
- Sem link cadastrado: mostrar o aviso "Link do Drive ainda não cadastrado".

## Colunas da aba Videos
id, titulo, descricao, categoria (egv, lojas ou "egv, lojas"), duracao, drive, passos (um por linha na célula), interno (SIM ou vazio)

## Vídeos atuais
1. Como subir a base de clientes no CRM | egv | 1:37
2. Como subir a base no Simulador de pré-aprovação | lojas | 1:37
3. Como extrair o relatório de pré-aprovados | egv e lojas | 1:10
4. EGV Auto Service: cadastrando corretoras | egv | 2:28 | interno

## Atenção
- O vídeo 4 é de uso interno: só contas @usadosbr.com recebem. Mostrar a etiqueta "Uso interno" e o alerta "Não envie às corretoras".
- O repositório é público (GitHub Pages grátis). Nada de links do Drive, e-mails de autorizados ou dados da planilha no git.

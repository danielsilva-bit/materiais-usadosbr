# Materiais Usadosbr

Canal de vídeos tutoriais da Usadosbr, no estilo YouTube. Publicado no GitHub Pages; depois também no Netlify, ligado ao mesmo repositório.
Dono: Daniel (Usadosbr). Textos da página em português do Brasil.

## Como trabalhar
- Faça só o que o Daniel pedir. Ao terminar, resuma o que mudou, faça commit com mensagem clara e push na main.
- Antes de apagar arquivos ou mudar a estrutura, confirme com ele.
- Nunca coloque na página dados pessoais reais, senhas, tokens ou links privados.

## Tecnologia
- HTML, CSS e JavaScript puros, sem build e sem dependências. A página tem que abrir direto no GitHub Pages.
- Arquivos: index.html (página), materiais.js (lista de vídeos), assets/ (logo-usadosbr.png e icone-u.png).
- No dia a dia, a única coisa editada para incluir vídeos é o materiais.js.

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
- No materiais.js o Daniel cola o link inteiro; a página extrai o ID.
- Player: https://drive.google.com/file/d/ID/preview
- Miniatura: https://drive.google.com/thumbnail?id=ID&sz=w640. Se falhar, usar uma capa azul-marinho com o título.
- Sem link cadastrado: mostrar o aviso "Link do Drive ainda não cadastrado".

## Campos de cada vídeo no materiais.js
id, titulo, descricao, categoria (["egv"], ["lojas"] ou os dois), duracao, drive, passos, interno (opcional)

## Vídeos atuais
1. Como subir a base de clientes no CRM | egv | 1:37
2. Como subir a base no Simulador de pré-aprovação | lojas | 1:37
3. Como extrair o relatório de pré-aprovados | egv e lojas | 1:10
4. EGV Auto Service: cadastrando corretoras | egv | 2:28 | interno

## Atenção
- O vídeo 4 é de uso interno do GP, GN e Corban do C6 Bank. Mostrar a etiqueta "Uso interno" e o alerta "Não envie às corretoras".
- A página é pública para quem tiver o link. Se o Daniel for compartilhar com corretoras, lembrar dele que o vídeo 4 deve sair da lista ou ir para uma página separada.

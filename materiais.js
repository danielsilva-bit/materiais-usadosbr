/*
  Lista de vídeos do canal Materiais Usadosbr.
  Para incluir um vídeo, copie um bloco { ... } e preencha os campos.

  id         -> link próprio do vídeo (ex.: #relatorio-pre-aprovados). Só letras minúsculas, números e hífen.
  titulo     -> título que aparece na miniatura e na tela de assistir.
  descricao  -> um ou dois parágrafos curtos.
  categoria  -> ["egv"], ["lojas"] ou ["egv", "lojas"].
  duracao    -> ex.: "1:37".
  drive      -> cole o link inteiro do Google Drive (compartilhado como "Qualquer pessoa com o link", Leitor).
                Deixe "" enquanto o vídeo não estiver no Drive.
  passos     -> lista de passos numerados que aparece em "Neste vídeo".
  interno    -> true só para vídeos de uso interno (mostra a etiqueta e o alerta). Opcional.
*/
window.MATERIAIS = [
  {
    id: "subir-base-crm",
    titulo: "Como subir a base de clientes no CRM",
    descricao: "Passo a passo para importar a sua base de clientes no CRM e deixá-la pronta para o trabalho de pré-aprovação.",
    categoria: ["egv"],
    duracao: "1:37",
    drive: "https://drive.google.com/file/d/1tBLMAz52yoF5esRTunydTgIZw7wKpqo_/view",
    passos: [
      "Acesse o CRM com o seu usuário.",
      "Abra a área de importação de base.",
      "Selecione o arquivo da base de clientes.",
      "Confira as colunas e confirme a importação."
    ]
  },
  {
    id: "subir-base-simulador",
    titulo: "Como subir a base no Simulador de pré-aprovação",
    descricao: "Veja como enviar a base de clientes da loja para o Simulador de pré-aprovação.",
    categoria: ["lojas"],
    duracao: "1:37",
    drive: "https://drive.google.com/file/d/1CJbPGfnRh_ewXL2UQew31iCADrBvWFgI/view",
    passos: [
      "Acesse o Simulador de pré-aprovação.",
      "Abra a opção de envio de base.",
      "Selecione o arquivo e envie.",
      "Acompanhe o processamento até o fim."
    ]
  },
  {
    id: "relatorio-pre-aprovados",
    titulo: "Como extrair o relatório de pré-aprovados",
    descricao: "Aprenda a gerar e baixar o relatório com os clientes pré-aprovados.",
    categoria: ["egv", "lojas"],
    duracao: "1:10",
    drive: "https://drive.google.com/file/d/1j5dnPqcWUvvihRZ7wNHA20yBKs2J4gbH/view",
    passos: [
      "Acesse a área de relatórios.",
      "Escolha o relatório de pré-aprovados.",
      "Defina os filtros desejados.",
      "Baixe o arquivo gerado."
    ]
  },
  {
    id: "egv-auto-service-corretoras",
    titulo: "EGV Auto Service: cadastrando corretoras",
    descricao: "Como cadastrar corretoras no EGV Auto Service. Material de uso interno do GP, GN e Corban do C6 Bank.",
    categoria: ["egv"],
    duracao: "2:28",
    drive: "https://drive.google.com/file/d/1Gf76VJDfq9MJq7zVDPWpwqYYDrQJzA2c/view",
    interno: true,
    passos: [
      "Acesse o EGV Auto Service.",
      "Abra o cadastro de corretoras.",
      "Preencha os dados da corretora.",
      "Salve e confira o cadastro."
    ]
  }
];

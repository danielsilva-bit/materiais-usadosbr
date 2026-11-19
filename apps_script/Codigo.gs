/**
 * Materiais Usadosbr — "cofre" (Apps Script vinculado à planilha "Materiais Usadosbr - Cadastro").
 *
 * A página (GitHub Pages / Netlify) não tem nenhum vídeo dentro. Depois do login com Google,
 * ela pede a lista para este script, que confere o e-mail e devolve só o que a pessoa pode ver:
 *   - Contas @usadosbr.com: entram sempre e veem tudo, inclusive os vídeos internos.
 *   - Outras contas: só entram se estiverem na aba "Autorizados", e nunca recebem vídeos internos.
 *
 * Planilha:
 *   Aba "Videos":      id | titulo | descricao | categoria | duracao | drive | passos | interno
 *                      categoria: egv, lojas ou "egv, lojas"   passos: um por linha na célula
 *                      interno: SIM para vídeos só da Usadosbr
 *   Aba "Autorizados": email | nome | observacao
 *
 * Propriedades do script (Configurações do projeto → Propriedades do script):
 *   CLIENT_ID   Client ID OAuth (Google Cloud) usado no botão "Entrar com Google"
 *
 * Implantação: Implantar → Nova implantação → App da Web
 *   Executar como: Eu   |   Quem pode acessar: Qualquer pessoa
 *   (quem vê o quê é decidido aqui dentro, pelo login Google + aba Autorizados)
 */

const DOMINIO_INTERNO = 'usadosbr.com';
const ABA = { VIDEOS: 'Videos', AUTORIZADOS: 'Autorizados' };
const COLS_VIDEOS = ['id', 'titulo', 'descricao', 'categoria', 'duracao', 'drive', 'passos', 'interno'];
const COLS_AUTORIZADOS = ['email', 'nome', 'observacao'];

// ---------- Entrada HTTP ----------

function doGet() {
  return _json({ ok: true, servico: 'Materiais Usadosbr', hora: new Date().toISOString() });
}

function doPost(e) {
  try {
    const corpo = JSON.parse(e.postData.contents);
    if (corpo.acao === 'videos') return _json(_videos(corpo.token));
    return _json({ ok: false, erro: 'acao_invalida' });
  } catch (err) {
    console.error(err);
    return _json({ ok: false, erro: 'erro_interno' });
  }
}

// ---------- Regras de acesso ----------

function _videos(token) {
  const login = _verificarToken(token);
  if (!login.ok) return login;

  const acesso = _acesso(login.email, login.hd);
  if (!acesso) {
    _registrar(login.email, 'negado');
    return { ok: false, erro: 'sem_acesso', email: login.email };
  }

  const videos = _lerVideos().filter(v => acesso.interno || !v.interno);
  return {
    ok: true,
    usuario: { email: login.email, nome: login.nome, interno: acesso.interno },
    videos: videos
  };
}

/**
 * Devolve {interno: bool} se o e-mail pode entrar, ou null se não pode.
 * Interno = e-mail @usadosbr.com E conta da organização Usadosbr no Google (campo hd do token).
 * Conta de fora nunca vira interna, nem se estiver na aba Autorizados.
 */
function _acesso(email, hd) {
  email = String(email || '').trim().toLowerCase();
  if (!email) return null;
  if (email.split('@')[1] === DOMINIO_INTERNO) {
    return String(hd || '').toLowerCase() === DOMINIO_INTERNO ? { interno: true } : null;
  }
  const autorizados = _linhas(ABA.AUTORIZADOS).map(l => String(l.email || '').trim().toLowerCase());
  return autorizados.indexOf(email) >= 0 ? { interno: false } : null;
}

function _verificarToken(token) {
  if (!token) return { ok: false, erro: 'sem_login' };
  const r = UrlFetchApp.fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(token),
                              { muteHttpExceptions: true });
  if (r.getResponseCode() !== 200) return { ok: false, erro: 'login_expirado' };
  const info = JSON.parse(r.getContentText());
  if (info.aud !== _prop('CLIENT_ID')) return { ok: false, erro: 'login_de_outro_app' };
  if (String(info.email_verified) !== 'true') return { ok: false, erro: 'email_nao_verificado' };
  if (Number(info.exp) * 1000 < Date.now()) return { ok: false, erro: 'login_expirado' };
  return { ok: true, email: String(info.email).toLowerCase(), nome: info.name || '', hd: info.hd || '' };
}

// ---------- Planilha ----------

function _lerVideos() {
  return _linhas(ABA.VIDEOS)
    .filter(l => String(l.id || '').trim() && String(l.titulo || '').trim())
    .map(l => ({
      id: String(l.id).trim(),
      titulo: String(l.titulo).trim(),
      descricao: String(l.descricao || '').trim(),
      categoria: String(l.categoria || '').toLowerCase().split(/[,;\s]+/).filter(Boolean),
      duracao: _duracao(l.duracao),
      drive: String(l.drive || '').trim(),
      passos: String(l.passos || '').split(/\r?\n/).map(s => s.trim()).filter(Boolean),
      interno: /^(sim|s|x|true|1)$/i.test(String(l.interno || '').trim())
    }));
}

/**
 * Se a célula não estiver como texto, o Sheets lê "1:37" como 1h37min.
 * Aqui volta a ser texto: "1:37:00" vira "1:37" (minutos:segundos).
 */
function _duracao(v) {
  if (v instanceof Date) {
    const fuso = SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone();
    const [h, m, s] = Utilities.formatDate(v, fuso, 'H:mm:ss').split(':');
    return s === '00' ? h + ':' + m : h + ':' + m + ':' + s;
  }
  return String(v || '').trim();
}

/** Lê uma aba como lista de objetos, usando a primeira linha como cabeçalho. */
function _linhas(nomeAba) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(nomeAba);
  if (!sh) return [];
  const dados = sh.getDataRange().getValues();
  if (dados.length < 2) return [];
  const cab = dados[0].map(c => String(c).trim().toLowerCase());
  return dados.slice(1).map(l => {
    const o = {};
    cab.forEach((c, i) => { if (c) o[c] = l[i]; });
    return o;
  });
}

function _registrar(email, resultado) {
  console.log('acesso ' + resultado + ': ' + email);
}

// ---------- Utilidades ----------

function _prop(nome) {
  return PropertiesService.getScriptProperties().getProperty(nome);
}

function _json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// ---------- Configuração (rodar uma vez pelo editor) ----------

/**
 * Cria as abas "Videos" e "Autorizados" com os cabeçalhos e os vídeos atuais.
 * Não apaga nada: se a aba já existir, ela é mantida como está.
 */
function configurar() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  if (!ss.getSheetByName(ABA.VIDEOS)) {
    const sh = ss.insertSheet(ABA.VIDEOS);
    const linhas = [COLS_VIDEOS].concat((typeof VIDEOS_INICIAIS === 'undefined' ? [] : VIDEOS_INICIAIS).map(v => COLS_VIDEOS.map(c => v[c] || '')));
    sh.getRange(1, 1, linhas.length, COLS_VIDEOS.length).setNumberFormat('@').setValues(linhas);
    _formatarCabecalho(sh, COLS_VIDEOS.length);
    sh.getRange('E:E').setNumberFormat('@'); // duração sempre como texto (1:37)
    sh.getRange(2, 7, Math.max(linhas.length - 1, 1), 1).setWrap(true);
    sh.setColumnWidths(1, COLS_VIDEOS.length, 180);
    sh.setColumnWidth(3, 320); sh.setColumnWidth(6, 320); sh.setColumnWidth(7, 320);
  }

  if (!ss.getSheetByName(ABA.AUTORIZADOS)) {
    const sh = ss.insertSheet(ABA.AUTORIZADOS);
    sh.getRange(1, 1, 1, COLS_AUTORIZADOS.length).setValues([COLS_AUTORIZADOS]);
    _formatarCabecalho(sh, COLS_AUTORIZADOS.length);
    sh.setColumnWidth(1, 280); sh.setColumnWidth(2, 200); sh.setColumnWidth(3, 320);
    sh.getRange(2, 1).setNote('Um e-mail por linha. Contas @' + DOMINIO_INTERNO + ' não precisam estar aqui.');
  }

  // Força a autorização do acesso externo (tokeninfo) já nesta execução.
  UrlFetchApp.fetch('https://oauth2.googleapis.com/tokeninfo?id_token=teste', { muteHttpExceptions: true });

  const falta = _prop('CLIENT_ID') ? '' : ' Falta a propriedade CLIENT_ID.';
  console.log('Planilha pronta.' + falta);
}

function _formatarCabecalho(sh, n) {
  sh.getRange(1, 1, 1, n).setFontWeight('bold').setBackground('#0B2D4E').setFontColor('#FFFFFF');
  sh.setFrozenRows(1);
}

// VIDEOS_INICIAIS fica em Dados_iniciais.gs (fora do git, porque tem os links do Drive).

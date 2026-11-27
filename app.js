/* MeuMimo Pet — marcações do meu pet. 100% no navegador (localStorage), sem servidor. */
(function () {
  'use strict';
  const KEY = 'meupet_v1';
  const TYPES = [['Banho', 'drop', 'c1'], ['Tosa', 'cut', 'c2'], ['Banho e tosa', 'spark', 'c3'], ['Veterinário', 'steth', 'c4'], ['Vacina', 'syr', 'c5'], ['Vermífugo / antipulgas', 'pill', 'c6'], ['Outro', 'paw', 'c7']];
  const SPECIES = ['Cachorro', 'Gato', 'Coelho', 'Hamster', 'Porquinho-da-índia', 'Chinchila', 'Furão', 'Rato (twister)', 'Gerbil', 'Ouriço-pigmeu', 'Calopsita', 'Periquito', 'Agapornis', 'Papagaio', 'Cacatua', 'Canário', 'Pombo', 'Galinha', 'Pato', 'Peixe', 'Peixe beta', 'Kinguio', 'Tartaruga', 'Jabuti', 'Cágado', 'Iguana', 'Lagarto', 'Gecko', 'Cobra', 'Axolote', 'Aranha', 'Cavalo', 'Pônei', 'Porco', 'Cabra', 'Ovelha'];
  const nz = t => String(t || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const tinfo = t => TYPES.find(x => x[0] === t) || TYPES[6];
  const icoOf = t => I[tinfo(t)[1]];
  const tile = (t, big) => `<span class="tile ${tinfo(t)[2]} ${big ? 'big' : ''}">${icoOf(t)}</span>`;
  const I = {
    plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>', dots: '<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>',
    paw: '<svg viewBox="0 0 24 24"><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="4" cy="8" r="2"/><circle cx="8" cy="4" r="0"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/></svg>',
    cal: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>', clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    pin: '<svg viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>', check: '<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>',
    edit: '<svg viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>', trash: '<svg viewBox="0 0 24 24"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>',
    down: '<svg viewBox="0 0 24 24"><path d="M12 3v12m0 0-4-4m4 4 4-4M4 21h16"/></svg>', up: '<svg viewBox="0 0 24 24"><path d="M12 15V3m0 0L8 7m4-4 4 4M4 21h16"/></svg>', gear: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></svg>',
    drop: '<svg viewBox="0 0 24 24"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>',
    cut: '<svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/></svg>',
    spark: '<svg viewBox="0 0 24 24"><path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0L14.06 8.5a2 2 0 0 0 1.44 1.44l6.14 1.58a.5.5 0 0 1 0 .96l-6.14 1.58a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z"/></svg>',
    steth: '<svg viewBox="0 0 24 24"><path d="M11 2v2M5 2v2M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/></svg>',
    syr: '<svg viewBox="0 0 24 24"><path d="m18 2 4 4M17 7l3-3M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5M9 11l4 4M5 19l-3 3M14 4l6 6"/></svg>',
    pill: '<svg viewBox="0 0 24 24"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>',
    crown: '<svg viewBox="0 0 24 24"><path d="M11.56 3.27a.5.5 0 0 1 .88 0l2.95 5.6a1 1 0 0 0 1.52.3l4.28-3.67a.5.5 0 0 1 .8.52l-2.83 10.24a1 1 0 0 1-.96.73H5.81a1 1 0 0 1-.96-.73L2.02 6.02a.5.5 0 0 1 .8-.52l4.27 3.66a1 1 0 0 0 1.52-.29z"/><path d="M5 21h14"/></svg>',
    truck: '<svg viewBox="0 0 24 24"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2M15 18H9M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>',
    userplus: '<svg viewBox="0 0 24 24"><circle cx="4" cy="10" r="1.8"/><circle cx="7.6" cy="5" r="1.8"/><circle cx="12.4" cy="5" r="1.8"/><circle cx="16" cy="10" r="1.8"/><path d="M10 11.2c-3 0-5.4 2.6-5.4 5 0 1.8 1.3 2.5 2.7 2.5 1.1 0 1.6-.6 2.7-.6s1.6.6 2.7.6c1.4 0 2.7-.7 2.7-2.5 0-2.4-2.4-5-5.4-5z"/><path d="M20 15v6M17 18h6"/></svg>',
    chev: '<svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>', home: '<svg viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5V21H3z"/></svg>',
    sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>', moon: '<svg viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>', auto: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
    clip: '<svg viewBox="0 0 24 24"><path d="m21 11-8.9 8.9a5.5 5.5 0 0 1-7.8-7.8l9.2-9.2a3.7 3.7 0 0 1 5.2 5.2L9.5 17.3a1.8 1.8 0 0 1-2.6-2.6L15.4 6.2"/></svg>',
    repeat: '<svg viewBox="0 0 24 24"><path d="m17 2 4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/></svg>'
  };
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = n => String(n).padStart(2, '0');
  const iso = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const today = () => iso(new Date());
  const parse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const addDays = (s, n) => { const d = parse(s); d.setDate(d.getDate() + n); return iso(d); };
  const diff = (a, b) => Math.round((parse(a) - parse(b)) / 864e5);
  const WD = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'], MO = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  const fdate = s => { const d = parse(s); return `${WD[d.getDay()]}, ${d.getDate()} ${MO[d.getMonth()]}`; };
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

  const key = a => a.date + ' ' + (a.time || '99:99');
  const CLUB0 = () => ({ active: false, plan: 'Clubinho', price: '', limit: 4, since: '', paid: {} });
  const PET0 = () => ({ id: uid(), name: '', species: 'Cachorro', breed: '', age: '', sex: '', size: '', weight: '', color: '', neutered: false, notes: '', photo: '', club: CLUB0(), vaccines: [] });
  function migrate(d) {
    d = d || {}; d.items = d.items || [];
    if (!d.pets) { const p = Object.assign(PET0(), d.pet || { name: 'Meu pet' }); p.club = Object.assign(CLUB0(), d.club || {}); d.pets = [p]; delete d.pet; delete d.club; }
    d.pets.forEach(p => { if (p.species === 'Outro') p.species = p.speciesOther || ''; delete p.speciesOther; p.club = Object.assign(CLUB0(), p.club || {}); p.club.paid = p.club.paid || {}; p.vaccines = p.vaccines || []; });
    d.items.forEach(a => { if (!a.petId) a.petId = d.pets[0].id; });
    if (!d.active || (d.active !== 'all' && !d.pets.find(p => p.id === d.active)) || (d.active === 'all' && d.pets.length < 2)) d.active = d.pets[0].id;
    return d;
  }
  let db = (() => { try { const d = JSON.parse(localStorage.getItem(KEY)); if (d && d.items) return migrate(d); } catch (e) { } return migrate({ pet: { name: 'Meu pet' } }); })();
  const cur = () => db.pets.find(p => p.id === db.active) || db.pets[0];
  const petById = id => db.pets.find(p => p.id === id) || db.pets[0];
  const allView = () => db.active === 'all' && db.pets.length > 1;
  const inView = () => allView() ? db.items : db.items.filter(a => a.petId === cur().id);
  const MOF = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const ym = s => s.slice(0, 7), mlabel = m => MOF[Number(m.slice(5)) - 1] + ' de ' + m.slice(0, 4), fshort = s => s.slice(8) + '/' + s.slice(5, 7) + '/' + s.slice(0, 4);
  const money = v => 'R$ ' + String(v).replace('.', ',');
  const clubUse = (m, p = cur()) => db.items.filter(a => a.petId === p.id && a.club && ym(a.date) === m).sort((a, b) => key(a).localeCompare(key(b)));
  const dueOf = (m, p = cur()) => { const dd = p.club.since ? Number(p.club.since.slice(8)) : 1, last = new Date(Number(m.slice(0, 4)), Number(m.slice(5)), 0).getDate(); return m + '-' + pad(Math.min(dd, last)); };
  function payState(m, p = cur()) {
    const c = p.club;
    if (c.paid[m]) return ['ok', 'Pago em ' + fshort(c.paid[m]).slice(0, 5)];
    const due = dueOf(m, p), n = diff(due, today());
    if (n < 0) return ['late', 'Em atraso desde ' + fshort(due).slice(0, 5)];
    return ['pend', n === 0 ? 'Vence hoje' : 'Pendente · vence ' + fshort(due).slice(0, 5)];
  }
  const clubMonths = (p = cur()) => { const c = p.club, out = []; let [y, m] = today().slice(0, 7).split('-').map(Number); const from = c.since ? ym(c.since) : ym(today()); for (let i = 0; i < 12; i++) { const k = y + '-' + pad(m); if (k < from) break; out.push(k); m--; if (m < 1) { m = 12; y--; } } return out; };
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) { toast('Sem espaço para salvar. Exporte um backup.'); } };
  /* ---------- Tema: claro / escuro (preto) / automático ---------- */
  const getTheme = () => { try { return localStorage.getItem('meupet_theme') || 'auto'; } catch (e) { return 'auto'; } };
  const mq = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : null;
  function applyTheme() {
    const t = getTheme(), dark = t === 'dark' || (t === 'auto' && mq && mq.matches);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    const m = document.querySelector('meta[name=theme-color]'); if (m) m.content = dark ? '#000000' : '#4F8A68';
  }
  function setTheme(t) { try { localStorage.setItem('meupet_theme', t); } catch (e) { } applyTheme(); }
  if (mq) (mq.addEventListener ? mq.addEventListener('change', applyTheme) : mq.addListener(applyTheme));
  let tab = 'prox';
  // Reserva: evita quebrar o app se o cache ainda não tiver o anexos.js.
  const none = () => Promise.reject(new Error('anexos indisponíveis'));
  const AX = window.MMAnexos || { init: () => Promise.resolve(), ofPet: () => [], ofItem: () => [], show: () => toast('Feche e abra o app para usar os anexos.'), movePet: none, unlink: none, removePet: none, exportFiles: none, importFiles: none };
  const axCount = n => n ? ` (${n})` : '';
  const upcoming = () => inView().filter(a => !a.done).sort((a, b) => key(a).localeCompare(key(b)));
  const history = () => inView().filter(a => a.done).sort((a, b) => key(b).localeCompare(key(a)));

  function when(a) {
    const n = diff(a.date, today());
    if (a.done) return null;
    if (n < 0) return ['late', `Atrasada há ${-n} dia${n === -1 ? '' : 's'}`];
    if (n === 0) return ['hoje', 'Hoje' + (a.time ? ' às ' + a.time : '')];
    if (n === 1) return ['amanha', 'Amanhã'];
    return ['', `Em ${n} dias`];
  }
  function toast(t, undo) {
    const el = $('#toast'); el.textContent = t; el.classList.toggle('act', !!undo);
    const hide = () => el.classList.remove('in', 'act');
    if (undo) { const b = document.createElement('button'); b.type = 'button'; b.textContent = 'Desfazer'; b.onclick = () => { clearTimeout(toast.t); hide(); undo(); }; el.appendChild(b); }
    el.classList.add('in'); clearTimeout(toast.t); toast.t = setTimeout(hide, undo ? 7000 : 2600);
  }

  /* ---------- Lembrete de backup ---------- */
  const store = { get: k => { try { return localStorage.getItem(k) || ''; } catch (e) { return ''; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { } } };
  function backupNote() {
    const hasData = db.items.length || db.pets.some(p => p.vaccines.length) || db.pets.some(p => AX.ofPet(p.id).length);
    const last = store.get('meupet_backup');
    if (!hasData || store.get('meupet_snooze') > today() || (last && diff(today(), last) < 30)) return '';
    return `<div class="install bk">${I.up}<span>${last ? `Último backup há ${diff(today(), last)} dias` : 'Você ainda não fez backup'}</span><button data-act="export">Fazer</button><button class="later" data-act="snooze">Depois</button></div>`;
  }

  /* ---------- Tela principal ---------- */
  let deferred = null;
  function render() {
    const up = upcoming(), next = up.find(a => diff(a.date, today()) >= 0) || up[0], list = tab === 'prox' ? up : history();
    const p = cur(), all = allView();
    const pa = q => q.photo ? `<img src="${q.photo}" alt="">` : I.paw;
    $('#app').innerHTML = `
      ${db.pets.length > 1 ? '' : ''}<nav class="pets-bar" aria-label="Meus pets" ${db.pets.length > 1 ? '' : 'hidden'}>${db.pets.map(q => `<button class="pp ${!all && db.active === q.id ? 'on' : ''}" data-act="pick" data-id="${q.id}"><span class="pa">${pa(q)}</span>${esc(q.name || 'Pet')}</button>`).join('')}${db.pets.length > 1 ? `<button class="pp ${all ? 'on' : ''}" data-act="pick" data-id="all"><span class="pa">${I.cal}</span>Todos</button>` : ''}</nav>
      <header class="top">
        ${all ? `<div class="avatar stack">${I.paw}</div>` : `<button class="avatar" data-act="pet" aria-label="Editar perfil de ${esc(p.name)}">${pa(p)}</button>`}
        <div class="grow"><h1>${all ? 'Todos' : esc(p.name || 'Pet')}</h1><p>${all ? db.pets.length + ' pets · ' + up.length + ' marcações' : esc([p.breed, p.age].filter(Boolean).join(' · ')) || 'Toque na foto para personalizar'}</p></div>
        <button class="icon-btn" data-act="addpet" aria-label="Adicionar pet" title="Adicionar pet">${I.userplus}</button>
        <button class="icon-btn" data-act="theme" aria-label="Alternar tema claro ou escuro">${document.documentElement.dataset.theme === 'dark' ? I.sun : I.moon}</button>
        <button class="icon-btn" data-act="settings" aria-label="Configurações">${I.gear}</button>
      </header>
      ${all ? '' : petChips(p)}
      ${deferred ? `<div class="install">${I.down}<span>Instale o app na tela inicial</span><button data-act="install">Instalar</button></div>` : ''}
      ${backupNote()}
      ${hero(next)}
      ${all ? '' : clubCard()}
      ${all ? '' : vacCard()}
      <div class="tabs" role="tablist"><button role="tab" class="${tab === 'prox' ? 'on' : ''}" data-tab="prox" aria-selected="${tab === 'prox'}">Próximas (${up.length})</button><button role="tab" class="${tab === 'hist' ? 'on' : ''}" data-tab="hist" aria-selected="${tab === 'hist'}">Histórico (${history().length})</button></div>
      <div class="list">${list.length ? grouped(list) : `<div class="empty-s">${I.cal}<p>${tab === 'prox' ? 'Nenhuma marcação ainda.<br>Toque em <b>+</b> para começar.' : 'O histórico aparece aqui quando você concluir marcações.'}</p></div>`}</div>
      <button class="fab" data-act="new" aria-label="Nova marcação" title="Nova marcação">${I.plus}</button>`;
  }
  function clubCard() {
    const c = cur().club;
    if (!c.active) return `<button class="club off" data-act="club"><span class="cr">${I.crown}</span><span class="grow"><b>Clubinho</b><small>Seu pet é assinante? Toque para configurar.</small></span>${I.plus}</button>`;
    const m = ym(today()), use = clubUse(m), lim = Number(c.limit) || 0, st = payState(m), pct = lim ? Math.min(100, use.length / lim * 100) : 0;
    return `<button class="club" data-act="club"><div class="club-top"><span class="cr">${I.crown}</span><span class="grow"><b>${esc(c.plan || 'Clubinho')}</b><small>${c.since ? 'Assinante desde ' + fshort(c.since) + ' · vence dia ' + c.since.slice(8) : 'Defina a data da assinatura'}</small></span><span class="pay ${st[0]}">${st[0] === 'ok' ? I.check.replace('<svg', '<svg style="width:14px;height:14px"') : ''}${st[0] === 'ok' ? 'Pago' : st[0] === 'late' ? 'Atrasado' : 'Pendente'}</span></div>
      <div class="club-mid"><span>${mlabel(m)}</span><b>${use.length}${lim ? ' de ' + lim : ''} ${use.length === 1 ? 'uso' : 'usos'}</b></div>${lim && lim <= 12 ? `<div class="dots" aria-hidden="true">${Array.from({ length: Math.max(lim, use.length) }, (_, k) => `<i class="${k < use.length ? 'on' : ''} ${k >= lim ? 'over' : ''}"></i>`).join('')}</div>` : lim ? `<div class="bar"><i style="width:${pct}%"></i></div>` : ''}${lim ? `<small class="rest">${use.length >= lim ? (use.length > lim ? `${use.length - lim} acima do plano` : 'Plano do mês completo') : `Restam ${lim - use.length} no mês`}</small>` : ''}
      <small class="rest">${st[1]}${c.price ? ' · mensalidade ' + money(c.price) : ''}</small></button>`;
  }
  /* ---------- Carteirinha de vacinação ---------- */
  const VACS = { Cachorro: ['V8', 'V10', 'Antirrábica', 'Gripe canina', 'Giárdia', 'Leishmaniose'], Gato: ['V3', 'V4', 'V5', 'Antirrábica', 'FeLV'] };
  const vacSort = p => p.vaccines.slice().sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
  // Só a aplicação mais recente de cada vacina define o status; as anteriores são histórico.
  const vacLatest = p => { const seen = new Set(); return vacSort(p).filter(v => { const k = nz(v.name).trim(); if (seen.has(k)) return false; seen.add(k); return true; }); };
  function vacState(v) {
    if (!v.next) return ['', 'Sem reforço informado'];
    const n = diff(v.next, today());
    if (n < 0) return ['late', 'Reforço atrasado desde ' + fshort(v.next)];
    if (n <= 30) return ['hoje', n === 0 ? 'Reforço é hoje' : `Reforço em ${n} dia${n === 1 ? '' : 's'}`];
    return ['ok', 'Próximo reforço ' + fshort(v.next)];
  }
  function vacCard() {
    const p = cur(), last = vacLatest(p), st = last.map(vacState);
    const late = st.filter(s => s[0] === 'late').length, soon = st.filter(s => s[0] === 'hoje').length;
    const nx = last.filter(v => v.next && v.next >= today()).sort((a, b) => a.next.localeCompare(b.next))[0];
    const txt = !last.length ? 'Registre as vacinas aplicadas' : late ? `${late} reforço${late > 1 ? 's' : ''} atrasado${late > 1 ? 's' : ''}` : soon ? `${soon} reforço${soon > 1 ? 's' : ''} nos próximos 30 dias` : nx ? `Próximo: ${esc(nx.name)} em ${fshort(nx.next)}` : p.vaccines.length + (p.vaccines.length > 1 ? ' registros' : ' registro');
    return `<button class="vac-card ${late ? 'late' : soon ? 'hoje' : ''}" data-act="vaccard"><span class="tile c5 big">${I.syr}</span><span class="grow"><b>Carteirinha de vacinação</b><small>${txt}</small></span>${I.chev}</button>`;
  }
  function vacSheet() {
    const p = cur(), latest = new Set(vacLatest(p).map(v => v.id));
    sheet(`<h3>Carteirinha de vacinação</h3><p class="hint">${esc(p.name || 'Pet')}</p>
      <button type="button" class="btn primary block lg" data-act="vacnew">${I.plus} Registrar vacina</button>
      ${p.vaccines.length ? `<div class="olist">${vacSort(p).map(v => { const s = latest.has(v.id) ? vacState(v) : ['', 'Histórico'], n = AX.ofItem(v.id).length; return `<button type="button" class="orow" data-act="vacopen" data-id="${esc(v.id)}"><span class="oi">${I.syr}</span><span class="grow">${esc(v.name)}<small class="ax-sub">Aplicada em ${fshort(v.date)}${v.vet ? ' · ' + esc(v.vet) : ''}${n ? ` · ${n} anexo${n > 1 ? 's' : ''}` : ''}</small><small class="ax-sub v-${s[0]}">${s[1]}</small></span>${I.chev}</button>`; }).join('')}</div>` : '<p class="hint ax-empty">Nenhuma vacina registrada.</p>'}
      <button type="button" class="btn soft block ax-back" data-act="close">Fechar</button>`);
  }
  const getVac = id => cur().vaccines.find(v => v.id === id);
  function vacOptions(id) {
    const v = getVac(id); if (!v) return;
    const row = (act, ic, label, cls = '') => `<button class="orow ${cls}" data-act="${act}" data-id="${esc(v.id)}"><span class="oi">${ic}</span><span class="grow">${label}</span>${I.chev}</button>`;
    const info = [['Aplicada em', fshort(v.date)], ['Próximo reforço', v.next && fshort(v.next)], ['Veterinário / clínica', v.vet], ['Lote', v.lot], ['Observações', v.note]].filter(x => x[1]);
    sheet(`<div class="o-head">${tile('Vacina', 1)}<div><h3>${esc(v.name)}</h3><p>${esc(cur().name || 'Pet')}</p></div></div>
      <dl class="v-info">${info.map(x => `<dt>${x[0]}</dt><dd>${esc(x[1])}</dd>`).join('')}</dl>
      <div class="olist">${row('vacfiles', I.clip, 'Selo e comprovantes' + axCount(AX.ofItem(v.id).length))}${row('vacedit', I.edit, 'Editar')}${v.next && v.next >= today() ? row('vacics', I.cal, 'Reforço no calendário') : ''}${row('vacdel', I.trash, '<span>Excluir</span>', 'danger')}</div>
      <button type="button" class="btn soft block ax-back" data-act="vaccard">Voltar</button>`);
  }
  function vacForm(v, preset) {
    const p = cur(), x = v || Object.assign({ name: '', date: today(), next: '', vet: '', lot: '', note: '' }, preset);
    const s = sheet(`<h3>${v ? 'Editar vacina' : 'Registrar vacina'}</h3><form id="vf" novalidate>
      <label class="field"><span>Vacina</span><input name="name" value="${esc(x.name)}" list="vacList" autocomplete="off" placeholder="Ex.: Antirrábica"></label>
      <datalist id="vacList">${(VACS[p.species] || ['Antirrábica']).map(n => `<option value="${n}"></option>`).join('')}</datalist>
      <div class="row2"><label class="field"><span>Aplicada em</span><input type="date" name="date" value="${esc(x.date)}" max="${today()}"></label><label class="field"><span>Próximo reforço</span><input type="date" name="next" value="${esc(x.next)}"></label></div>
      <p class="hint">Use a data de reforço indicada pelo veterinário.</p>
      <label class="field"><span>Veterinário / clínica (opcional)</span><input name="vet" value="${esc(x.vet)}"></label>
      <label class="field"><span>Lote (opcional)</span><input name="lot" value="${esc(x.lot)}" autocomplete="off"></label>
      <label class="field"><span>Observações</span><textarea name="note" rows="2">${esc(x.note)}</textarea></label>
      <div class="foot"><button type="button" class="btn soft" data-act="vaccard">Cancelar</button><button class="btn primary">${I.check} Salvar</button></div></form>`);
    $('#vf', s).addEventListener('submit', e => {
      e.preventDefault(); const f = e.target.elements;
      const o = { name: f.name.value.trim(), date: f.date.value, next: f.next.value, vet: f.vet.value.trim(), lot: f.lot.value.trim(), note: f.note.value.trim() };
      if (!o.name) { toast('Informe a vacina.'); return; }
      if (!o.date || o.date > today()) { toast('Informe a data em que foi aplicada.'); return; }
      if (o.next && o.next <= o.date) { toast('O reforço deve ser depois da aplicação.'); return; }
      // Altera o próprio array: o rascunho do perfil compartilha a mesma lista.
      if (v) Object.assign(v, o); else p.vaccines.push(Object.assign({ id: uid() }, o));
      save(); render(); vacSheet(); toast('Vacina salva.');
    });
  }
  let vacArm = '';

  /* ---------- Alerta na abertura (uma vez por dia) ---------- */
  function alerts() {
    const out = [], add = (rank, p, ic, title, text, tone) => out.push({ rank, p, ic, title, text, tone });
    db.items.filter(a => !a.done && diff(a.date, today()) <= 1).sort((a, b) => key(a).localeCompare(key(b))).forEach(a => {
      const w = when(a); add(w[0] === 'late' ? 0 : 1, petById(a.petId), icoOf(a.type), a.type, w[1], w[0]);
    });
    db.pets.forEach(p => {
      vacLatest(p).filter(v => v.next && diff(v.next, today()) <= 30).forEach(v => { const st = vacState(v); add(st[0] === 'late' ? 0 : 2, p, I.syr, v.name, st[1], st[0]); });
      const c = p.club; if (!c.active || !c.since) return;
      clubMonths(p).slice(0, 2).forEach(m => {
        const st = payState(m, p), n = diff(dueOf(m, p), today());
        if (st[0] === 'late' || (st[0] === 'pend' && n <= 3)) add(st[0] === 'late' ? 0 : 1, p, I.crown, `${c.plan || 'Clubinho'} · ${mlabel(m)}`, st[1], st[0] === 'late' ? 'late' : 'hoje');
      });
    });
    return out.sort((a, b) => a.rank - b.rank);
  }
  function openAlert() {
    if (document.querySelector('.scrim') || store.get('meupet_alert') === today()) return;
    const l = alerts(); if (!l.length) return;
    store.set('meupet_alert', today());
    sheet(`<h3>Atenção</h3><p class="hint">Atrasados e próximos</p><div class="olist">${l.map(x => `<button type="button" class="orow" data-act="goto" data-id="${x.p.id}"><span class="oi">${x.ic}</span><span class="grow">${esc(x.title)}<small class="ax-sub">${esc(x.p.name || 'Pet')}</small><small class="ax-sub v-${x.tone}">${esc(x.text)}</small></span>${I.chev}</button>`).join('')}</div><button type="button" class="btn primary block ax-back" data-act="close">Entendi</button>`);
  }
  function petChips(p) {
    const sp = p.species;
    const c = [sp && ['sp', sp], p.sex && ['sex', p.sex], p.size && ['size', 'Porte ' + p.size.toLowerCase()], p.weight && ['kg', p.weight.replace('.', ',') + ' kg'], p.color && ['color', p.color], p.neutered && ['ok', p.sex === 'Fêmea' ? 'Castrada' : 'Castrado']].filter(Boolean);
    if (!c.length && !p.notes) return '';
    return `<div class="pchips">${c.map(x => `<span>${esc(x[1])}</span>`).join('')}</div>${p.notes ? `<button class="pnote" data-act="pet">${I.edit}<span>${esc(p.notes)}</span></button>` : ''}`;
  }
  function grouped(list) {
    let last = '', i = 0;
    return list.map(a => { const m = ym(a.date), h = m !== last ? `<div class="mh">${mlabel(m)}</div>` : ''; last = m; return h + card(a, i++); }).join('');
  }
  function hero(a) {
    if (!a) return `<section class="hero empty"><div class="big">${I.paw}</div><h2>Tudo tranquilo</h2><p>Nenhuma marcação para ${allView() ? 'os pets' : 'o ' + esc(cur().name || 'pet')}.<br>Toque em <b>+</b> para criar uma.</p></section>`;
    const n = diff(a.date, today()), d = parse(a.date);
    const cnt = n < 0 ? 'Atrasada' : n === 0 ? 'É hoje!' : n === 1 ? 'Amanhã' : `Em ${n} dias`;
    return `<section class="hero" data-act="open" data-id="${a.id}" role="button" tabindex="0" aria-label="Próxima marcação: ${esc(a.type)}">
      <div class="h-date"><span>${WD[d.getDay()]}</span><b>${d.getDate()}</b><span>${MO[d.getMonth()]}</span></div>
      <div class="h-body"><small>Próxima marcação${allView() ? ' · ' + esc(petById(a.petId).name) : ''}</small><h2>${esc(a.type)}</h2>
        <div class="when">${a.time ? `<span>${I.clock}${a.time}</span>` : ''}${a.place ? `<span>${I.pin}${esc(a.place)}</span>` : ''}${a.taxi ? `<span>${I.truck}Táxi Dog</span>` : ''}${a.club ? `<span>${I.crown}Clubinho</span>` : ''}</div></div>
      <div class="h-ico">${icoOf(a.type)}</div><div class="h-cnt">${cnt}</div></section>`;
  }
  function clubPos(a) { const pp = petById(a.petId), u = clubUse(ym(a.date), pp), i = u.findIndex(x => x.id === a.id), lim = Number(pp.club.limit) || 0; return i < 0 ? '' : ` ${i + 1}${lim ? '/' + lim : ''} do mês`; }
  function card(a, i) {
    const w = when(a), d = parse(a.date), tone = a.done ? 'done' : w ? (w[0] || 'soon') : '';
    const chips = [allView() ? `<span class="chip pet-chip">${I.paw} ${esc(petById(a.petId).name)}</span>` : '', a.taxi ? `<span class="chip taxi-chip">${I.truck} Táxi Dog${a.taxiPrice ? ' · ' + money(a.taxiPrice) : ''}</span>` : '', a.club ? `<span class="chip club-chip">${I.crown} Clubinho${clubPos(a)}</span>` : '', a.repeat ? `<span class="chip">${I.repeat.replace('<svg', '<svg style="width:12px;height:12px"')} ${a.repeat} dias</span>` : '', a.price ? `<span class="chip">${money(a.price)}</span>` : '', AX.ofItem(a.id).length ? `<span class="chip">${I.clip} ${AX.ofItem(a.id).length}</span>` : ''].join('');
    return `<article class="item ${tone}" style="animation-delay:${Math.min(i, 8) * 40}ms">
      <div class="dt" data-act="open" data-id="${a.id}"><small>${WD[d.getDay()]}</small><b>${d.getDate()}</b></div>
      <div class="body" data-act="open" data-id="${a.id}"><b class="ttl">${tile(a.type)}${esc(a.type)}</b>
        <div class="meta">${a.time ? I.clock.replace('<svg', '<svg class="mi"') + a.time : 'Sem horário'}${a.place ? ' · ' + esc(a.place) : ''}</div>
        ${a.note ? `<div class="note">${esc(a.note)}</div>` : ''}
        <div class="chips">${a.done ? `<span class="chip ok">${I.check.replace('<svg', '<svg style="width:12px;height:12px"')} Concluída</span>` : `<span class="chip ${w[0]}">${w[1]}</span>`}${chips}</div></div>
      <button class="menu" data-act="open" data-id="${a.id}" aria-label="Opções">${I.dots}</button></article>`;
  }

  /* ---------- Folhas (sheets) ---------- */
  function sheet(html) { close(); const s = document.createElement('div'); s.className = 'scrim'; s.innerHTML = `<div class="sheet" role="dialog" aria-modal="true">${html}</div>`; s.addEventListener('click', e => { if (e.target === s) close(); }); document.body.appendChild(s); document.body.style.overflow = 'hidden'; const f = $('input,select,button', s); return s; }
  function close() { document.querySelectorAll('.scrim').forEach(n => n.remove()); document.body.style.overflow = ''; }
  const typeButtons = sel => TYPES.map(([t, ic, c]) => `<button type="button" class="tp ${c} ${t === sel ? 'on' : ''}" data-type="${esc(t)}" aria-pressed="${t === sel}"><span>${I[ic]}</span>${esc(t)}</button>`).join('');

  function form(a) {
    let pid = a ? a.petId : (allView() ? db.pets[0].id : cur().id);
    const x = a || { type: 'Banho e tosa', date: today(), time: '10:00', place: '', price: '', note: '', repeat: '', club: petById(pid).club.active };
    const s = sheet(`<h3>${a ? 'Editar marcação' : 'Nova marcação'}</h3>
      <form id="f" novalidate><div class="types" id="types">${typeButtons(x.type)}</div>
      ${db.pets.length > 1 ? `<label class="field"><span>Pet</span><select name="pet">${db.pets.map(q => `<option value="${q.id}" ${q.id === pid ? 'selected' : ''}>${esc(q.name || 'Pet')}</option>`).join('')}</select></label>` : ''}
      <div class="row2"><label class="field"><span>Data</span><input type="date" name="date" value="${x.date}" required></label><label class="field"><span>Hora</span><input type="time" name="time" value="${x.time || ''}"></label></div>
      <label class="field"><span>Local (opcional)</span><input name="place" value="${esc(x.place)}" placeholder="Ex.: MeuMimo Studio" autocomplete="off"></label>
      <div class="row2"><label class="field"><span>Valor R$ (opcional)</span><input name="price" inputmode="decimal" value="${esc(x.price)}" placeholder="80"></label><label class="field"><span>Repetir a cada</span><select name="repeat"><option value="">Não repetir</option>${[[7, '7 dias'], [15, '15 dias'], [30, '30 dias'], [45, '45 dias'], [60, '2 meses'], [90, '3 meses'], [180, '6 meses'], [365, '1 ano']].map(([v, l]) => `<option value="${v}" ${String(x.repeat) === String(v) ? 'selected' : ''}>${l}</option>`).join('')}</select></label></div>
      <label class="swrow" id="clubF" ${petById(pid).club.active ? '' : 'hidden'}><input type="checkbox" name="club" ${x.club ? 'checked' : ''}><span class="sw-t">${I.crown}<em>Marcação do Clubinho</em></span><i class="sw"></i></label>
      <label class="swrow"><input type="checkbox" name="taxi" ${x.taxi ? 'checked' : ''}><span class="sw-t">${I.truck}<em>Pedi Táxi Dog</em></span><i class="sw"></i></label>
      <label class="field" id="taxiF" ${x.taxi ? '' : 'hidden'}><span>Valor do táxi R$ (opcional)</span><input name="taxiPrice" inputmode="decimal" value="${esc(x.taxiPrice || '')}" placeholder="25"></label>
      <label class="field"><span>Observações</span><textarea name="note" rows="2" placeholder="Ex.: levar carteirinha, shampoo hipoalergênico">${esc(x.note)}</textarea></label>
      <div class="foot"><button type="button" class="btn soft" data-act="close">Cancelar</button><button class="btn primary">${I.check} Salvar</button></div></form>`);
    let type = x.type;
    const ps = $('[name=pet]', s); if (ps) ps.addEventListener('change', () => { pid = ps.value; const c = petById(pid).club.active; $('#clubF', s).hidden = !c; $('[name=club]', s).checked = c && !a; });
    $('[name=taxi]', s).addEventListener('change', e => { $('#taxiF', s).hidden = !e.target.checked; });
    $('#types', s).addEventListener('click', e => { const b = e.target.closest('[data-type]'); if (!b) return; type = b.dataset.type; $('#types', s).innerHTML = typeButtons(type); });
    $('#f', s).addEventListener('submit', e => {
      e.preventDefault(); const f = e.target.elements;
      if (!f.date.value) { toast('Escolha a data.'); f.date.focus(); return; }
      const o = { type, date: f.date.value, time: f.time.value, place: f.place.value.trim(), price: f.price.value.trim(), note: f.note.value.trim(), repeat: f.repeat.value ? Number(f.repeat.value) : '', petId: f.pet ? f.pet.value : pid, club: !!(f.club.checked && petById(f.pet ? f.pet.value : pid).club.active), taxi: f.taxi.checked, taxiPrice: f.taxi.checked ? f.taxiPrice.value.trim() : '' };
      if (a) Object.assign(a, o); else db.items.push(Object.assign({ id: uid(), done: false }, o));
      if (a) AX.movePet(a.id, o.petId).then(render).catch(() => { });
      save(); close(); render(); toast(a ? 'Marcação atualizada.' : 'Marcação salva!');
    });
  }
  function options(a) {
    const row = (act, ic, label, cls = '') => `<button class="orow ${cls}" data-act="${act}" data-id="${a.id}"><span class="oi">${ic}</span><span class="grow">${label}</span>${I.chev}</button>`;
    sheet(`<div class="o-head">${tile(a.type, 1)}<div><h3>${esc(a.type)}</h3><p>${fdate(a.date)}${a.time ? ' às ' + a.time : ''}${a.place ? ' · ' + esc(a.place) : ''}</p></div></div>
      ${a.done ? '' : `<button class="btn primary block lg" data-act="done" data-id="${a.id}">${I.check} Marcar como concluída</button>`}
      <div class="olist">${a.done ? row('undo', I.repeat, 'Reabrir marcação') : ''}${row('edit', I.edit, 'Editar')}${row('files', I.clip, 'Receitas e anexos' + axCount(AX.ofItem(a.id).length))}${row('ics', I.cal, 'Adicionar ao calendário')}${row('del', I.trash, 'Excluir', 'danger')}</div>`);
  }
  function clubSheet() {
    const c = cur().club;
    const s = sheet(`<h3>Clubinho</h3><form id="cf"><label class="swrow"><input type="checkbox" name="active" ${c.active ? 'checked' : ''}><span class="sw-t">${I.crown}<em>Meu pet é assinante</em></span><i class="sw"></i></label>
      <label class="field"><span>Nome do plano</span><input name="plan" value="${esc(c.plan)}" placeholder="Ex.: Clubinho Banho"></label>
      <div class="row2"><label class="field"><span>Mensalidade R$</span><input name="price" inputmode="decimal" value="${esc(c.price)}" placeholder="199"></label><label class="field"><span>Usos por mês</span><input name="limit" type="number" min="0" max="31" value="${esc(c.limit)}"></label></div>
      <label class="field"><span>Data da assinatura</span><input type="date" name="since" value="${c.since}"></label>
      <p class="hint">O vencimento é no mesmo dia do mês da assinatura.</p>
      <div class="foot"><button type="button" class="btn soft" data-act="close">Cancelar</button><button class="btn primary">Salvar</button></div></form>
      ${c.active && c.since ? `<div class="sec">Mensalidades</div><div class="pays">${clubMonths().map(m => { const st = payState(m), u = clubUse(m).length; return `<div class="payrow"><div class="grow"><b>${mlabel(m)}</b><small>${u}${c.limit ? ' de ' + c.limit : ''} usos · <span class="t-${st[0]}">${st[1]}</span></small></div><button class="btn ${st[0] === 'ok' ? 'soft' : 'primary'} sm" data-act="pay" data-id="${m}">${st[0] === 'ok' ? 'Desfazer' : 'Marcar pago'}</button></div>`; }).join('')}</div>` : ''}`);
    $('#cf', s).addEventListener('submit', e => {
      e.preventDefault(); const f = e.target.elements;
      if (f.active.checked && !f.since.value) { toast('Informe a data da assinatura.'); f.since.focus(); return; }
      Object.assign(cur().club, { active: f.active.checked, plan: f.plan.value.trim() || 'Clubinho', price: f.price.value.trim(), limit: Number(f.limit.value) || 0, since: f.since.value });
      save(); close(); render(); toast('Clubinho salvo.');
    });
  }
  /* ---------- Perfil do pet (editar / adicionar) ---------- */
  let draft = null, editingId = null, rmArm = false;
  const FIELDS = f => ({ name: f.name.value.trim(), species: f.species.value.trim(), breed: f.breed.value.trim(), age: f.age.value.trim(), sex: f.sex.value, size: f.size.value, weight: f.weight.value.trim(), color: f.color.value.trim(), neutered: f.neutered.checked, notes: f.notes.value.trim() });
  const collect = () => { const f = $('#pf'); if (f && draft) Object.assign(draft, FIELDS(f.elements)); };
  function petSheet(id) {
    if (id !== undefined) { editingId = id; draft = id ? Object.assign({}, petById(id)) : PET0(); rmArm = false; }
    const p = draft, isNew = !editingId;
    const s = sheet(`<h3>${isNew ? 'Novo pet' : 'Perfil do pet'}</h3><form id="pf"><div style="display:flex;gap:14px;align-items:center;margin-bottom:14px"><button type="button" class="avatar" data-act="photo" style="width:80px;height:80px">${p.photo ? `<img src="${p.photo}" alt="">` : I.paw}</button><div class="grow" style="flex:1"><button type="button" class="btn soft" data-act="photo">${p.photo ? 'Trocar foto' : 'Adicionar foto'}</button>${p.photo ? ` <button type="button" class="btn soft" data-act="nophoto">Remover</button>` : ''}</div></div>
      <label class="field"><span>Nome</span><input name="name" value="${esc(p.name)}" required autocomplete="off" placeholder="Ex.: Thor"></label>
      <div class="field combo"><span>Tipo de pet</span><input name="species" id="spIn" value="${esc(p.species || '')}" placeholder="Pesquise: cachorro, gato, coelho…" autocomplete="off" role="combobox" aria-expanded="false" aria-controls="spList"><div class="combo-list" id="spList" role="listbox" hidden></div></div>
      <div class="row2"><label class="field"><span>Raça</span><input name="breed" value="${esc(p.breed)}" placeholder="Ex.: Shih-tzu"></label><label class="field"><span>Idade</span><input name="age" value="${esc(p.age || '')}" placeholder="Ex.: 4 anos"></label></div>
      <div class="row2"><label class="field"><span>Sexo</span><select name="sex"><option value="">—</option>${['Macho', 'Fêmea'].map(v => `<option ${p.sex === v ? 'selected' : ''}>${v}</option>`).join('')}</select></label><label class="field"><span>Porte</span><select name="size"><option value="">—</option>${['Mini', 'Pequeno', 'Médio', 'Grande', 'Gigante'].map(v => `<option ${p.size === v ? 'selected' : ''}>${v}</option>`).join('')}</select></label></div>
      <div class="row2"><label class="field"><span>Peso (kg)</span><input name="weight" inputmode="decimal" value="${esc(p.weight || '')}" placeholder="Ex.: 7,5"></label><label class="field"><span>Cor / pelagem</span><input name="color" value="${esc(p.color || '')}" placeholder="Ex.: Branco e caramelo"></label></div>
      <label class="swrow"><input type="checkbox" name="neutered" ${p.neutered ? 'checked' : ''}><span class="sw-t">${I.check}<em>Castrado(a)</em></span><i class="sw"></i></label>
      <label class="field"><span>Observações</span><textarea name="notes" rows="3" placeholder="Alergias, cuidados, medos, comportamento, veterinário de confiança…">${esc(p.notes || '')}</textarea></label>
      ${isNew ? '' : `<button type="button" class="btn soft block ax-pet" data-act="petfiles">${I.clip} Receitas e documentos${axCount(AX.ofPet(editingId).length)}</button>`}
      <div class="foot"><button type="button" class="btn soft" data-act="close">Cancelar</button><button class="btn primary">${isNew ? 'Adicionar pet' : 'Salvar'}</button></div></form>
      ${!isNew && db.pets.length > 1 ? `<button type="button" class="btn danger block" style="margin-top:14px" data-act="rmpet">${I.trash} ${rmArm ? 'Toque de novo para confirmar' : 'Remover este pet'}</button>${rmArm ? '<p class="hint" style="margin-top:8px">Isso apaga também as marcações, vacinas e anexos dele.</p>' : ''}` : ''}
      <input type="file" id="fphoto" accept="image/*" hidden>`);
    const inp = $('#spIn', s), list = $('#spList', s); let hi = -1;
    const show = () => { const q = nz(inp.value.trim()), all = SPECIES.filter(x => !q || nz(x).includes(q)); const exact = SPECIES.some(x => nz(x) === q);
      const items = all.map(x => `<button type="button" role="option" class="co">${esc(x)}</button>`); if (q && !exact) items.push(`<button type="button" role="option" class="co new" data-v="${esc(inp.value.trim())}">Usar “${esc(inp.value.trim())}”</button>`);
      list.innerHTML = items.join('') || '<div class="co-empty">Nada encontrado</div>'; list.hidden = false; inp.setAttribute('aria-expanded', 'true'); hi = -1; };
    const hide = () => { list.hidden = true; inp.setAttribute('aria-expanded', 'false'); };
    const pickIt = b => { const t = b.textContent; inp.value = b.dataset.v || t; hide(); };
    inp.addEventListener('focus', show); inp.addEventListener('input', show);
    list.addEventListener('mousedown', e => e.preventDefault()); list.addEventListener('click', e => { const b = e.target.closest('.co'); if (b) pickIt(b); });
    inp.addEventListener('blur', () => setTimeout(hide, 120));
    inp.addEventListener('keydown', e => { const bs = [...list.querySelectorAll('.co')]; if (e.key === 'ArrowDown') { e.preventDefault(); if (list.hidden) show(); hi = Math.min(bs.length - 1, hi + 1); } else if (e.key === 'ArrowUp') { e.preventDefault(); hi = Math.max(0, hi - 1); } else if (e.key === 'Enter' && !list.hidden && hi >= 0) { e.preventDefault(); pickIt(bs[hi]); return; } else if (e.key === 'Escape') { hide(); return; } else return; bs.forEach((b, k) => b.classList.toggle('hi', k === hi)); if (bs[hi]) bs[hi].scrollIntoView({ block: 'nearest' }); });
    $('#pf', s).addEventListener('submit', e => {
      e.preventDefault(); collect();
      if (!draft.name) { toast('Dê um nome ao pet.'); $('[name=name]', s).focus(); return; }
      if (isNew) { db.pets.push(draft); db.active = draft.id; tab = 'prox'; } else Object.assign(petById(editingId), draft);
      save(); close(); render(); toast(isNew ? `${draft.name} adicionado!` : 'Perfil salvo.');
    });
    $('#fphoto', s).addEventListener('change', e => { const f = e.target.files[0]; if (f) img(f, 320).then(u => { collect(); draft.photo = u; petSheet(); }); });
  }
  function settingsSheet() {
    const s = sheet(`<h3>Configurações</h3>
      <div class="sec" style="margin-top:0">Meus pets</div><div class="olist">${db.pets.map(q => `<button class="orow" data-act="editpet" data-id="${q.id}"><span class="oi pa2">${q.photo ? `<img src="${q.photo}" alt="">` : I.paw}</span><span class="grow">${esc(q.name || 'Pet')}<small style="display:block;color:var(--muted);font-weight:500">${esc([q.breed, q.age].filter(Boolean).join(' · ')) || 'Sem detalhes'}</small></span>${I.chev}</button>`).join('')}<button class="orow" data-act="addpet"><span class="oi">${I.plus}</span><span class="grow">Adicionar pet</span>${I.chev}</button></div>
      <div class="sec">Aparência</div><div class="seg" role="group" aria-label="Tema">${[['light', 'Claro', I.sun], ['dark', 'Escuro', I.moon], ['auto', 'Automático', I.auto]].map(([v, l, ic]) => `<button type="button" class="${getTheme() === v ? 'on' : ''}" data-act="setTheme" data-id="${v}" aria-pressed="${getTheme() === v}">${ic}${l}</button>`).join('')}</div>
      <div class="sec">Seus dados</div><div class="actions"><button class="btn soft" data-act="export">${I.up} Exportar backup (.json)</button><button class="btn soft" data-act="import">${I.down} Importar backup</button></div>
      <p style="color:var(--muted);font-size:12.5px;margin:12px 2px 0">Os dados ficam só neste aparelho. Faça um backup de vez em quando.</p><input type="file" id="fimp" accept="application/json,.json" hidden>`);
    $('#fimp', s).addEventListener('change', e => { const f = e.target.files[0]; if (!f) return; f.text().then(importBackup).catch(() => toast('Arquivo inválido.')); });
  }
  /* Valida o que vem de fora: parte desses campos entra direto no HTML. Altera d e lança erro se for inválido. */
  function sanitize(d) {
    const must = ok => { if (!ok) throw new Error('backup inválido'); };
    const isId = v => typeof v === 'string' && /^[a-z0-9]+$/i.test(v);
    const isDate = v => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v);
    const date = v => isDate(v) ? v : '';
    const str = v => v == null ? '' : String(v);
    const plain = v => str(v).replace(/[<>"'&]/g, '');
    must(Array.isArray(d.items) && Array.isArray(d.pets) && d.pets.length);
    d.pets.forEach(p => {
      must(p && isId(p.id));
      ['name', 'species', 'breed', 'age', 'sex', 'size', 'weight', 'color', 'notes'].forEach(k => { p[k] = str(p[k]); });
      p.photo = /^data:image\/(jpeg|png|webp|gif);base64,[a-z0-9+/=]+$/i.test(p.photo) ? p.photo : '';
      const c = p.club; c.plan = str(c.plan); c.price = plain(c.price); c.limit = Number(c.limit) || 0; c.since = date(c.since);
      c.paid = Object.fromEntries(Object.entries(c.paid || {}).filter(([m, v]) => /^\d{4}-\d{2}$/.test(m) && isDate(v)));
      must(Array.isArray(p.vaccines));
      p.vaccines.forEach(v => { must(v && isId(v.id) && isDate(v.date)); v.next = date(v.next); ['name', 'vet', 'lot', 'note'].forEach(k => { v[k] = str(v[k]); }); });
    });
    d.items.forEach(x => {
      must(x && isId(x.id) && isId(x.petId) && isDate(x.date));
      x.time = /^\d{2}:\d{2}(:\d{2})?$/.test(x.time) ? x.time : '';
      x.repeat = Number(x.repeat) || '';
      x.type = str(x.type); x.place = str(x.place); x.note = str(x.note); x.price = plain(x.price); x.taxiPrice = plain(x.taxiPrice);
    });
    if (d.active !== 'all' && !isId(d.active)) d.active = d.pets[0].id;
    return d;
  }
  async function importBackup(t) {
    const raw = JSON.parse(t); if (!raw.items || !(raw.pet || raw.pets)) throw 0;
    const files = raw.files; delete raw.files; // anexos vão para o IndexedDB, nunca para o localStorage
    const d = sanitize(migrate(raw));
    const count = x => `${x.pets.length} pet(s), ${x.items.length} marcação(ões), ${x.pets.reduce((n, p) => n + p.vaccines.length, 0)} vacina(s)`;
    const s = sheet(`<h3>Importar backup?</h3>
      <dl class="v-info"><dt>No arquivo</dt><dd>${count(d)}${Array.isArray(files) ? `, ${files.length} anexo(s)` : ''}</dd><dt>No aparelho</dt><dd>${count(db)}</dd></dl>
      <p class="hint">${Array.isArray(files) ? 'Os dados e os anexos deste aparelho serão substituídos.' : 'Os dados deste aparelho serão substituídos. Este backup não tem anexos, então os atuais são mantidos.'}</p>
      <div class="foot"><button type="button" class="btn soft" data-act="close">Cancelar</button><button type="button" class="btn danger" id="impOk">Substituir</button></div>`);
    $('#impOk', s).addEventListener('click', async e => {
      e.target.disabled = true;
      // Backup antigo (sem "files") não mexe nos anexos atuais.
      if (Array.isArray(files)) { try { await AX.importFiles(files); } catch (x) { close(); toast('Falha nos anexos. Nada foi importado.'); return; } }
      db = d; save(); close(); render(); toast('Backup importado.');
    });
  }
  async function exportBackup() {
    let files; try { files = await AX.exportFiles(); } catch (e) { }
    try {
      download(`meupet-backup-${today()}.json`, JSON.stringify(files ? Object.assign({}, db, { files }) : db, null, 1), 'application/json');
      toast(files ? 'Backup exportado.' : 'Backup exportado SEM os anexos.');
      if (files) { store.set('meupet_backup', today()); render(); }
    } catch (e) { toast('Não foi possível gerar o backup.'); }
  }
  const img = (file, max) => new Promise(res => { const r = new FileReader(); r.onload = () => { const im = new Image(); im.onload = () => { const k = Math.min(1, max / Math.max(im.width, im.height)), c = document.createElement('canvas'); c.width = im.width * k; c.height = im.height * k; c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); res(c.toDataURL('image/jpeg', .85)); }; im.src = r.result; }; r.readAsDataURL(file); });
  const download = (name, text, type) => { const u = URL.createObjectURL(new Blob([text], { type })), a = document.createElement('a'); a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 1000); };
  function ics(a) {
    const d = a.date.replace(/-/g, ''), t = (a.time || '09:00').replace(':', '') + '00';
    const end = (() => { const [h, m] = (a.time || '09:00').split(':').map(Number); return pad((h + 1) % 24) + pad(m) + '00'; })();
    const L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//MeuMimo Pet//PT', 'BEGIN:VEVENT', `UID:${a.id}@meupet`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`, `DTSTART:${d}T${t}`, `DTEND:${d}T${end}`, `SUMMARY:${a.type} — ${petById(a.petId).name}`, a.place ? `LOCATION:${a.place}` : '', (a.note || a.taxi) ? `DESCRIPTION:${((a.taxi ? 'Táxi Dog solicitado. ' : '') + (a.note || '')).replace(/\n/g, ' ')}` : '', 'BEGIN:VALARM', 'TRIGGER:-PT2H', 'ACTION:DISPLAY', 'DESCRIPTION:Lembrete', 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR'].filter(Boolean);
    download(`${a.type.replace(/\W+/g, '-')}-${a.date}.ics`, L.join('\r\n'), 'text/calendar');
  }

  /* ---------- Ações ---------- */
  const get = id => db.items.find(x => x.id === id);
  const ACT = {
    theme: () => { setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'); render(); },
    setTheme: v => { setTheme(v); settingsSheet(); render(); },
    settings: settingsSheet, addpet: () => petSheet(null), editpet: id => petSheet(id),
    pick: id => { db.active = id; tab = 'prox'; save(); render(); window.scrollTo({ top: 0 }); },
    rmpet: () => { if (!rmArm) { rmArm = true; collect(); petSheet(); return; } const id = editingId; db.pets = db.pets.filter(q => q.id !== id); db.items = db.items.filter(a => a.petId !== id); db = migrate(db); save(); close(); render(); toast('Pet removido.'); AX.removePet(id).catch(() => { }); },
    new: () => form(), club: clubSheet,
    pay: m => { const pd = cur().club.paid; if (pd[m]) delete pd[m]; else pd[m] = today(); save(); clubSheet(); render(); toast(pd[m] ? 'Mensalidade marcada como paga.' : 'Pagamento desfeito.'); }, close, pet: () => petSheet(cur().id), photo: () => $('#fphoto').click(), nophoto: () => { collect(); draft.photo = ''; petSheet(); }, import: () => $('#fimp').click(),
    export: exportBackup,
    snooze: () => { store.set('meupet_snooze', addDays(today(), 7)); render(); },
    goto: id => { db.active = id; tab = 'prox'; save(); close(); render(); window.scrollTo({ top: 0 }); },
    vaccard: () => { vacArm = ''; vacSheet(); }, vacnew: () => vacForm(), vacopen: id => { vacArm = ''; vacOptions(id); }, vacedit: id => vacForm(getVac(id)),
    vacfiles: id => { const v = getVac(id); AX.show({ petId: cur().id, itemId: id, kind: 'Vacina', title: `${v.name} · ${fshort(v.date)}`, back: () => vacOptions(id) }); },
    vacics: id => { const v = getVac(id); ics({ id: v.id, type: 'Vacina ' + v.name, date: v.next, time: '09:00', petId: cur().id }); toast('Abra o arquivo para salvar no calendário.'); },
    vacdel: id => {
      if (vacArm !== id) { vacArm = id; $('[data-act=vacdel] .grow span').textContent = 'Toque de novo para confirmar'; return; }
      const l = cur().vaccines, i = l.findIndex(v => v.id === id), kept = AX.ofItem(id).length; if (i >= 0) l.splice(i, 1);
      vacArm = ''; save(); render(); vacSheet(); toast(kept ? 'Excluída. Anexos mantidos no perfil do pet.' : 'Vacina excluída.'); if (kept) AX.unlink(id).catch(() => { });
    },
    files: id => { const a = get(id); AX.show({ petId: a.petId, itemId: id, title: `${a.type} · ${fdate(a.date)}`, back: () => options(a) }); },
    petfiles: () => { collect(); AX.show({ petId: editingId, itemId: '', title: petById(editingId).name || 'Pet', back: () => petSheet() }); },
    open: id => { const a = get(id); if (a) options(a); }, edit: id => form(get(id)),
    ics: id => { ics(get(id)); close(); toast('Abra o arquivo para salvar no calendário.'); },
    // Os anexos não são desvinculados: sem a marcação, aparecem no perfil do pet e voltam junto no desfazer.
    del: id => {
      const item = get(id), kept = AX.ofItem(id).length; db.items = db.items.filter(x => x.id !== id); save(); close(); render();
      toast(kept ? 'Excluída. Anexos mantidos no perfil.' : 'Marcação excluída.', () => {
        if (get(id) || !db.pets.some(q => q.id === item.petId)) return;
        db.items.push(item); save(); render(); toast('Marcação restaurada.');
      });
    },
    undo: id => { get(id).done = false; save(); close(); render(); },
    done: id => {
      const a = get(id); a.done = true; a.doneAt = new Date().toISOString(); let msg = 'Concluída! 🎉';
      if (a.repeat) { const nd = addDays(today() > a.date ? today() : a.date, a.repeat); db.items.push({ id: uid(), type: a.type, date: nd, time: a.time, place: a.place, price: a.price, note: a.note, petId: a.petId, repeat: a.repeat, club: a.club, taxi: a.taxi, taxiPrice: a.taxiPrice, done: false }); msg = `Concluída! Próxima marcada para ${fdate(nd)}.`; }
      save(); close(); render(); toast(msg);
      // Vacina concluída: oferece o registro na carteirinha (dá para cancelar).
      if (a.type === 'Vacina') { db.active = a.petId; save(); render(); vacForm(null, { date: a.date < today() ? a.date : today(), vet: a.place }); }
    },
    install: () => { if (deferred) { deferred.prompt(); deferred.userChoice.finally(() => { deferred = null; render(); }); } }
  };
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-tab]'); if (t) { tab = t.dataset.tab; render(); return; }
    const b = e.target.closest('[data-act]'); if (!b) return; e.preventDefault();
    if (b.classList.contains('menu')) e.stopPropagation();
    const fn = ACT[b.dataset.act]; fn && fn(b.dataset.id);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.hero[data-act]')) { e.preventDefault(); ACT.open(e.target.dataset.id); } });
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferred = e; render(); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden && !document.querySelector('.scrim')) { render(); openAlert(); } });
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) navigator.serviceWorker.register('sw.js').catch(() => { });
  applyTheme();
  render();
  AX.init({ sheet, toast, esc, uid, today, fshort, fdate, I, download, onChange: render, itemLabel: id => { const a = get(id); if (a) return `${a.type} · ${fdate(a.date)}`; const v = db.pets.flatMap(p => p.vaccines).find(x => x.id === id); return v ? `Vacina ${v.name} · ${fshort(v.date)}` : ''; } }).then(() => { render(); openAlert(); });
})();

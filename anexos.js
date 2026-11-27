/* MeuMimo Pet — anexos (receitas, exames, comprovantes) em IndexedDB, só no aparelho. */
window.MMAnexos = (function () {
  'use strict';
  const DB = 'meupet_files', ST = 'files', MAX = 10 * 1024 * 1024;
  // Lista fechada de tipos: um HTML/SVG aberto via blob: rodaria no endereço do app.
  const OK = /^(image\/(jpeg|png|webp|gif|heic|heif)|application\/pdf)$/;
  const KINDS = ['Receita', 'Exame', 'Vacina', 'Nota / comprovante', 'Outro'];
  let ctx, idbP = null, index = [];

  const open_ = () => idbP || (idbP = new Promise((res, rej) => {
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(ST, { keyPath: 'id' });
    r.onsuccess = () => res(r.result);
    r.onerror = () => { idbP = null; rej(r.error); };
  }));
  const run = (mode, fn) => open_().then(d => new Promise((res, rej) => {
    const t = d.transaction(ST, mode), out = fn(t.objectStore(ST));
    t.oncomplete = () => res(out && out.result);
    t.onerror = t.onabort = () => rej(t.error);
  }));
  const all = () => run('readonly', s => s.getAll());
  const meta = r => { const m = Object.assign({}, r); delete m.blob; return m; };
  const reload = () => all().then(l => { index = l.map(meta); });

  const init = c => { ctx = c; return reload().catch(() => { }); };
  const ofPet = petId => index.filter(f => f.petId === petId);
  const ofItem = itemId => index.filter(f => f.itemId === itemId);

  async function change(match, edit) {
    const list = (await all()).filter(match);
    if (list.length) await run('readwrite', s => { list.forEach(r => edit(s, r)); });
    await reload();
  }
  const movePet = (itemId, petId) => change(r => r.itemId === itemId && r.petId !== petId, (s, r) => s.put(Object.assign(r, { petId })));
  const unlink = itemId => change(r => r.itemId === itemId, (s, r) => s.put(Object.assign(r, { itemId: '' })));
  const removePet = petId => change(r => r.petId === petId, (s, r) => s.delete(r.id));

  /* Reduz fotos grandes; se falhar ou não compensar, mantém o original. */
  const shrink = file => new Promise(res => {
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return res(file);
    const u = URL.createObjectURL(file), im = new Image();
    const end = b => { URL.revokeObjectURL(u); res(b); };
    im.onload = () => {
      const k = Math.min(1, 2000 / Math.max(im.width, im.height)), c = document.createElement('canvas');
      c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
      const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(im, 0, 0, c.width, c.height);
      c.toBlob(b => end(b && b.size < file.size ? b : file), 'image/jpeg', .85);
    };
    im.onerror = () => end(file);
    im.src = u;
  });

  async function add(file, petId, itemId, kind) {
    const type = file.type || (/\.pdf$/i.test(file.name) ? 'application/pdf' : '');
    if (!OK.test(type)) { ctx.toast('Use foto ou PDF.'); return false; }
    const small = await shrink(file);
    if (small.size > MAX) { ctx.toast('Arquivo acima de 10 MB.'); return false; }
    const outType = small === file ? type : 'image/jpeg';
    const name = small === file ? file.name : file.name.replace(/\.\w+$/, '') + '.jpg';
    const rec = { id: ctx.uid(), petId, itemId: itemId || '', kind, name, type: outType, size: small.size, date: ctx.today(), blob: new Blob([small], { type: outType }) };
    await run('readwrite', s => { s.put(rec); });
    if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => { });
    await reload();
    return true;
  }

  const fsize = n => n < 1048576 ? Math.max(1, Math.round(n / 1024)) + ' KB' : (n / 1048576).toFixed(1).replace('.', ',') + ' MB';

  /* o = { petId, itemId, title, back } */
  function show(o) {
    const { esc, I } = ctx;
    const list = (o.itemId ? ofItem(o.itemId) : ofPet(o.petId)).sort((a, b) => b.id.localeCompare(a.id));
    const s = ctx.sheet(`<h3>Anexos</h3><p class="hint">${esc(o.title)}</p>
      <label class="field"><span>Tipo do documento</span><select id="axKind">${KINDS.map(k => `<option ${k === (o.kind || 'Receita') ? 'selected' : ''}>${k}</option>`).join('')}</select></label>
      <div class="foot ax-add"><button type="button" class="btn soft" id="axCamBtn">Tirar foto</button><button type="button" class="btn primary" id="axFileBtn">${I.plus} Arquivo</button></div>
      <input type="file" id="axCam" accept="image/*" capture="environment" hidden>
      <input type="file" id="axFile" accept="image/*,application/pdf" multiple hidden>
      ${list.length ? `<div class="olist">${list.map(f => `<button type="button" class="orow" data-ax="${esc(f.id)}"><span class="oi">${I.clip}</span><span class="grow">${esc(f.kind)}<small class="ax-sub">${esc(f.name)} · ${ctx.fshort(f.date)} · ${fsize(f.size)}</small>${!o.itemId && f.itemId && ctx.itemLabel(f.itemId) ? `<small class="ax-sub">${esc(ctx.itemLabel(f.itemId))}</small>` : ''}</span>${I.chev}</button>`).join('')}</div>` : '<p class="hint ax-empty">Nenhum anexo ainda.</p>'}
      <button type="button" class="btn soft block ax-back" id="axBack">Voltar</button>`);
    const q = sel => s.querySelector(sel);
    q('#axCamBtn').addEventListener('click', () => q('#axCam').click());
    q('#axFileBtn').addEventListener('click', () => q('#axFile').click());
    q('#axBack').addEventListener('click', o.back);
    s.querySelectorAll('input[type=file]').forEach(inp => inp.addEventListener('change', async () => {
      const kind = q('#axKind').value; let n = 0;
      try { for (const f of Array.from(inp.files)) if (await add(f, o.petId, o.itemId, kind)) n++; }
      catch (e) { ctx.toast('Não foi possível salvar o anexo.'); }
      ctx.onChange();
      if (s.isConnected) show(Object.assign({}, o, { kind }));
      if (n) ctx.toast(n === 1 ? 'Anexo salvo.' : n + ' anexos salvos.');
    }));
    s.querySelectorAll('[data-ax]').forEach(b => b.addEventListener('click', () => detail(b.dataset.ax, o)));
  }

  async function detail(id, o) {
    let r; try { r = await run('readonly', s => s.get(id)); } catch (e) { }
    if (!r) { ctx.toast('Anexo não encontrado.'); return; }
    const { esc, I } = ctx, url = URL.createObjectURL(r.blob);
    // O arquivo já está carregado para o compartilhar responder direto ao toque.
    const file = new File([r.blob], r.name, { type: r.type });
    const canShare = !!(navigator.canShare && navigator.canShare({ files: [file] }));
    const s = ctx.sheet(`<h3>${esc(r.kind)}</h3><p class="hint">${esc(r.name)} · ${fsize(r.size)}</p>
      ${/^image\/(jpeg|png|webp|gif)$/.test(r.type) ? `<img class="ax-img" src="${url}" alt="${esc(r.kind)}">` : ''}
      <div class="actions">${canShare ? `<button type="button" class="btn primary" id="axShare">${I.up} Compartilhar</button>` : ''}
      <button type="button" class="btn soft" id="axDown">${I.down} Baixar</button>
      <button type="button" class="btn danger" id="axDel">${I.trash} <span>Excluir anexo</span></button></div>
      <button type="button" class="btn soft block ax-back" id="axBack">Voltar</button>`);
    // Libera a URL quando a folha sair da tela.
    new MutationObserver((_, ob) => { if (!s.isConnected) { ob.disconnect(); setTimeout(() => URL.revokeObjectURL(url), 1000); } }).observe(document.body, { childList: true });
    const q = sel => s.querySelector(sel);
    if (canShare) q('#axShare').addEventListener('click', () => navigator.share({ files: [file] }).catch(() => { }));
    q('#axDown').addEventListener('click', () => ctx.download(r.name, r.blob, r.type));
    q('#axBack').addEventListener('click', () => show(o));
    let armed = false;
    q('#axDel').addEventListener('click', async () => {
      if (!armed) { armed = true; q('#axDel span').textContent = 'Toque de novo para confirmar'; return; }
      try { await run('readwrite', st => { st.delete(id); }); await reload(); } catch (e) { ctx.toast('Não foi possível excluir.'); return; }
      ctx.onChange(); show(o); ctx.toast('Anexo excluído.');
    });
  }

  /* ---------- Backup ---------- */
  const toData = blob => new Promise((res, rej) => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.onerror = () => rej(fr.error); fr.readAsDataURL(blob); });
  async function exportFiles() {
    const out = [];
    for (const r of await all()) out.push(Object.assign(meta(r), { data: await toData(r.blob) }));
    return out;
  }
  function toRecord(f) {
    const id = /^[a-z0-9]+$/i;
    if (!f || !id.test(f.id) || !OK.test(f.type) || typeof f.data !== 'string') throw new Error('anexo inválido');
    const bin = atob(f.data.slice(f.data.indexOf(',') + 1)), buf = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
    return { id: f.id, petId: String(f.petId || ''), itemId: String(f.itemId || ''), kind: KINDS.includes(f.kind) ? f.kind : 'Outro', name: String(f.name || 'anexo'), type: f.type, size: buf.length, date: /^\d{4}-\d{2}-\d{2}$/.test(f.date) ? f.date : ctx.today(), blob: new Blob([buf], { type: f.type }) };
  }
  /* Substitui tudo em uma única transação: se falhar, os anexos atuais permanecem. */
  async function importFiles(list) {
    const recs = list.map(toRecord);
    await run('readwrite', s => { s.clear(); recs.forEach(r => s.put(r)); });
    await reload();
  }

  return { init, show, ofPet, ofItem, movePet, unlink, removePet, exportFiles, importFiles };
})();

"use strict";
const D = window.GSPA_DATA;

// ===========================================================================
// Speech (Web Speech API). German voice is not on every machine, so we pick
// the best available "de" voice and warn in the footer if none is found.
// ===========================================================================
let germanVoice = null;

function pickGermanVoice() {
  const voices = speechSynthesis.getVoices();
  germanVoice =
    voices.find((v) => v.lang === "de-DE") ||
    voices.find((v) => v.lang && v.lang.startsWith("de")) ||
    null;

  const status = document.getElementById("voice-status");
  if (germanVoice) {
    status.textContent = "🔊 " + germanVoice.name.split(" ")[0];
  } else if (voices.length) {
    status.textContent = "⚠ No German voice — see README";
  }
}
speechSynthesis.onvoiceschanged = pickGermanVoice;
pickGermanVoice();

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "de-DE";
  if (germanVoice) u.voice = germanVoice;
  u.rate = parseFloat(document.getElementById("speed-select").value) || 1;
  speechSynthesis.speak(u);
}

function copy(text) {
  navigator.clipboard.writeText(text).then(() => toast("Copied ✓"));
}

let toastTimer = null;
function toast(msg) {
  let el = document.querySelector(".toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 1400);
}

// Small DOM helper.
function el(tag, cls, html) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
}
function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

// A reusable phrase card with Speak + Copy.
function phraseCard(p, extraClass) {
  const card = el("div", "phrase-card" + (extraClass ? " " + extraClass : ""));
  card.appendChild(el("div", "phrase-de", esc(p.de)));
  if (p.en) card.appendChild(el("div", "phrase-en", esc(p.en)));
  if (p.say) card.appendChild(el("div", "phrase-say", "🗣 " + esc(p.say)));

  const actions = el("div", "phrase-actions");
  const speakBtn = el("button", "act primary", "🔊 Say it");
  speakBtn.onclick = () => speak(p.de);
  const copyBtn = el("button", "act", "Copy");
  copyBtn.onclick = () => copy(p.de);
  actions.append(speakBtn, copyBtn);
  card.appendChild(actions);
  return card;
}

// ===========================================================================
// LIVE MODE
// ===========================================================================
function renderLive() {
  const wrap = document.getElementById("speak-now");
  wrap.innerHTML = "";
  D.speakNow.forEach((g) => {
    wrap.appendChild(el("div", "group-title", `<span>${g.icon}</span> ${esc(g.group)}`));
    g.phrases.forEach((p) => wrap.appendChild(phraseCard(p)));
  });

  const ol = document.getElementById("always-remember");
  ol.innerHTML = "";
  D.alwaysRemember.forEach((r) => ol.appendChild(el("li", null, esc(r))));
}

// ===========================================================================
// LEARN MODE
// ===========================================================================
const learnRenderers = {
  build: renderBuild,
  myday: renderMyDay,
  future: renderFuture,
  decline: renderDecline,
  quiz: renderQuiz,
  essentials: renderEssentials,
  dativ: renderDativ,
  poss: renderPossessive,
  wo: renderWoWohin,
  pattern: renderPatterns,
  modal: renderModals,
  mistakes: renderMistakes
};

// ---- Grammar engine helpers ------------------------------------------------
const G = D.grammar;

// A possessive form for a given base word, case key and gender index.
// "euer" drops its second e when an ending is added (euer → eurem, not euerem).
function possForm(base, caseKey, gi) {
  const ending = G.possEndings[caseKey][gi];
  const stem = base === "euer" && ending ? "eur" : base;
  return stem + ending;
}

// Dativ form of a noun. Singular = unchanged; plural usually adds -n
// (skipped when it already ends in -n or -s).
function nounDativ(noun, gi) {
  if (gi !== 3) return noun;
  return /[ns]$/i.test(noun) ? noun : noun + "n";
}

function arrowRow(from, to, ex) {
  const row = el("div", "arrow-row");
  row.appendChild(el("span", "tag", esc(from)));
  row.appendChild(el("span", "arrow", "→"));
  row.appendChild(el("span", "tag to", esc(to)));
  if (ex) {
    const e = el("span", "row-ex", esc(ex));
    e.style.cursor = "pointer";
    e.title = "Click to hear";
    e.onclick = () => speak(ex);
    row.appendChild(e);
  }
  return row;
}

function exampleList(card, title, items) {
  card.appendChild(el("h4", null, esc(title)));
  items.forEach((s) => {
    const line = el("div", "example-line", esc(s));
    line.style.cursor = "pointer";
    line.onclick = () => speak(s);
    card.appendChild(line);
  });
}

// ---- My Day / My Plans: build a story you can say, and save it -------------
function storageGet(key) {
  return new Promise((res) => chrome.storage.local.get(key, (d) => res(d[key] || [])));
}
function storageSet(key, list) {
  return new Promise((res) => chrome.storage.local.set({ [key]: list }, res));
}

// Perfekt (past): aux + rest.  "Gestern habe ich ... gemacht."
function buildPast(time, act) {
  const aux = act.aux === "sein" ? "bin" : "habe";
  if (!time) return `Ich ${aux} ${act.rest}.`;
  return `${time} ${aux} ich ${act.rest}.`;
}

// Simple future = present tense + time word.  "Morgen gehe ich zum Deutschkurs."
function buildFuture(time, act) {
  const tail = act.rest ? " " + act.rest : "";
  if (!time) return `Ich ${act.verb}${tail}.`;
  return `${time} ${act.verb} ich${tail}.`;
}

// Generic builder used by both My Day (past) and My Plans (future).
async function renderRoutineTab(root, o) {
  // 1) Question + rule.
  const q = el("div", "map-card");
  q.appendChild(el("h3", null, o.title));
  o.questions.forEach(([de, en]) => {
    const row = el("div", "ess-row");
    row.title = "Click to hear";
    row.append(el("div", "ess-de", "🔊 " + esc(de)), el("div", "ess-en", esc(en)));
    row.onclick = () => speak(de);
    q.appendChild(row);
  });
  const rule = el("div");
  rule.style.marginTop = "8px";
  o.rule.forEach((r) => rule.appendChild(el("p", "phrase-say", "• " + esc(r))));
  q.appendChild(rule);
  root.appendChild(q);

  // 2) Builder.
  const b = el("div", "map-card");
  b.appendChild(el("h3", null, o.builderTitle));

  const timeSel = el("select", "build-select");
  o.timeWords.forEach((t, i) => timeSel.appendChild(new Option(t[1], i)));
  const actSel = el("select", "build-select");
  o.activities.forEach((a, i) => actSel.appendChild(new Option(a.en, i)));

  [[o.label1, timeSel], [o.label2, actSel]].forEach(([lbl, sel]) => {
    const f = el("div", "field");
    f.appendChild(el("label", null, lbl));
    f.appendChild(sel);
    b.appendChild(f);
  });

  const preview = el("div", "phrase-card");
  const previewDe = el("div", "phrase-de");
  preview.appendChild(previewDe);
  const actions = el("div", "phrase-actions");
  const sayBtn = el("button", "act primary", "🔊 Say it");
  const copyBtn = el("button", "act", "Copy");
  const addBtn = el("button", "act good", "➕ Add to story");
  actions.append(sayBtn, copyBtn, addBtn);
  preview.appendChild(actions);
  b.appendChild(preview);
  root.appendChild(b);

  function current() {
    return o.build(o.timeWords[+timeSel.value][0], o.activities[+actSel.value]);
  }
  timeSel.onchange = actSel.onchange = () => (previewDe.textContent = current());
  sayBtn.onclick = () => speak(current());
  copyBtn.onclick = () => copy(current());
  previewDe.textContent = current();

  // 3) Saved story (persists across sessions).
  const s = el("div", "map-card");
  s.appendChild(el("h3", null, o.savedTitle));
  s.appendChild(el("p", "phrase-en", o.savedHint));
  const storyList = el("div");
  s.appendChild(storyList);
  const storyActions = el("div", "phrase-actions");
  const playAll = el("button", "act primary", "▶️ Play all");
  const copyAll = el("button", "act", "Copy all");
  const clearAll = el("button", "act danger", "Clear");
  storyActions.append(playAll, copyAll, clearAll);
  s.appendChild(storyActions);
  root.appendChild(s);

  async function refreshStory() {
    const list = await storageGet(o.storeKey);
    storyList.innerHTML = "";
    if (!list.length) {
      storyList.appendChild(el("div", "empty", "No sentences yet.<br>Use the builder above and tap “➕ Add to story”."));
    } else {
      list.forEach((sentence, i) => {
        const row = el("div", "ess-row");
        const left = el("div", "ess-de", `${i + 1}. ${esc(sentence)}`);
        left.style.cursor = "pointer";
        left.title = "Click to hear";
        left.onclick = () => speak(sentence);
        const del = el("button", "act danger", "✕");
        del.onclick = async () => {
          const cur = await storageGet(o.storeKey);
          cur.splice(i, 1);
          await storageSet(o.storeKey, cur);
          refreshStory();
        };
        row.append(left, del);
        storyList.appendChild(row);
      });
    }
    const has = list.length > 0;
    playAll.disabled = copyAll.disabled = clearAll.disabled = !has;
  }

  addBtn.onclick = async () => {
    const list = await storageGet(o.storeKey);
    list.push(current());
    await storageSet(o.storeKey, list);
    toast("Added to story ✓");
    refreshStory();
  };
  playAll.onclick = async () => speak((await storageGet(o.storeKey)).join(" "));
  copyAll.onclick = async () => copy((await storageGet(o.storeKey)).join(" "));
  clearAll.onclick = async () => {
    await storageSet(o.storeKey, []);
    toast("Story cleared");
    refreshStory();
  };

  refreshStory();
}

function renderMyDay(root) {
  const P = D.pastDay;
  renderRoutineTab(root, {
    title: "🗓 “What did you do yesterday?”",
    questions: [P.question, P.questionFormal],
    rule: P.rule,
    builderTitle: "Build a sentence about your day",
    label1: "When / connector",
    label2: "What you did",
    timeWords: P.timeWords,
    activities: P.activities,
    build: buildPast,
    savedTitle: "📝 My story (saved for class)",
    savedHint: "Build it the night before — it stays here for tomorrow.",
    storeKey: "gspa_story"
  });
}

function renderFuture(root) {
  const F = D.future;
  renderRoutineTab(root, {
    title: "🔮 “What are you doing tomorrow?”",
    questions: [F.question, F.questionFormal],
    rule: F.rule,
    builderTitle: "Build a sentence about your plans",
    label1: "When",
    label2: "What you will do",
    timeWords: F.timeWords,
    activities: F.activities,
    build: buildFuture,
    savedTitle: "📝 My plans (saved)",
    savedHint: "Plan tomorrow or the weekend — it stays here until you change it.",
    storeKey: "gspa_plans"
  });
}

// ---- Essentials: searchable themed phrasebook (tap a line to hear it) ------
function renderEssentials(root) {
  const search = el("input");
  search.placeholder = "🔎 Search English or German…";
  const sf = el("div", "field");
  sf.appendChild(search);
  root.appendChild(sf);

  const list = el("div");
  root.appendChild(list);

  function draw(q) {
    const term = (q || "").trim().toLowerCase();
    list.innerHTML = "";
    let shown = 0;
    D.essentials.forEach((group) => {
      const matches = group.items.filter(
        ([de, en]) => !term || de.toLowerCase().includes(term) || en.toLowerCase().includes(term)
      );
      if (!matches.length) return;
      shown += matches.length;

      const card = el("div", "map-card");
      card.appendChild(el("h3", null, `${group.icon} ${esc(group.theme)}`));
      matches.forEach(([de, en]) => {
        const row = el("div", "ess-row");
        row.title = "Click to hear";
        const left = el("div", "ess-de", "🔊 " + esc(de));
        const right = el("div", "ess-en", esc(en));
        row.append(left, right);
        row.onclick = () => speak(de);
        card.appendChild(row);
      });
      list.appendChild(card);
    });
    if (!shown) list.appendChild(el("div", "empty", "No phrases match “" + esc(term) + "”."));
  }

  search.oninput = () => draw(search.value);
  draw("");
}

// ---- Build: assemble a correct Dativ sentence and say it -------------------
function renderBuild(root) {
  const c = el("div", "map-card");
  c.appendChild(el("h3", null, "🛠 Build a sentence"));
  c.appendChild(el("p", "phrase-en", "Pick the pieces → get a correct sentence you can say."));

  const prepSel = el("select");
  prepSel.className = "build-select";
  G.prepositions.forEach((p, i) => {
    const o = el("option", null, `${p.p}  —  ${p.en}`);
    o.value = i;
    prepSel.appendChild(o);
  });

  const artSel = el("select");
  artSel.className = "build-select";
  artSel.appendChild(new Option("der / die / das (definite)", "def"));
  G.possBases.forEach((b) => artSel.appendChild(new Option(`${b.w} (${b.en})`, b.w)));

  const nounSel = el("select");
  nounSel.className = "build-select";
  G.builderNouns.forEach((n, i) => {
    const tag = n.g === 3 ? "plural" : G.genders[n.g].short;
    nounSel.appendChild(new Option(`${n.noun} (${tag}) — ${n.en}`, i));
  });

  [["Preposition", prepSel], ["Article / possessive", artSel], ["Noun", nounSel]].forEach(([lbl, sel]) => {
    const f = el("div", "field");
    f.appendChild(el("label", null, lbl));
    f.appendChild(sel);
    c.appendChild(f);
  });

  const out = el("div", "build-out");
  c.appendChild(out);
  root.appendChild(c);

  function build() {
    const prep = G.prepositions[+prepSel.value];
    const nounObj = G.builderNouns[+nounSel.value];
    const gi = nounObj.g;
    const noun = gi === 3 ? nounObj.dat : nounObj.noun;
    const source = artSel.value;

    let phrase, rule;
    if (source === "def") {
      const art = G.defArticle.dat[gi];
      const contracted = prep.contr[art];
      if (contracted) {
        phrase = `${prep.verb} ${contracted} ${noun}.`;
        rule = `${prep.p} + ${art} → ${contracted} (contraction).`;
      } else {
        phrase = `${prep.verb} ${prep.p} ${art} ${noun}.`;
        rule = `${G.genders[gi].short} → ${art} (Dativ after ${prep.p}).`;
      }
    } else {
      const pf = possForm(source, "dat", gi);
      phrase = `${prep.verb} ${prep.p} ${pf} ${noun}.`;
      rule = `${source} → ${pf} (Dativ after ${prep.p}).`;
    }

    out.innerHTML = "";
    const card = el("div", "phrase-card");
    card.appendChild(el("div", "phrase-de", esc(phrase)));
    card.appendChild(el("div", "phrase-say", "✅ " + esc(rule)));
    const actions = el("div", "phrase-actions");
    const sayBtn = el("button", "act primary", "🔊 Say it");
    sayBtn.onclick = () => speak(phrase);
    const copyBtn = el("button", "act", "Copy");
    copyBtn.onclick = () => copy(phrase);
    actions.append(sayBtn, copyBtn);
    card.appendChild(actions);
    out.appendChild(card);
  }

  [prepSel, artSel, nounSel].forEach((s) => (s.onchange = build));
  build();
}

// ---- Decline: type any noun → full Nom/Akk/Dativ table ---------------------
function renderDecline(root) {
  const c = el("div", "map-card");
  c.appendChild(el("h3", null, "🔤 Decline any noun"));
  c.appendChild(el("p", "phrase-en", "Type a noun, choose its gender → see every case."));

  const nounInput = el("input");
  nounInput.placeholder = "e.g. Lehrer";
  nounInput.value = "Lehrer";
  const f1 = el("div", "field");
  f1.appendChild(el("label", null, "Noun"));
  f1.appendChild(nounInput);
  c.appendChild(f1);

  const genSel = el("select");
  genSel.className = "build-select";
  G.genders.forEach((g) => genSel.appendChild(new Option(g.label, g.idx)));
  const f2 = el("div", "field");
  f2.appendChild(el("label", null, "Gender"));
  f2.appendChild(genSel);
  c.appendChild(f2);

  const possSel = el("select");
  possSel.className = "build-select";
  G.possBases.forEach((b) => possSel.appendChild(new Option(`${b.w} (${b.en})`, b.w)));
  const f3 = el("div", "field");
  f3.appendChild(el("label", null, "Possessive to show"));
  f3.appendChild(possSel);
  c.appendChild(f3);

  const out = el("div");
  c.appendChild(out);
  root.appendChild(c);

  const cases = [["nom", "Nominativ"], ["akk", "Akkusativ"], ["dat", "Dativ"]];

  function render() {
    const noun = nounInput.value.trim() || "…";
    const gi = +genSel.value;
    const base = possSel.value;
    out.innerHTML = "";

    const table = el("table", "grid");
    table.innerHTML = "<tr><th>case</th><th>definite</th><th>possessive</th></tr>";
    cases.forEach(([key, label]) => {
      const nf = key === "dat" ? nounDativ(noun, gi) : noun;
      const art = `${G.defArticle[key][gi]} ${nf}`;
      const poss = `${possForm(base, key, gi)} ${nf}`;
      const tr = el("tr");
      tr.appendChild(el("td", "word", label));
      [art, poss].forEach((txt) => {
        const td = el("td", null, esc(txt));
        td.style.cursor = "pointer";
        td.title = "Click to hear";
        td.onclick = () => speak(txt);
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });
    out.appendChild(table);

    if (gi === 3) {
      out.appendChild(el("p", "phrase-say", "ℹ For plural, type the plural form (e.g. Kinder → Kindern). Dativ usually adds -n."));
    }
    out.appendChild(el("p", "phrase-en", "Note: a few “weak” nouns (der Junge → dem Jungen) change in the singular too."));
  }

  nounInput.oninput = render;
  genSel.onchange = render;
  possSel.onchange = render;
  render();
}

// ---- Quiz: active recall on Dativ articles + possessives -------------------
function buildQuizPool() {
  const pool = [];
  // Definite article → Dativ.
  D.dativ.definite.forEach((r) => {
    pool.push({ q: `Dativ:  ${r.from}  →  ?`, a: r.to });
  });
  // Possessive → Dativ form, per gender.
  const genderLabel = ["der (masc.)", "die (fem.)", "das (neut.)", "plural"];
  D.possessive.forEach((p) => {
    p.forms.forEach((f, gi) => {
      pool.push({ q: `Dativ:  ${p.word} + ${genderLabel[gi]}  →  ?`, a: f });
    });
  });
  return pool;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderQuiz(root) {
  const c = el("div", "map-card");
  c.appendChild(el("h3", null, "🎯 Quick recall quiz"));
  const score = el("p", "phrase-en", "");
  c.appendChild(score);
  const body = el("div");
  c.appendChild(body);
  root.appendChild(c);

  let pool = shuffle(buildQuizPool());
  let i = 0, right = 0, done = 0;

  function updateScore() {
    score.textContent = done ? `Score: ${right}/${done} this session` : "Tap “Show answer”, then rate yourself.";
  }

  function showQ() {
    if (i >= pool.length) { pool = shuffle(pool); i = 0; }
    const item = pool[i];
    body.innerHTML = "";
    body.appendChild(el("div", "trainer-q", esc(item.q)));

    const reveal = el("button", "act primary", "Show answer");
    reveal.style.width = "100%";
    reveal.onclick = () => {
      body.innerHTML = "";
      body.appendChild(el("div", "trainer-q", esc(item.q)));
      const ans = el("div", "mistake-correct", "→ " + esc(item.a));
      ans.style.fontSize = "18px";
      ans.style.cursor = "pointer";
      ans.title = "Click to hear";
      ans.onclick = () => speak(item.a);
      body.appendChild(ans);
      speak(item.a);

      const rate = el("div", "trainer-choices");
      const knew = el("button", "act good", "✓ I knew it");
      const review = el("button", "act danger", "✗ Review");
      function next(ok) {
        done++; if (ok) right++;
        i++;
        updateScore();
        showQ();
      }
      knew.onclick = () => next(true);
      review.onclick = () => next(false);
      rate.append(knew, review);
      body.appendChild(rate);
    };
    body.appendChild(reveal);
    updateScore();
  }
  showQ();
}

function renderDativ(root) {
  const c1 = el("div", "map-card");
  c1.appendChild(el("h3", null, "Definite articles → Dativ"));
  D.dativ.definite.forEach((r) => c1.appendChild(arrowRow(r.from, r.to, r.ex)));
  root.appendChild(c1);

  const c2 = el("div", "map-card");
  c2.appendChild(el("h3", null, "Indefinite articles → Dativ"));
  D.dativ.indefinite.forEach((r) => c2.appendChild(arrowRow(r.from, r.to, r.ex)));
  root.appendChild(c2);

  const c3 = el("div", "map-card");
  c3.appendChild(el("h3", null, "Dativ trigger words"));
  c3.appendChild(el("p", "phrase-en", "Memory: mit · bei · nach · seit · von · zu · aus → Dativ"));
  D.dativ.triggers.forEach((t) => {
    const kv = el("div", "kv");
    kv.appendChild(el("span", "k", `${esc(t.de)} <span style="color:var(--muted);font-weight:400">= ${esc(t.en)}</span>`));
    const v = el("span", "v", esc(t.ex));
    v.style.cursor = "pointer";
    v.onclick = () => speak(t.ex);
    kv.appendChild(v);
    c3.appendChild(kv);
  });
  root.appendChild(c3);
}

function renderPossessive(root) {
  const c = el("div", "map-card");
  c.appendChild(el("h3", null, "Possessive in the Dativ"));
  c.appendChild(el("p", "phrase-en", "Forms: masculine / feminine / neuter / plural"));

  const table = el("table", "grid");
  table.innerHTML =
    "<tr><th>word</th><th>der→</th><th>die→</th><th>das→</th><th>plural→</th></tr>";
  D.possessive.forEach((p) => {
    const tr = el("tr");
    tr.appendChild(el("td", "word", `${esc(p.word)}<br><span style="color:var(--muted);font-weight:400;font-size:11px">${esc(p.en)}</span>`));
    p.forms.forEach((f) => {
      const td = el("td", null, esc(f));
      td.style.cursor = "pointer";
      td.title = "Click to hear";
      td.onclick = () => speak(f);
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
  c.appendChild(table);
  root.appendChild(c);

  const ex = el("div", "map-card");
  exampleList(ex, "Examples", D.possessiveExamples);
  root.appendChild(ex);
}

function renderWoWohin(root) {
  const c = el("div", "map-card");
  c.appendChild(el("h3", null, "Wo? vs Wohin?"));
  D.woWohin.rule.forEach((r) => {
    const kv = el("div", "kv");
    kv.appendChild(el("span", "k", `${esc(r.q)} <span style="color:var(--muted);font-weight:400">${esc(r.meaning)}</span>`));
    kv.appendChild(el("span", "v", `→ <b style="color:var(--accent)">${esc(r.case)}</b>`));
    c.appendChild(kv);
  });
  exampleList(c, "📍 Location (Dativ)", D.woWohin.examples.location);
  exampleList(c, "➡️ Movement (Akkusativ)", D.woWohin.examples.movement);
  root.appendChild(c);

  // Mini trainer.
  const t = el("div", "map-card");
  t.appendChild(el("h3", null, "🎯 Quick trainer"));
  const body = el("div");
  t.appendChild(body);
  root.appendChild(t);

  let idx = 0;
  function showQ() {
    const q = D.woWohin.trainer[idx];
    body.innerHTML = "";
    body.appendChild(el("div", "trainer-q", esc(q.sentence)));
    const choices = el("div", "trainer-choices");
    const moveBtn = el("button", "act", "➡️ Movement");
    const locBtn = el("button", "act", "📍 Location");
    const fb = el("div", "trainer-feedback");
    function answer(choice, btn) {
      const ok = choice === q.answer;
      btn.classList.add(ok ? "good" : "danger");
      fb.className = "trainer-feedback " + (ok ? "ok" : "no");
      fb.innerHTML = (ok ? "✓ " : "✗ ") + esc(q.correct) + " — " + esc(q.why);
      moveBtn.disabled = locBtn.disabled = true;
      const next = el("button", "act primary", "Next →");
      next.onclick = () => { idx = (idx + 1) % D.woWohin.trainer.length; showQ(); };
      fb.appendChild(document.createElement("br"));
      fb.appendChild(next);
      speak(q.correct);
    }
    moveBtn.onclick = () => answer("movement", moveBtn);
    locBtn.onclick = () => answer("location", locBtn);
    choices.append(moveBtn, locBtn);
    body.append(choices, fb);
  }
  showQ();
}

function renderPatterns(root) {
  const c = el("div", "map-card");
  c.appendChild(el("h3", null, "Sentence patterns"));
  D.patterns.forEach((p) => {
    const block = el("div", "phrase-card");
    block.appendChild(el("div", "phrase-de", esc(p.title)));
    block.appendChild(el("div", "phrase-say", esc(p.rule)));
    const ex = el("div", "phrase-en", "“" + esc(p.ex) + "”");
    ex.style.cursor = "pointer";
    ex.onclick = () => speak(p.ex);
    block.appendChild(ex);
    c.appendChild(block);
  });
  root.appendChild(c);
}

function renderModals(root) {
  const c = el("div", "map-card");
  c.appendChild(el("h3", null, "Modal verbs"));
  c.appendChild(el("p", "phrase-en", "Golden rule: modal verb in position 2, main verb at the END."));
  D.modals.forEach((m) => {
    const kv = el("div", "kv");
    kv.appendChild(el("span", "k", esc(m.de)));
    kv.appendChild(el("span", "v", esc(m.en)));
    c.appendChild(kv);
  });
  root.appendChild(c);

  const s = el("div", "map-card");
  s.appendChild(el("h3", null, "Useful class sentences"));
  D.modalSentences.forEach((p) => s.appendChild(phraseCard(p)));
  root.appendChild(s);
}

// ----- My Mistakes (chrome.storage.local) ----------------------------------
const STORE_KEY = "gspa_mistakes";

function loadMistakes() {
  return new Promise((res) => {
    chrome.storage.local.get(STORE_KEY, (data) => res(data[STORE_KEY] || []));
  });
}
function saveMistakes(list) {
  return new Promise((res) => {
    chrome.storage.local.set({ [STORE_KEY]: list }, res);
  });
}

async function renderMistakes(root) {
  // Add form.
  const form = el("div", "map-card");
  form.appendChild(el("h3", null, "➕ Add a mistake"));
  form.innerHTML += `
    <div class="field"><label>Wrong sentence</label><input id="m-wrong" placeholder="Ich gehe in der Schule." /></div>
    <div class="field"><label>Correct sentence</label><input id="m-correct" placeholder="Ich gehe in die Schule." /></div>
    <div class="field"><label>Why (short)</label><textarea id="m-why" placeholder="Movement = Akkusativ → in die Schule."></textarea></div>
  `;
  const addBtn = el("button", "act primary", "Save mistake");
  addBtn.style.width = "100%";
  form.appendChild(addBtn);
  root.appendChild(form);

  const listWrap = el("div");
  root.appendChild(listWrap);

  async function refresh() {
    const list = await loadMistakes();
    listWrap.innerHTML = "";
    const head = el("h3", null, `📌 My Top Mistakes (${list.length})`);
    head.style.margin = "4px 0 10px";
    head.style.color = "var(--accent)";
    head.style.fontSize = "14px";
    listWrap.appendChild(head);

    if (!list.length) {
      listWrap.appendChild(el("div", "empty", "No mistakes saved yet.<br>Add the ones your teacher corrects."));
      return;
    }
    list.forEach((m, i) => {
      const card = el("div", "phrase-card mistake-card");
      card.appendChild(el("div", "mistake-wrong", esc(m.wrong)));
      card.appendChild(el("div", "mistake-correct", esc(m.correct)));
      if (m.why) card.appendChild(el("div", "mistake-why", "💡 " + esc(m.why)));
      card.appendChild(el("div", "mistake-date", esc(m.date)));

      const actions = el("div", "phrase-actions");
      const practise = el("button", "act primary", "🔊 Practise");
      practise.onclick = () => speak(m.correct);
      const del = el("button", "act danger", "Delete");
      del.onclick = async () => {
        const cur = await loadMistakes();
        cur.splice(i, 1);
        await saveMistakes(cur);
        toast("Deleted");
        refresh();
      };
      actions.append(practise, del);
      card.appendChild(actions);
      listWrap.appendChild(card);
    });
  }

  addBtn.onclick = async () => {
    const wrong = document.getElementById("m-wrong").value.trim();
    const correct = document.getElementById("m-correct").value.trim();
    const why = document.getElementById("m-why").value.trim();
    if (!correct) { toast("Add the correct sentence"); return; }
    const list = await loadMistakes();
    list.unshift({
      wrong,
      correct,
      why,
      date: new Date().toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })
    });
    await saveMistakes(list);
    document.getElementById("m-wrong").value = "";
    document.getElementById("m-correct").value = "";
    document.getElementById("m-why").value = "";
    toast("Saved ✓");
    refresh();
  };

  refresh();
}

function renderLearn(tab) {
  const root = document.getElementById("learn-content");
  root.innerHTML = "";
  (learnRenderers[tab] || renderDativ)(root);
}

// ===========================================================================
// Navigation
// ===========================================================================
document.querySelectorAll(".mode-btn").forEach((btn) => {
  btn.onclick = () => {
    document.querySelectorAll(".mode-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const mode = btn.dataset.mode;
    document.getElementById("mode-live").classList.toggle("hidden", mode !== "live");
    document.getElementById("mode-learn").classList.toggle("hidden", mode !== "learn");
    speechSynthesis.cancel();
  };
});

document.querySelectorAll(".subtab").forEach((btn) => {
  btn.onclick = () => {
    document.querySelectorAll(".subtab").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderLearn(btn.dataset.tab);
  };
});

// Initial render.
renderLive();
renderLearn("build");

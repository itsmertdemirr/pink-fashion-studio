"use strict";

const STORAGE_KEY = "pink-fashion-studio-saves-v1";
const SETTINGS_KEY = "pink-fashion-studio-settings-v1";

const data = {
  challenges: [
    { id: "gala", title: "Pembe Gala", emoji: "💖", description: "Gecenin yıldızı olacak şık bir kombin hazırla.", background: "linear-gradient(135deg,#f72585,#9d174d)", goals: ["Elbise tercih et", "Topuklu ayakkabı giy", "En az iki aksesuar kullan", "Gece veya pembe sahneyi seç", "Pembe tonlarına ağırlık ver"], tags: ["dress", "heels", "glam", "night", "pink"] },
    { id: "beach", title: "Sahil Partisi", emoji: "🏖️", description: "Yaz enerjisi taşıyan ferah bir görünüm oluştur.", background: "linear-gradient(135deg,#17a8d4,#25b985)", goals: ["Şort veya mini elbise seç", "Sandalet giy", "Sahil sahnesini kullan", "Canlı bir renk kullan", "Çanta ekle"], tags: ["summer", "sandals", "beach", "bright", "bag"] },
    { id: "school", title: "Kampüs Şıklığı", emoji: "📚", description: "Rahat ama özenli bir okul kombini tasarla.", background: "linear-gradient(135deg,#8b5cf6,#4f46e5)", goals: ["Etek veya pantolon seç", "Spor ayakkabı giy", "Gözlük kullan", "Bluz veya kazak seç", "Bahçe sahnesini kullan"], tags: ["separates", "sneakers", "glasses", "casual", "garden"] },
    { id: "winter", title: "Kış Masalı", emoji: "❄️", description: "Soğuk havaya uygun sıcak ve stil sahibi ol.", background: "linear-gradient(135deg,#2e78a6,#7c3aed)", goals: ["Ceket kullan", "Pantolon tercih et", "Bot giy", "Kar sahnesini seç", "Soğuk bir renk kullan"], tags: ["jacket", "pants", "boots", "snow", "cool"] },
    { id: "street", title: "Şehir Modası", emoji: "🌃", description: "Cesur, modern ve rahat bir sokak stili oluştur.", background: "linear-gradient(135deg,#fb7185,#7c3aed)", goals: ["İkili takım oluştur", "Geniş paça veya şort seç", "Spor ayakkabı giy", "Çanta veya gözlük ekle", "Gece sahnesini seç"], tags: ["separates", "street", "sneakers", "accessory", "night"] }
  ],
  groups: {
    outfitMode: { title: "Kıyafet türü", items: [
      { id: "separates", name: "İkili takım", icon: "👚", tags: ["separates", "casual"] },
      { id: "dress", name: "Elbise", icon: "👗", tags: ["dress", "glam"] }
    ]},
    top: { title: "Üst", items: [
      { id: "crop", name: "Crop", icon: "🎀", tags: ["summer", "street"] },
      { id: "blouse", name: "Bluz", icon: "🤍", tags: ["casual", "school"] },
      { id: "corset", name: "Korse", icon: "💗", tags: ["glam", "party"] },
      { id: "sweater", name: "Kazak", icon: "🧶", tags: ["winter", "casual"] }
    ]},
    bottom: { title: "Alt", items: [
      { id: "skirt", name: "Etek", icon: "👗", tags: ["school", "cute"] },
      { id: "pants", name: "Pantolon", icon: "👖", tags: ["pants", "casual"] },
      { id: "shorts", name: "Şort", icon: "🩳", tags: ["summer", "street"] },
      { id: "widepants", name: "Geniş paça", icon: "🪩", tags: ["street", "pants"] }
    ]},
    dress: { title: "Elbise modeli", items: [
      { id: "party", name: "Parti", icon: "💃", tags: ["glam", "party"] },
      { id: "gown", name: "Uzun abiye", icon: "👑", tags: ["glam", "gala"] },
      { id: "mini", name: "Mini", icon: "✨", tags: ["summer", "party"] },
      { id: "mermaid", name: "Balık model", icon: "🧜‍♀️", tags: ["glam", "gala"] }
    ]},
    jacket: { title: "Ceket", items: [
      { id: "none", name: "Yok", icon: "✕", tags: [] },
      { id: "cropped", name: "Kısa ceket", icon: "🧥", tags: ["jacket", "street"] },
      { id: "long", name: "Uzun ceket", icon: "🥼", tags: ["jacket", "winter"] }
    ]},
    shoes: { title: "Ayakkabı", items: [
      { id: "heels", name: "Topuklu", icon: "👠", tags: ["heels", "glam"] },
      { id: "sneakers", name: "Spor", icon: "👟", tags: ["sneakers", "casual"] },
      { id: "boots", name: "Bot", icon: "🥾", tags: ["boots", "winter"] },
      { id: "sandals", name: "Sandalet", icon: "🩴", tags: ["sandals", "summer"] }
    ]},
    hairStyle: { title: "Saç modeli", items: [
      { id: "long", name: "Uzun", icon: "👱‍♀️", tags: ["glam"] },
      { id: "bob", name: "Kısa bob", icon: "💇‍♀️", tags: ["street"] },
      { id: "ponytail", name: "At kuyruğu", icon: "🎀", tags: ["casual"] },
      { id: "wavy", name: "Dalgalı", icon: "〰️", tags: ["glam"] }
    ]},
    scene: { title: "Arka plan", items: [
      { id: "pink", name: "Pembe stüdyo", icon: "🌸", tags: ["pink", "glam"] },
      { id: "beach", name: "Sahil", icon: "🏖️", tags: ["beach", "summer"] },
      { id: "night", name: "Gece", icon: "🌙", tags: ["night", "glam"] },
      { id: "garden", name: "Bahçe", icon: "🌿", tags: ["garden", "casual"] },
      { id: "snow", name: "Kar", icon: "❄️", tags: ["snow", "winter"] }
    ]}
  },
  palettes: {
    skin: ["#f7d7c4", "#efbd9e", "#d99a75", "#b87552", "#7f4f36", "#513326"],
    hair: ["#e7b23c", "#5b3424", "#17151a", "#b95d3f", "#ead6ae", "#8b5cf6", "#ff6fae", "#7a5b4d", "#2c5963", "#c98252"],
    eyes: ["#4e7ea8", "#4b7f52", "#6f4d3d", "#2f3038", "#6f5bb5"],
    lips: ["#e94c7b", "#c92f4f", "#9b3159", "#ef7f73", "#7f2749", "#d35c9c"],
    top: ["#ff4f9a", "#8b5cf6", "#34b8d4", "#22b573", "#ffbf3f", "#ff6b5f", "#ffffff", "#202234", "#ff91bd", "#6b7cff"],
    bottom: ["#8b5cf6", "#ff4f9a", "#3185e5", "#1c2638", "#ffffff", "#20a979", "#ef6f61", "#d1a04b", "#8b6957", "#c7b8ff"],
    dress: ["#f72585", "#8b5cf6", "#e83f5b", "#1e2b58", "#14b8a6", "#f4b942", "#ffffff", "#111827", "#ff89b8", "#6d5dfc"],
    jacket: ["#fff8fc", "#1f2937", "#f6bdd9", "#8b5cf6", "#c8e8ff", "#d9c3aa"],
    shoe: ["#f72585", "#ffffff", "#151822", "#8b5cf6", "#e63946", "#f4b942", "#2a9d8f", "#8c6046"],
    bag: ["#7c3aed", "#f72585", "#ffffff", "#12151f", "#e63946", "#f4b942", "#2a9d8f", "#6f4e37"]
  }
};

const defaultState = {
  challenge: "gala",
  outfitMode: "separates",
  top: "crop",
  bottom: "skirt",
  dress: "party",
  jacket: "none",
  shoes: "heels",
  hairStyle: "long",
  scene: "pink",
  skin: "#efbd9e",
  hair: "#e7b23c",
  eyes: "#4e7ea8",
  lips: "#e94c7b",
  topColor: "#ff4f9a",
  bottomColor: "#8b5cf6",
  dressColor: "#f72585",
  jacketColor: "#fff8fc",
  shoeColor: "#f72585",
  bagColor: "#7c3aed",
  accessories: { necklace: false, glasses: false, crown: false, bag: false, earrings: false }
};

const storage = {
  get(key, fallback = null) { try { const value = window.localStorage.getItem(key); return value === null ? fallback : value; } catch { return fallback; } },
  set(key, value) { try { window.localStorage.setItem(key, value); return true; } catch { return false; } },
  remove(key) { try { window.localStorage.removeItem(key); return true; } catch { return false; } }
};

let state = structuredClone(defaultState);
let history = [];
let future = [];
let soundEnabled = storage.get(SETTINGS_KEY, "true") !== "false";

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const svg = $("#fashionSvg");

function clone(value) { return JSON.parse(JSON.stringify(value)); }
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[char]); }
function activeChallenge() { return data.challenges.find(item => item.id === state.challenge) || data.challenges[0]; }
function getItem(group, id) { return data.groups[group]?.items.find(item => item.id === id); }

function colorTags(color) {
  const value = color.toLowerCase();
  const tags = [];
  if (["#f72585", "#ff4f9a", "#ff91bd", "#ff89b8", "#f6bdd9"].includes(value)) tags.push("pink");
  if (["#34b8d4", "#3185e5", "#1e2b58", "#14b8a6", "#2a9d8f", "#6b7cff", "#8b5cf6", "#6d5dfc", "#c7b8ff"].includes(value)) tags.push("cool");
  if (["#ffbf3f", "#ff6b5f", "#ef6f61", "#e63946", "#f4b942", "#e83f5b"].includes(value)) tags.push("bright");
  return tags;
}

function currentTags() {
  const tags = new Set();
  const groups = ["outfitMode", "shoes", "scene", "hairStyle", "jacket"];
  groups.forEach(group => getItem(group, state[group])?.tags.forEach(tag => tags.add(tag)));
  if (state.outfitMode === "dress") getItem("dress", state.dress)?.tags.forEach(tag => tags.add(tag));
  else {
    getItem("top", state.top)?.tags.forEach(tag => tags.add(tag));
    getItem("bottom", state.bottom)?.tags.forEach(tag => tags.add(tag));
  }
  Object.entries(state.accessories).forEach(([key, enabled]) => {
    if (!enabled) return;
    tags.add("accessory"); tags.add(key);
    if (["necklace", "crown", "earrings"].includes(key)) tags.add("glam");
  });
  if (state.accessories.bag) tags.add("bag");
  const accessoryCount = Object.values(state.accessories).filter(Boolean).length;
  if (accessoryCount >= 2) tags.add("glam");
  [state.topColor, state.bottomColor, state.dressColor, state.jacketColor, state.shoeColor].forEach(color => colorTags(color).forEach(tag => tags.add(tag)));
  if (state.bottom === "widepants") tags.add("street");
  return tags;
}

function calculateScore() {
  const challenge = activeChallenge();
  const tags = currentTags();
  const matches = challenge.tags.filter(tag => tags.has(tag));
  return { score: matches.length * 20, matches, missing: challenge.tags.filter(tag => !tags.has(tag)) };
}

function playTone(type = "tap") {
  if (!soundEnabled || !(window.AudioContext || window.webkitAudioContext)) return;
  const Context = window.AudioContext || window.webkitAudioContext;
  const ctx = new Context();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  const presets = { tap: [420, .035], success: [720, .11], save: [560, .075], error: [180, .08] };
  const [frequency, duration] = presets[type] || presets.tap;
  oscillator.frequency.value = frequency;
  oscillator.type = type === "success" ? "sine" : "triangle";
  gain.gain.setValueAtTime(.055, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + duration);
  oscillator.connect(gain).connect(ctx.destination);
  oscillator.start(); oscillator.stop(ctx.currentTime + duration);
  oscillator.addEventListener("ended", () => ctx.close());
}

function toast(message, type = "normal") {
  const element = document.createElement("div");
  element.className = `toast ${type}`;
  element.textContent = message;
  $("#toastRegion").appendChild(element);
  setTimeout(() => element.remove(), 2800);
}

function setState(patch, { record = true, feedback = true } = {}) {
  if (record) {
    history.push(clone(state));
    if (history.length > 45) history.shift();
    future = [];
  }
  state = { ...state, ...clone(patch) };
  applyState();
  if (feedback) playTone("tap");
}

function setAccessory(key, value) {
  setState({ accessories: { ...state.accessories, [key]: value } });
}

function undo() {
  if (!history.length) return;
  future.push(clone(state));
  state = history.pop();
  applyState();
  playTone("tap");
}

function redo() {
  if (!future.length) return;
  history.push(clone(state));
  state = future.pop();
  applyState();
  playTone("tap");
}

function setOpacity(id, visible) { const el = document.getElementById(id); if (el) el.setAttribute("opacity", visible ? "1" : "0"); }

function applyHair() {
  const back = $("#hairBackPath");
  const front = $("#hairFrontPath");
  const styles = {
    long: ["M197 178 Q190 74 300 69 Q411 76 402 184 L424 413 Q377 454 340 405 L300 475 L260 405 Q218 456 177 413Z", "M222 161 Q210 79 299 71 Q389 80 378 162 Q350 112 309 112 Q264 110 233 162Z"],
    bob: ["M201 176 Q195 72 300 69 Q406 75 398 181 L399 292 Q351 332 300 304 Q248 334 201 292Z", "M221 161 Q212 78 300 70 Q389 79 379 163 Q349 113 309 111 Q263 110 232 163Z"],
    ponytail: ["M201 178 Q194 73 300 69 Q407 75 399 184 L386 284 Q430 262 462 304 Q492 357 436 447 Q409 376 376 329 Q342 359 300 331 Q252 357 204 308Z", "M220 162 Q212 78 300 70 Q389 79 379 162 Q351 116 309 111 Q263 109 232 163Z"],
    wavy: ["M195 179 Q184 73 300 68 Q418 77 404 187 C447 240 397 278 427 332 C456 389 399 462 340 405 L300 476 L260 405 C200 461 145 390 174 332 C203 276 155 239 195 179Z", "M220 162 Q204 83 298 70 Q397 82 380 164 Q350 116 309 112 Q262 108 231 164Z"]
  };
  const [backPath, frontPath] = styles[state.hairStyle] || styles.long;
  back.setAttribute("d", backPath); front.setAttribute("d", frontPath);
}

function applyState() {
  const hairDark = shade(state.hair, -46);
  const cssVars = {
    "--skin": state.skin, "--hair": state.hair, "--hair-dark": hairDark, "--top": state.topColor,
    "--bottom": state.bottomColor, "--dress": state.dressColor, "--jacket": state.jacketColor,
    "--shoe": state.shoeColor, "--bag": state.bagColor, "--eyes": state.eyes, "--lips": state.lips
  };
  Object.entries(cssVars).forEach(([key, value]) => svg.style.setProperty(key, value));

  data.groups.scene.items.forEach(item => setOpacity(`scene-${item.id}`, state.scene === item.id));
  setOpacity("topLayer", state.outfitMode === "separates");
  setOpacity("bottomLayer", state.outfitMode === "separates");
  setOpacity("dressLayer", state.outfitMode === "dress");
  data.groups.top.items.forEach(item => setOpacity(`top-${item.id}`, state.top === item.id));
  data.groups.bottom.items.forEach(item => setOpacity(`bottom-${item.id}`, state.bottom === item.id));
  data.groups.dress.items.forEach(item => setOpacity(`dress-${item.id}`, state.dress === item.id));
  setOpacity("dressTrim", state.outfitMode === "dress" && ["party", "mini"].includes(state.dress));
  setOpacity("jacketLayer", state.jacket !== "none");
  setOpacity("jacket-cropped-left", state.jacket === "cropped"); setOpacity("jacket-cropped-right", state.jacket === "cropped");
  setOpacity("jacket-long-left", state.jacket === "long"); setOpacity("jacket-long-right", state.jacket === "long");
  data.groups.shoes.items.forEach(item => setOpacity(`shoe-${item.id}`, state.shoes === item.id));
  Object.entries(state.accessories).forEach(([id, enabled]) => setOpacity(id, enabled));
  applyHair();

  $$('[data-state-key]').forEach(button => {
    const key = button.dataset.stateKey;
    const selected = String(state[key]) === button.dataset.value;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  $$('[data-accessory]').forEach(button => {
    const active = Boolean(state.accessories[button.dataset.accessory]);
    button.classList.toggle("active", active); button.setAttribute("aria-pressed", String(active));
  });
  $$('[data-color-key]').forEach(button => {
    const key = button.dataset.colorKey;
    button.classList.toggle("selected", state[key] === button.dataset.color);
  });
  $$('[data-challenge]').forEach(button => button.classList.toggle("selected", state.challenge === button.dataset.challenge));

  const challenge = activeChallenge();
  $("#challengeTitle").textContent = challenge.title;
  $("#challengeDescription").textContent = challenge.description;
  $("#stageBadge").textContent = challenge.title;
  $("#challengeCounter").textContent = `${data.challenges.findIndex(item => item.id === state.challenge) + 1} / ${data.challenges.length}`;
  $("#missionGoals").innerHTML = challenge.goals.map(goal => `<li>${escapeHtml(goal)}</li>`).join("");
  updateLiveScore();
  updateUndoRedo();
}

function shade(hex, amount) {
  const clean = hex.replace("#", "");
  const value = parseInt(clean.length === 3 ? clean.split("").map(x => x + x).join("") : clean, 16);
  const r = Math.max(0, Math.min(255, (value >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((value >> 8) & 255) + amount));
  const b = Math.max(0, Math.min(255, (value & 255) + amount));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function updateLiveScore() {
  const { score } = calculateScore();
  const stars = Math.round(score / 20);
  $("#scoreText").textContent = `${score} / 100`;
  $("#scoreBar").style.width = `${score}%`;
  $("#liveStars").textContent = "★".repeat(stars) + "☆".repeat(5 - stars);
}

function updateUndoRedo() {
  $("#undoButton").disabled = history.length === 0;
  $("#redoButton").disabled = future.length === 0;
}

function makeOptions(groupKey) {
  const group = data.groups[groupKey];
  return `<section class="control-section" data-control-group="${groupKey}">
    <div class="control-title"><span>${escapeHtml(group.title)}</span></div>
    <div class="option-grid">${group.items.map(item => `<button class="option-card" type="button" data-state-key="${groupKey}" data-value="${item.id}" aria-pressed="false"><span class="option-icon">${item.icon}</span><span class="option-name">${escapeHtml(item.name)}</span></button>`).join("")}</div>
  </section>`;
}

function makePalette(key, title, paletteKey) {
  return `<section class="control-section"><div class="control-title"><span>${escapeHtml(title)}</span></div><div class="palette">${data.palettes[paletteKey].map(color => `<button class="swatch" type="button" style="--swatch:${color}" data-color-key="${key}" data-color="${color}" title="${color}" aria-label="${title}: ${color}"></button>`).join("")}</div></section>`;
}

function renderControls() {
  $("#clothesControls").innerHTML = [
    makeOptions("outfitMode"), makeOptions("top"), makePalette("topColor", "Üst rengi", "top"),
    makeOptions("bottom"), makePalette("bottomColor", "Alt rengi", "bottom"),
    makeOptions("dress"), makePalette("dressColor", "Elbise rengi", "dress"),
    makeOptions("jacket"), makePalette("jacketColor", "Ceket rengi", "jacket"),
    makeOptions("shoes"), makePalette("shoeColor", "Ayakkabı rengi", "shoe")
  ].join("");

  $("#beautyControls").innerHTML = [
    makeOptions("hairStyle"), makePalette("hair", "Saç rengi", "hair"), makePalette("skin", "Ten rengi", "skin"),
    makePalette("eyes", "Göz rengi", "eyes"), makePalette("lips", "Ruj rengi", "lips")
  ].join("");

  const accessories = [
    ["necklace", "📿", "Kolye"], ["glasses", "👓", "Gözlük"], ["crown", "👑", "Taç"],
    ["bag", "👜", "Çanta"], ["earrings", "💎", "Küpe"]
  ];
  $("#accessoryControls").innerHTML = `<section class="control-section"><div class="control-title"><span>Aksesuarlar</span></div><div class="toggle-grid">${accessories.map(([id, icon, name]) => `<button class="toggle-card" type="button" data-accessory="${id}" aria-pressed="false"><span>${icon}</span>${name}</button>`).join("")}</div></section>${makePalette("bagColor", "Çanta rengi", "bag")}`;
  $("#sceneControls").innerHTML = makeOptions("scene");

  $("#challengeGrid").innerHTML = data.challenges.map(challenge => `<button class="challenge-card" type="button" data-challenge="${challenge.id}" data-emoji="${challenge.emoji}" style="--challenge-bg:${challenge.background}"><strong>${escapeHtml(challenge.title)}</strong><small>${escapeHtml(challenge.description)}</small></button>`).join("");
}

function bindEvents() {
  $(".tabs").addEventListener("click", event => {
    const tab = event.target.closest(".tab"); if (!tab) return;
    $$(".tab").forEach(item => item.classList.remove("active"));
    $$(".wardrobe-panel").forEach(item => item.classList.remove("active"));
    tab.classList.add("active"); document.getElementById(tab.dataset.panel).classList.add("active"); playTone("tap");
  });

  $(".wardrobe-card").addEventListener("click", event => {
    const option = event.target.closest("[data-state-key]");
    if (option) return setState({ [option.dataset.stateKey]: option.dataset.value });
    const swatch = event.target.closest("[data-color-key]");
    if (swatch) return setState({ [swatch.dataset.colorKey]: swatch.dataset.color });
    const toggle = event.target.closest("[data-accessory]");
    if (toggle) return setAccessory(toggle.dataset.accessory, !state.accessories[toggle.dataset.accessory]);
    const challenge = event.target.closest("[data-challenge]");
    if (challenge) return setState({ challenge: challenge.dataset.challenge });
    const load = event.target.closest("[data-load-save]"); if (load) return loadSaved(Number(load.dataset.loadSave));
    const remove = event.target.closest("[data-remove-save]"); if (remove) return removeSaved(Number(remove.dataset.removeSave));
  });

  $("#undoButton").addEventListener("click", undo);
  $("#redoButton").addEventListener("click", redo);
  $("#randomButton").addEventListener("click", randomize);
  $("#resetButton").addEventListener("click", resetGame);
  $("#evaluateButton").addEventListener("click", evaluateLook);
  $("#saveLookButton").addEventListener("click", saveLook);
  $("#downloadButton").addEventListener("click", downloadPng);
  $("#clearSavedButton").addEventListener("click", clearSaved);
  $("#closeResultButton").addEventListener("click", () => $("#resultDialog").close());
  $("#soundButton").addEventListener("click", () => {
    soundEnabled = !soundEnabled; storage.set(SETTINGS_KEY, JSON.stringify(soundEnabled)); updateSoundButton();
    if (soundEnabled) playTone("success");
  });

  document.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") { event.preventDefault(); event.shiftKey ? redo() : undo(); }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") { event.preventDefault(); saveLook(); }
    if (event.key.toLowerCase() === "r" && !["INPUT","TEXTAREA"].includes(document.activeElement.tagName)) randomize();
  });
}

function randomItem(group) { const items = data.groups[group].items; return items[Math.floor(Math.random() * items.length)].id; }
function randomColor(palette) { const colors = data.palettes[palette]; return colors[Math.floor(Math.random() * colors.length)]; }
function randomize() {
  const accessories = Object.fromEntries(Object.keys(state.accessories).map(key => [key, Math.random() > .58]));
  setState({
    outfitMode: Math.random() > .48 ? "dress" : "separates", top: randomItem("top"), bottom: randomItem("bottom"), dress: randomItem("dress"),
    jacket: Math.random() > .7 ? randomItem("jacket") : "none", shoes: randomItem("shoes"), hairStyle: randomItem("hairStyle"), scene: randomItem("scene"),
    skin: randomColor("skin"), hair: randomColor("hair"), eyes: randomColor("eyes"), lips: randomColor("lips"),
    topColor: randomColor("top"), bottomColor: randomColor("bottom"), dressColor: randomColor("dress"), jacketColor: randomColor("jacket"),
    shoeColor: randomColor("shoe"), bagColor: randomColor("bag"), accessories
  });
  toast("Yeni bir kombin oluşturuldu ✨", "success");
}

function resetGame() {
  history.push(clone(state)); future = []; state = clone(defaultState); applyState();
  $("#lookName").value = "Pembe Rüya"; toast("Kombin başlangıç haline döndü.");
}

function evaluateLook() {
  const { score, matches, missing } = calculateScore();
  const stars = Math.round(score / 20);
  const messages = [
    "Biraz daha tema odaklı seçim yaparak puanını yükseltebilirsin.",
    "Güzel bir başlangıç! Görev hedeflerinden birkaçını daha tamamla.",
    "Dengeli bir kombin. Birkaç son dokunuş seni zirveye taşıyabilir.",
    "Çok iyi! Moda jürisi görünümünü oldukça beğendi.",
    "Muhteşem! Temayı kusursuz yorumladın ve podyumun yıldızı oldun."
  ];
  $("#resultIcon").textContent = score === 100 ? "🏆" : score >= 80 ? "🌟" : score >= 60 ? "✨" : "🎀";
  $("#resultTitle").textContent = score === 100 ? "Kusursuz kombin!" : score >= 80 ? "Podyuma hazırsın!" : score >= 60 ? "Çok şık görünüyorsun!" : "Stil yolculuğu devam ediyor!";
  $("#resultStars").textContent = "★".repeat(stars) + "☆".repeat(5 - stars);
  $("#resultScore").textContent = `${score} / 100`;
  $("#resultMessage").textContent = `${messages[Math.max(0, stars - 1)]} ${missing.length ? `Eksik hedef sayısı: ${missing.length}.` : "Tüm hedefleri tamamladın!"}`;
  $("#resultDialog").showModal();
  if (score >= 80) { launchConfetti(); playTone("success"); } else playTone("save");
  console.info("Challenge matches:", matches);
}

function launchConfetti() {
  const holder = $("#confetti"); holder.innerHTML = "";
  const colors = ["#f72585", "#8b5cf6", "#f4b942", "#2ccf9f", "#fff", "#ff6f91"];
  for (let i = 0; i < 70; i++) {
    const piece = document.createElement("i");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.setProperty("--confetti", colors[Math.floor(Math.random() * colors.length)]);
    piece.style.setProperty("--wind", `${(Math.random() - .5) * 260}px`);
    piece.style.animationDelay = `${Math.random() * .35}s`;
    holder.appendChild(piece);
  }
  setTimeout(() => holder.innerHTML = "", 2300);
}

function getSaved() {
  try { return JSON.parse(storage.get(STORAGE_KEY, "[]")); } catch { return []; }
}
function saveLook() {
  const name = $("#lookName").value.trim() || "İsimsiz Kombin";
  const saves = getSaved();
  saves.unshift({ name, date: new Date().toISOString(), state: clone(state) });
  storage.set(STORAGE_KEY, JSON.stringify(saves.slice(0, 10)));
  renderSaved(); playTone("save"); toast(`“${name}” kaydedildi.`, "success");
}
function loadSaved(index) {
  const item = getSaved()[index]; if (!item) return;
  history.push(clone(state)); future = []; state = { ...clone(defaultState), ...clone(item.state), accessories: { ...defaultState.accessories, ...item.state.accessories } };
  $("#lookName").value = item.name; applyState(); toast(`“${item.name}” yüklendi.`, "success");
}
function removeSaved(index) {
  const saves = getSaved(); const [removed] = saves.splice(index, 1); storage.set(STORAGE_KEY, JSON.stringify(saves));
  renderSaved(); toast(removed ? `“${removed.name}” silindi.` : "Kayıt silindi.");
}
function clearSaved() {
  if (!getSaved().length) return toast("Silinecek kayıt bulunmuyor.");
  storage.remove(STORAGE_KEY); renderSaved(); toast("Tüm kayıtlar silindi.");
}
function renderSaved() {
  const saves = getSaved();
  $("#savedGrid").innerHTML = saves.length ? saves.map((item, index) => {
    const date = new Intl.DateTimeFormat("tr-TR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(item.date));
    const preview = item.state.scene === "night" ? "linear-gradient(135deg,#17143d,#6d2a6b)" : item.state.scene === "beach" ? "linear-gradient(135deg,#79d7ff,#f3d18e)" : item.state.scene === "snow" ? "linear-gradient(135deg,#b9dcf5,#fff)" : "linear-gradient(135deg,#ffd4e8,#e5d8ff)";
    return `<article class="saved-card"><div class="saved-preview" style="--preview:${preview}">${item.state.outfitMode === "dress" ? "👗" : "👚"}</div><div><strong>${escapeHtml(item.name)}</strong><small>${date} · ${escapeHtml(activeChallengeName(item.state.challenge))}</small></div><div class="saved-actions"><button type="button" data-load-save="${index}" title="Yükle">↗</button><button type="button" data-remove-save="${index}" title="Sil">🗑️</button></div></article>`;
  }).join("") : `<div class="empty-state"><span>💾</span><strong>Henüz kayıt yok</strong><p>Beğendiğin kombini “Kaydet” düğmesiyle burada saklayabilirsin.</p></div>`;
}
function activeChallengeName(id) { return data.challenges.find(item => item.id === id)?.title || "Moda görevi"; }

async function downloadPng() {
  try {
    const copy = svg.cloneNode(true);
    copy.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    copy.setAttribute("width", "1200"); copy.setAttribute("height", "1680");
    copy.style.width = "1200px"; copy.style.height = "1680px";
    const source = new XMLSerializer().serializeToString(copy);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob); const image = new Image();
    await new Promise((resolve, reject) => { image.onload = resolve; image.onerror = reject; image.src = url; });
    const canvas = document.createElement("canvas"); canvas.width = 1200; canvas.height = 1680;
    const context = canvas.getContext("2d"); context.drawImage(image, 0, 0, canvas.width, canvas.height); URL.revokeObjectURL(url);
    const png = await new Promise(resolve => canvas.toBlob(resolve, "image/png", 1));
    const link = document.createElement("a"); link.href = URL.createObjectURL(png);
    const fileName = ($("#lookName").value.trim() || "kombin").toLocaleLowerCase("tr-TR").replace(/[^a-z0-9çğıöşü]+/gi, "-").replace(/^-|-$/g, "");
    link.download = `${fileName || "kombin"}.png`; link.click(); setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    playTone("save"); toast("Kombin PNG olarak indirildi.", "success");
  } catch (error) {
    console.error(error); playTone("error"); toast("Görsel oluşturulamadı. Tarayıcını güncelleyip tekrar dene.", "error");
  }
}

function updateSoundButton() {
  const button = $("#soundButton"); button.textContent = soundEnabled ? "🔊" : "🔇"; button.setAttribute("aria-pressed", String(soundEnabled));
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(error => console.info("Service worker yüklenemedi:", error)));
  }
}

function init() {
  renderControls(); bindEvents(); renderSaved(); updateSoundButton(); applyState(); registerServiceWorker();
}

init();

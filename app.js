const WHATSAPP_NUMBER = "6287782620758";
const CART_STORAGE_KEY = "dapur-pangeran-demo-cart-v1";
const IDR = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 });
const cart = loadCart();
let activeCategory = "semua";
let toastTimer;
let focusBeforeDrawer;

const elements = {
  categoryNav: document.querySelector("#category-nav"),
  groups: document.querySelector("#menu-groups"),
  search: document.querySelector("#menu-search"),
  resultCount: document.querySelector("#result-count"),
  count: document.querySelector("#cart-count"),
  drawerCount: document.querySelector("#drawer-count"),
  drawer: document.querySelector("#cart-drawer"),
  backdrop: document.querySelector("#drawer-backdrop"),
  cartLines: document.querySelector("#cart-lines"),
  total: document.querySelector("#cart-total"),
  minimumWarning: document.querySelector("#minimum-warning"),
  sendOrder: document.querySelector("#send-order"),
  form: document.querySelector("#order-form"),
  date: document.querySelector('[name="date"]'),
  leadWarning: document.querySelector("#lead-warning"),
  toast: document.querySelector("#toast")
};

function formatPrice(value) {
  return `Rp ${IDR.format(value)}`;
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved.filter(line => line && line.key && Number.isFinite(line.qty) && line.qty > 0) : [];
  } catch {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {
    showToast("Keranjang tidak dapat disimpan di perangkat ini.");
  }
}

function getCategory(categoryId) {
  return window.MENU_CATEGORIES.find(category => category.id === categoryId);
}

function getItem(categoryId, itemName) {
  return getCategory(categoryId)?.items.find(item => item.name === itemName);
}

function renderCategoryNav() {
  const chips = [{ id: "semua", shortName: "Semua Menu" }, ...window.MENU_CATEGORIES];
  elements.categoryNav.innerHTML = chips.map(category => `
    <button class="category-chip${activeCategory === category.id ? " is-active" : ""}" type="button" data-category="${escapeHtml(category.id)}" aria-pressed="${activeCategory === category.id}">${escapeHtml(category.shortName)}</button>
  `).join("");
}

function optionControls(category, item) {
  if (!category.options) return "";
  if (category.options.kind === "kanjeng") {
    return `<label class="option-select">Paket<select class="card-option" data-option="package"><option value="Reguler">Reguler</option><option value="Extra">Extra (+Rp 7.000)</option><option value="Premium">Premium (+Rp 20.000)</option></select></label>
      <div class="premium-options" data-premium-options hidden><label class="option-select">Pilihan 1<select class="premium-choice"><option value="">Pilih tambahan</option>${category.options.values.map(value => `<option>${escapeHtml(value)}</option>`).join("")}</select></label><label class="option-select">Pilihan 2<select class="premium-choice"><option value="">Pilih tambahan</option>${category.options.values.map(value => `<option>${escapeHtml(value)}</option>`).join("")}</select></label><label class="option-select">Pilihan 3<select class="premium-choice"><option value="">Pilih tambahan</option>${category.options.values.map(value => `<option>${escapeHtml(value)}</option>`).join("")}</select></label></div>`;
  }
  if (category.options.kind === "ningrat") {
    const prawns = item.name === "Ningrat 1" ? `<label class="option-select">Pilihan udang<select class="card-option" data-option="udang"><option>Udang Mayonaise</option><option>Udang Gandum</option></select></label>` : "";
    return `${prawns}<label class="option-select">Pilihan buah<select class="card-option" data-option="buah"><option>Buah Pisang</option><option>Jeruk</option></select></label>`;
  }
  if (category.options.kind === "packaging") {
    return `<label class="option-select">Kemasan besek<select class="card-option" data-option="kemasan">${window.PACKAGING_OPTIONS.map(option => `<option value="${escapeHtml(option.name)}" data-price="${option.price}">${escapeHtml(option.name)}${option.price ? ` (+${formatPrice(option.price)})` : ""}</option>`).join("")}</select></label>`;
  }
  return "";
}

function orderBadge(category, item) {
  const labels = [];
  if (category.minLabel) labels.push(category.minLabel);
  const leadTime = item.leadTime || category.leadTime;
  if (leadTime) labels.push(`Pesan H-${leadTime}`);
  return labels.map(label => `<span class="menu-badge${label.includes("H-") ? " badge-lead" : ""}">${escapeHtml(label)}</span>`).join("");
}

function itemCard(category, item, index) {
  if (category.id === "snack") {
    return `<article class="menu-card snack-choice-card" data-name="${escapeHtml(`${item.name} ${item.description}`.toLowerCase())}">
      <div class="menu-card-body"><div class="menu-card-top"><span class="menu-badge">${item.description.includes("H-2") ? "Pesan H-2" : item.description.includes("manis") ? "Snack manis" : "Snack asin"}</span>${item.leadTime ? "<span class=\"menu-badge badge-lead\">Pesan H-2</span>" : ""}</div><h3>${escapeHtml(item.name)}</h3><p class="menu-description">${escapeHtml(item.description.replace(/ Pesan min\. H-2\./, ""))}</p><div class="card-bottom"><strong class="menu-price">${formatPrice(item.price)} <small>/ snack per box</small></strong><label class="snack-check"><input type="checkbox" class="snack-pick" value="${escapeHtml(item.name)}" aria-label="Pilih ${escapeHtml(item.name)} per box"><span>Pilih per box</span></label></div></div>
    </article>`;
  }
  const image = item.image || category.image;
  return `<article class="menu-card" data-name="${escapeHtml(`${item.name} ${item.description || ""}`.toLowerCase())}">
    <div class="menu-card-body"><div class="menu-card-top">${orderBadge(category, item)}</div><h3>${escapeHtml(item.name)}</h3><p class="menu-description">${escapeHtml(item.description || "Hidangan pilihan Dapur Pangeran.")}</p>
      ${optionControls(category, item)}
      <div class="card-bottom"><strong class="menu-price">${formatPrice(item.price)} <small>/ ${escapeHtml(item.portions ? "paket" : category.unit)}</small></strong><div class="card-actions"><div class="stepper" role="group" aria-label="Jumlah ${escapeHtml(item.name)}"><button type="button" data-quantity="down" aria-label="Kurangi jumlah">−</button><output>1</output><button type="button" data-quantity="up" aria-label="Tambah jumlah">+</button></div><button type="button" class="add-button" data-add>Tambah</button></div></div>
    </div>
  </article>`;
}

function snackComposer(category) {
  if (category.id !== "snack") return "";
  return `<div class="snack-composer"><div><h3>Racik snack box Anda</h3><p>Pilih maksimal 4 snack di atas dan maksimal 1 minuman. Pesanan minimal 30 box.</p></div><div class="composer-controls"><label class="option-select">Minuman<select id="snack-drink">${window.SNACK_DRINKS.map(name => `<option>${escapeHtml(name)}</option>`).join("")}</select></label><label class="option-select">Jumlah box<input id="snack-box-qty" type="number" min="30" step="1" value="30" inputmode="numeric"></label><button type="button" class="button button-primary" id="add-snack-box">Tambah Snack Box</button><p class="snack-packaging-note" id="snack-packaging-note">Biaya kemasan Snack Box Rp 1.000 per box, gratis jika pesan lebih dari 50 box.</p></div></div>`;
}

function renderMenu() {
  const searchTerm = elements.search.value.trim().toLocaleLowerCase("id-ID");
  const categories = window.MENU_CATEGORIES.filter(category => activeCategory === "semua" || category.id === activeCategory);
  let shownItems = 0;
  const usedArt = new Set();
  const groups = categories.map(category => {
    const items = category.items.filter(item => !searchTerm || `${item.name} ${item.description || ""} ${category.name}`.toLocaleLowerCase("id-ID").includes(searchTerm));
    if (!items.length) return "";
    shownItems += items.length;
    const showArt = category.image && category.image !== "hidangan.svg" && !usedArt.has(category.image);
    if (showArt) usedArt.add(category.image);
    const art = showArt ? `<img class="category-art" src="assets/img/${escapeHtml(category.image)}" alt="Ilustrasi ${escapeHtml(category.name)}" loading="lazy">` : "";
    return `<section class="menu-category${showArt ? " has-art" : ""}" id="kategori-${escapeHtml(category.id)}" aria-labelledby="heading-${escapeHtml(category.id)}"><div class="category-heading"><div class="category-title"><h2 id="heading-${escapeHtml(category.id)}">${escapeHtml(category.name)}</h2><p>${escapeHtml(category.description)}</p></div>${art}</div>${snackComposer(category)}<div class="menu-grid">${items.map((item, index) => itemCard(category, item, index)).join("")}</div></section>`;
  }).join("");
  elements.groups.innerHTML = groups || `<div class="empty-state"><h2>Menu belum ditemukan</h2><p>Coba kata kunci atau kategori lain.</p></div>`;
  elements.resultCount.textContent = `${shownItems} menu`;
  renderCategoryNav();
}

function selectedOptions(card, category, item) {
  const values = {};
  card.querySelectorAll("[data-option]").forEach(select => { values[select.dataset.option] = select.value; });
  if (category.options?.kind === "kanjeng" && values.package === "Premium") {
    const choices = [...card.querySelectorAll(".premium-choice")].map(select => select.value);
    if (choices.some(choice => !choice) || new Set(choices).size !== 3) {
      showToast("Paket Premium perlu 3 pilihan tambahan yang berbeda.");
      return null;
    }
    values.tambahan = choices;
  }
  let price = item.price;
  let optionText = "";
  if (category.options?.kind === "kanjeng") {
    if (values.package === "Extra") price += 7000;
    if (values.package === "Premium") price += 20000;
    optionText = values.package === "Extra" ? "Paket Extra (Cleo 220 ml, buah)" : values.package === "Premium" ? `Paket Premium (${values.tambahan.join(", ")})` : "Paket Reguler";
  } else if (category.options?.kind === "ningrat") {
    optionText = [values.udang, values.buah].filter(Boolean).join(", ");
  } else if (category.options?.kind === "packaging") {
    const selected = card.querySelector('[data-option="kemasan"] option:checked');
    price += Number(selected.dataset.price || 0);
    optionText = values.kemasan;
  }
  return { price, optionText };
}

function addLine({ category, itemName, unitPrice, qty, unit, optionText = "", leadTime = 0, portions = 1 }) {
  const key = [category.id, itemName, optionText, unitPrice].join("|");
  const existing = cart.find(line => line.key === key);
  if (existing) existing.qty += qty;
  else cart.push({ key, categoryId: category.id, categoryName: category.name, itemName, unitPrice, qty, unit, optionText, leadTime, portions });
  saveCart();
  renderCart();
  showToast(`${itemName} ditambahkan ke keranjang.`);
}

function addSnackBox() {
  const category = getCategory("snack");
  const picks = [...document.querySelectorAll(".snack-pick:checked")].map(input => input.value);
  const qty = Math.floor(Number(document.querySelector("#snack-box-qty").value));
  const drink = document.querySelector("#snack-drink").value;
  if (!picks.length || picks.length > 4) return showToast("Pilih 1 sampai 4 jenis snack untuk setiap box.");
  if (!Number.isFinite(qty) || qty < 30) return showToast("Snack Box memiliki minimum pemesanan 30 box.");
  const snackTotal = picks.reduce((sum, name) => sum + getItem("snack", name).price, 0);
  const drinkPrices = { "Tanpa minuman": 0, "Teh Kotak": 6000, "Cleo 220 ml": 2000, "Aqua Gelas": 2000, "Aqua Botol 330 ml": 4000 };
  const packagingFee = qty > 50 ? 0 : 1000;
  const unitPrice = snackTotal + (drinkPrices[drink] || 0) + packagingFee;
  const options = [...picks, drink !== "Tanpa minuman" ? drink : "", packagingFee ? "Kemasan Snack Box" : ""].filter(Boolean);
  addLine({ category, itemName: "Snack Box", unitPrice, qty, unit: "box", optionText: options.join(", ") });
  document.querySelectorAll(".snack-pick:checked").forEach(input => { input.checked = false; });
}

function lineCount(category) {
  return cart.filter(line => line.categoryId === category.id).reduce((sum, line) => sum + line.qty * (line.portions || 1), 0);
}

function minimumIssues() {
  return window.MENU_CATEGORIES.filter(category => category.minOrder > 1 && lineCount(category) > 0 && lineCount(category) < category.minOrder)
    .map(category => `${category.name}: minimal ${category.minOrder} ${category.unit}${lineCount(category) > 1 ? ` (saat ini ${lineCount(category)})` : ""}`);
}

function getShippingHint() {
  const riceBoxCount = cart.filter(line => getCategory(line.categoryId)?.group === "rice").reduce((sum, line) => sum + line.qty, 0);
  if (riceBoxCount >= 100) return "Pesanan nasi box memenuhi gratis ongkir hingga 20 km.";
  if (riceBoxCount >= 50) return `Pesanan nasi box memenuhi gratis ongkir hingga 10 km. Tambah ${100 - riceBoxCount} box untuk gratis ongkir 20 km.`;
  if (riceBoxCount > 0) return `Tambah ${50 - riceBoxCount} box nasi lagi untuk gratis ongkir 10 km.`;
  return "Gratis ongkir 10 km mulai 50 box, dan 20 km mulai 100 box nasi.";
}

function renderCart() {
  const totalQty = cart.reduce((sum, line) => sum + line.qty, 0);
  const total = cart.reduce((sum, line) => sum + line.qty * line.unitPrice, 0);
  elements.count.textContent = totalQty;
  elements.drawerCount.textContent = `(${totalQty})`;
  document.querySelector("#open-cart").setAttribute("aria-label", `Buka keranjang, ${totalQty} item`);
  elements.total.textContent = formatPrice(total);
  elements.cartLines.innerHTML = cart.length ? cart.map(line => `
    <article class="cart-line"><div class="cart-line-info"><div class="cart-line-title"><h3>${escapeHtml(line.itemName)}</h3><button type="button" data-cart-action="remove" data-key="${escapeHtml(line.key)}" aria-label="Hapus ${escapeHtml(line.itemName)}">Hapus</button></div>
      ${line.optionText ? `<p class="cart-option">${escapeHtml(line.optionText)}</p>` : ""}<p class="cart-unit-price">${formatPrice(line.unitPrice)} / ${escapeHtml(line.unit)}</p><div class="cart-line-bottom"><div class="stepper cart-stepper"><button type="button" data-cart-action="down" data-key="${escapeHtml(line.key)}" aria-label="Kurangi ${escapeHtml(line.itemName)}">−</button><output>${line.qty}</output><button type="button" data-cart-action="up" data-key="${escapeHtml(line.key)}" aria-label="Tambah ${escapeHtml(line.itemName)}">+</button></div><strong>${formatPrice(line.qty * line.unitPrice)}</strong></div></div></article>`).join("") : `<div class="cart-empty"><h3>Keranjang masih kosong</h3><p>Pilih menu favorit untuk memulai pesanan.</p><button type="button" class="text-button" data-close-cart>Lihat menu <span aria-hidden="true">↗</span></button></div>`;
  const issues = minimumIssues();
  const hint = getShippingHint();
  elements.minimumWarning.innerHTML = `${issues.length ? `<span class="minimum-issues">${issues.map(escapeHtml).join("<br>")}</span>` : ""}<span class="shipping-hint">${escapeHtml(hint)}</span>`;
  elements.sendOrder.disabled = !cart.length || issues.length > 0;
  saveCart();
}

function openDrawer() {
  focusBeforeDrawer = document.activeElement;
  elements.drawer.classList.add("is-open");
  elements.drawer.setAttribute("aria-hidden", "false");
  elements.drawer.inert = false;
  elements.backdrop.hidden = false;
  document.body.classList.add("drawer-open");
  document.querySelector("#close-cart").focus();
}

function closeDrawer() {
  elements.drawer.classList.remove("is-open");
  elements.drawer.setAttribute("aria-hidden", "true");
  elements.drawer.inert = true;
  elements.backdrop.hidden = true;
  document.body.classList.remove("drawer-open");
  focusBeforeDrawer?.focus();
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 3100);
}

function localDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function updateLeadWarning() {
  const datedLines = cart.filter(line => line.leadTime > 0);
  if (!elements.date.value || !datedLines.length) {
    elements.leadWarning.hidden = true;
    elements.leadWarning.textContent = "";
    return;
  }
  const selectedDate = new Date(`${elements.date.value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysAhead = Math.floor((selectedDate - today) / 86400000);
  const requiredDays = Math.max(...datedLines.map(line => line.leadTime));
  if (daysAhead < requiredDays) {
    elements.leadWarning.hidden = false;
    elements.leadWarning.textContent = `Perhatian: ${datedLines.map(line => line.itemName).join(", ")} perlu dipesan minimal H-${requiredDays}. Tanggal yang dipilih kurang dari waktu persiapan tersebut.`;
  } else {
    elements.leadWarning.hidden = true;
    elements.leadWarning.textContent = "";
  }
}

function updateSnackPackagingNote() {
  const qty = Number(document.querySelector("#snack-box-qty")?.value || 0);
  const note = document.querySelector("#snack-packaging-note");
  if (!note) return;
  const free = qty > 50;
  note.textContent = free ? "Biaya kemasan gratis untuk pesanan di atas 50 box." : "Biaya kemasan Snack Box Rp 1.000 per box, gratis jika pesan lebih dari 50 box.";
}

function createWhatsAppMessage() {
  const formData = new FormData(elements.form);
  const lines = cart.map((line, index) => {
    const options = line.optionText ? ` (${line.optionText})` : "";
    return `${index + 1}. ${line.itemName}${options} x ${line.qty} = ${formatPrice(line.qty * line.unitPrice)}`;
  });
  return `Halo Dapur Pangeran, saya ingin memesan:\n\n${lines.join("\n")}\n\nTotal: ${formatPrice(cart.reduce((sum, line) => sum + line.qty * line.unitPrice, 0))}\n(belum termasuk ongkir)\n\nNama: ${formData.get("name")}\nNo. HP: ${formData.get("phone")}\nTanggal acara: ${formData.get("date")}\nJam kirim: ${formData.get("time")}\nAlamat: ${formData.get("address")}\nCatatan: ${formData.get("notes") || "-"}`;
}

elements.categoryNav.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderMenu();
  document.querySelector("#menu").scrollIntoView({ behavior: "smooth" });
});

elements.search.addEventListener("input", () => {
  activeCategory = "semua";
  renderMenu();
});

elements.groups.addEventListener("click", event => {
  const card = event.target.closest(".menu-card");
  const categoryElement = event.target.closest(".menu-category");
  if (event.target.closest("#add-snack-box")) return addSnackBox();
  if (!card) return;
  const output = card.querySelector(".stepper output");
  if (event.target.closest('[data-quantity="up"]')) output.value = Number(output.value || output.textContent) + 1, output.textContent = output.value;
  if (event.target.closest('[data-quantity="down"]')) {
    const next = Math.max(1, Number(output.value || output.textContent) - 1);
    output.value = next;
    output.textContent = next;
  }
  if (event.target.matches("[data-add]")) {
    const category = getCategory(categoryElement.id.replace("kategori-", ""));
    const item = getItem(category.id, card.querySelector("h3").textContent);
    const chosen = selectedOptions(card, category, item);
    if (!chosen) return;
    addLine({ category, itemName: item.name, unitPrice: chosen.price, qty: Number(output.value || output.textContent), unit: category.unit, optionText: chosen.optionText, leadTime: item.leadTime || category.leadTime || 0, portions: item.portions || 1 });
  }
});

elements.groups.addEventListener("change", event => {
  if (event.target.matches('[data-option="package"]')) {
    const premium = event.target.closest(".menu-card").querySelector(".premium-options");
    premium.hidden = event.target.value !== "Premium";
  }
  if (event.target.matches(".snack-pick") && document.querySelectorAll(".snack-pick:checked").length > 4) {
    event.target.checked = false;
    showToast("Snack box maksimal berisi 4 jenis snack.");
  }
  if (event.target.matches("#snack-box-qty")) updateSnackPackagingNote();
});

elements.groups.addEventListener("input", event => {
  if (event.target.matches("#snack-box-qty")) updateSnackPackagingNote();
});

document.querySelector("#open-cart").addEventListener("click", openDrawer);
document.querySelector("#close-cart").addEventListener("click", closeDrawer);
elements.backdrop.addEventListener("click", closeDrawer);
elements.cartLines.addEventListener("click", event => {
  const button = event.target.closest("[data-cart-action]");
  if (!button) return;
  const lineIndex = cart.findIndex(line => line.key === button.dataset.key);
  if (lineIndex < 0) return;
  if (button.dataset.cartAction === "remove") cart.splice(lineIndex, 1);
  if (button.dataset.cartAction === "up") cart[lineIndex].qty += 1;
  if (button.dataset.cartAction === "down") {
    cart[lineIndex].qty -= 1;
    if (cart[lineIndex].qty <= 0) cart.splice(lineIndex, 1);
  }
  saveCart();
  renderCart();
  updateLeadWarning();
});
elements.cartLines.addEventListener("click", event => {
  if (event.target.closest("[data-close-cart]")) closeDrawer();
});

elements.form.addEventListener("input", updateLeadWarning);
elements.form.addEventListener("change", updateLeadWarning);
elements.form.addEventListener("submit", event => {
  event.preventDefault();
  if (!elements.form.reportValidity()) return;
  if (minimumIssues().length) return showToast("Periksa kembali minimum pesanan setiap kategori.");
  updateLeadWarning();
  if (WHATSAPP_NUMBER === "628XXXXXXXXXX" || !/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
    showToast("Ini versi demo. Nomor WhatsApp belum dikonfigurasi.");
    return;
  }
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(createWhatsAppMessage())}`;
  window.open(url, "_blank", "noopener,noreferrer");
});

document.querySelectorAll("[data-whatsapp-chat]").forEach(button => button.addEventListener("click", () => {
  if (WHATSAPP_NUMBER === "628XXXXXXXXXX" || !/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
    showToast("Ini versi demo. Nomor WhatsApp belum dikonfigurasi.");
    return;
  }
  window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank", "noopener,noreferrer");
}));

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && elements.drawer.classList.contains("is-open")) closeDrawer();
});

elements.date.min = localDateString(new Date());
document.querySelector("#year").textContent = new Date().getFullYear();
renderMenu();
renderCart();
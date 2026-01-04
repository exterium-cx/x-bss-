const ITEMS = [
  "magicBean",
  "superSmoothie",
  "starJelly",
  "purplePotion",
  "tropicalDrink",
  "glue",
  "enzymes",
  "oil",
  "swirledWax",
  "hardWax",
  "softWax",
  "causticWax",
  "redExtract",
  "blueExtract"
];

const MATERIALS = [
  "gumdrops",
  "stinger",
  "coconut",
  "pineapple",
  "blueberry",
  "strawberry",
  "neonberry",
  "bitterberry",
  "moonCharm",
  "sunflowerSeed",
  "royalJelly",
  "diamondEgg",
  "spiritPetal",
  "turpentine"
];

const VIALS = [
  "comfortingVial",
  "invigoratingVial",
  "satisfyingVial",
  "refreshingVial",
  "motivatingVial"
];

function formatName(name) {
  return name.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase());
}

function matImg(item) {
  return `/images/items/${item[0].toUpperCase() + item.slice(1)}.png`;
}

function getInventory() {
  return JSON.parse(localStorage.getItem("inventory") || "{}");
}

function setInventory(data) {
  localStorage.setItem("inventory", JSON.stringify(data));
}

function autoSave() {
  const data = {};
  document.querySelectorAll(".inventoryInput").forEach(input => {
    data[input.dataset.key] = Number(input.value) || 0;
  });
  setInventory(data);
}

function resetInventory() {
  if (!confirm("Reset entire inventory?")) return;

  localStorage.removeItem("inventory");
  renderInventory();
}

function createRow(item, value) {
  return `
    <div class="inventoryRow">
      <img src="${matImg(item)}" onerror="this.style.display='none'">
      <span>${formatName(item)}</span>
      <input
        type="number"
        class="inventoryInput"
        data-key="${item}"
        value="${value}"
        min="0"
        inputmode="numeric"
      >
    </div>
  `;
}

function renderSection(title, items, inventory) {
  let html = `<h3 class="inventorySection">${title}</h3>`;
  items.forEach(item => {
    html += createRow(item, inventory[item] || 0);
  });
  return html;
}

function renderInventory() {
  const list = document.getElementById("inventoryList");
  if (!list) return;

  const inventory = getInventory();
  list.innerHTML = "";

  list.innerHTML += renderSection("Materials", MATERIALS, inventory);
  list.innerHTML += renderSection("Items", ITEMS, inventory);
  list.innerHTML += renderSection("Vials", VIALS, inventory);

  document.querySelectorAll(".inventoryInput").forEach(input => {
    input.addEventListener("input", autoSave);
  });
}

document.addEventListener("DOMContentLoaded", renderInventory);
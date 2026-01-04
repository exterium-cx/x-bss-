const ROYAL_JELLY_PRICE = 10_000_000;

function isBase(item) {
  return BASE_ITEMS.includes(item);
}

function formatName(name) {
  return name.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase());
}

function imagePath(item) {
  return `/images/items/${item[0].toUpperCase() + item.slice(1)}.png`;
}

function populateItems() {
  const select = document.getElementById("item");
  const items = Object.keys(RECIPES).sort((a, b) =>
    formatName(a).localeCompare(formatName(b))
  );

  for (const item of items) {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = formatName(item);
    select.appendChild(option);
  }
}

function buildTree(item, qty) {
  if (isBase(item)) return { item, qty, base: true };

  const recipe = RECIPES[item];
  if (!recipe) return { item, qty, base: true };

  return {
    item,
    qty,
    base: false,
    children: Object.entries(recipe).map(
      ([ing, amount]) => buildTree(ing, amount * qty)
    )
  };
}

function renderTree(node, includeRJ, depth = 0) {
  const id = Math.random().toString(36).slice(2);
  const hasChildren = node.children && node.children.length > 0;
  const cls = node.base ? "base" : "product";

  let html = `
    <div class="item ${cls}" style="margin-left:${depth * 14}px">
      ${hasChildren
        ? `<span class="toggle" onclick="toggle('${id}', this)">▶</span>`
        : `<span class="toggle empty"></span>`}

      <img src="${imagePath(node.item)}" class="icon"
        onerror="this.style.display='none'">

      ${node.qty.toLocaleString()} × ${formatName(node.item)}
      ${includeRJ && node.item === "royalJelly"
        ? `<em> (≈ ${(node.qty * ROYAL_JELLY_PRICE).toLocaleString()} honey)</em>`
        : ""}
    </div>
  `;

  if (hasChildren) {
    html += `<div id="${id}" class="children hidden">`;
    for (const child of node.children) {
      html += renderTree(child, includeRJ, depth + 1);
    }
    html += `</div>`;
  }

  return html;
}

function collectBaseTotals(node, totals = {}) {
  if (node.base) {
    totals[node.item] = (totals[node.item] || 0) + node.qty;
    return totals;
  }

  if (node.children) {
    for (const child of node.children) {
      collectBaseTotals(child, totals);
    }
  }

  return totals;
}

function renderTotals(totals, includeRJ) {
  let html = "";

  for (const item in totals) {
    html += `
      <div class="base">
        ${formatName(item)}: ${totals[item].toLocaleString()}
        ${includeRJ && item === "royalJelly"
          ? `<em><br>≈ ${(totals[item] * ROYAL_JELLY_PRICE).toLocaleString()} honey</em>`
          : ""}
      </div>
    `;
  }

  document.getElementById("totalsOutput").innerHTML = html;
}

function calculate() {
  const item = document.getElementById("item").value;
  const qty = parseInt(document.getElementById("quantity").value, 10);
  const includeRJ = document.getElementById("includeRJ").checked;
  const showTotals = document.getElementById("showTotals").checked;

  const tree = buildTree(item, qty);

  document.getElementById("output").innerHTML =
    `<h3>${qty} × ${formatName(item)}</h3>` +
    renderTree(tree, includeRJ);

  const totalsPanel = document.getElementById("totalsPanel");

  if (showTotals) {
    totalsPanel.classList.remove("hidden");
    const totals = collectBaseTotals(tree);
    renderTotals(totals, includeRJ);
  } else {
    totalsPanel.classList.add("hidden");
  }
}


function expandAll() {
  document.querySelectorAll(".children").forEach(el => el.classList.remove("hidden"));
  document.querySelectorAll(".toggle").forEach(t => t.classList.add("open"));
}

function collapseAll() {
  document.querySelectorAll(".children").forEach(el => el.classList.add("hidden"));
  document.querySelectorAll(".toggle").forEach(t => t.classList.remove("open"));
}

function toggle(id, arrow) {
  const el = document.getElementById(id);
  el.classList.toggle("hidden");
  arrow.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", populateItems);
const CRAFTABLE_ITEMS = new Set([
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
]);

const GEAR_DATA = {
  Planters: {
    planterOfPlenty: {
      honey: "100T",
      magicBean: 500,
      superSmoothie: 100,
      swirledWax: 100,
      causticWax: 100,
      turpentine: 25
    },
    petalPlanter: {
      honey: "5T",
      magicBean: 100,
      glitter: 100,
      softWax: 250,
      swirledWax: 50,
      superSmoothie: 25
    },
    heatTreatedPlanter: {
      honey: "750B",
      magicBean: 75,
      redExtract: 750,
      hardWax: 150,
      swirledWax: 25,
      turpentine: 1
    },
    hydroponicPlanter: {
      honey: "750B",
      magicBean: 75,
      blueExtract: 750,
      softWax: 500,
      causticWax: 25,
      turpentine: 1
    }
  },

  Tools: {
    petalWand: {
      honey: "1.5B",
      spiritPetal: 1,
      starJelly: 10,
      glitter: 25,
      enzymes: 75
    },
    tidePopper: {
      honey: "2.5T",
      blueExtract: 1500,
      stinger: 150,
      tropicalDrink: 150,
      swirledWax: 75,
      superSmoothie: 50,
      comfortingVial: 3
    },
    darkScythe: {
      honey: "2.5T",
      redExtract: 1500,
      stinger: 150,
      hardWax: 10,
      causticWax: 50,
      superSmoothie: 50,
      invigoratingVial: 3
    },
    gummyBaller: {
      honey: "10T",
      glue: 1500,
      gumdrops: 2000,
      causticWax: 50,
      superSmoothie: 50,
      turpentine: 5,
      satisfyingVial: 3
    }
  },

  Masks: {
    gummyMask: {
      honey: "5B",
      glue: 250,
      enzymes: 100,
      oil: 100,
      glitter: 100,
      satisfyingVial: 1
    },
    demonMask: {
      honey: "5B",
      stinger: 500,
      redExtract: 250,
      enzymes: 150,
      glue: 100,
      invigoratingVial: 1
    },
    diamondMask: {
      honey: "5B",
      blueExtract: 250,
      oil: 150,
      glitter: 100,
      diamondEgg: 5,
      comfortingVial: 1
    }
  },

  Boots: {
    coconutClogs: {
      honey: "10B",
      coconut: 150,
      tropicalDrink: 50,
      glue: 100,
      oil: 100,
      refreshingVial: 1
    },
    gummyBoots: {
      honey: "100B",
      glue: 500,
      glitter: 250,
      redExtract: 250,
      blueExtract: 250,
      satisfyingVial: 1,
      motivatingVial: 1
    }
  },

  Belts: {
    petalBelt: {
      honey: "15B",
      starJelly: 25,
      glitter: 50,
      glue: 100,
      spiritPetal: 1
    },
    coconutBelt: {
      honey: "7.5T",
      coconut: 500,
      tropicalDrink: 1500,
      purplePotion: 200,
      hardWax: 200,
      turpentine: 3,
      refreshingVial: 3
    }
  },

  Bags: {
    coconutCanister: {
      honey: "25B",
      tropicalDrink: 150,
      coconut: 250,
      redExtract: 150,
      blueExtract: 150,
      refreshingVial: 2
    }
  }
};

function formatName(n) {
  return n.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase());
}

function matImg(i) {
  return `/images/items/${i[0].toUpperCase() + i.slice(1)}.png`;
}

function gearImg(i) {
  return `/images/gear/${i[0].toUpperCase() + i.slice(1)}.png`;
}

function getInventory() {
  return JSON.parse(localStorage.getItem("inventory") || "{}");
}

function isCraftable(i) {
  return CRAFTABLE_ITEMS.has(i) && RECIPES?.[i];
}

function buildTree(item, qty, inv) {
  const node = {
    item,
    qty,
    have: inv[item] || 0,
    children: []
  };

  if (!isCraftable(item)) return node;

  for (const sub in RECIPES[item]) {
    node.children.push(
      buildTree(sub, RECIPES[item][sub] * qty, inv)
    );
  }

  return node;
}

function renderNode(n, depth = 0) {
  const ok = n.have >= n.qty;
  const hasKids = n.children.length > 0;
  const id = Math.random().toString(36).slice(2);

  let html = `
    <div class="gearRow" style="margin-left:${depth * 18}px">
      ${hasKids ? `<span class="arrow" onclick="toggleGroup('${id}', this)">▶</span>` : `<span class="arrow spacer"></span>`}
      <img src="${matImg(n.item)}">
      <span class="${ok ? "enough" : ""}">
        ${formatName(n.item)}: ${n.have} / ${n.qty}
      </span>
    </div>
  `;

  if (hasKids) {
    html += `<div class="gearChildren hidden" id="${id}">`;
    for (const c of n.children) html += renderNode(c, depth + 1);
    html += `</div>`;
  }

  return html;
}

function selectGear(item, category, card) {
  document.querySelectorAll(".gearCard").forEach(c => c.classList.remove("active"));
  card.classList.add("active");

  const inv = getInventory();
  const data = GEAR_DATA[category][item];

  let html = `
    <div class="gearRecipeCard">
      <h3>${formatName(item)}</h3>
  `;

  for (const mat in data) {
    const qty = data[mat];

    if (typeof qty === "string") {
      html += `
        <div class="gearRow">
          <span class="arrow spacer"></span>
          <img src="${matImg(mat)}">
          <span>${qty} × ${formatName(mat)}</span>
        </div>
      `;
    } else {
      html += renderNode(buildTree(mat, qty, inv));
    }
  }

  html += `</div>`;
  document.getElementById("gearRecipe").innerHTML = html;
}

function toggleGroup(id, arrow) {
  const g = document.getElementById(id);
  g.classList.toggle("hidden");
  arrow.textContent = g.classList.contains("hidden") ? "▶" : "▼";
}

function loadTabs() {
  const tabs = document.getElementById("gearTabs");
  const items = document.getElementById("gearItems");

  tabs.innerHTML = "";

  Object.keys(GEAR_DATA).forEach((cat, i) => {
    const b = document.createElement("button");
    b.textContent = cat;
    if (i === 0) b.classList.add("active");

    b.onclick = () => {
      document.querySelectorAll(".gearTabs button").forEach(x => x.classList.remove("active"));
      b.classList.add("active");

      items.innerHTML = "";
      document.getElementById("gearRecipe").innerHTML =
        `<div class="gearPlaceholder">Select a gear item to view its recipe.</div>`;

      Object.keys(GEAR_DATA[cat]).forEach(it => {
        const c = document.createElement("div");
        c.className = "gearCard";
        c.innerHTML = `<img src="${gearImg(it)}"><span>${formatName(it)}</span>`;
        c.onclick = () => selectGear(it, cat, c);
        items.appendChild(c);
      });
    };

    tabs.appendChild(b);
  });

  tabs.firstChild.click();
}

document.addEventListener("DOMContentLoaded", loadTabs);
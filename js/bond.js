const BOND_COSTS = {
  1: 10_000,
  2: 40_000,
  3: 200_000,
  4: 750_000,
  5: 4_000_000,
  6: 15_000_000,
  7: 60_000_000,
  8: 270_000_000,
  9: 450_000_000,
  10: 1_200_000_000,
  11: 2_000_000_000,
  12: 4_000_000_000,
  13: 7_000_000_000,
  14: 15_000_000_000,
  15: 120_000_000_000,
  16: 450_000_000_000,
  17: 1_900_000_000_000,
  18: 7_500_000_000_000,
  19: 15_000_000_000_000,
  20: 475_000_000_000_000
};

function format(num) {
  if (num >= 1e15) return (num / 1e15).toFixed(2) + "q";
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "t";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "b";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "m";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "k";
  return num.toString();
}

const grid = document.getElementById("bondGrid");
const bonusInput = document.getElementById("bondBonus");
const totalEl = document.getElementById("bondTotal");

function render() {
  grid.innerHTML = "";

  for (let lvl = 1; lvl <= 20; lvl++) {
    const row = document.createElement("div");
    row.className = "bondRow";

    row.innerHTML = `
      <span>Level ${lvl}</span>
      <input type="number" min="0" value="0" data-level="${lvl}">
    `;

    grid.appendChild(row);
  }
}

function calculate() {
  const bonus = Math.min(Number(bonusInput.value) || 0, 30);
  const multiplier = 1 - bonus / 100;

  let total = 0;

  document.querySelectorAll(".bondRow input").forEach(input => {
    const count = Number(input.value) || 0;
    const level = input.dataset.level;

    const costPerBee = BOND_COSTS[level] * multiplier;
    total += costPerBee * count;
  });

  totalEl.textContent = format(Math.floor(total));
}

document.addEventListener("input", calculate);
document.addEventListener("DOMContentLoaded", () => {
  render();
  calculate();
});

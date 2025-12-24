let allTrends = [];
let currentRange = 24;

const ranges = {
  4: 4,
  24: 24,
  48: 48,
  168: 168
};

fetch("data/trends.json")
  .then(res => res.json())
  .then(data => {
    allTrends = data.trends;
    render();
  })
  .catch(() => {
    document.getElementById("trends").innerHTML =
      "<p>Failed to load trends.</p>";
  });

document.querySelectorAll(".tabs button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tabs button")
      .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");
    currentRange = parseInt(btn.dataset.range);
    render();
  });
});

function render() {
  const container = document.getElementById("trends");
  const now = Date.now();

  const filtered = allTrends.filter(t => {
    const hours =
      (now - new Date(t.last_seen).getTime()) / 36e5;
    return hours <= ranges[currentRange];
  });

  filtered.sort((a, b) => b.score - a.score);

  if (!filtered.length) {
    container.innerHTML = "<p>No trends found.</p>";
    return;
  }

  container.innerHTML = filtered.map(t => `
    <div class="trend-card">
      <h3>${t.title}</h3>

      <div class="badges">
        <span class="status ${t.status.toLowerCase()}">
          ${t.status}
        </span>

        ${t.sources.map(s =>
          `<span class="source ${s}">${s}</span>`
        ).join("")}
      </div>
    </div>
  `).join("");
}

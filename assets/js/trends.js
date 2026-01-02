fetch("data/trends.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("trendsList");

    if (!data || data.length === 0) {
      container.innerHTML = "No trends available.";
      return;
    }

    container.innerHTML = data.map(item => `
      <div class="trend-row">

        <div class="trend-title">
          ${clean(item.title)}
        </div>

        <div class="trend-volume">
          ${clean(item.volume)}
          <div class="trend-growth">↑ 1000%</div>
        </div>

        <div class="trend-started">
          ${clean(item.started)}
          <div class="trend-status">${item.status}</div>
        </div>

        <div class="trend-source">
          ${item.source}
        </div>

        <div class="trend-menu">⋮</div>

      </div>
    `).join("");
  })
  .catch(err => {
    document.getElementById("trendsList").innerHTML =
      "Error loading trends.";
    console.error(err);
  });

function clean(value) {
  if (!value) return "";
  return value.replace(/^"+|"+$/g, "").trim();
}

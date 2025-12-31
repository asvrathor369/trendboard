document.addEventListener("DOMContentLoaded", () => {
  fetch("data/trends.json")
    .then(res => {
      if (!res.ok) throw new Error("JSON load failed");
      return res.json();
    })
    .then(data => {
      document.getElementById("updatedText").innerText =
        `Updated ${data.updated}`;

      const list = document.getElementById("trendList");

      list.innerHTML = data.trends.map(t => `
        <div class="trend-row">
          <div>
            <div class="trend-title">${t.title}</div>
            <div class="trend-meta">
              ${t.started} · ${t.source}
            </div>
          </div>

          <div class="trend-volume">
            <strong>${t.volume}</strong><br/>
            <span class="trend-growth">↑ ${t.growth}</span>
          </div>

          <div class="trend-status">✔ ${t.status}</div>
        </div>
      `).join("");
    })
    .catch(err => {
      document.getElementById("trendList").innerHTML =
        "<p>Error loading trends.</p>";
      console.error(err);
    });
});

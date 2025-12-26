document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("trends");

  fetch("data/raw-trends.json")
    .then(res => {
      if (!res.ok) throw new Error("JSON load failed");
      return res.json();
    })
    .then(data => {
      if (!data.trends || data.trends.length === 0) {
        container.innerHTML = "<p class='muted'>No active trends right now.</p>";
        return;
      }

      container.innerHTML = data.trends.map(trend => `
        <div class="trend-row">
          <div class="trend-topic">
            <span class="trend-title">${escapeHTML(trend.title)}</span>
            <span class="trend-source">${trend.source}</span>
          </div>

          <div class="trend-volume">
            ${trend.volume || "—"}
          </div>

          <div class="trend-started">
            ${trend.started || "Active"}
          </div>
        </div>
      `).join("");
    })
    .catch(err => {
      console.error(err);
      container.innerHTML =
        "<p class='muted'>Error loading trends. Please try again later.</p>";
    });
});

/* ---------- helper ---------- */
function escapeHTML(str = "") {
  return str.replace(/[&<>"']/g, m => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[m]));
}

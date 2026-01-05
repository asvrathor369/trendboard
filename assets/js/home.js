document.addEventListener("DOMContentLoaded", () => {
  fetch("data/trends.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("trendPreview");

      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = "<p class='muted'>No trends available.</p>";
        return;
      }

      // ✅ only first 5 real trends
      const topFive = data.slice(0, 5);

      container.innerHTML = topFive.map(item => `
        <div class="trend-card">
          <h3 title="${item.title}">
            ${item.title.replace(/^"|"$/g, "")}
          </h3>

          <p class="muted">
            ${item.volume?.replace(/"/g, "") || "-"} searches
          </p>
        </div>
      `).join("");
    })
    .catch(() => {
      document.getElementById("trendPreview").innerHTML =
        "<p class='muted'>Error loading trends.</p>";
    });
});

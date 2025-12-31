document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("trends");

  fetch("data/trends.json")
    .then(res => {
      if (!res.ok) throw new Error("JSON not found");
      return res.json();
    })
    .then(data => {
      if (!data.trends || data.trends.length === 0) {
        container.innerHTML = "<p>No trends available.</p>";
        return;
      }

      container.innerHTML = data.trends.map(item => `
        <div class="trend-row">
          <div>
            <strong>${item.title}</strong><br>
            <span class="muted">${item.started}</span>
          </div>

          <div style="text-align:right">
            <div><strong>${item.volume}</strong></div>
            <div class="badge">↑ ${item.growth}</div>
            <div class="badge">${item.status}</div>
          </div>
        </div>
      `).join("");
    })
    .catch(err => {
      console.error(err);
      container.innerHTML =
        "<p>Error loading trends. Please try again later.</p>";
    });
});

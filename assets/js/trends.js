document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("trends");

  fetch("data/raw-trends.json")
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to load raw-trends.json");
      }
      return res.json();
    })
    .then(data => {
      if (!data.trends || data.trends.length === 0) {
        container.innerHTML = "<p>No trends available right now.</p>";
        return;
      }

      container.innerHTML = data.trends.map(item => `
        <div class="trend-card">
          <h3>${item.title}</h3>
          <p class="muted">Source: ${item.source}</p>
        </div>
      `).join("");
    })
    .catch(err => {
      console.error(err);
      container.innerHTML =
        "<p>Error loading trends. Please try again later.</p>";
    });
});


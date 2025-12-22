document.addEventListener("DOMContentLoaded", () => {
  fetch("/data/trends.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Trends JSON load nahi ho paayi");
      }
      return response.json();
    })
    .then(data => {
      const container = document.getElementById("trends");

      if (!data.trends || data.trends.length === 0) {
        container.innerHTML = "<p>No trends available right now.</p>";
        return;
      }

      container.innerHTML = data.trends.map(item => `
        <div class="trend-card">
          <h3>${item.title}</h3>
          <p>Traffic: <strong>${item.traffic}</strong></p>
        </div>
      `).join("");
    })
    .catch(error => {
      console.error(error);
      document.getElementById("trends").innerHTML =
        "<p>Error loading trends. Please try again later.</p>";
    });
});

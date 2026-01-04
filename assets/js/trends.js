document.addEventListener("DOMContentLoaded", () => {
  fetch("data/trends.json")
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("trendsBody");

      if (!Array.isArray(data) || data.length === 0) {
        tbody.innerHTML =
          "<tr><td>No trends available.</td></tr>";
        return;
      }

      tbody.innerHTML = data.map(item => `
        <tr>
          <td class="col-title" title=${item.title}>
            ${item.title.replace(/^"|"$/g, "")}
          </td>

          <td class="col-volume">
            <div class="stack">
              <strong>${item.volume?.replace(/"/g,"") || "-"}</strong>
            </div>
          </td>

          <td class="col-started">
  <div class="stack">
    <div class="started-time">
      ${item.started?.replace(/"/g,"") || "-"}
    </div>

    <div class="started-status">
      <span class="status-icon">↗</span>
      <span class="status-text">Active</span>
    </div>
  </div>
</td>


          <td class="col-source">
            ${item.source || "Google Trends"}
          </td>

          
        </tr>
      `).join("");
    })
    .catch(() => {
      document.getElementById("trendsBody").innerHTML =
        "<tr><td>Error loading trends.</td></tr>";
    });
});





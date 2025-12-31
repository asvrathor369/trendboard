fetch("data/trends.json")
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("trendList");

    data.forEach((t, i) => {
      const row = document.createElement("div");
      row.className = "trend-row";

      row.innerHTML = `
        <div>
          <strong>${i + 1}. ${t.title}</strong><br>
          <span class="muted">${t.started}</span>
        </div>
        <div>
          <span>${t.volume}</span><br>
          <span class="badge">${t.source}</span>
        </div>
      `;

      list.appendChild(row);
    });
  })
  .catch(() => {
    document.getElementById("trendList").innerHTML =
      "<p>Error loading trends</p>";
  });

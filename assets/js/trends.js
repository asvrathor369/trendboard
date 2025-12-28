const DATA_URL = "data/raw-trends.json";

const table = document.querySelector(".trend-table");
const updatedText = document.querySelector(".muted");

fetch(DATA_URL)
  .then(res => res.json())
  .then(data => {
    if (!data.trends || data.trends.length === 0) {
      showError("No active trends found");
      return;
    }

    // update time
    if (data.updated && updatedText) {
      const date = new Date(data.updated);
      updatedText.innerText =
        "Updated " + date.toLocaleString();
    }

    data.trends.forEach(trend => {
      table.appendChild(createRow(trend));
    });
  })
  .catch(err => {
    console.error(err);
    showError("Error loading trends. Please try again later.");
  });

/* ----------------------- */

function createRow(t) {
  const row = document.createElement("div");
  row.className = "trend-row";

  const title = t.title || t.keyword || "Unknown trend";
  const volume = t.volume || "--";
  const growth = t.growth || t.change || "";
  const started = t.started || t.time || "--";
  const status = t.status || "Active";

  row.innerHTML = `
    <input type="checkbox">

    <div class="trend-title">${title}</div>

    <div class="volume">
      ${volume}
      ${growth ? `<div class="up">↑ ${growth}</div>` : ""}
    </div>

    <div>${started}</div>

    <div class="status">${status}</div>

    <div class="dots">⋮</div>

    <div class="meta">
      ${volume} · ${status} · ${started}
    </div>
  `;

  return row;
}

function showError(msg) {
  table.innerHTML = `
    <div style="padding:20px;color:#94a3b8">
      ${msg}
    </div>
  `;
}

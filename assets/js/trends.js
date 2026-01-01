function clean(value) {
  if (!value) return "";
  return value.replace(/^"+|"+$/g, "").trim();
}


document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("trends");

  try {
    const res = await fetch("data/trends.json");
    if (!res.ok) throw new Error("JSON load failed");

    const data = await res.json();

    // 🔑 IMPORTANT: data is already an array
    if (!Array.isArray(data) || data.length === 0) {
      container.innerHTML = "<p>No trends available.</p>";
      return;
    }

    container.innerHTML = data.map(item => `
      <div class="trend-row">
        <div>
          <strong>${clean(item.title)}</strong><br>
          <span class="muted">${item.started}</span>
        </div>

        <div style="text-align:right">
          <div>${clean(item.volume)}</div>
          <span class="badge">${item.status}</span>
        </div>
      </div>
    `).join("");

  } catch (err) {
    console.error(err);
    container.innerHTML =
      "<p>Error loading trends. Please try again later.</p>";
  }
});

function clean(text) {
  return text ? text.replace(/^"+|"+$/g, "") : "";
}


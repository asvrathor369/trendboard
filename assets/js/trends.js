document.addEventListener("DOMContentLoaded", () => {
  fetch("data/trends.json")
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("trendsBody");

      if (!Array.isArray(data) || data.length === 0) {
        tbody.innerHTML = "<tr><td>No trends available.</td></tr>";
        return;
      }

      tbody.innerHTML = data
        .map((item, index) => `
      <tr>
        <td class="col-title" title="${item.title}">
          ${item.title.replace(/^"|"$/g, "")}
        </td>

        <td class="col-volume">
          <div class="stack">
            <strong>${item.volume?.replace(/"/g, "") || "-"}</strong>
          </div>
        </td>

        <td class="col-started">
          <div class="stack">
            <span>${item.started?.replace(/"/g, "") || "-"}</span>
          </div>
        </td>

        <td class="col-source">
          ${item.source || "Google Trends"}
        </td>

        <td class="col-menu">
          <div class="menu-btn" onclick="openMenu(event, ${index})">⋮</div>

          <div class="menu-options" id="menu-${index}">
            <div class="menu-item" onclick="copyTrend('${item.title.replace(
              /'/g,
              "\\'"
            )}')">Copy</div>
            <div class="menu-item" onclick="searchTrend('${encodeURIComponent(
              item.title
            )}')">Search it</div>
            <div class="menu-item" onclick="exploreTrend('${item.link}')">
              Explore
            </div>
          </div>
        </td>
      </tr>
    `)
        .join("");
    })
    .catch(() => {
      document.getElementById("trendsBody").innerHTML =
        "<tr><td>Error loading trends.</td></tr>";
    });
});

// MENU FUNCTIONS
function openMenu(e, i) {
  closeAllMenus();
  const menu = document.getElementById(`menu-${i}`);
  menu.style.display = "block";
  e.stopPropagation();
}

document.addEventListener("click", () => closeAllMenus());

function closeAllMenus() {
  document.querySelectorAll(".menu-options").forEach(m => {
    m.style.display = "none";
  });
}

function copyTrend(text) {
  navigator.clipboard.writeText(text);
  alert("Copied: " + text);
}

function searchTrend(query) {
  window.open(`https://www.google.com/search?q=${query}`, "_blank");
}

function exploreTrend(url) {
  if (!url) {
    alert("No explore link available");
    return;
  }
  window.open(url, "_blank");
}

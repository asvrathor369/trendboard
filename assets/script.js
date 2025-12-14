const trendsDiv = document.getElementById("trends");

async function loadTrends() {
  try {
    trendsDiv.innerHTML = "Loading live trends...";

    const url =
      "https://api.allorigins.win/raw?url=" +
      encodeURIComponent("https://www.reddit.com/r/all/top.json?limit=10");

    const response = await fetch(url);
    const data = await response.json();

    trendsDiv.innerHTML = "";

    data.data.children.forEach(post => {
      const card = document.createElement("div");
      card.style.border = "1px solid #ddd";
      card.style.padding = "10px";
      card.style.margin = "10px 0";
      card.style.borderRadius = "6px";

      card.innerHTML = `
        <h3>${post.data.title}</h3>
        <p>👍 ${post.data.ups} | 💬 ${post.data.num_comments}</p>
      `;

      trendsDiv.appendChild(card);
    });

  } catch (error) {
    trendsDiv.innerHTML = "Failed to load trends.";
    console.error(error);
  }
}

loadTrends();

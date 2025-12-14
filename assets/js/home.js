if (document.getElementById("home-trends")) {

  async function loadHomeTrends() {
    const box = document.getElementById("home-trends");
    box.innerHTML = "Loading trends...";

    try {
      const api =
        "https://api.allorigins.win/raw?url=" +
        encodeURIComponent(
          "https://www.reddit.com/r/all/top.json?limit=5"
        );

      const res = await fetch(api);
      const data = await res.json();

      box.innerHTML = "";

      data.data.children.forEach(post => {
        const card = document.createElement("div");
        card.className = "trend-card";

        card.innerHTML = `
          <h3>${post.data.title}</h3>
          <p>👍 ${post.data.ups} · 💬 ${post.data.num_comments}</p>
        `;

        box.appendChild(card);
      });

    } catch (err) {
      box.innerHTML = "Failed to load trends.";
      console.error(err);
    }
  }

  loadHomeTrends();
}

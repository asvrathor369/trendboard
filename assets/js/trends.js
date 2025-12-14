if ($("trends")) {

  async function loadTrends() {
    const container = $("trends");
    container.innerHTML = "Loading live trends...";

    try {
      const api =
        "https://api.allorigins.win/raw?url=" +
        encodeURIComponent(
          "https://www.reddit.com/r/all/top.json?limit=10"
        );

      const res = await fetch(api);
      const data = await res.json();

      container.innerHTML = "";

      data.data.children.forEach(post => {
        const card = create("div", "trend-card");

        card.innerHTML = `
          <h3>${post.data.title}</h3>
          <p>👍 ${post.data.ups} | 💬 ${post.data.num_comments}</p>
        `;

        container.appendChild(card);
      });

    } catch (e) {
      container.innerHTML = "Failed to load trends.";
      console.error(e);
    }
  }

  loadTrends();
}


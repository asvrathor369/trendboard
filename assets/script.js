const trendsDiv = document.getElementById("trends");

async function loadTrends() {
  trendsDiv.innerHTML = "Loading live trends...";

  const reddit = await fetch(
    "https://www.reddit.com/r/all/top.json?limit=10"
  ).then(r => r.json());

  trendsDiv.innerHTML = "";

  reddit.data.children.forEach(post => {
    const div = document.createElement("div");
    div.className = "trend-card";
    div.innerHTML = `
      <h3>${post.data.title}</h3>
      <p>👍 ${post.data.ups} | 💬 ${post.data.num_comments}</p>
    `;
    trendsDiv.appendChild(div);
  });
}

loadTrends();

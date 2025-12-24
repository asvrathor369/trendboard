const fs = require("fs");

const URL = "https://rss.app/feeds/CD3fzXHd5cptHodl.xml";

async function run() {
  const res = await fetch(URL, {
    headers: { "User-Agent": "TrendBoardBot/1.0" }
  });
  const json = await res.json();

  const trends = json.data.children.map(p => ({
    title: p.data.title,
    score: p.data.score,
    subreddit: p.data.subreddit
  }));

  fs.writeFileSync(
    "data/sources/reddit.json",
    JSON.stringify({ source: "Reddit", trends }, null, 2)
  );

  console.log("✅ Reddit saved");
}

run();

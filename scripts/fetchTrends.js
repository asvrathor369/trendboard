const fs = require("fs");

const SOURCES = [
  {
    name: "Google Trends",
    url: "https://trends.google.com/trending/rss?geo=IN",
    type: "trends"
  },
  {
    name: "Google News",
    url: "https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en",
    type: "news"
  }
];

async function fetchRSS(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function extractItems(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(m => m[1]);
}

function getTag(block, tag) {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
  return match ? match[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim() : "";
}

async function run() {
  let allTrends = [];

  for (const src of SOURCES) {
    try {
      const xml = await fetchRSS(src.url);
      const items = extractItems(xml);

      items.slice(0, 15).forEach(item => {
        const title = getTag(item, "title");
        if (!title) return;

        allTrends.push({
          title,
          source: src.name,
          type: src.type,
          timestamp: new Date().toISOString()
        });
      });

    } catch (err) {
      console.error(`❌ ${src.name} failed`, err.message);
    }
  }

  const data = {
    updated: new Date().toISOString(),
    region: "IN",
    total: allTrends.length,
    trends: allTrends
  };

  fs.writeFileSync("data/trends.json", JSON.stringify(data, null, 2));
  console.log("✅ trends.json updated");
}

run();

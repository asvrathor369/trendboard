const fs = require("fs");

const RSS_URL =
  "https://trends.google.com/trends/trendingsearches/daily/rss?geo=IN";

async function fetchRSS() {
  const res = await fetch(RSS_URL);
  const text = await res.text();

  const items = [...text.matchAll(/<item>([\s\S]*?)<\/item>/g)];

  const trends = items.map(item => {
    const block = item[1];

    const get = tag => {
      const match = block.match(
        new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`)
      );
      return match ? match[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim() : "";
    };

    return {
      title: get("title"),
      traffic: get("ht:approx_traffic"),
      description: get("description"),
      link: get("link")
    };
  });

  const data = {
    updated: new Date().toISOString(),
    source: "Google Trends RSS",
    region: "India",
    trends
  };

  fs.writeFileSync(
    "data/trends.json",
    JSON.stringify(data, null, 2)
  );

  console.log("✅ trends.json updated");
}

fetchRSS();

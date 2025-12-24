const fs = require("fs");

const URL = "https://trends.google.com/trending/rss?geo=IN";

async function run() {
  const res = await fetch(URL);
  const xml = await res.text();

  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];

  const trends = items.map(i => {
    const block = i[1];
    const get = tag => {
      const m = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
      return m ? m[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim() : "";
    };

    return {
      title: get("title"),
      traffic: get("ht:approx_traffic"),
      published: get("pubDate")
    };
  });

  fs.writeFileSync(
    "data/sources/google-trends.json",
    JSON.stringify({ source: "Google Trends", trends }, null, 2)
  );

  console.log("✅ Google Trends saved");
}

run();

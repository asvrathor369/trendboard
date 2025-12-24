const fs = require("fs");

const URL = "https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en";

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
      link: get("link"),
      published: get("pubDate")
    };
  });

  fs.writeFileSync(
    "data/sources/google-news.json",
    JSON.stringify({ source: "Google News", trends }, null, 2)
  );

  console.log("✅ Google News saved");
}

run();

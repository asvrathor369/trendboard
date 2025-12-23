const fs = require("fs");
const Parser = require("rss-parser");

const parser = new Parser({
  customFields: {
    item: ["ht:approx_traffic"]
  }
});

const RSS_URL =
  "https://trends.google.com/trending/rss?geo=IN";

async function fetchWithHeaders(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120",
      "Accept": "application/rss+xml,application/xml;q=0.9,*/*;q=0.8"
    }
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return await res.text();
}

(async () => {
  try {
    const xml = await fetchWithHeaders(RSS_URL);

    const feed = await parser.parseString(xml);

    const trends = feed.items.map(item => ({
      title: item.title || "",
      traffic: item["ht:approx_traffic"] || "—",
      description: item.contentSnippet || "",
      link: item.link || ""
    }));

    const data = {
      updated: new Date().toISOString(),
      source: "Google Trends RSS",
      region: "IN",
      trends
    };

    fs.writeFileSync(
      "data/trends.json",
      JSON.stringify(data, null, 2)
    );

    console.log(`✅ ${trends.length} trends saved`);
  } catch (err) {
    console.error("❌ Failed to fetch trends:", err.message);
    process.exit(1);
  }
})();


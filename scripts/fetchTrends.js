const fs = require("fs");
const Parser = require("rss-parser");

const parser = new Parser({
  customFields: {
    item: ["ht:approx_traffic"]
  }
});

const RSS_URL =
  "https://trends.google.com/trends/trendingsearches/daily/rss?geo=IN";

(async () => {
  try {
    const feed = await parser.parseURL(RSS_URL);

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
    console.error("❌ Failed to fetch trends:", err);
    process.exit(1);
  }
})();

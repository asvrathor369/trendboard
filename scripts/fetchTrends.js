const fs = require("fs");
const https = require("https");
const { parseStringPromise } = require("xml2js");

const RSS_URL =
  "https://trends.google.com/trends/trendingsearches/daily/rss?geo=IN";

function fetchRSS(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, res => {
        let data = "";
        res.on("data", chunk => (data += chunk));
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

(async () => {
  try {
    const xml = await fetchRSS(RSS_URL);
    const parsed = await parseStringPromise(xml);

    const items =
      parsed.rss.channel[0].item || [];

    const trends = items.map(item => ({
      title: item.title?.[0] || "",
      traffic:
        item["ht:approx_traffic"]?.[0] || "—",
      description: item.description?.[0] || "",
      link: item.link?.[0] || ""
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
    console.error("❌ Error:", err);
    process.exit(1);
  }
})();

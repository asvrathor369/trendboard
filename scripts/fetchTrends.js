const fs = require("fs");
const https = require("https");

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

    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];

    const trends = items.map(item => {
      const block = item[1];

      const get = tag => {
        const match = block.match(
          new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`)
        );
        return match
          ? match[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim()
          : "";
      };

      return {
        title: get("title"),
        traffic: get("ht:approx_traffic") || "—",
        description: get("description"),
        link: get("link")
      };
    });

    const data = {
      updated: new Date().toISOString(),
      source: "Google Trends RSS",
      region: "IN",
      trends
    };

    fs.writeFileSync("data/trends.json", JSON.stringify(data, null, 2));

    console.log("✅ trends.json updated successfully");
  } catch (err) {
    console.error("❌ Failed to update trends:", err);
    process.exit(1);
  }
})();

const fs = require("fs");

const sources = [
  "google-trends",
  "google-news",
  "reddit",
  "youtube"
];

let combined = [];

sources.forEach(src => {
  const file = `data/sources/${src}.json`;
  if (fs.existsSync(file)) {
    const data = JSON.parse(fs.readFileSync(file));
    data.trends.forEach(t => {
      combined.push({
        title: t.title,
        source: data.source,
        timestamp: new Date().toISOString()
      });
    });
  }
});

fs.writeFileSync(
  "data/raw-trends.json",
  JSON.stringify(
    {
      updated: new Date().toISOString(),
      total: combined.length,
      trends: combined
    },
    null,
    2
  )
);

console.log("✅ raw-trends.json generated");

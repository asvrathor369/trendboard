const fs = require("fs");

const csv = fs.readFileSync("data/trends.csv", "utf8");
const lines = csv.split("\n").slice(1);

const trends = lines
  .map(line => {
    const cols = line.split(",");
    if (!cols[0]) return null;

    return {
      title: cols[0]?.trim(),
      volume: cols[1]?.trim(),
      started: cols[2]?.trim(),
      status: "Active",
      source: "Google Trends"
    };
  })
  .filter(Boolean);

fs.writeFileSync(
  "data/trends.json",
  JSON.stringify(trends, null, 2)
);

console.log("✅ trends.json generated");

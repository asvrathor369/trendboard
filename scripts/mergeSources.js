const fs = require("fs");

const SOURCE_FILES = [
  "data/sources/google-trends.json",
  "data/sources/google-news.json"
];

let combined = [];

SOURCE_FILES.forEach(file => {
  if (!fs.existsSync(file)) {
    console.warn(`⚠️ Missing file: ${file}`);
    return;
  }

  const raw = fs.readFileSync(file, "utf-8").trim();

  if (!raw) {
    console.warn(`⚠️ Empty file skipped: ${file}`);
    return;
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch (err) {
    console.error(`❌ Invalid JSON in ${file}`);
    return;
  }

  if (!Array.isArray(data.trends)) return;

  data.trends.forEach(t => {
    combined.push({
      title: t.title,
      source: data.source,
      published: t.published || null
    });
  });
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

console.log(`✅ raw-trends.json created (${combined.length} items)`);

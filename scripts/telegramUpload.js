import fetch from "node-fetch";
import fs from "fs";

const TG_TOKEN = process.env.TG_BOT_TOKEN;
const GH_TOKEN = process.env.GH_TOKEN;

const OWNER = "asvrathor369";
const REPO = "trendboard";
const PATH = "data/uploads/google-trends.csv";

async function run() {
  const updates = await fetch(
    `https://api.telegram.org/bot${TG_TOKEN}/getUpdates`
  ).then(r => r.json());

  const msg = updates.result.at(-1)?.message;
  if (!msg?.document) return console.log("No CSV found");

  const fileId = msg.document.file_id;

  const filePath = await fetch(
    `https://api.telegram.org/bot${TG_TOKEN}/getFile?file_id=${fileId}`
  ).then(r => r.json());

  const csv = await fetch(
    `https://api.telegram.org/file/bot${TG_TOKEN}/${filePath.result.file_path}`
  ).then(r => r.text());

  const api = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`;

  const old = await fetch(api, {
    headers: { Authorization: `token ${GH_TOKEN}` }
  }).then(r => r.json());

  await fetch(api, {
    method: "PUT",
    headers: {
      Authorization: `token ${GH_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "Update trends CSV via Telegram",
      content: Buffer.from(csv).toString("base64"),
      sha: old.sha
    })
  });

  console.log("CSV uploaded to GitHub");
}

run();

// home.js – homepage logic

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("trendPreview");
  if (!container) return;

  const sampleTrends = [
    "AI Reels Ideas",
    "Instagram Growth 2025",
    "YouTube Shorts Strategy",
    "Personal Branding",
    "Side Hustle Tools"
  ];

  container.innerHTML = "";

  sampleTrends.forEach(trend => {
    const div = document.createElement("div");
    div.className = "trend-card";
    div.innerHTML = `
      <h3>${trend}</h3>
      <span class="badge hot">HOT</span>
    `;
    container.appendChild(div);
  });
});

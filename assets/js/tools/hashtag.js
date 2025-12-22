document.getElementById("generateBtn").onclick = () => {
  const t = inputText.value.trim().toLowerCase();
  if (!t) return output.value = "Enter a topic";

  const tags = new Set();
  t.split(/\s+/).forEach(w => {
    if (w.length > 2) {
      tags.add(`#${w}`);
      tags.add(`#${w}tips`);
      tags.add(`#${w}2025`);
    }
  });
  output.value = [...tags].join(" ");
};

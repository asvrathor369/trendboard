document.getElementById("generateBtn").onclick = () => {
  const t = inputText.value.trim();
  if (!t) return output.value = "Enter title";

  output.value =
`${t}
Free tools & live trends.
Visit TrendBoard now.`;
};

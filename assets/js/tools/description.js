document.getElementById("generateBtn").onclick = () => {
  const t = inputText.value.trim();
  if (!t) return output.value = "Enter topic";

  output.value =
`Learn everything about ${t}.
Simple, practical and updated.
Start today with TrendBoard.`;
};

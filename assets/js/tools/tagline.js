document.getElementById("generateBtn").onclick = () => {
  const b = inputText.value.trim();
  if (!b) return output.value = "Enter brand";

  output.value = `${b} – Grow smarter, faster.`;
};

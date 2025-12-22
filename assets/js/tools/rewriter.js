document.getElementById("generateBtn").onclick = () => {
  const t = inputText.value.trim();
  if (!t) return output.value = "Enter text";

  output.value = t.split(" ").reverse().join(" ");
};

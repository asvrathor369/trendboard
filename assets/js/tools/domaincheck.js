document.getElementById("generateBtn").onclick = () => {
  const d = inputText.value.trim();
  if (!d) return output.value = "Enter domain";

  output.value = d.endsWith(".com")
    ? "Domain format looks valid"
    : "Only .com supported (demo)";
};

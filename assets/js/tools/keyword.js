document.getElementById("generateBtn").onclick = () => {
  const k = inputText.value.trim();
  if (!k) return output.value = "Enter keyword";

  output.value =
`${k} tips
best ${k}
${k} for beginners
${k} tools`;
};

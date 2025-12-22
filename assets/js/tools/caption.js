document.getElementById("generateBtn").onclick = () => {
  const t = inputText.value.trim();
  if (!t) return output.value = "Enter topic";

  output.value =
`🔥 ${t} that actually works
💡 Save this post
🚀 Follow for more ${t} ideas`;
};

document.getElementById("generateBtn").onclick = () => {
  const n = inputText.value.trim();
  if (!n) return output.value = "Enter niche";

  output.value =
`1. ${n} mistakes beginners make
2. ${n} growth tips
3. ${n} tools you need
4. ${n} content ideas`;
};

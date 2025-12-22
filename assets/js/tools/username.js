document.getElementById("generateBtn").onclick = () => {
  const n = inputText.value.trim().toLowerCase();
  if (!n) return output.value = "Enter name";

  output.value =
`${n}_official
real_${n}
${n}.hq
${n}_creator`;
};

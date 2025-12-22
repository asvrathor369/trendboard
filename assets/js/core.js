// core.js – global utilities

document.addEventListener("DOMContentLoaded", () => {
  console.log("Core JS loaded");

  // Active nav link highlight
  const links = document.querySelectorAll("nav a");
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });
});

// Simple helper
function $(id) {
  return document.getElementById(id);
}

// Copy to clipboard
function copyText(id) {
  const el = document.getElementById(id);
  if (!el) return;

  el.select();
  el.setSelectionRange(0, 99999);
  document.execCommand("copy");

  alert("Copied to clipboard");
}

// Character & word counter
function updateCounter(inputId, counterId) {
  const input = document.getElementById(inputId);
  const counter = document.getElementById(counterId);
  if (!input || !counter) return;

  const text = input.value.trim();
  const chars = text.length;
  const words = text ? text.split(/\s+/).length : 0;

  counter.innerText = `${chars} chars • ${words} words`;
}

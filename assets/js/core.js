// core.js – Common utilities

document.addEventListener("DOMContentLoaded", () => {
  console.log("TrendBoard core loaded");
});

// Helper: safe element selector
function $(id) {
  return document.getElementById(id);
}

// Helper: create element
function create(tag, className = "") {
  const el = document.createElement(tag);
  if (className) el.className = className;
  return el;
}

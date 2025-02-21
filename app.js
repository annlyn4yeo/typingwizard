const refTextDiv = document.getElementById("refText");
const inputBox = document.getElementById("typingInput");

const refText = refTextDiv.textContent.trim();
const refWords = refText.split(/\s+/);
let startTime = null;
let completed = false;

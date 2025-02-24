const refTextDiv = document.getElementById("refText");
const inputBox = document.getElementById("typingInput");
const metricsDiv = document.getElementById("metrics");
const resetBtn = document.getElementById("resetBtn");

const refText = refTextDiv.textContent.trim();
const refWords = refText.split(/\s+/);
let startTime = null;
let completed = false;

function calculateGrade(time, wpm, errors) {
  if (wpm >= 60 && errors <= 5 && time <= 60) return "A";
  if (wpm >= 50 && errors <= 10 && time <= 90) return "B";
  if (wpm >= 40 && errors <= 15 && time <= 120) return "C";
  if (wpm >= 30 && errors <= 20 && time <= 150) return "D";
  return "F";
}

inputBox.addEventListener("input", () => {
  const userInput = inputBox.value;
  if (!startTime && userInput.trim() !== "") {
    startTime = performance.now();
  }

  const highlightedText = refText
    .split("")
    .map((char, i) => {
      if (i < userInput.length) {
        return userInput[i].toLowerCase() === char.toLowerCase()
          ? `<span class="correct">${char}</span>`
          : `<span class="incorrect">${char}</span>`;
      }
      return `<span>${char}</span>`;
    })
    .join("");
  refTextDiv.innerHTML = highlightedText;
  const trimmedInput = userInput.trim();
  if (!completed && trimmedInput.length === refText.length) {
    completed = true;
    const endTime = performance.now();
    const elapsedTimeSeconds = (endTime - startTime) / 1000;
    const elapsedMinutes = elapsedTimeSeconds / 60;
    const wpm = refWords.length / elapsedMinutes;

    // Count the number of wrong letter entries.
    let wrongEntries = 0;
    for (let i = 0; i < refText.length; i++) {
      if (trimmedInput[i].toLowerCase() !== refText[i].toLowerCase())
        wrongEntries++;
    }
    inputBox.disabled = true;
    refTextDiv.style.display = "none";
    inputBox.style.display = "none";
    resetBtn.style.display = "block";
    const grade = calculateGrade(elapsedTimeSeconds, wpm, wrongEntries);
    metricsDiv.innerHTML = `
      <p>Time: <span>${elapsedTimeSeconds.toFixed(2)} seconds</span></p>
      <p>Typing Speed: <span>${wpm.toFixed(2)} WPM</span></p>
      <p>Wrong entries: <span>${wrongEntries}</span></p>
      <p>Grade: <span>${grade}</span></p>
    `;
  }
});

resetBtn.addEventListener("click", () => {
  inputBox.value = "";
  inputBox.disabled = false;
  refTextDiv.innerHTML = refText;
  refTextDiv.style.display = "block";
  inputBox.style.display = "block";
  resetBtn.style.display = "none";
  metricsDiv.innerHTML = "";
  startTime = null;
  completed = false;
});

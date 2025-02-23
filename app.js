const refTextDiv = document.getElementById("refText");
const inputBox = document.getElementById("typingInput");
const metricsDiv = document.getElementById("metrics");

const refText = refTextDiv.textContent.trim();
const refWords = refText.split(/\s+/);
let startTime = null;
let completed = false;

inputBox.addEventListener("input", () => {
  const userInput = inputBox.value;
  if (!startTime && userInput.trim() !== "") {
    startTime = performance.now();
  }

  const highlightedText = refText
    .split("")
    .map((char, i) => {
      if (i < userInput.length) {
        return userInput[i] === char
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
      if (trimmedInput[i] !== refText[i]) wrongEntries++;
    }

    console.log(`Paragraph complete.`);
    console.log(`Time: ${elapsedTimeSeconds.toFixed(2)} seconds`);
    console.log(`Typing Speed: ${wpm.toFixed(2)} WPM`);
    console.log(`Wrong entries: ${wrongEntries}`);
    inputBox.disabled = true;

    metricsDiv.innerHTML = `Typing Speed: ${wpm.toFixed(2)} WPM`;
  }
});

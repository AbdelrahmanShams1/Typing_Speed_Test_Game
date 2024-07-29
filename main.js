const easyWords = [
  "Code",
  "Loop",
  "Debug",
  "Array",
  "Input",
  "File",
  "String",
  "Class",
  "Java",
  "HTML",
];

const mediumWords = [
  "Variable",
  "Function",
  "Object",
  "Syntax",
  "Compile",
  "Algorithm",
  "Database",
  "Script",
  "Module",
  "Framework",
];

const hardWords = [
  "Encapsulation",
  "Polymorphism",
  "Inheritance",
  "Multithreading",
  "Asynchronous",
  "Recursion",
  "Dependency",
  "Abstraction",
  "Optimization",
  "Middleware",
];

const lvls = {
  Easy: 6,
  Normal: 5,
  Hard: 4,
};

const today = new Date();

let startButton = document.querySelector(".start");
let startLevel = document.querySelector(".choose");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let add1 = document.querySelector(".add");
let add2 = document.querySelector(".add1");
let Reset = document.querySelector(".rest");

Reset.onclick = function () {
  window.location.reload();
};

window.onload = function () {
  const savedValue = localStorage.getItem("selectedLevel");
  if (savedValue) {
      startLevel.value = savedValue;
     defaultLevelName = startLevel.value; // Change level based on user input
     defaultLevelSeconds = lvls[defaultLevelName] || lvls["Easy"]; // Default to "easy" if the level is not found
     lvlNameSpan.innerHTML = defaultLevelName;
     secondsSpan.innerHTML = defaultLevelSeconds;
     timeLeftSpan.innerHTML = defaultLevelSeconds;
  }
};

let defaultLevelName = "Easy"; // Change Level From Here
let defaultLevelSeconds = lvls[defaultLevelName];

lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = easyWords.length;
add1.innerHTML = `<li><strong>Easy:</strong> Contains simple words related to basic programming concepts such as "Code," "Array," "String."</li>`;
add2.innerHTML += `<strong>Time:</strong> A specific time limit is set 6 seconds for Easy to type the word.`;

startLevel.onchange = function () {
  defaultLevelName = startLevel.value; // Change level based on user input
  defaultLevelSeconds = lvls[defaultLevelName] || lvls["Easy"]; // Default to "easy" if the level is not found
  lvlNameSpan.innerHTML = defaultLevelName;
  secondsSpan.innerHTML = defaultLevelSeconds;
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  localStorage.setItem("selectedLevel", startLevel.value);
  let words, description, time;
  if (startLevel.value === "Easy") {
    words = easyWords;
    description = `<li><strong>Easy:</strong> Contains simple words related to basic programming concepts such as "Code," "Array," "String."</li>`;
    time = "6 seconds";
  } else if (startLevel.value === "Normal") {
    words = mediumWords;
    description = `<li><strong>Medium:</strong> Includes words related to slightly advanced programming concepts like "Function," "Object," "Algorithm."</li>`;
    time = "5 seconds";
  } else if (startLevel.value === "Hard") {
    words = hardWords;
    description = `<li><strong>Hard:</strong> Features complex words related to advanced programming concepts such as "Encapsulation," "Polymorphism," "Concurrency."</li>`;
    time = "4 seconds";
  }
  scoreTotal.innerHTML = words.length;
  add1.innerHTML = description;
  add2.innerHTML = `<strong>Time:</strong> A specific time limit is set ${time} to type the word.`;
};

input.onpaste = function () {
  return false;
};

let c = 0;
startButton.onclick = function () {
  startButton.style.display = "none";
  input.focus();
  generateWord();
  c = 0;
};

let intertValPermission = 0;

function generateWord() {
  let words;
  if (startLevel.value === "Easy") {
    words = easyWords;
  } else if (startLevel.value === "Normal") {
    words = mediumWords;
  } else if (startLevel.value === "Hard") {
    words = hardWords;
  }
  let randomWord = words[Math.floor(Math.random() * words.length)];
  let wordIndex = words.indexOf(randomWord);
  words.splice(wordIndex, 1);
  theWord.innerHTML = randomWord;
  upcomingWords.innerHTML = "";
  for (let i = 0; i < words.length; i++) {
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  startPlay();
}

function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  if (c === 0) {
    timeLeftSpan.innerHTML++;
    timeLeftSpan.innerHTML++;
    timeLeftSpan.innerHTML++;
    c++;
  }

  let s = setInterval(() => {
    if (intertValPermission === 1) {
      clearInterval(s);
      endGame();
      c = 0;
    } else {
      timeLeftSpan.innerHTML--;

      if (timeLeftSpan.innerHTML === "0") {
        clearInterval(s);
        endGame();
      }
    }
  }, 1000);

  const enterKeyListener = function (e) {
    if (e.key === "Enter") {
      clearInterval(s);
      checkWord();
      input.removeEventListener("keydown", enterKeyListener);
    }
  };

  input.addEventListener("keydown", enterKeyListener);
}

function checkWord() {
  let words;
  if (startLevel.value === "Easy") {
    words = easyWords;
  } else if (startLevel.value === "Normal") {
    words = mediumWords;
  } else if (startLevel.value === "Hard") {
    words = hardWords;
  }
  if (
    input.value.toLocaleLowerCase() === theWord.innerHTML.toLocaleLowerCase()
  ) {
    input.value = "";
    scoreGot.innerHTML++;
    if (words.length > 0) {
      generateWord();
    } else {
      displayMessage("Congratz", "good");
      upcomingWords.remove();
      const dayOfWeek = today.toLocaleDateString("EG", { weekday: "long" });
      window.localStorage.setItem(dayOfWeek, scoreGot.innerHTML);
    }
  } else {
    displayMessage("Game Over", "bad");
  }
}

function displayMessage(message, className) {
  let span = document.createElement("span");
  span.className = className;
  let spanText = document.createTextNode(message);
  span.appendChild(spanText);
  finishMessage.appendChild(span);
}

function endGame() {
  if (
    input.value.toLocaleLowerCase() === theWord.innerHTML.toLocaleLowerCase()
  ) {
    checkWord();
  } else {
    displayMessage("Game Over", "bad");
  }
  upcomingWords.innerHTML = "";
  upcomingWords.innerHTML = "Words Will Show Here";
  intertValPermission = 0;
  theWord.innerHTML = "";
}

document.querySelectorAll(".toggle").forEach((item) => {
  item.addEventListener("click", () => {
    const content = item.nextElementSibling;
    if (content && content.classList.contains("content")) {
      content.style.display =
        content.style.display === "block" ? "none" : "block";
    }
  });
});

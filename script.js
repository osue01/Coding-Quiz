// script.js

// add questions in an array so you can call obj 1 by 1
//nest answer to add feedback

let questions = [
  {
    prompt: `Which HTML element do we put the Javascript inside of?`,
    options: ["<javascript>", "<js>", "<script>", "<scripting>"],
    answer: "<script>",
  },

  {
    prompt: `How do you create a function in Javascript`,
    options: [
      "call myFunction()",
      "myFunction()",
      "call function myFunction",
      "Call.myFunction",
    ],
    answer: "myFunction()",
  },

  {
    prompt: `What is the correct shorthand for Javascript?`,
    options: ["js", "java", "jass", "jeff"],
    answer: "js",
  },
];

// Get Dom Elements, anytime you access dom elements, document.
//let variable get something from the dom with id of ""

let questionsEl = document.querySelector("#questions");
let timerEl = document.querySelector("#timer");
let choicesEl = document.querySelector("#options");
let submitBtn = document.querySelector("#submit-score");
let startQuizBtn = document.querySelector("#start");
let nameEl = document.querySelector("#name");
let feedbackEl = document.querySelector("#feedback");
let reStartBtn = document.querySelector("#restart");

// Quiz's initial state, start quiz at 0th obj, for 15 secs per question
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

// call quizStart function which starts timer, and brings user to landingscreen to begin quiz. hides everything with class hide (homepage)
function quizStart() {
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;
  let landingScreenEl = document.getElementById("start-screen");
  landingScreenEl.setAttribute("class", "hide");
  questionsEl.removeAttribute("class");
  getQuestion();
}

// Loop through array of questions and
// Answers and create list with buttons
function getQuestion() {
  let currentQuestion = questions[currentQuestionIndex];
  let promptEl = document.getElementById("question-words");
  promptEl.textContent = currentQuestion.prompt;
  choicesEl.innerHTML = "";
  currentQuestion.options.forEach(function (choice, i) {
    let choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("value", choice);
    choiceBtn.textContent = i + 1 + ". " + choice;
    choiceBtn.onclick = questionClick;
    choicesEl.appendChild(choiceBtn);
  });
}

// Check for right answers and deduct
// Time for wrong answer, go to next question

function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 10;
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
    feedbackEl.textContent = `Not Quite! The correct answer was 
		${questions[currentQuestionIndex].answer}.`;
    feedbackEl.style.color = "red";
  } else {
    feedbackEl.textContent = "Nice!";
    feedbackEl.style.color = "green";
  }
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 2000);
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

// End quiz by hiding questions,
// Stop timer and show final score

function quizEnd() {
  clearInterval(timerId);
  let endScreenEl = document.getElementById("quiz-end");
  endScreenEl.removeAttribute("class");
  let finalScoreEl = document.getElementById("score-final");
  finalScoreEl.textContent = time;
  questionsEl.setAttribute("class", "hide");
}

// End quiz if timer reaches 0

function clockTick() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

// Save score in local storage
// Along with users' name

function saveHighscore() {
  let name = nameEl.value.trim();
  if (name !== "") {
    let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    let newScore = {
      score: time,
      name: name,
    };
    highscores.push(newScore);
    highscores.sort(function (a, b) {
      const comparison = b.score - a.score;
      if (comparison !== 0) {
        return comparison;
      }
      if (a.name < b.name) {
        return -1;
      } else if (a.name === b.name) {
        return 0;
      } else {
        return 1;
      }
    });

    highscores.splice(5);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    alert("Your Score has been Submitted");
  }
}

// Save users' score after pressing enter

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
    alert("Your Score has been Submitted");
  }
}
nameEl.onkeyup = checkForEnter;

// Save users' score after clicking submit

submitBtn.onclick = saveHighscore;

// Start quiz after clicking start quiz

startQuizBtn.onclick = quizStart;


//Create questions array
const questions = [
    "Question 1: What is not one of the fundamentals of Javascript?",
    "Question 2: Which HTML element do we put the Javascript inside of?",
    "Question 3: How do you create a function in Javascript"
]

const startTestBtn = document.getElementById('startTestBtn');
const questionContainer = document.getElementById('questionContainer');
let currentQuestionIndex = 0;

function showNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        questionContainer.textContent = questions[currentQuestionIndex];
        currentQuestionIndex++;
    } else {
        questionContainer.textContent = "End of Quiz";
    }
}

startTestBtn.addEventListener ('click', () => {
    showNextQuestion();
});

// Selects element by class
var timeEl = document.querySelector(".time");

// Selects element by id
var mainEl = document.getElementById("main");

var secondsLeft = 3;

function setTime() {
  // Sets interval in variable, this is saying every milisecond, run this 
  //function until it is cleared
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " til end of quiz.";

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      sendMessage();
    }

  }, 1000);
};



// Function to create and append colorsplosion image
function sendMessage() {
    var submitMessage = "Time's up!"

    var textNode = document.createTextNode(submitMessage)
    mainEl.appendChild(textNode);
};

setTime();

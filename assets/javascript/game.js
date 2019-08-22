const trivia = {
  question1: {
    prompt: "The answer is A",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    appearance: false
  },
  question2: {
    prompt: "The answer is C",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    appearance: false
  },
  question3: {
    prompt: "The answer is D",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    appearance: false
  },
  question4: {
    prompt: "The answer is B",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    appearance: false
  },
  question5: {
    prompt: "The answer is C",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    appearance: false
  },
  question6: {
    prompt: "The answer is B",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    appearance: false
  },
  question7: {
    prompt: "The answer is D",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    appearance: false
  },
  question8: {
    prompt: "The answer is B",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    appearance: false
  },

  correct: 0
};

// start/reset function
const restart = function() {
  for (let x in trivia) {
    trivia[x].appearance = false;
  }
  const titleScreen = document.getElementById("quizContent");
  const startButton = document.createElement("div");
  titleScreen.innerHTML = "";
  startButton.id = "startButton";
  startButton.textContent = "START";
  titleScreen.appendChild(startButton);
};

restart();
const timer10 = function() {
  let timeLeft = 10;
  // clear existing questions
  // const questions = document.getElementById("quizContent");
  questionTimer = setInterval(countDown, 1000);
  const showClock = document.getElementById("timerDisplay");
  showClock.textContent = timeLeft;
  function countDown() {
    if (timeLeft > 1) {
      // timeLeft > 1 doesn't display 0
      timeLeft--;
      showClock.textContent = timeLeft;
    } else {
      // document.getElementById("timerDisplay").textContent(timeLeft);
      showClock.textContent = "TIME'S UP";
      clearInterval(questionTimer);
    }
  }
};
// clicking start button will clear button, display first question and start timer
document.getElementById("startButton").onclick = function nextQuestion() {
  timer10();
  document.getElementById("quizContent").removeChild(startButton);
};
// answering a question right or wrong displays result and starts short timer for next question
//      OR
// allowing timer to run out will count as wrong
//
// at end, display score and reset values, show title again

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
  const titleScreen = document.getElementById("container");
  const startButton = document.createElement("div");
  titleScreen.innerHTML = "";
  startButton.id = "startButton";
  startButton.textContent = "START";
  titleScreen.appendChild(startButton);
};

restart();

// clicking start button will display first question and start timer
document.getElementById("startButton").onclick = function nextQuestion() {
  console.log("hello");
  const questions = document.getElementById("container");
};
// answering a question right or wrong displays result and starts short timer for next question
//      OR
// allowing timer to run out will count as wrong
//
// at end, display score and reset values, show title again

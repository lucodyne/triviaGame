const trivia = {
  question1: {
    prompt: "The answer is A",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    appearance: true
  },
  question2: {
    prompt: "The answer is C",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    appearance: true
  },
  question3: {
    prompt: "The answer is D",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    appearance: true
  },
  question4: {
    prompt: "The answer is B",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    appearance: true
  },
  question5: {
    prompt: "The answer is C",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    appearance: true
  },
  question6: {
    prompt: "The answer is B",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    appearance: true
  },
  question7: {
    prompt: "The answer is D",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    appearance: true
  },
  question8: {
    prompt: "The answer is B",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    appearance: true
  }
};
const score = 0;

// start/reset function
function restart() {
  for (let x in trivia) {
    trivia[x].appearance = false;
  }
  $("#quizContent").append("<div id=startButton>START</div>");
}

function timer10() {
  let timeLeft = 10;
  // clear existing questions
  // const questions = document.getElementById("quizContent");
  questionTimer = setInterval(countDown, 1000);
  $("#timerDisplay").text(timeLeft);
  function countDown() {
    if (timeLeft > 1) {
      // timeLeft > 1 doesn't display 0
      timeLeft--;
      $("#timerDisplay").text(timeLeft);
    } else {
      // document.getElementById("timerDisplay").textContent(timeLeft);
      $("#timerDisplay").text("TIME'S UP");
      clearInterval(questionTimer);
    }
  }
}
$(document).ready(function() {
  //runs restart once immediately
  restart();
  console.log("HELP");
  // clicking start button will clear button, display first question and start timer
  $(document).on("click", "#startButton", function() {
    timer10();
    // $("#quizContent").remove(startButton);
  });
});
// answering a question right or wrong displays result and starts short timer for next question
//      OR
// allowing timer to run out will count as wrong
//
// at end, display score and reset values, show title again

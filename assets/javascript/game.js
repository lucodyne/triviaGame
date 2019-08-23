const trivia = {
  question1: {
    prompt: "This is question1",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    appearance: true
  },
  question2: {
    prompt: "This is question2",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    appearance: true
  },
  question3: {
    prompt: "This is question3",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    appearance: true
  },
  question4: {
    prompt: "This is question4",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    appearance: true
  },
  question5: {
    prompt: "This is question5",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    appearance: true
  },
  question6: {
    prompt: "This is question6",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    appearance: true
  },
  question7: {
    prompt: "This is question7",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    appearance: true
  },
  question8: {
    prompt: "This is question8",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    appearance: true
  }
};
let score = 0;
let questionCount = 0;

// start/reset function
function restart() {
  for (let x in trivia) {
    trivia[x].appearance = false;
  }
  $("#quizContent").append("<div id=startButton>START</div>");
}

function timer15() {
  // let timeLeft = 15;
  let timeLeft = 3; // FOR TESTING ONLY
  // NOT DONE YET: clear existing questions
  questionTimer = setInterval(countDown, 1000);
  $("#timerDisplay").text(timeLeft);
  function countDown() {
    if (timeLeft > 1) {
      // timeLeft > 1 doesn't display 0
      timeLeft--;
      $("#timerDisplay").text(timeLeft);
    } else {
      $("#timerDisplay").text("TIME'S UP");
      clearInterval(questionTimer);
      // NOT DONE YET: count question as wrong, wait 3 seconds, go next
      goNext();
    }
  }
}
// waits 3 seconds, selects next question and calls timer
function goNext() {
  if (questionCount < 8) {
    setTimeout(function() {
      shuffle();
      timer15();
    }, 3000);
  }
}
function shuffle() {
  let RNG;
  let shuffleState = false;
  while (shuffleState == false) {
    RNG = `question${Math.floor(Math.random() * 8 + 1)}`;
    console.log(RNG);
    if (trivia[RNG].appearance == true) {
    } else {
      trivia[RNG].appearance = true;
      $("#quizContent").text(trivia[RNG].prompt);
      questionCount++;
      console.log("questionCount: " + questionCount);
      shuffleState = true;
    }
    //NOT DONE YET: display answers(with listeners by id)
  }
}

$(document).ready(function() {
  //runs restart once immediately
  restart();
  // clicking start button will clear button, display a question and start timer
  $(document).on("click", "#startButton", function() {
    timer15();
    shuffle();
    $("#startButton").remove();
  });
});
// answering a question right or wrong displays result and starts short timer for next question
//      OR
// allowing timer to run out will count as wrong
//
// at end, display score and reset values, show title again

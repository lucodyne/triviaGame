const trivia = {
  question1: {
    prompt: "This is question1",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    solution: "answerA",
    appearance: true
  },
  question2: {
    prompt: "This is question2",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    solution: "answerB",
    appearance: true
  },
  question3: {
    prompt: "This is question3",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    solution: "answerC",
    appearance: true
  },
  question4: {
    prompt: "This is question4",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    solution: "answerD",
    appearance: true
  },
  question5: {
    prompt: "This is question5",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    solution: "answerA",
    appearance: true
  },
  question6: {
    prompt: "This is question6",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    solution: "answerB",
    appearance: true
  },
  question7: {
    prompt: "This is question7",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    solution: "answerC",
    appearance: true
  },
  question8: {
    prompt: "This is question8",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    solution: "answerD",
    appearance: true
  },
  question9: {
    prompt: "This is question9",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    solution: "answerA",
    appearance: true
  },
  question10: {
    prompt: "This is question10",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    solution: "answerB",
    appearance: true
  },
  question11: {
    prompt: "This is question11",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    solution: "answerC",
    appearance: true
  },
  question12: {
    prompt: "This is question11",
    answerA: "A",
    answerB: "B",
    answerC: "C",
    answerD: "D",
    solution: "answerD",
    appearance: true
  }
};
let score = 0;
let questionCount = 0;
let inputLimit = false;

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
    inputLimit = true;
    setTimeout(function() {
      shuffle();
      timer15();
      inputLimit = false;
    }, 3000);
  }
}
function shuffle() {
  let RNG;
  let shuffleState = false;
  while (shuffleState == false) {
    RNG = `question${Math.floor(Math.random() * 12 + 1)}`;
    console.log(RNG);
    if (trivia[RNG].appearance == true) {
    } else {
      trivia[RNG].appearance = true;
      questionCount++;
      $("#quizContent").html(
        `<div class=qPrompt>Question #${questionCount}: ${trivia[RNG].prompt}</div>`
      );
      console.log("questionCount: " + questionCount);
      shuffleState = true;
      $("#quizContent").append(
        `<div class=qChoice id=answerA>${trivia[RNG].answerA}</div>`
      );
      $("#quizContent").append(
        `<div class=qChoice id=answerB>${trivia[RNG].answerB}</div>`
      );
      $("#quizContent").append(
        `<div class=qChoice id=answerC>${trivia[RNG].answerC}</div>`
      );
      $("#quizContent").append(
        `<div class=qChoice id=answerD>${trivia[RNG].answerD}</div>`
      );
    }
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

  //listener for user answer choice
  $(document).on("click", ".qChoice", function() {
    if (inputLimit == false) {
      clearInterval(questionTimer);
      $("#timerDisplay").text(`user entered: ${event.target.id}`);
      goNext();
    }
  });
});
// answering a question right or wrong displays result and starts short timer for next question
//      OR
// allowing timer to run out will go to next question without score++
//
// at end, display score, show a restart button again

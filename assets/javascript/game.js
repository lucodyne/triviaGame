const trivia = {
  question1: {
    prompt: "This is question1",
    answerA: "A1",
    answerB: "B1",
    answerC: "C1",
    answerD: "D1",
    solution: "answerA",
    appearance: true
  },
  question2: {
    prompt: "This is question2",
    answerA: "A2",
    answerB: "B2",
    answerC: "C2",
    answerD: "D2",
    solution: "answerB",
    appearance: true
  },
  question3: {
    prompt: "This is question3",
    answerA: "A3",
    answerB: "B3",
    answerC: "C3",
    answerD: "D3",
    solution: "answerC",
    appearance: true
  },
  question4: {
    prompt: "This is question4",
    answerA: "A4",
    answerB: "B4",
    answerC: "C4",
    answerD: "D4",
    solution: "answerD",
    appearance: true
  },
  question5: {
    prompt: "This is question5",
    answerA: "A5",
    answerB: "B5",
    answerC: "C5",
    answerD: "D5",
    solution: "answerA",
    appearance: true
  },
  question6: {
    prompt: "This is question6",
    answerA: "A6",
    answerB: "B6",
    answerC: "C6",
    answerD: "D6",
    solution: "answerB",
    appearance: true
  },
  question7: {
    prompt: "This is question7",
    answerA: "A7",
    answerB: "B7",
    answerC: "C7",
    answerD: "D7",
    solution: "answerC",
    appearance: true
  },
  question8: {
    prompt: "This is question8",
    answerA: "A8",
    answerB: "B8",
    answerC: "C8",
    answerD: "D8",
    solution: "answerD",
    appearance: true
  },
  question9: {
    prompt:
      "How many champion abilities have the potential to stack infinitely?",
    answerA: "5",
    answerB: "6",
    answerC: "7",
    answerD: "8",
    solution: "answerD",
    appearance: true
  },
  question10: {
    prompt: "How many reworks has Ryze undergone since release?",
    answerA: "4",
    answerB: "5",
    answerC: "6",
    answerD: "7",
    solution: "answerB",
    appearance: true
  },
  question11: {
    prompt: `Which champion used to have a passive that shared a name with Nocturne's ultimate ability, "Paranoia"?`,
    answerA: "Fiddlesticks",
    answerB: "Gangplank",
    answerC: "Evelynn",
    answerD: "Twisted Fate",
    solution: "answerA",
    appearance: true
  },
  question12: {
    prompt: `Which champion has the lowest base AD in the game?`,
    answerA: "Sona",
    answerB: "Karthus",
    answerC: "Orianna",
    answerD: "Lulu",
    solution: "answerC",
    appearance: true
  }
};
let score = 0;
let questionCount = 0;
let inputLimit = false;
let RNG;

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
      goNext();
    }
  }
}
// waits 3 seconds, selects next question and calls timer15
function goNext() {
  if (questionCount < 8) {
    inputLimit = true;
    setTimeout(function() {
      shuffle();
      timer15();
      inputLimit = false;
    }, 3000);
  } else {
    // THIS IS THE END SCREEN
  }
}

// shuffle chooses a random question that hasn't appeared yet
function shuffle() {
  let shuffleState = false;
  while (shuffleState == false) {
    RNG = `question${Math.floor(Math.random() * 12 + 1)}`;
    if (trivia[RNG].appearance == true) {
    } else {
      trivia[RNG].appearance = true;
      questionCount++;
      // html not ideal, should insert divs with jquery
      $("#quizContent").html(
        `<div class=qPrompt>Question #${questionCount}: ${trivia[RNG].prompt}</div>`
      );
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
      // correct/incorrect logic here:
      if (trivia[RNG].solution == event.target.id) {
        score++;
        $("#timerDisplay").text("CORRECT!");
      } else {
        $("#timerDisplay").text("WRONG!");
      }
      goNext();
    }
  });
});
// answering a question right or wrong displays result and starts short timer for next question
//      OR
// allowing timer to run out will go to next question without score++
//
// at end, display score, show a restart button again

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
    prompt: "_____ has the lowest base HP in the game",
    answerA: "Yuumi",
    answerB: "Anivia",
    answerC: "Gnar",
    answerD: "Kled",
    solution: "answerB",
    appearance: true
  },
  question7: {
    prompt:
      "_____'s passive ability causes basic attacks to apply a debuff that converts 10% of magic damage received to true damage",
    answerA: "Amumu",
    answerB: "Corki",
    answerC: "Alistar",
    answerD: "Rumble",
    solution: "answerA",
    appearance: true
  },
  question8: {
    prompt: "How many champions have abilities that can stack infinitely?",
    answerA: "5",
    answerB: "6",
    answerC: "7",
    answerD: "8",
    solution: "answerD",
    appearance: true
  },
  question9: {
    prompt: "At what level does Tristana's auto attack range exceed Caitlyn's?",
    answerA: "15",
    answerB: "16",
    answerC: "17",
    answerD: "18",
    solution: "answerC",
    appearance: true
  },
  question10: {
    prompt: "Since release, Ryze has undergone __ reworks.",
    answerA: "4",
    answerB: "5",
    answerC: "6",
    answerD: "7",
    solution: "answerB",
    appearance: true
  },
  question11: {
    prompt: `_____ used to have a passive that shared a name with Nocturne's ultimate ability, "Paranoia"`,
    answerA: "Fiddlesticks",
    answerB: "Gangplank",
    answerC: "Evelynn",
    answerD: "Twisted Fate",
    solution: "answerA",
    appearance: true
  },
  question12: {
    prompt: `_____ has the lowest base AD in the game.`,
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
const 

// start/reset function
function restart() {
  inputLimit = false;
  $("#timerDisplay , #quizContent").empty();
  score = 0;
  questionCount = 0;
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
  inputLimit = true;
  if (questionCount < 8) {
    setTimeout(function() {
      shuffle();
      timer15();
      inputLimit = false;
    }, 3000);
  } else {
    setTimeout(function() {
      // THIS IS THE END SCREEN
      $("#timerDisplay").empty();
      $("#quizContent").html(
        `<div class=scoreCard>Score: ${(score * 100) / 8}% (${score}/8)</div>`
      );
    }, 3000);
    setTimeout(function() {
      $("#quizContent").append(`<div id=toTitle>Play Again?</div>`);
    }, 5000);
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
      inputLimit = true;
      clearInterval(questionTimer);
      // correct/incorrect logic here:
      if (trivia[RNG].solution == event.target.id) {
        score++;
        $("#timerDisplay").text("CORRECT!");
        $(`#${event.target.id}`).addClass("trueAnswer");
        //play sound
      } else {
        $("#timerDisplay").text("WRONG!");
        $(`#${event.target.id}`).addClass("falseAnswer");
        let falseAnswer = trivia[RNG].solution;
        $(`#${falseAnswer}`).addClass("trueAnswer");
        //also, play sound
      }
      goNext();
    }
  });

  $(document).on("click", "#toTitle", function() {
    restart();
  });
});

// first question doesn't receive input for some reason

const trivia = {
  question1: {
    prompt:
      "Excluding wards, __ champions can create an object that can be Teleported to.",
    answerA: "13",
    answerB: "14",
    answerC: "16",
    answerD: "18",
    solution: "answerC",
    appearance: true
  },
  question2: {
    prompt:
      "_____'s basic attacks apply up to 100 stacks of a debuff that lowers armor and magic resistance.",
    answerA: "Elder Dragon",
    answerB: "Baron Nashor",
    answerC: "Rammus",
    answerD: "Teemo",
    solution: "answerB",
    appearance: true
  },
  question3: {
    prompt: "Elder Dragon will only spawn after __ minutes.",
    answerA: "15",
    answerB: "25",
    answerC: "35",
    answerD: "45",
    solution: "answerC",
    appearance: true
  },
  question4: {
    prompt:
      "For the first 15 minutes in-game, siege minions will spawn every __ waves.",
    answerA: "2",
    answerB: "3",
    answerC: "4",
    answerD: "5",
    solution: "answerB",
    appearance: true
  },
  question5: {
    prompt: `How many "PROJECT" skins are there?`,
    answerA: "12",
    answerB: "13",
    answerC: "15",
    answerD: "17",
    solution: "answerD",
    appearance: true
  },
  question6: {
    prompt: "_____ has the lowest base HP of all champions.",
    answerA: "Kled",
    answerB: "Anivia",
    answerC: "Yuumi",
    answerD: "Gnar",
    solution: "answerA",
    appearance: true
  },
  question7: {
    prompt:
      "_____'s passive ability causes basic attacks to apply a debuff that converts 10% of magic damage received to true damage.",
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
    prompt: `_____ used to have a passive that shared a name with Nocturne's ultimate ability, "Paranoia."`,
    answerA: "Fiddlesticks",
    answerB: "Gangplank",
    answerC: "Evelynn",
    answerD: "Twisted Fate",
    solution: "answerA",
    appearance: true
  },
  question12: {
    prompt: `_____ has the lowest base AD of all champions.`,
    answerA: "Sona",
    answerB: "Karthus",
    answerC: "Lulu",
    answerD: "Orianna",
    solution: "answerD",
    appearance: true
  },
  question13: {
    prompt: `Olaf's passive ability grants him _____ based on his missing health.`,
    answerA: "Attack Damage",
    answerB: "Attack Speed",
    answerC: "Critical Strike Chance",
    answerD: "Life Steal",
    solution: "answerB",
    appearance: true
  },
  question14: {
    prompt: `How many champions have no abilities that scale with ability power?`,
    answerA: "17",
    answerB: "19",
    answerC: "20",
    answerD: "21",
    solution: "answerA",
    appearance: true
  },
  question15: {
    prompt: `Destroyed inhibitors respawn after __ minutes.`,
    answerA: "3",
    answerB: "5",
    answerC: "7",
    answerD: "8",
    solution: "answerB",
    appearance: true
  },
  question16: {
    prompt: `Flash has a cooldown timer of __ minutes.`,
    answerA: "3",
    answerB: "5",
    answerC: "6",
    answerD: "8",
    solution: "answerB",
    appearance: true
  },
  question17: {
    prompt: `Which champion summons the pet with the highest BASE health?`,
    answerA: "Annie",
    answerB: "Ivern",
    answerC: "Malzahar",
    answerD: "Yorick",
    solution: "answerD",
    appearance: true
  }
};
let score = 0;
let questionCount = 0;
let inputLimit = false;
let RNG;

const soundGood = new Audio("./assets/sound/Good.mp3");
const soundBad = new Audio("./assets/sound/Bad.mp3");

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
  let timeLeft = 15;
  // let timeLeft = 3; // FOR TESTING ONLY
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
      let falseAnswer = trivia[RNG].solution;
      $(`#${falseAnswer}`).addClass("trueAnswer");
      soundBad.play();
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
    RNG = `question${Math.floor(Math.random() * 17 + 1)}`;
    if (trivia[RNG].appearance == true) {
    } else {
      trivia[RNG].appearance = true;
      questionCount++;
      // html not ideal, should insert divs with jquery
      $("#quizContent").html(
        `<div class=qPrompt>Question ${questionCount}/8: ${trivia[RNG].prompt}</div>`
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
        soundGood.play();
        score++;
        $("#timerDisplay").text("CORRECT!");
        $(`#${event.target.id}`).addClass("trueAnswer");
        //play sound
      } else {
        soundBad.play();
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

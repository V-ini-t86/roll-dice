const dices = [
  { id: 1, diceImg: "/src/images/dice1.png" },
  { id: 2, diceImg: "/src/images/dice2.png" },
  { id: 3, diceImg: "/src/images/dice3.png" },
  { id: 4, diceImg: "/src/images/dice4.png" },
  { id: 5, diceImg: "/src/images/dice5.png" },
  { id: 6, diceImg: "/src/images/dice6.png" },
];
// dom elements
let image = document.getElementById("dImg");
let head = document.getElementById("head");
let sixtySecTimer = document.querySelector(".sixtySec");
let loadingHeading = document.querySelector(".loading-game");
let diceWillStopAt5sec = document.querySelector(".dice-stop");
let startAgain = document.querySelector(".start-again");
let buttons = document.querySelector(".buttons");
let gameInfo = document.querySelector(".game-info");
let showMessage = document.querySelector(".w-and-r");

[0, 1, 2, 3, 4, 5].forEach((i) => {
  buttons.children[i].addEventListener("click", function () {
    let selectedVariable = document.querySelector(".selected-var");
    selectedVariable.innerHTML = i + 1;
  });
});

// ---------------------------------------  Functions------------------------------

//  Loading the Game
let timer60 = 60;
const sixty = setInterval(() => {
  timer(timer60);
}, 100);

function timer(time) {
  if (time === 0) {
    stopTheSetInterval(sixty);
    loadingHeading.innerHTML = null;
    gameStart(); // Start The Game
    return;
  }
  time--;
  sixtySecTimer.innerHTML = time;
  timer60 = time;
}

function gameStart() {
  diceWillStopAt5sec.innerHTML =
    "Dice will change in <span class='timer-at-five'>5</span> seconds";
  let timerAtFive = document.querySelector(".timer-at-five");
  let t = 5;
  const fiveSec = setInterval(() => {
    if (t == 0) {
      stopTheSetInterval(fiveSec);
      startTheDice(diceWillStopAt5sec);
    } else {
      t--;
      timerAtFive.innerHTML = t;
    }
  }, 1000);
}

// Change the dice function
function startTheDice() {
  const diceStop = diceRoll();
  let t = 5;
  const stop = setInterval(() => {
    if (t === 0) {
      stopTheSetInterval(diceStop);
      stopTheSetInterval(stop);
      whenDiceStops();
      restartTheGame(diceWillStopAt5sec);
    }
    t--;
  }, 1000);
}

function roll(number) {
  image.src = dices[number].diceImg;
  image.id = number + 1;
}

function whenDiceStops() {
  let selectedVariable = document.querySelector(".selected-var").innerHTML;
  let id = image.id;
  showMessage.classList = "show-message";
  console.log(showMessage);
  if (selectedVariable == 0) {
    showMessage.innerText = "You didn't press any button,Try Again";
  } else if (selectedVariable == id) {
    // Add To Score
    showMessage.innerText = "Your Guess was right";
    let score = document.getElementById("score");
    let sum = addToScore(score, id);
    score.innerText = sum;
  } else if (selectedVariable != id) {
    showMessage.innerText = "Your Guess was wrong";
  }
}

function restartTheGame(diceWillStopAt5sec) {
  let setTime = 10;
  diceWillStopAt5sec.innerHTML =
    "The Game Starts again in <span class='timer-at-five'>10</span> seconds";
  let time5 = document.querySelector(".timer-at-five");
  let startTheGameAgain = setInterval(() => {
    if (setTime === 0) {
      stopTheSetInterval(startTheGameAgain);
      resetTheElements(showMessage);
      gameStart();
    }
    setTime--;
    time5.innerHTML = setTime;
  }, 1000);
}

function diceRoll() {
  return setInterval(() => {
    let random = Math.floor(Math.random() * 6);
    roll(random);
  }, 100);
}

function addToScore(score, id) {
  let sum = parseInt(score.innerText) + parseInt(id);
  return sum;
}

function stopTheSetInterval(intervalName) {
  clearInterval(intervalName);
}

function resetTheElements(element) {
  element.innerHTML = null;
  element.classList.remove("show-message");
  let variable = document.querySelector(".selected-var");
  variable.innerHTML = 0;
}

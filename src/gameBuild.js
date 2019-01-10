import { cardList } from "./game.js";
import { shuffle } from "./shuffle.js";

let prevTime, stopwatchInterval, elapsedTime = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let attempts = 0,
    points = 0;

export function initGame(level) {
  let gameCardList = cardList;

  $('.game-box').toggleClass("active");
  $('.start').toggleClass("active");

  //Game level
  switch (level) {
    case 1:
    initGameLevel(5, gameCardList);
      break;

    case 2:
    initGameLevel(8, gameCardList);
      break;

    case 3:
    initGameLevel(10, gameCardList);
      break;

    default:
      break;
  }

  startTime();

}

//Game Functions

function updateTime () {
  let tempTime = elapsedTime;
  tempTime = Math.floor(tempTime / 1000);
  let seconds = tempTime % 60;
  tempTime = Math.floor(tempTime / 60);
  let minutes = tempTime % 60;
  tempTime = Math.floor(tempTime / 60);

  let time = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds) + " ";
  
  $(".game-info__timer__number").text(time);
};

function startTime() {
  if (!stopwatchInterval) {
    stopwatchInterval = setInterval(function () {
      if (!prevTime) {
        prevTime = Date.now();
      }
      
      elapsedTime += Date.now() - prevTime;
      prevTime = Date.now();
      
      updateTime();
    }, 500);
  }
}

function pauseTime() {
  if (stopwatchInterval) {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
  }
  prevTime = null;
}

function resetTime() {
  pauseTime();
  elapsedTime = 0;
  updateTime();
}

function initGameLevel(n, cards) {
  let _cards = cards;
  _cards = _cards.slice(0, n);
  _cards = _cards.concat(_cards);
  _cards = shuffle(_cards);
  _cards.forEach(populateDOMCards);
}

function populateDOMCards(element, index, array) {
  $('.game-box__cards').append("<li class='game-box__cards__card' data-framework='"+  element.id +"'>\
                 <div class='game-box__cards__card__front'>\
                 <img src='https://www.billboard.com/files/media/Taylor-Swift-reputation-ART-2017-billboard-1240.jpg'></div>\
                 <div class='game-box__cards__card__back'>\
                 <img src='" + element.bgUrl + "'></div>\
                 </li>");
 
  if (++index == array.length) {
    $('.game-box__cards__card').each((index, element) => $(element).bind('click', flipCard));
  }
}

function flipCard() {
  if (lockBoard) return;
  if (this.classList.contains('flipped')) return;

  this.classList.add('flipped');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
  }
}

function checkForMatch() {
  attempts = attempts + 1;
  $('.game-info__moves__number').text(attempts + " ");

  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? matchProcess() : unflipCards();
}

function unflipCards() {
  lockBoard = true;

  let audios = ['./assets/audio/lose1.mp3', './assets/audio/lose2.mp3', './assets/audio/lose3.mp3']
  let audio = new Audio(audios[Math.round(Math.random() * ((2 - 0 + 1) + 0))]);
  audio.play();

  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
   lockBoard = false;
  }, 1000);
}

function matchProcess() {
  let audio = new Audio('./assets/audio/right1.mp3');
  audio.play();

  let oldPoints = points;
  points = points + 20;

  let addPoints = setInterval(countPoints, 50);
  function countPoints() {
    if (oldPoints == points) {
      clearInterval(addPoints);
    }
    $('.game-info__score__number').html(oldPoints++ + " ");
  }
  checkVictory();
}

function checkVictory() {
  let isWon = 0;

  $('.game-box__cards__card').each((index, element) => element.classList.contains('flipped') ? null : isWon++);
  isWon == 0 ? finishGame() : null;
}

function finishGame() {
  let time = Math.round(elapsedTime / 1000)

  let score = points/5 * (points/2 * (1/attempts * 100) * (1/time));
  pauseTime();

  let audios = ['./assets/audio/victory.mp3', './assets/audio/victory2.mp3']
  let audio = new Audio(audios[Math.round(Math.random() * ((0 - 0 + 1) + 0))]);
  audio.play();

  $('.victory-modal').toggleClass('active');

  let addPoints = setInterval(countPoints, 1);
  let showedScore = 0;

  function countPoints() {
    console.log(score, showedScore);
    if (showedScore > score) {
      clearInterval(addPoints);
    }
    $('.victory-modal__score').html(showedScore++ + " ");
  }

  $('.victory-modal__restart').on('click', function() {
    $('.victory-modal').toggleClass('active');

    attempts = 0;
    $('.game-info__moves__number').text(attempts + " ");

    points = 0;
    $('.game-info__score__number').html(points + " ");

    $('.game-box__cards').html(" ");
    $('.game-box').toggleClass("active");
    $('.start').toggleClass("active");

    resetTime();
  })

}
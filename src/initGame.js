import { cardList } from "./game.js";
import { shuffle } from "./shuffle.js";

export function initGame(level) {
  let gameCardList = cardList;

  //Game level
  switch (level) {
    case 1:
   // cardList = cardList.slice(0, 5);
    console.log(gameCardList);
    gameCardList = cardList.concat(gameCardList);
    gameCardList = shuffle(gameCardList);
    gameCardList.forEach(populateDOMCards);
      break;

    case 2:
      break;

    case 3:
      break;

    default:
      break;
  }
}

export function populateDOMCards(element, index, array) {
  cards.append("<li class='game-box__cards__card'>\
                 <div class='game-box__cards__card__front'>\
                 <img src='https://www.billboard.com/files/media/Taylor-Swift-reputation-ART-2017-billboard-1240.jpg'></div>\
                 <div class='game-box__cards__card__back'>\
                 <img src='" + element.bgUrl + "'></div>\
                 </li>");
 
  if (++index == array.length) {
    $('.game-box__cards__card').each((index, element) => $(element).bind('click', flipCard));
  }
}
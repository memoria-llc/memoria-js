/** gamecards holds all the gamecard */
const gameCard = document.getElementsByClassName('game-card');

const gameCards = [...gameCard];

/** the deck holding gameCards */
const deck = document.getElementById('deck');

/** move var */
let moves = 0;
const counter = document.querySelector('.game-moves');

/** display stars */
const stars = document.querySelectorAll('.display-star');

/** when cards match */
const matchedCard = document.getElementsByClassName('matched-card');

/** list of stars */
const starsList = document.querySelectorAll('.display-stars li');

/** the stars in a list */
const closeicon = document.querySelector('.flip');

/** the modal */
const modal = document.getElementById('win-popup');

// array for opened cards
let openedCards = [];

// @description shuffles cards
// @param {array}
// @returns shuffledarray
function shuffle(array) {
  const currentIndex = array.length;
    const temporaryValue;
    const randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// @description shuffles cards when page is refreshed / loads
document.body.onload = startGame();

// @description function to start a new play
function startGame() {
  // empty the openCards array
  openedCards = [];

  // shuffle deck
  cards = shuffle(cards);
  // remove all exisiting classes from each card
  for (var i = 0; i < cards.length; i++) {
    deck.innerHTML = '';
    [].forEach.call(cards, function(item) {
      deck.appendChild(item);
    });
    cards[i].classList.remove('show', 'open', 'match', 'disabled');
  }
  // reset moves
  moves = 0;
  counter.innerHTML = moves;
  // reset rating
  for (var i = 0; i < stars.length; i++) {
    stars[i].style.color = '#FFD700';
    stars[i].style.visibility = 'visible';
  }
  // reset timer
  second = 0;
  minute = 0;
  hour = 0;
  let timer = document.querySelector('.timer');
  timer.innerHTML = '0 mins 0 secs';
  clearInterval(interval);
}

// @description toggles open and show class to display cards
const displayCard = function() {
  this.classList.toggle('open');
  this.classList.toggle('show');
  this.classList.toggle('disabled');
};

// @description add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
  openedCards.push(this);
  const len = openedCards.length;
  if (len === 2) {
    moveCounter();
    if (openedCards[0].type === openedCards[1].type) {
      matched();
    } else {
      unmatched();
    }
  }
}

// @description when cards match
function matched() {
  openedCards[0].classList.add('match', 'disabled');
  openedCards[1].classList.add('match', 'disabled');
  openedCards[0].classList.remove('show', 'open', 'no-event');
  openedCards[1].classList.remove('show', 'open', 'no-event');
  openedCards = [];
}

// description when cards don't match
function unmatched() {
  openedCards[0].classList.add('unmatched');
  openedCards[1].classList.add('unmatched');
  disable();
  setTimeout(function() {
    openedCards[0].classList.remove('show', 'open', 'no-event', 'unmatched');
    openedCards[1].classList.remove('show', 'open', 'no-event', 'unmatched');
    enable();
    openedCards = [];
  }, 1100);
}

// @description disable cards temporarily
function disable() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.add('disabled');
  });
}

// @description enable cards and disable matched cards
function enable() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.remove('disabled');
    for (let i = 0; i < matchedCard.length; i++) {
      matchedCard[i].classList.add('disabled');
    }
  });
}

// @description count player's moves
function moveCounter() {
  moves++;
  counter.innerHTML = moves;
  // start timer on first click
  if (moves == 1) {
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }
  // setting rates based on moves
  if (moves > 8 && moves < 12) {
    for (i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = 'collapse';
      }
    }
  } else if (moves > 13) {
    for (i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.visibility = 'collapse';
      }
    }
  }
}

// @description game timer
var second = 0;
var minute = 0;
hour = 0;
const timer = document.querySelector('.timer');
let interval;

function startTimer() {
  interval = setInterval(function() {
    timer.innerHTML = `${minute  }mins ${  second  }secs`;
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}

// @description congratulations when all cards match, show modal and moves, time and rating
function congratulations() {
  if (matchedCard.length == 16) {
    clearInterval(interval);
    finalTime = timer.innerHTML;

    // show congratulations modal
    modal.classList.add('show');

    // declare star rating variable
    let starRating = document.querySelector('.stars').innerHTML;

    // showing move, rating, time on modal
    document.getElementById('finalMove').innerHTML = moves;
    document.getElementById('starRating').innerHTML = starRating;
    document.getElementById('totalTime').innerHTML = finalTime;

    // closeicon on modal
    closeModal();
  }
}

// @description close icon on modal
function closeModal() {
  closeicon.addEventListener('click', function(e) {
    modal.classList.remove('show');
    startGame();
  });
}

// @desciption for user to play Again
function playAgain() {
  modal.classList.remove('show');
  startGame();
}

// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++) {
  card = cards[i];
  card.addEventListener('click', displayCard);
  card.addEventListener('click', cardOpen);
  card.addEventListener('click', congratulations);
}

const cards = document.querySelectorAll('.memory-card');

// have to make has flipped constant
let hasFlipped = false;
const lockBoard = false;
let firstCard;
let secondCard;

function flipCard() {
  // giving the card a flip class
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  // setting the cards to flip twice, fires only on the seccond click.
  if (!hasFlipped) {
    // firstCard
    hasFlipped = true;
    firstCard = this;
    return;
  }
  // seccond click
  hasFlipped = false;
  secondCard = this;
  checkForMatch();
}
function checkForMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    disableCards();
  } else {
    unFlipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unFlipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    const randomPas = Math.floor(Math.random() * 12);
    card.style.order = randomPas;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

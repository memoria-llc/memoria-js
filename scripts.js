const cards = document.querySelectorAll('.memory-card');

// have to make has flipped constant
let hasFlipped = false;
let firstCard;
let secondCard;

function flipCard() {
  // giving the card a flip class
  this.classList.add('flip');

  // setting the cards to flip twice, fires only on the seccond click.
  if (!hasFlipped) {
    hasFlipped = true;
    firstCard = this;
  } else {
    // seccond click
    hasFlipped = false;
    secondCard = this;
    // do the cards matach?
    console.log(firstCard, secondCard);
    console.log(secondCard.dataset.framework);

    // do the cards match?
  }
}

cards.forEach(card => card.addEventListener('click', flipCard));

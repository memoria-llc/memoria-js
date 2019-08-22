const cards = document.querySelectorAll('.memory-card');

function flipCard() {
  // adding and removing another class "flip"
  this.classList.toggle('flip');
}

/**
 * Event lsitener that loops and grabs each card and onClick,
 *invoked flipCard function
 */

cards.forEach(card => card.addEventListener('click', flipCard));

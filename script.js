const board = document.getElementById("game-board");
let cards = [];
let flippedCards = [];
let matchedCards = 0;
let animalImages = [
  "images/dog.jpg", "images/cat.jpg", "images/lion.jpg", "images/elephant.jpg",  
  "images/dog.jpg", "images/cat.jpg", "images/lion.jpg", "images/elephant.jpg",
];

function startGame() {
  board.innerHTML = "";
  cards = [];
  flippedCards = [];
  matchedCards = 0;

  // Barajar las cartas
  animalImages = shuffle(animalImages);

  // Crear las cartas en el tablero
  for (let i = 0; i < animalImages.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = animalImages[i];

    const img = document.createElement("img");
    img.src = "images/question-mark.png"; // Imagen de marcador de pregunta
    img.alt = "Animal";
    card.appendChild(img);

    card.addEventListener("click", flipCard);
    board.appendChild(card);
    cards.push(card);
  }
}

function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains("flipped") && !this.classList.contains("matched")) {
    this.classList.add("flipped");
    this.querySelector("img").src = this.dataset.value;

    flippedCards.push(this);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.value === card2.dataset.value) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedCards += 2;

    if (matchedCards === cards.length) {
      setTimeout(() => alert("¡Felicidades, has ganado!"), 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.querySelector("img").src = "images/question-mark.png";
      card2.querySelector("img").src = "images/question-mark.png";
    }, 1000);
  }

  flippedCards = [];
}

function shuffle(array) {
  let currentIndex = array.length, randomIndex, tempValue;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
  }

  return array;
}

// Iniciar el juego al cargar la página
startGame();

// JavaScript que maneja la lógica del juego

let flippedCards = [];
let matchedCards = [];

// Array de cartas con imágenes locales de animales
const cards = [
    { id: 1, image: "images/cat.jpg" },
    { id: 2, image: "images/elephant.jpg" },
    { id: 3, image: "images/dog.jpg" },
    { id: 4, image: "images/lion.jpg" },
    { id: 5, image: "images/monkey.jpg" },
    { id: 6, image: "images/tiger.jpg" },
    { id: 7, image: "images/giraffe.jpg" },
    { id: 8, image: "images/panda.jpg" },
];

// Función para generar y mostrar las cartas
function generarCartas() {
    const gameCards = [...cards, ...cards];
    gameCards.sort(() => Math.random() - 0.5); // Mezclar cartas aleatoriamente

    const container = document.getElementById("memorama-container");
    container.innerHTML = ''; // Limpiar las cartas previas

    gameCards.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.dataset.id = card.id;
        cardElement.style.width = "115px";
        cardElement.style.height = "115px";
        cardElement.style.backgroundColor = "#3498db";
        cardElement.style.borderRadius = "10px";
        cardElement.style.display = "flex";
        cardElement.style.justifyContent = "center";
        cardElement.style.alignItems = "center";
        cardElement.style.color = "white";
        cardElement.style.fontSize = "40px";
        cardElement.style.cursor = "pointer";
        cardElement.style.position = "relative";
        cardElement.style.transform = "rotateY(0)";
        cardElement.style.transition = "transform 0.3s ease-in-out";

        // Crear el signo de interrogación en el frente
        const frontFace = document.createElement("div");
        frontFace.innerHTML = "?"; // El signo de interrogación
        frontFace.style.position = "absolute";
        cardElement.appendChild(frontFace);

        // Crear la imagen del animal (por defecto se esconde)
        const backFace = document.createElement("img");
        backFace.src = card.image;
        backFace.style.width = "100%";
        backFace.style.height = "100%";
        backFace.style.borderRadius = "8px";
        backFace.style.position = "absolute";
        backFace.style.visibility = "hidden"; // Ocultar la imagen inicialmente
        cardElement.appendChild(backFace);

        // Agregar evento de clic para voltear las cartas
        cardElement.addEventListener("click", flipCard);

        // Agregar la carta al contenedor
        container.appendChild(cardElement);
    });
}

// Función para voltear las cartas
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.style.transform = "rotateY(180deg)";
        this.querySelector("div").style.visibility = "hidden"; // Ocultar el signo de interrogación
        this.querySelector("img").style.visibility = "visible"; // Mostrar la imagen
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// Función para verificar si las cartas coinciden
function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.id === card2.dataset.id) {
        matchedCards.push(card1.dataset.id);
        flippedCards = [];

        // Verificar si se ganó el juego
        if (matchedCards.length === cards.length) {
            setTimeout(() => alert("¡Has ganado!"), 500);
        }
    } else {
        setTimeout(() => {
            card1.style.transform = "rotateY(0deg)";
            card2.style.transform = "rotateY(0deg)";
            card1.querySelector("div").style.visibility = "visible";
            card2.querySelector("div").style.visibility = "visible";
            card1.querySelector("img").style.visibility = "hidden";
            card2.querySelector("img").style.visibility = "hidden";
            flippedCards = [];
        }, 1000);
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {
    flippedCards = [];
    matchedCards = [];
    generarCartas(); // Regenerar las cartas y empezar de nuevo
}

// Inicializar el juego
generarCartas();



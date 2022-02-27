let blackJackGame = {
    you: {
        scoreSpan: "#your-blackjack-result",
        div: "#your-box",
        boxSize: "#.flex-blackjack-row-2 div",
        score: 0,
    },

    dealer: {
        scoreSpan: "#dealer-blackjack-result",
        div: "#dealer-box",
        boxSize: "#row2",
        score: 0,
    },

    // Cards in a full deck
    cardDeck: ['2-clubs', '3-clubs', '4-clubs', '5-clubs', '6-clubs', '7-clubs', '8-clubs', '9-clubs', '10-clubs', 'J-clubs', 'Q-clubs', 'K-clubs', 'A-clubs', 
    '2-hearts', '3-hearts', '4-hearts', '5-hearts', '6-hearts', '7-hearts', '8-hearts', '9-hearts', '10-hearts', 'J-hearts', 'Q-hearts', 'K-hearts', 'A-hearts', 
    '2-spades', '3-spades', '4-spades', '5-spades', '6-spades', '7-spades', '8-spades', '9-spades', '10-spades', 'J-spades', 'Q-spades', 'K-spades', 'A-spades',
    '2-diamonds', '3-diamonds', '4-diamonds', '5-diamonds', '6-diamonds', '7-diamonds', '8-diamonds', '9-diamonds', '10-diamonds', 'J-diamonds', 'Q-diamonds', 'K-diamonds', 'A-diamonds'],

    // Key-value pairs for each card in a 52 card deck to its respective value in the game of BlackJack
    cardsMap: {
        '2-clubs': 2,
        '3-clubs': 3,
        '4-clubs': 4,
        '5-clubs': 5,
        '6-clubs': 6,
        '7-clubs': 7,
        '8-clubs': 8,
        '9-clubs': 9,
        '10-clubs': 10,
        'J-clubs': 10,
        'Q-clubs': 10,
        'K-clubs': 10,
        'A-clubs': [1, 11],

        '2-hearts': 2,
        '3-hearts': 3,
        '4-hearts': 4,
        '5-hearts': 5,
        '6-hearts': 6,
        '7-hearts': 7,
        '8-hearts': 8,
        '9-hearts': 9,
        '10-hearts': 10,
        'J-hearts': 10,
        'Q-hearts': 10,
        'K-hearts': 10,
        'A-hearts': [1, 11],

        '2-spades': 2,
        '3-spades': 3,
        '4-spades': 4,
        '5-spades': 5,
        '6-spades': 6,
        '7-spades': 7,
        '8-spades': 8,
        '9-spades': 9,
        '10-spades': 10,
        'J-spades': 10,
        'Q-spades': 10,
        'K-spades': 10,
        'A-spades': [1, 11],
        
        '2-diamonds': 2,
        '3-diamonds': 3,
        '4-diamonds': 4,
        '5-diamonds': 5,
        '6-diamonds': 6,
        '7-diamonds': 7,
        '8-diamonds': 8,
        '9-diamonds': 9,
        '10-diamonds': 10,
        'J-diamonds': 10,
        'Q-diamonds': 10,
        'K-diamonds': 10,
        'A-diamonds': [1, 11]
    },
    // Betting chip values, player will start with $250, they lose if they reach $0 and win if they reach $500
    bettingChips: {
        'white': 1,
        'red': 5,
        'green': 10,
        'blue': 25,
        'black': 50
    },

    wins: 0,
    losses: 0,
    draws: 0,
    isStand: false,
    isTurnsOver: false,
    pressOnce: false,
};

const you = blackJackGame['you'];
const dealer = blackJackGame['dealer'];


let windowWidth = window.screen.width;
let windowHeight = window.screen.height;
let winner;

let gamePlay = false;
let cardCount = 0;

// Used cards - empty array where cards will be added once they have already been played
let usedCards = [];


const startScreenContainer = document.getElementById('start-screen-container');
const blackjackGameRules = document.getElementById('game-rules');
const basicStrategyButton = document.getElementById('basic-strategy');
const gamePlayContainer = document.getElementById('game-play-container');
const body = document.getElementById('body')


// Hit, Stand, Deal, New Hand, and Restart button event listeners
document
    .querySelector('#blackjack-hit-button')
    .addEventListener('click', blackJackHit);

document
    .querySelector('#blackjack-stand-button')
    .addEventListener('click', blackJackStand);

document
    .querySelector('#blackjack-deal-button')
    .addEventListener('click', blackJackDeal);

document
    .querySelector('#blackjack-new-hand-button')
    .addEventListener('click', blackJackNewHand);

document
    .querySelector('#blackjack-restart-button')
    .addEventListener('click', blackJackRestart);

// Event listener to link the "Start Game button to the gameStart function"
document
    .getElementById('start-button').addEventListener('click', gameStart);


// Function to change the UI from the homescreen to the game screen when the startGame button is clicked
function gameStart() {
    gamePlay = true;
    startScreenContainer.style.display = 'none';
    gamePlayContainer.style.display = 'contents'
    body.style.backgroundImage = "url(imgs/Blackjack-Table.png)";
    body.style.backgroundSize = 'cover';
    body.style.backgroundPositionX = '0px';
    body.style.backgroundPositionY = '-40px';
}

// Function to select a random card from the deck if the player chooses to hit
function blackJackHit() {
    if (blackJackGame['isStand'] === false) {
        let card = randomCard();
        showCard(card, you);
        updateScore(card, you);
        showScore(you);
        cardDeckLeft();
        cardCounter(card);
        showCardCount();
        // discardCard(card);
    }
}

// Function to choose a random card from the 52 card deck
function randomCard() {
    let randomIndex = Math.floor(Math.random() * (52 - usedCards.length));
    let randomCard = blackJackGame['cardDeck'][randomIndex];
    return randomCard;
}

// Function to display the image of the random card that is dealt
function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `imgs/${card}.png`;
        cardImage.style = `width: ${widthSize()}; height: ${heightSize()};`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
    }
}

// Function to change the width size of the card image depending on the window size
function widthSize() {
    if(windowWidth > 1000) {
        let newWidthSize = (window.screen.width * 0.1);
        return newWidthSize;
    }
    else {
        return (window.screen.width * 0.18);
    }
}

// Function to change the height size of the card image depending on the window size
function heightSize() {
    if (windowHeight > 700) {
        let newHeightSize = (window.screen.height * 0.18);
        return newHeightSize;
    }
    else {
        return (window.screen.height * 0.15);
    }
}

// Function to discard each card dealt during the round
function discardCard(card) {
    // blackJackGame['cardDeck'].splice(randomIndex);
    if (blackJackGame['cardDeck'].length > 0) {
        usedCards.push(card);
        index = blackJackGame['cardDeck'].indexOf(card);
        blackJackGame['cardDeck'].splice(index);
    }
    else{
        blackJackRestart();
    }
    console.log(usedCards);
    console.log(blackJackGame['cardDeck']);
}

// Show face down card for the dealer when cards are dealt
function showFaceDownCard(activePlayer) {
    let faceDownCard = document.createElement('img');
    faceDownCard.id = 'face-down-card';
    faceDownCard.src = 'imgs/back-of-card.png';
    faceDownCard.style = `width: ${widthSize()}; height: ${heightSize()};`;
    document.querySelector(activePlayer['div']).appendChild(faceDownCard);
}

// Function to deal 2 cards to the player and one card and one FaceDownCard to the dealer
function blackJackDeal() {
    blackJackDealPlayer();
    blackJackDealPlayer();
    blackJackDealDealer();
}

// Function to deal cards to the player
function blackJackDealPlayer() {
    if (blackJackGame['isStand'] === false) {
        let card = randomCard();
        showCard(card, you);
        updateScore(card, you);
        showScore(you);
        cardDeckLeft();
        cardCounter(card);
        showCardCount();
        // discardCard(card);
    }
}

// Function to deal cards to the player dealer
function blackJackDealDealer() {
    if (blackJackGame['isStand'] === false) {
        let card = randomCard();
        showCard(card, dealer);
        updateScore(card, dealer);
        showScore(dealer);
        cardDeckLeft();
        cardCounter(card);
        showCardCount();
        // discardCard(card)

        showFaceDownCard(dealer)
    }
}

// Function to update the score
function updateScore(card, activePlayer) {
    if(card.includes('A')) {
        if (activePlayer['score'] + blackJackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackJackGame['cardsMap'][card][1];
        }
        else {
            activePlayer['score'] += blackJackGame['cardsMap'][card][0];
        }
    }
    else {
        activePlayer['score'] += blackJackGame['cardsMap'][card];
    }
    console.log(activePlayer['score']);
}

// Function to show the score
function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = "BUST!";
        document.querySelector(activePlayer['scoreSpan']).style.color = "red";
    }
    else if (activePlayer['score'] === 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = "BLACKJACK!";
        document.querySelector(activePlayer['scoreSpan']).style.color = "blue";
    }
    else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

// Function for the "stand" button
function blackJackStand() {
    if (blackJackGame.pressOnce === false) {
        blackJackGame['isStand'] = true;
        let faceDownCard = document.getElementById('face-down-card');
        faceDownCard.remove();

    for (let i = 0; i < blackJackGame['cardDeck'].length; i++) {
        let card = randomCard();
        if (dealer['score'] <= 16) {
            showCard(card, dealer);
            updateScore(card, dealer);
            showScore(dealer);
            cardDeckLeft();
            cardCounter(card);
            showCardCount();
            // discardCard(card)
        }
    }
    blackJackGame['isTurnsOver'] = true;

    computeWinner();
    showWinner(winner);
  }
    blackJackGame.pressOnce = true;
}

// Function to compute the winner of the round
function computeWinner() {
    if (you['score'] <= 21) {
        if (you['score'] > dealer['score'] || dealer['score'] > 21) {
            winner = you;
        }
        else if (you['score'] < dealer['score']) {
            winner = dealer;
        }
        else if (you['score'] === dealer['score']) {
            winner = 'Draw';
        }
    }
    else if (you['score'] > 21 && dealer['score'] <= 21) {
        winner = dealer;
    }
    else if (you['score'] > 21 && dealer['score'] > 21) {
        winner = 'None';
    }
    return winner;
}

// Function to show the winner
function showWinner() {
    let message, messageColor;

    if (winner === you) {
        message = 'You Won!'
        messageColor = '#00e676';
        document.querySelector('#wins').textContent = blackJackGame['wins'] += 1;
    }

    if (winner === dealer) {
        message = 'You Lost!'
        messageColor = 'red';
        document.querySelector('#losses').textContent = blackJackGame['losses'] += 1;
    }

    if (winner === 'Draw') {
        message = "It's a draw!"
        messageColor = 'yellow';
        document.querySelector('#draws').textContent = blackJackGame['draws'] += 1;
    }
    
    if (winner === 'None') {
        message = "You both busted!"
        messageColor = 'orange';
    }

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
}

// Function to make the deal button work
function blackJackNewHand() {
    
    if (blackJackGame['isTurnsOver'] === true) {

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img')

        you['score'] = dealer['score'] = 0;
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;

        document.querySelector('#your-blackjack-result').style.color = 'white';
        document.querySelector('#dealer-blackjack-result').style.color = 'white';

        document.querySelector('#blackjack-result').textContent = "Let's Play";
        document.querySelector('#blackjack-result').style.color = 'white';

        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }

        for (let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        blackJackGame['isStand'] = false;
        blackJackGame.pressOnce = false;
        blackJackGame['isTurnsOver'] = false;
    }
}

// Function to restart the game board
function blackJackRestart() {

    blackJackNewHand();

    document.querySelector('#wins').textContent = 0;
    document.querySelector('#losses').textContent = 0;
    document.querySelector('#draws').textContent = 0;

    blackJackGame.wins = 0;
    blackJackGame.losses = 0;
    blackJackGame.draws = 0;
}

// Function to keep the card count
function cardCounter(card) {
    if (card.includes('2') || card.includes('3') || card.includes('4') || card.includes('5') || card.includes('6')) {
        cardCount++;
    }
    else if (card.includes('10') || card.includes('J') || card.includes('Q') || card.includes('K') || card.includes('A')) {
        cardCount--;
    }
    else {
        cardCount +=0;
    }
}

// Function to show the card count in the "$ Card Counter $"" button
function showCardCount() {
    if (cardsLeft > 0) {
        document.querySelector('#card-count').textContent = cardCount;
    }
}

// Function to update the cards left in the deck
let cardsLeft = 52;
function cardDeckLeft() {
    if (cardsLeft > 0) {
        cardsLeft--;
        document.querySelector('#cards-left').textContent = cardsLeft;
    }
    else {
        cardsLeft = 52;
    }
}







// ALL CODE BELOW THIS LINE IS FOR THE TWO MODAL BUTTONS ON THE HOMESCREEN AND THE CARD COUNTER MODAL BUTTON 


// Defining varibales to be used in functions for modal buttons on start screen
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
const overlay2 = document.getElementById('overlay2')
const overlay3 = document.getElementById('overlay3')

// Adds an event listener and calls the function to open the modal when the button is clicked
openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = document.querySelector(button.dataset.modalTarget)
      openModal(modal)
    })
})

// Adds an overlay to allow the 'BlackJack Game Rules' modal to be closed by clicking anywhere on the screen
overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

// Adds an overlay to allow the 'BlackJack Basic Strategy' modal to be closed by clicking anywhere on the screen
overlay2.addEventListener('click', () => {
    const modals2 = document.querySelectorAll('.modal2.active')
    modals2.forEach(modal => {
      closeModal(modal)
    })
})

// Adds an overlay to allow the 'BlackJack Basic Strategy' modal to be closed by clicking anywhere on the screen
overlay3.addEventListener('click', () => {
    const modals3 = document.querySelectorAll('.modal3.active')
    modals3.forEach(modal => {
      closeModal(modal)
    })
})

// Event listener to close the 'BlackJack Game Rules' modal
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal')
      closeModal(modal)
    })
})

// Event listener to close the 'BlackJack Basic Strategy' modal
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal2 = button.closest('.modal2')
      closeModal(modal2)
    })
})

// Event listener to close the 'BlackJack Basic Strategy' modal
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal3 = button.closest('.modal3')
      closeModal(modal3)
    })
})

// Function to open the modal by adding 'active' to the classList
function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

// Function to remove the modal by removing 'active' from the classList
function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}
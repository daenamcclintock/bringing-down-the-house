let blackJackGame = {
    player: {
        score: "#player-blackjack-result",
        div: "#player-box",
        box: "#row2",
        score: 0,
    },

    dealer: {
        score: "#dealer-blackjack-result",
        div: "#dealer-box",
        box: "#row2",
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
    // Betting chip values, player will start with $25d0, they lose if they reach $0 and win if they reach $500
    bettingChips: {
        white: 1,
        red: 5,
        green: 10,
        blue: 25,
        black: 50
    },

    wins: 0,
    losses: 0,
    draws: 0,

    stand: false,
    turnsOver: false,
    pressOnce: false,

    // Used cards - empty array where cards will be added once they have already been played
};

const player = blackJackGame.player;
const dealer = blackJackGame.dealer;

let windowWidth = window.screen.width;
let windowHeight = window.screen.height;
let winner;

let gamePlay = false;

// Used cards - empty array where cards will be added once they have already been played
let usedCards = [];

// Hit, Stand, Deal button event listeners
document
    .querySelector('#blackjack-hit-button')
    .addEventListener('click', hit);

document
    .querySelector('#blackjack-stand-button')
    .addEventListener('click', blackjackStand);

document
.querySelector('#blackjack-deal-button')
.addEventListener('click', blackJackDeal);

document
.querySelector('#blackjack-restart-button')
.addEventListener('click', blackJackRestart);



const startGameButton = document.getElementById('start-button');
const startScreenContainer = document.getElementById('start-screen-container');
const blackjackGameRules = document.getElementById('game-rules');
const basicStrategyButton = document.getElementById('basic-strategy');
const gamePlayContainer = document.querySelector('.game-play-container');
const body = document.getElementById('body')


startGameButton.addEventListener('click', gameStart);

// Function to change the UI from the homescreen to the game screen when the startGame button is clicked
function gameStart() {
    gamePlay = true;
    startScreenContainer.style.display = 'none';
    gamePlayContainer.style.display = 'contents';
    body.style.backgroundImage = "url(imgs/Blackjack-Table.png)";
    body.style.backgroundSize = 'cover';
    body.style.backgroundPositionX = '0px';
    body.style.backgroundPositionY = '-40px';

    // let backgroundImg = document.createElement('body');
    // backgroundImg.id = 'background-img'
    // backgroundImg.style.backgroundImage = 'url("/Users/daenamcclintock/sei/projects/game-project/imgs/Blackjack-Table.png")';
    // backgroundImg.style.backgroundRepeat = 'no-repeat';
    // backgroundImg.style.backgroundSize = 'fill';
    // backgroundImg.style.display = 'contents';
    
    // let hitButton = document.createElement('button');
    // hitButton.id = 'hit-button'
    // hitButton.style.backgroundColor = 'red';
    // hitButton.style.color = 'white';
    // hitButton.style.fontWeight = 'bold';
    // hitButton.style.padding = '5px 20px 5px 20px';
    // hitButton.style.display = 'contents';
    
    // let holdButton = document.createElement('button');
    // holdButton.id = 'hold-button'
    // holdButton.style.backgroundColor = 'green';
    // holdButton.style.color = 'white';
    // holdButton.style.fontWeight = 'bold';
    // holdButton.style.padding = '5px 20px 5px 20px';
    // holdButton.style.display = 'contents';
    
    // let doubleButton = document.createElement('button');
    // doubleButton.id = 'double-button'
    // doubleButton.style.backgroundColor = 'blue';
    // doubleButton.style.color = 'white';
    // doubleButton.style.fontWeight = 'bold';
    // doubleButton.style.padding = '5px 20px 5px 20px';
    // doubleButton.style.display = 'contents';
    
    // let splitButton = document.createElement('button');
    // splitButton.id = 'split-button'
    // splitButton.style.backgroundColor = 'black';
    // splitButton.style.color = 'white';
    // splitButton.style.fontWeight = 'bold';
    // splitButton.style.padding = '5px 20px 5px 20px';
    // splitButton.style.display = 'contents';
}

// Function to select a random card from the deck if the player chooses to hit
document.getElementById('blackjack-hit-button').addEventListener('click', hit);
function hit() {
    if (blackJackGame.stand === false) {
        let card = randomCard();
        showCard(card, player);
        updateScore(card. player);
        showScore(player);
    }
}

// Function to choose a random card 
function randomCard() {
    let randomIndex = Math.floor(Math.random() * 52);
    return blackJackGame.cardDeck[randomIndex];
}

// Function to display and image of the random card that is dealt
const showCard = (card, activePlayer) => {
    if (activePlayer.score <= 21) {
        let cardImg = document.createElement('img');
        cardImg.src = `imgs/${card}.png`;
        cardImg.style = `width: ${widthSize()}; height: ${heightSize()}`;
        document.querySelector(activePlayer['div']).appendChild(cardImg);
    }
}

// Function to change the width size of the window for smaller/larger screens
const widthSize = () => {
    if(windowWidth > 1000) {
        let newWindowWidth = (window.screen.width * 0.1);
        return newWindowWidth;
    }
    else {
        return (window.screen.width * 0.18);
    }
}

// Function to change the height size of the window for smaller/larger screens
const heightSize = () => {
    if (windowHeight > 700) {
        let newWindowHeight = (window.screen.height * 0.18);
        return newWindowHeight;
    }
    else {
        return (window.screen.height * 0.15);
    }
}

// Function to update the score
function updateScore (card, activePlayer) {
    if(card === 'A') {
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
}

// Function to show the score
function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = "BUST!";
        document.querySelector(activePlayer['scoreSpan']).style.color = "red";
    }
    else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

// Function for the "stand" button
function blackjackStand() {
    if (blackJackGame.pressOnce === false) {
        blackJackGame['isStand'] = true;
        let yourImages = document.querySelector('your-box').querySelectorAll('img')
    for (let i = 0; i < yourImages.length; i++) {
        let card = randomCard();
        showCard(card, dealer);
        updateScore(card, dealer);
        showScore(dealer);

        blackJackGame['isTurnsOver'] = true;
    }
  }

    blackJackGame.pressOnce = true;

    computeWinner();
    showWinner();
}

// Function to compute the winner of the round
function computeWinner() {
    if (player['score'] <= 21) {
        if (player['score'] > dealer['score'] || dealer['score'] > 21) {
            winner = player;
        }
        else if (player['score'] < dealer['score']) {
            winner = dealer;
        }
        else if (player['score'] === dealer['score']) {
            winner = 'Draw';
        }
    }
    else if (player['score'] > 21 && dealer['score'] <= 21) {
        winner = dealer;
    }
    else if (player['score'] > 21 && dealer['score'] > 21) {
        winner = 'None';
    }
    return winner;
}

// Function to show the winner
function showWinner() {
    let message, messageColor;

    if (winner === player) {
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

    document.querySelector('blackjack-result').textContent = message;
    document.querySelector('blackjack-result').style.color = messageColor;
}

// Function to make the deal button work
function blackJackDeal() {
    if (blackJackGame['turnsOver' === true]) {
        let yourImages = document.querySelector('your-box').querySelectorAll('img')
        let dealerImages = document.querySelector('dealer-box').querySelectorAll('img')

        player['score'] = dealer['score'] = 0;
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;

        document.querySelector('#your-blackjack-result').style.color = 'white';
        document.querySelector('#dealer-blackjack-result').style.color = 'white';

        document.querySelector('#backjack-result').textContent = "Let's Play";

        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
            dealerImages[i].remove();
        }

        blackJackGame['stand'] = false;
        blackJackGame.pressOnce = false;
        blackJackGame['turnsOver'] = false;
    }
}

function blackJackRestart() {

    blackJackDeal();

    document.querySelector('#wins').textContent = 0;
    document.querySelector('#losses').textContent = 0;
    document.querySelector('#draws').textContent = 0;

    blackJackGame.wins = 0;
    blackJackGame.losses = 0;
    blackJackGame.draws = 0;
}









// Function to check for blackjack
const blackJackCheck = () => {
    if (playerCards === 11, 10) {
        console.log("Player has BlackJack!")
    }
}
















const cardCounter = 0;
// Function to keep the card count
function cardCounterFunction(cards)  {
    for (let i = 0; i < cards.length; i++) {
        if (cards[i] === 1, 11, 10) {
            cardCounter--;
        }
        else if (cards[i] === 2, 3, 4, 5, 6) {
            cardCounter++;
        }
        return cardCounter;
    }
}














// ALL CODE BELOW THIS LINE IS FOR THE TWO MODEL BUTTONS ON THE HOMESCREEN


// Defining varibales to be used in functions for modal buttons on start screen
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

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
overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal2.active')
    modals.forEach(modal => {
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
      const modal = button.closest('.modal2')
      closeModal(modal)
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
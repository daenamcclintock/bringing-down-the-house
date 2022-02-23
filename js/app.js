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

    // Cards in each deck
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
    ties: 0,

    stand: false,
    turnsOver: false,
    pressOnce: false,
};

const player = blackJackGame.player;
const dealer = blackJackGame.dealer;

let windowWidth = window.screen.width;
let windowHeight = window.screen.height;
let winner;

const cardCounter = 0;
let gamePlay = false;



const startGameButton = document.getElementById('start-button');
const startScreenContainer = document.getElementById('start-screen-container');
const blackjackGameRules = document.getElementById('game-rules');
const basicStrategyButton = document.getElementById('basic-strategy');
const gamePlayContainer = document.getElementById('game-play-container');


startGameButton.addEventListener('click', gameStart);

// Function to change the UI from the homescreen to the game screen when the startGame button is clicked
function gameStart() {
    gamePlay = true;
    startScreenContainer.style.display = 'none';
    gamePlayContainer.style.removeProperty('display');

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
// const hitButton = document.getElementById('hit-button').addEventListener('click', hit)
// const hit = () => {
//     if (blackJackGame.stand === false) {
//         let card = randomCard();
//         showCard(card, player);
//     }
// }

// Function to choose a random card 
const randomCard = () => {
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

// Function to add an eventListener to the blackJackStrategy button that shows the user a guide of basic BlackJack probability
const blackJackStrategyButton = () => {
    button = document.getElementById('basic-strategy')
    button.addEventListener('click', )
}

// Function to check for blackjack
const blackJackCheck = () => {
    if (playerCards === 11, 10) {
        console.log("Player has BlackJack!")
    }
}
 // Function to determine the player's score
const playerScore = () => {
    if (Math.sum(playerCards) < 21) {
        playerScore = Math.sum(playerCards)
    } else {
        console.log("Bust!")
    }
}


















// Function to keep the card count
const cardCounterFunction = () => {
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
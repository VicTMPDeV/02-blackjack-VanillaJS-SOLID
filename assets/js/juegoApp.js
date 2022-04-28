/**
 * 2C = 2 of Clubs (Tréboles)
 * 2H = 2 of Hearts (Corazones)
 * 2D = 2 of Diamonds (Diamantes)
 * 2S = 2 of Spades (Espadas)
 * Hit = Pedir carta
 * Stand = Plantarse
 * New Game / Deal = Nuevo Juego / Repartir
 */

//Global Variables
let deck           = [];
let deckSize       = 0;
const types        = ['C','D','H','S'];
const minNumCard   = 2;
const maxNumCard   = 10;
const specialCards = ['A','J','Q','K'];
const AceValue     = 11;
const jqkValue     = 10;
let playerScore = 0 , computerScore = 0;

//DOM Ref Variables
const btnHit     = document.querySelector('#btnHitCard');
const btnStand   = document.querySelector('#btnStand');
const btnNewGame = document.querySelector('#btnNewGame');

const playerScoreTag   = document.querySelector('#playerScoreTag'); 
const computerScoreTag = document.querySelector('#computerScoreTag');

const divPlayerCards   = document.querySelector('#player-cards'); 
const divComputerCards = document.querySelector('#computer-cards'); 

createDeck();
//ESTO FUNCIONA GRACIAS AL HOISTING DE JS
function createDeck () {
    //Purgo el deck
    deck = [];
    /*Podría renombrar las cartas del 1 al 13
    para que fuera todo en un único bucle más 
    sencillo, pero por fines didácticos, quiero 
    jugar con el segundo bucle for para ver 
    otra manera de hacerlo.*/
    for (let i=minNumCard; i<=maxNumCard; i++) {
        for (let type of types) {
            deck.push(i + type);
        }
    }
    for (let type of types) {
        for (let special of specialCards) {
            deck.push(special + type);
        }
    }
    deck = _.shuffle(deck);//underscore function
    deckSize = deck.length;
}

const hitCard = () => {
    
    if(deck.length === 0){
        throw 'No quedan más cartas que jugar';
    }
    const card = deck.pop();
    return card;
}

// Test de la función hitCard
// for (let i = 0; i <= deckSize; i++) {
//     hitCard();
// }

const cardValue = (card) => {

    const value = card.substring(0, card.length - 1);
    return (isNaN(value)) ? ( (value === 'A') ? AceValue : jqkValue ) : parseInt(value);
    /* Legacy Code
    if( isNaN(value) ){ 
        //Los únicos valores posibles son 'A','J','Q' y 'K'
        //En Blackjack 'A' es la única que vale 11 puntos
        points = (value === 'A') ? 11 : 10; 
    }else{
        //El valor numérico es un string, lo convierto a number
        points = parseInt(value);
    }
    */
}

// Eventos (Callback is present... warning)
btnNewGame.addEventListener('click', () => {

    console.clear();
    createDeck();

    playerScore   = 0;
    computerScore = 0;

    playerScoreTag.innerHTML   = 0;
    computerScoreTag.innerHTML = 0;

    divPlayerCards.innerHTML   = '';
    divComputerCards.innerHTML = '';

    btnHit.disabled   = false;
    btnStand.disabled = false;

});

btnHit.addEventListener('click', () => {

    const hittedCard = hitCard();
    playerScore = playerScore + cardValue(hittedCard);
    playerScoreTag.innerHTML = playerScore;

    //<img class="deck-card" src="assets/cards/2C.png">
    const imgCard = document.createElement('img');
    imgCard.src = `assets/cards/${hittedCard}.png`;
    imgCard.classList.add('deck-card')
    divPlayerCards.append(imgCard);

    if(playerScore > 21){
        console.warn('HAS PERDIDO');
        btnHit.disabled   = true;
        btnStand.disabled = true;
        ComputerPlay(playerScore);
    } else if (playerScore === 21) {
        console.warn('JUGADOR: 21 PUNTOS!!!');
        btnHit.disabled   = true;
        btnStand.disabled = true;
        ComputerPlay(playerScore);
    }

});

btnStand.addEventListener('click',() => {
    //Bloqueo las acciones del jugador
    btnHit.disabled   = true;
    btnStand.disabled = true;
    //Juega la máquina
    ComputerPlay(playerScore);
});

//Machine (Computer player) logic -> minScoreToWin = playerScore
const ComputerPlay = (minScoreToWin) => {

    /*El jugador, como mínimo, pedirá 1 o 0 cartas antes de plantarse
    , por tanto, la máquina para ganar tendrá que pedir 1 carta por lo 
    menos */
    while( (computerScore < minScoreToWin) && (minScoreToWin <= 21) ) {

        const hittedCard = hitCard();
        computerScore = computerScore + cardValue(hittedCard);
        computerScoreTag.innerHTML = computerScore;

        //<img class="deck-card" src="assets/cards/2C.png">
        const imgCard = document.createElement('img');
        imgCard.src = `assets/cards/${hittedCard}.png`;
        imgCard.classList.add('deck-card')
        divComputerCards.append(imgCard);

        if (minScoreToWin > 21) {
            break;
        } 

    }

    setTimeout(() => {
        if ( computerScore === minScoreToWin ){
            alert('EMPATE');
        } else if ( minScoreToWin > 21){
            alert('COMPUTADORA GANA');
        } else if (computerScore > 21){
            alert('GANASTE!!!');
        } else if (playerScore > computerScore) {
            alert('GANASTE!!!');
        } else if (computerScore > playerScore) {
            alert('COMPUTADORA GANA');
        } else {
            alert('COMPUTADORA GANA');
        }
    }, 100);
    

}
//Testing Machine Logic
// console.log(`puntos jugador ${12}`)
// ComputerPlay(12);
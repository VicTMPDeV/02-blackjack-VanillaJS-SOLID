/**
 * 2C = 2 of Clubs (Tréboles)
 * 2H = 2 of Hearts (Corazones)
 * 2D = 2 of Diamonds (Diamantes)
 * 2S = 2 of Spades (Espadas)
 * Hit = Pedir carta
 * Stand = Plantarse
 * New Game / Deal = Nuevo Juego / Repartir
 */

/* 
PATRÓN DE DISEÑO MODULE - Desde ES5 
-----------------------------------
La idea es encapsular el código para que no sea accesible desde el objeto Window
y que un jugador pueda hacer trampas desde la consola del navegador.

Para ello vamos a encapsular el código creando Prototipos usando el patrón módulo
*/

/*
MÓDULO : Función que crea una Encapsulación (Scope (Prototipo)), anónima para 
que no pueda ser referenciado (no tenga un nombre que establezca la ubicación 
en memoria) el prototipo desde consola y autoinvocada para que se lance nada
más comenzar
*/
const blackJackModule = (() => {
    'use strict'
    //Global Variables
    let deck = [];
    const types = ['C', 'D', 'H', 'S'],
          minNumCard = 2,
          maxNumCard = 10,
          specialCards = ['A', 'J', 'Q', 'K'],
          AceValue = 11,
          jqkValue = 10;

    let playersAndComputerScores = [];

    //DOM Ref Variables
    const btnHit     = document.querySelector('#btnHitCard'),
          btnStand   = document.querySelector('#btnStand'),
          btnNewGame = document.querySelector('#btnNewGame');

    const divPlayersCards = document.querySelectorAll('.divCards'),
          scoreTag = document.querySelectorAll('small');

    // Initializer
    const initGame = ( numPlayers = 2 ) => { //Por defecto 2 jugadores (no existe implementación para más)
        deck = createDeck();
        playersAndComputerScores = [];

        for (let i=0; i<numPlayers; i++) {
            playersAndComputerScores.push(0);          
        }

        scoreTag.forEach( elem => elem.innerText = 0 );
        divPlayersCards.forEach( elem => elem.innerHTML = '');

        btnHit.disabled = false;
        btnStand.disabled = false;
    }

    const createDeck = () => {
        deck = [];
        for (let i = minNumCard; i <= maxNumCard; i++) {
            for (let type of types) {
                deck.push(i + type);
            }
        }
        for (let type of types) {
            for (let special of specialCards) {
                deck.push(special + type);
            }
        }
        return _.shuffle(deck);//underscore function
    }

    const hitCard = () => {
        if (deck.length === 0) {
            throw 'No quedan más cartas que jugar';
        }
        return deck.pop();
    }

    const cardValue = (card) => {
        const value = card.substring(0, card.length - 1);
        return (isNaN(value)) ? 
                ((value === 'A') ? AceValue : jqkValue) 
                : parseInt(value);
    }

    //Turn: 0 = Player - last = Computer
    const scoring = ( card, turn ) => {
        playersAndComputerScores[turn] = playersAndComputerScores[turn] + cardValue(card);
        scoreTag[turn].innerHTML = playersAndComputerScores[turn];
        return playersAndComputerScores[turn];
    }

    const theWinnerIs = () => {
        //Desestructuro el Array inicial de los scores
        const [playerScore,computerScore] = playersAndComputerScores;

        setTimeout(() => {
            if (computerScore === playerScore) {
                alert('EMPATE');
            } else if (playerScore > 21) {
                alert('COMPUTADORA GANA');
            } else if (computerScore > 21) {
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

    const createCardImage = ( card, turn ) => {
        const imgCard = document.createElement('img');
        imgCard.src = `assets/cards/${card}.png`;
        imgCard.classList.add('deck-card');
        divPlayersCards[turn].append(imgCard);
    }

    const ComputerPlay = (minScoreToWin) => {

        let computerScore = 0;
        while ((computerScore < minScoreToWin) && (minScoreToWin <= 21)) {
            const hittedCard = hitCard();
            computerScore = scoring(hittedCard, playersAndComputerScores.length - 1);
            createCardImage( hittedCard , playersAndComputerScores.length - 1);
        }
        theWinnerIs();

    }

    // Eventos (Callback is present... warning)
    btnNewGame.addEventListener('click', () => {
        initGame();
    });

    btnHit.addEventListener('click', () => {

        const card = hitCard();
        const playerScore = scoring( card, 0 );

        createCardImage(card,0);

        if (playerScore > 21) {
            console.warn('HAS PERDIDO');
            btnHit.disabled = true;
            btnStand.disabled = true;
            ComputerPlay(playerScore);
        } else if (playerScore === 21) {
            console.warn('JUGADOR: 21 PUNTOS!!!');
            btnHit.disabled = true;
            btnStand.disabled = true;
            ComputerPlay(playerScore);
        }

    });

    btnStand.addEventListener('click', () => {
        //Bloqueo las acciones del jugador
        btnHit.disabled = true;
        btnStand.disabled = true;
        //Juega la máquina
        ComputerPlay(playersAndComputerScores[0]);
    });

    // Lo que retorna el Módulo es público y visible fuera de la función, el resto es privado (closure)
    return {
         newGame: initGame
    };

})();
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://blackjack-js/./src/styles.css?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/component */ \"./src/js/component.js\");\n\r\n\r\n(0,_js_component__WEBPACK_IMPORTED_MODULE_0__.blackjackModule)();\n\n//# sourceURL=webpack://blackjack-js/./src/index.js?");

/***/ }),

/***/ "./src/js/component.js":
/*!*****************************!*\
  !*** ./src/js/component.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"blackjackModule\": () => (/* binding */ blackjackModule)\n/* harmony export */ });\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles.css */ \"./src/styles.css\");\n/**\r\n * 2C = 2 of Clubs (Tréboles)\r\n * 2H = 2 of Hearts (Corazones)\r\n * 2D = 2 of Diamonds (Diamantes)\r\n * 2S = 2 of Spades (Espadas)\r\n * Hit = Pedir carta\r\n * Stand = Plantarse\r\n * New Game / Deal = Nuevo Juego / Repartir\r\n */\r\n\r\n/* \r\nPATRÓN DE DISEÑO MODULE - Desde ES5 \r\n-----------------------------------\r\nLa idea es encapsular el código para que no sea accesible desde el objeto Window\r\ny que un jugador pueda hacer trampas desde la consola del navegador.\r\n\r\nPara ello vamos a encapsular el código creando Prototipos usando el patrón módulo\r\n*/\r\n\r\n/*\r\nMÓDULO : Función que crea una Encapsulación (Scope (Prototipo)), anónima para \r\nque no pueda ser referenciado (no tenga un nombre que establezca la ubicación \r\nen memoria) el prototipo desde consola y autoinvocada para que se lance nada\r\nmás comenzar\r\n*/\r\n //webpack config\r\n\r\nconst blackjackModule = () => {\r\n    'use strict';\r\n    //Global Variables\r\n    let deck = [];\r\n    const types = ['C', 'D', 'H', 'S'],\r\n          minNumCard = 2,\r\n          maxNumCard = 10,\r\n          specialCards = ['A', 'J', 'Q', 'K'],\r\n          AceValue = 11,\r\n          jqkValue = 10;\r\n\r\n    let playersAndComputerScores = [];\r\n\r\n    //DOM Ref Variables\r\n    const btnHit     = document.querySelector('#btnHitCard'),\r\n          btnStand   = document.querySelector('#btnStand'),\r\n          btnNewGame = document.querySelector('#btnNewGame');\r\n\r\n    const divPlayersCards = document.querySelectorAll('.divCards'),\r\n          scoreTag = document.querySelectorAll('small');\r\n\r\n    // Initializer\r\n    const initGame = ( numPlayers = 2 ) => { //Por defecto 2 jugadores (no existe implementación para más)\r\n        deck = createDeck();\r\n        playersAndComputerScores = [];\r\n\r\n        for (let i=0; i<numPlayers; i++) {\r\n            playersAndComputerScores.push(0);          \r\n        }\r\n\r\n        scoreTag.forEach( elem => elem.innerText = 0 );\r\n        divPlayersCards.forEach( elem => elem.innerHTML = '');\r\n\r\n        btnHit.disabled = false;\r\n        btnStand.disabled = false;\r\n    }\r\n\r\n    const createDeck = () => {\r\n        deck = [];\r\n        for (let i = minNumCard; i <= maxNumCard; i++) {\r\n            for (let type of types) {\r\n                deck.push(i + type);\r\n            }\r\n        }\r\n        for (let type of types) {\r\n            for (let special of specialCards) {\r\n                deck.push(special + type);\r\n            }\r\n        }\r\n        return _.shuffle(deck);//underscore function\r\n    }\r\n\r\n    const hitCard = () => {\r\n        if (deck.length === 0) {\r\n            throw 'No quedan más cartas que jugar';\r\n        }\r\n        return deck.pop();\r\n    }\r\n\r\n    const cardValue = (card) => {\r\n        const value = card.substring(0, card.length - 1);\r\n        return (isNaN(value)) ? \r\n                ((value === 'A') ? AceValue : jqkValue) \r\n                : parseInt(value);\r\n    }\r\n\r\n    //Turn: 0 = Player - last = Computer\r\n    const scoring = ( card, turn ) => {\r\n        playersAndComputerScores[turn] = playersAndComputerScores[turn] + cardValue(card);\r\n        scoreTag[turn].innerHTML = playersAndComputerScores[turn];\r\n        return playersAndComputerScores[turn];\r\n    }\r\n\r\n    const theWinnerIs = () => {\r\n        //Desestructuro el Array inicial de los scores\r\n        const [playerScore,computerScore] = playersAndComputerScores;\r\n\r\n        setTimeout(() => {\r\n            if (computerScore === playerScore) {\r\n                alert('EMPATE');\r\n            } else if (playerScore > 21) {\r\n                alert('COMPUTADORA GANA');\r\n            } else if (computerScore > 21) {\r\n                alert('GANASTE!!!');\r\n            } else if (playerScore > computerScore) {\r\n                alert('GANASTE!!!');\r\n            } else if (computerScore > playerScore) {\r\n                alert('COMPUTADORA GANA');\r\n            } else {\r\n                alert('COMPUTADORA GANA');\r\n            }\r\n        }, 100);\r\n    }\r\n\r\n    const createCardImage = ( card, turn ) => {\r\n        const imgCard = document.createElement('img');\r\n        imgCard.src = `assets/cards/${card}.png`;\r\n        imgCard.classList.add('deck-card');\r\n        divPlayersCards[turn].append(imgCard);\r\n    }\r\n\r\n    const ComputerPlay = (minScoreToWin) => {\r\n\r\n        let computerScore = 0;\r\n        while ((computerScore < minScoreToWin) && (minScoreToWin <= 21)) {\r\n            const hittedCard = hitCard();\r\n            computerScore = scoring(hittedCard, playersAndComputerScores.length - 1);\r\n            createCardImage( hittedCard , playersAndComputerScores.length - 1);\r\n        }\r\n        theWinnerIs();\r\n\r\n    }\r\n\r\n    // Eventos (Callback is present... warning)\r\n    btnNewGame.addEventListener('click', () => {\r\n        initGame();\r\n    });\r\n\r\n    btnHit.addEventListener('click', () => {\r\n\r\n        const card = hitCard();\r\n        const playerScore = scoring( card, 0 );\r\n\r\n        createCardImage(card,0);\r\n\r\n        if (playerScore > 21) {\r\n            console.warn('HAS PERDIDO');\r\n            btnHit.disabled = true;\r\n            btnStand.disabled = true;\r\n            ComputerPlay(playerScore);\r\n        } else if (playerScore === 21) {\r\n            console.warn('JUGADOR: 21 PUNTOS!!!');\r\n            btnHit.disabled = true;\r\n            btnStand.disabled = true;\r\n            ComputerPlay(playerScore);\r\n        }\r\n\r\n    });\r\n\r\n    btnStand.addEventListener('click', () => {\r\n        //Bloqueo las acciones del jugador\r\n        btnHit.disabled = true;\r\n        btnStand.disabled = true;\r\n        //Juega la máquina\r\n        ComputerPlay(playersAndComputerScores[0]);\r\n    });\r\n\r\n    // Lo que retorna el Módulo es público y visible fuera de la función, el resto es privado (closure). Además al poner return ya la función no devuelve undefined\r\n    return {\r\n         newGame: initGame\r\n    };\r\n\r\n};\n\n//# sourceURL=webpack://blackjack-js/./src/js/component.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
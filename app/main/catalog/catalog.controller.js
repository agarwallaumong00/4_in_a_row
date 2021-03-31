'use strict';

function catalogController() {
    var vm = this;

    const suits = ['diamonds', 'spades', 'clubs', 'hearts'];
    const cardValues = ["A", "K", "Q", "J", "2", "3", "4", "5", "6", "7", "8", "9", "10", ];
    vm.deckOfCards = [];
    vm.filteredCards = [];
    vm.drawCards = drawCards;
    vm.reset = reset;
    vm.showCards = false;
    vm.showDeck = showDeck;

    function init() {
        formDeckOfCards();
    }

    function showDeck() {
        vm.showCards = true;
    }

    function shuffleCards() {
        for (let i = 1; i<53; i++) {
            const xIndex = Math.floor((Math.random() * vm.deckOfCards.length));
            const yIndex = Math.floor((Math.random() * vm.deckOfCards.length));
            const temp = vm.deckOfCards[xIndex];
            vm.deckOfCards[xIndex] = vm.deckOfCards[yIndex];
            vm.deckOfCards[yIndex] = temp;
            
        }
    }

    function reset() {
        vm.filteredCards = [];
        vm.showCards = false;
        formDeckOfCards()
    }

    function formDeckOfCards() {
        for (const suit of suits) {
            for (const value of cardValues) {
                const temp = {
                    value,
                    suit
                };
                vm.deckOfCards.push(temp);
            }
        }
        
        shuffleCards();
    }

    function drawCards() {
        vm.filteredCards = [];
        let i = 1;
        while(i < 6) {
            const index = Math.floor((Math.random() * vm.deckOfCards.length));
            if (vm.deckOfCards[index]) {
                vm.filteredCards.push(vm.deckOfCards[index]);
                vm.deckOfCards.splice(index, 1);
            }
            i++;
        }
    }

    init();
}

catalogController.$inject = [];

module.exports = catalogController;
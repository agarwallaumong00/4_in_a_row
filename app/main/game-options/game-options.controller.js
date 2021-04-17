'use strict';

class GameOptionsController {

    static get $inject() {
        return ['$state', '$stateParams'];
    }

    constructor($state, $stateParams) {
        this.$state = $state;
        this.$stateParams = $stateParams;
    }

    $onInit() {
        this.payload = this.$stateParams.payload || {
            noOfGames: 3,
            whoStarts: 'Alternative turn'
        };
        this.noOfGames = [
            {
                text: '2 Games',
                key: 2
            },
            {
                text: '3 Games',
                key: 3
            },
            {
                text: '5 Games',
                key: 5
            },
            {
                text: '10 Games',
                key: 10
            }
        ];
        this.playerTurns = [
            {
                text: 'Alternative turn',
                key: 'Alternative turn'
            },
            {
                text: 'Looser first',
                key: 'Looser first'
            },
            {
                text: 'Winner first',
                key: 'Winner first'
            },
            {
                text: 'Always player 01',
                key: 'Always player 01'
            },
            {
                text: 'Always player 02',
                key: 'Always player 02'
            }
        ];
        this.showModal = false;
    }

    enableStartBtn() {
        return this.payload.firstPlayer
            && this.payload.secondPlayer
            && this.payload.noOfGames
            && this.payload.whoStarts;
    }

    openGamesModal() {
        this.tempData = this.noOfGames;
        this.binder = 'noOfGames';
        this.modelData = this.payload[this.binder];
        this.showModal = true;
    }

    openSelectTurnsModal() {
        this.tempData = this.playerTurns;
        this.binder = 'whoStarts';
        this.modelData = this.payload[this.binder];
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
    }

    save() {
        this.payload[this.binder] = this.modelData;
        this.closeModal();
    }

    loadGame() {
        this.$state.go('game', {
            payload: this.payload
        });
    }

    goToMain() {
        this.$state.go('main');
    }

}

module.exports = GameOptionsController;
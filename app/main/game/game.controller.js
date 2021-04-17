'use strict';

const GameOptionsController = require("../game-options/game-options.controller");

class GameController {
    static get $inject() {
        return ['$stateParams', '$state'];
    }

    constructor($stateParams, $state) {
        this.$stateParams = $stateParams;
        this.$state = $state;
    }

    $onInit() {
        this.payload = this.$stateParams.payload;
        if (!this.payload) {
            this.goToMain();
        } else {
            this.currentGame = 0;
            this.isNextGame = true;
            this.initialiseScoreCard();
            this.initialiseBoard();
        }
    }

    initialisePlayer() {
        const { whoStarts } = this.payload;
        switch(whoStarts) {
            case 'Alternative turn':
                if (this.activePlayer) {
                    this.changeActivePlayer(this.firstTurn);
                    this.firstTurn = this.activePlayer;
                } else {
                    this.firstTurn = 1;
                    this.activePlayer = 1;
                }
                break;
            case 'Looser first':
                if (this.activePlayer) {
                    this.changeActivePlayer(this.activePlayer);
                } else {
                    this.activePlayer = 1;
                }
                break;
            case 'Always player 01':
                this.activePlayer = 1;
                break;
            case 'Always player 02':
                this.activePlayer = 2;
                break;
            default:
                this.activePlayer = this.activePlayer || 1;
                break;
        }
    }

    initialiseScoreCard() {
        this.scoreCard = {
            1: {
                name: this.payload.firstPlayer,
                score: 0
            },
            2: {
                name: this.payload.secondPlayer,
                score: 0
            }
        };
    }

    getActivePlayer(player) {
        return this.activePlayer === player;
    }

    goToMain() {
        this.$state.go('main');
    }

    goToOptions() {
        this.$state.go('options', {
            payload: this.payload
        });
    }

    changeStateToHomePage() {
        this.payload = null;
        this.goToMain();
    }

    initialiseBoard() {
        if (!this.isNextGame) {
            this.changeStateToHomePage();
            return;
        }
        this.columns = [0, 1, 2, 3, 4, 5, 6];
        this.rows = [5, 4, 3, 2, 1, 0];
        this.matrix = [];
        for (let i=0; i<6; i++) {
            this.matrix.push([0, 0, 0, 0, 0, 0, 0]);
        };
        this.isVictory = false;
        this.currentGame += 1;
        this.initialisePlayer();
    }

    fillCell(row, col) {
        const newRow = this.checkForEmptyCell(col);
        if (newRow !== -1) {
            this.matrix[newRow][col] = this.activePlayer;
            this.lastMove = {
                row: newRow,
                col
            };
            this.checkForVictory(newRow, col);
            if (!this.isVictory) {
                this.changeActivePlayer(this.activePlayer);
            }
        }
    }

    deaclareWinner() {
        this.isVictory = true;
        const winner = this.scoreCard[this.activePlayer];
        this.scoreCard[this.activePlayer].score += 1;
        this.winner = winner.name;
        if (this.currentGame === Number(this.payload.noOfGames)) {
            this.isNextGame = false;
            this.getWinnerDetails();
        }
    }

    getWinnerDetails() {
        const player1 = this.scoreCard[1];
        const player2 = this.scoreCard[2];

        this.winner = player1.score > player2.score ? player1.name : player2.name;
    }

    checkForVictory(row, col) {
        const isColVictory = this.checkColumn(col);
        const isRowVictory = isColVictory || this.checkRow(row);
        const isDiagonalVictory = isColVictory || isRowVictory || this.checkDiagonal(row, col);
        if (isDiagonalVictory) {
            this.deaclareWinner();
        }
    }

    checkDiagonal(row, col) {
        let leftDiagonal = [this.matrix[row][col]]; //from left to right
        let rightDiagonal = [this.matrix[row][col]]; //from right to left

        for (let i=1; i<=row; i++) {
            if (this.matrix[row - i]) {
                const leftDiagonalCell = this.matrix[row - i][col + i];
                const rightDiagonalCell = this.matrix[row - i][col - i];
                if (leftDiagonalCell !== undefined) {
                    leftDiagonal.push(leftDiagonalCell);
                }
                if (rightDiagonalCell !== undefined) {
                    rightDiagonal.unshift(rightDiagonalCell);
                }
            }
        }

        for (let i=1; i<6; i++) {
            if (this.matrix[row + i]) {
                const leftDiagonalCell = this.matrix[row + i][col - i];
                const rightDiagonalCell = this.matrix[row + i][col + i];
                if (leftDiagonalCell !== undefined) {
                    leftDiagonal.unshift(leftDiagonalCell);
                }
                if (rightDiagonalCell !== undefined) {
                    rightDiagonal.push(rightDiagonalCell);
                }
            }
        }

        const isLeftDiagonalWon = this.checkForDiagonalVictory(leftDiagonal);
        const isRightDiagonalWon = this.checkForDiagonalVictory(rightDiagonal);

        return isLeftDiagonalWon || isRightDiagonalWon;

    }

    checkForDiagonalVictory(diagonalArr) {
        let match = 1;
        let lastCellValue;
        let isWon = false;
        diagonalArr.some((item) => {
            const currentCellValue = item;
            if (currentCellValue === 0) {
                match = 1;
            } else {
                if (!lastCellValue || lastCellValue !== currentCellValue) {
                    lastCellValue = currentCellValue;
                    match = 1;
                } else {
                    match += 1;
                    if (match === 4) {
                        isWon = true;
                        return true;
                    }
                }
            }
        });
        return isWon;
    }

    checkRow(row) {
        let match = 1;
        let lastCellValue;
        let isWon = false;
        this.columns.some((col) => {
            const currentCellValue = this.matrix[row][col];
            if (currentCellValue === 0) {
                match = 1;
            } else {
                if (!lastCellValue || lastCellValue !== currentCellValue) {
                    lastCellValue = currentCellValue;
                    match = 1;
                } else {
                    match += 1;
                    if (match === 4) {
                        isWon = true;
                        return true;
                    }
                }
            }
        });
        return isWon;
    }

    checkColumn(col) {
        let match = 1;
        let lastCellValue;
        let isWon = false;
        this.rows.some((row) => {
            const currentCellValue = this.matrix[row][col];
            if (currentCellValue === 0) {
                match = 1;
            } else {
                if (!lastCellValue || lastCellValue !== currentCellValue) {
                    lastCellValue = currentCellValue;
                    match = 1;
                } else {
                    match += 1;
                    if (match === 4) {
                        isWon = true;
                        return true;
                    }
                }
            }
        });
        return isWon;
    }

    undoLastStep() {
        if (this.lastMove) {
            this.matrix[this.lastMove.row][this.lastMove.col] = 0;
            this.lastMove = undefined;
            this.changeActivePlayer(this.activePlayer);
        }
    }

    checkForEmptyCell(col) {
        return this.matrix.findIndex((item) => item[col] === 0);
    }

    changeActivePlayer(player) {
        this.activePlayer = player === 1 ? 2 : 1;
    }
}

module.exports = GameController;
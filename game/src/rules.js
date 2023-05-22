import Checker from './Checker';
import Player from './Player';

export function createBoard(whitePlayer: Player, blackPlayer: Player) {
    let board = [];
    let x, y, color;
    let checker: Checker | null;

    for (let i = 1; i < 9; i++) {
        let row = [];
        y = i;
        for (let j = 1; j < 9; j++) {
            if ((i + j) % 2 === 0) {
                color = 'white';
            }
            else {
                color = 'black';
            }
            x = j;
            if (whitePlayer.searchCheckerByCoordinates(x, y) !== null) {
                checker = whitePlayer.searchCheckerByCoordinates(x, y);
            }
            else if (blackPlayer.searchCheckerByCoordinates(x, y) !== null) {
                checker = blackPlayer.searchCheckerByCoordinates(x, y);
            }
            else {
                checker = null;
            }
            row.push({x, y, color, checker});
        }
        board.push(row);
    }
    return board;
}

export function addCheckers(whitePlayer: Player, blackPlayer: Player) {
    for (let i = 1; i < 4; i++) {
        for (let j = 1; j < 9; j++) {
            if ((i + j) % 2 !== 0) {
                blackPlayer.addCheckersToPlayer(j, i);
            }
        }
    }
    for (let i = 6; i < 9; i++) {
        for (let j = 1; j < 9; j++) {
            if ((i + j) % 2 !== 0) {
                whitePlayer.addCheckersToPlayer(j, i);
            }
        }
    }
}

export function checkingIfMoveIsPossible(currentPlayer: string, x1: number, y1: number, x2: number, y2: number) {
    if (currentPlayer === 'whitePlayer') {
        if ((y1 - y2 === 1) && ((x1 - x2 === 1) || (x2 - x1) === 1)) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        if ((y2 - y1 === 1) && ((x1 - x2 === 1) || (x2 - x1) === 1)) {
            return true;
        }
        else {
            return false;
        }
    }
}

export function move(currentPlayer: Player, x1: number, y1: number, x2: number, y2: number) {
    if (currentPlayer.searchCheckerByCoordinates(x1, y1) !== null) {
        currentPlayer.changeCheckerCoordinates(x1, y1, x2, y2);
    }
    return currentPlayer;
}
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

export function move(whitePlayer: Player, blackPlayer: Player, {x1, y1}, {x2, y2}) {
    if (whitePlayer.searchCheckerByCoordinates(x1, y1) !== null) {
        whitePlayer.searchCheckerByCoordinates(x1, y1).setCoordinates(x2, y2);
    }
    if (blackPlayer.searchCheckerByCoordinates(x1, y1) !== null) {
        blackPlayer.searchCheckerByCoordinates(x1, y1).setCoordinates(x2, y2);
    }
}
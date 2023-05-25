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

export function checkerCanMove(currentPlayer: Player, waitingPlayer: Player,
                                         x: number, y: number)
{
    if (currentPlayer.getColor() === 'white') {
        if ((y !== 1 && x !== 1 && cellIsEmpty(currentPlayer, waitingPlayer, x - 1, y - 1)) ||
            (y !== 1 && x !== 8 && cellIsEmpty(currentPlayer, waitingPlayer, x + 1, y - 1)))
        {
            return true;
        }
    }
    else {
        if ((y !== 8 && x !== 1 && cellIsEmpty(currentPlayer, waitingPlayer, x - 1, y + 1)) ||
            (y !== 8 && x !== 8 && cellIsEmpty(currentPlayer, waitingPlayer, x + 1, y + 1)))
        {
            return true;
        }
    }
    return false;
}

export function checkerCanTakeEnemyChecker(currentPlayer: Player, waitingPlayer: Player,
                                               x: number, y: number)
{
    if (y !== 2 && x !== 2 &&
        cellIsEmpty(currentPlayer, waitingPlayer, x - 2, y - 2) &&
        waitingPlayer.searchCheckerByCoordinates(x - 1, y - 1) !== null)
    {
        return true;
    }
    else if (y !== 2 && x !== 7 &&
        cellIsEmpty(currentPlayer, waitingPlayer, x + 2, y - 2) &&
        waitingPlayer.searchCheckerByCoordinates(x + 1, y - 1) !== null)
    {
        return true;
    }
    else if (y !== 7 && x !== 2 &&
        cellIsEmpty(currentPlayer, waitingPlayer, x - 2, y + 2) &&
        waitingPlayer.searchCheckerByCoordinates(x - 1, y + 1) !== null)
    {
        return true;
    }
    else if (y !== 7 && x !== 7 &&
        cellIsEmpty(currentPlayer, waitingPlayer, x + 2, y + 2) &&
        waitingPlayer.searchCheckerByCoordinates(x + 1, y + 1) !== null)
    {
        return true;
    }
    return false;
}

export function playerCanTakeEnemyCheckers(currentPlayer: Player, waitingPlayer: Player) {
    let checkers = currentPlayer.getCheckers();
    for (let i = 0; i < checkers.length; i++) {
        if (checkers[i] !== null) {
            let x = checkers[i].getX();
            let y = checkers[i].getY();

            if (checkerCanTakeEnemyChecker(currentPlayer, waitingPlayer, x, y)) {
                return true;
            }
        }
    }
    return false;
}

export function playerCanMoveOrTakeEnemyChecker(currentPlayer: Player, waitingPlayer: Player) {
    let checkers = currentPlayer.getCheckers();
    for (let i = 0; i < checkers.length; i++) {
        if (checkers[i] !== null) {
            let x = checkers[i].getX();
            let y = checkers[i].getY();

            if (checkerCanMove(currentPlayer, waitingPlayer, x, y)) {
                return true;
            }
            else if (checkerCanTakeEnemyChecker(currentPlayer, waitingPlayer, x, y)) {
                return true;
            }
        }
    }
    return false;
}

function cellIsEmpty(firstPlayer: Player, secondPlayer: Player, x: number, y: number) {
    if (firstPlayer.searchCheckerByCoordinates(x, y) === null &&
        secondPlayer.searchCheckerByCoordinates(x, y) === null)
    {
        return true;
    }
    return false;
}

export function move(currentPlayer: Player, x1: number, y1: number, x2: number, y2: number) {
    if (currentPlayer.getColor() === 'white' && (y1 - y2 === 1) && ((x1 - x2 === 1) || (x2 - x1) === 1)) {
        currentPlayer.changeCheckerCoordinates(x1, y1, x2, y2);
        currentPlayer.changeCheckerSelected(x2, y2, false);
        return true;
    }
    else if (currentPlayer.getColor() === 'black' && ((y2 - y1 === 1) && ((x1 - x2 === 1) || (x2 - x1) === 1))) {
        currentPlayer.changeCheckerCoordinates(x1, y1, x2, y2);
        currentPlayer.changeCheckerSelected(x2, y2, false);
        return true;
    }
    return false;
}

//функции для взятия шашки
export function take(whitePlayer: Player, blackPlayer: Player, currentPlayer: string,
                     x1: number, y1: number, x2: number, y2: number) {
    if (currentPlayer === 'whitePlayer') {
        currentPlayerTakeChecker(whitePlayer, blackPlayer, x1, y1, x2, y2);
    }
    else {
        currentPlayerTakeChecker(blackPlayer, whitePlayer, x1, y1, x2, y2);
    }
}

function currentPlayerTakeChecker(currentPlayer: Player, waitingPlayer: Player,
                                  x1: number, y1: number, x2: number, y2: number) {
    if (y1 - y2 === 2) {
        if ((x1 - x2 === 2) &&
            (waitingPlayer.searchCheckerByCoordinates(x1 - 1, y1 - 1) !== null))
        {
            currentPlayer.changeCheckerCoordinates(x1, y1, x2, y2);
            waitingPlayer.deleteChecker(x1 - 1, y1 - 1);
            currentPlayer.changeCheckerSelected(x2, y2, false);
            return true;
        }
        else if ((x2 - x1 === 2)
            && (waitingPlayer.searchCheckerByCoordinates(x1 + 1, y1 - 1) !== null))
        {
            currentPlayer.changeCheckerCoordinates(x1, y1, x2, y2);
            waitingPlayer.deleteChecker(x1 + 1, y1 - 1);
            currentPlayer.changeCheckerSelected(x2, y2, false);
            return true;
        }
    }
    else if (y2 - y1 === 2) {
        if ((x1 - x2 === 2) &&
            (waitingPlayer.searchCheckerByCoordinates(x1 - 1, y1 + 1) !== null))
        {
            currentPlayer.changeCheckerCoordinates(x1, y1, x2, y2);
            waitingPlayer.deleteChecker(x1 - 1, y1 + 1);
            currentPlayer.changeCheckerSelected(x2, y2, false);
            return true;
        }
        else if ((x2 - x1 === 2) &&
            (waitingPlayer.searchCheckerByCoordinates(x1 + 1, y1 + 1) !== null))
        {
            currentPlayer.changeCheckerCoordinates(x1, y1, x2, y2);
            waitingPlayer.deleteChecker(x1 + 1, y1 + 1);
            currentPlayer.changeCheckerSelected(x2, y2, false);
            return true;
        }
    }
    else {
        return false
    }
}
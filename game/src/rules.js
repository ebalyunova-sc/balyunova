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

// проверка есть ли у игрока возможность ходить
export function checkingIfPlayerCanPlay(currentPlayer: Player, waitingPlayer: Player) {
    let checkers = currentPlayer.getCheckers();
    // проверка каждой шашки может ли она сделать ход до первой найденной
    for (let i = 0; i < checkers.length; i++) {
        if (checkers[i] !== null) {
            let x = checkers[i].getX();
            let y = checkers[i].getY();
            // может ли игрок сделать обычный шаг
            if (currentPlayer.getColor() === 'white') {
                if ((y !== 1 && x !== 1 && checkIfCellIsEmpty(currentPlayer, waitingPlayer, x - 1, y - 1)) ||
                    (y !== 1 && x !== 8 && checkIfCellIsEmpty(currentPlayer, waitingPlayer, x + 1, y - 1)))
                {
                    return true;
                }
            }
            else {
                if ((y !== 8 && x !== 1 && checkIfCellIsEmpty(currentPlayer, waitingPlayer, x - 1, y + 1)) ||
                    (y !== 8 && x !== 8 && checkIfCellIsEmpty(currentPlayer, waitingPlayer, x + 1, y + 1)))
                {
                    return true;
                }
            }
            // может ли игрок взять шашку противника
            if (y !== 2 && x !== 2 &&
                checkIfCellIsEmpty(currentPlayer, waitingPlayer, x - 2, y - 2) &&
                waitingPlayer.searchCheckerByCoordinates(x - 1, y - 1) !== null)
            {
                return true;
            }
            else if (y !== 2 && x !== 7 &&
                checkIfCellIsEmpty(currentPlayer, waitingPlayer, x + 2, y - 2) &&
                waitingPlayer.searchCheckerByCoordinates(x + 1, y - 1) !== null)
            {
                return true;
            }
            else if (y !== 7 && x !== 2 &&
                checkIfCellIsEmpty(currentPlayer, waitingPlayer, x - 2, y + 2) &&
                waitingPlayer.searchCheckerByCoordinates(x - 1, y + 1) !== null)
            {
                return true;
            }
            else if (y !== 7 && x !== 7 &&
                checkIfCellIsEmpty(currentPlayer, waitingPlayer, x + 2, y + 2) &&
                waitingPlayer.searchCheckerByCoordinates(x + 1,  + 1) !== null)
            {
                return true;
            }

            //console.log(x + ' ' + y +' can\'t move');
        }
    }
    return false;
}

function checkIfCellIsEmpty(firstPlayer: Player, secondPlayer: Player, x: number, y: number) {
    if (firstPlayer.searchCheckerByCoordinates(x, y) === null &&
        secondPlayer.searchCheckerByCoordinates(x, y) === null)
    {
        return true;
    }
    return false;
}

//функции для шага шашки
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
    currentPlayer.changeCheckerCoordinates(x1, y1, x2, y2);
}

//функции для взятия шашки
export function checkingIfCanTakeChecker(whitePlayer: Player, blackPlayer: Player, currentPlayer: string,
                                         x1: number, y1: number, x2: number, y2: number) {
    if (currentPlayer === 'whitePlayer') {
        return checkingIfCurrentPlayerCanTakeChecker(whitePlayer, blackPlayer, x1, y1, x2, y2);
    }
    else {
        return checkingIfCurrentPlayerCanTakeChecker(blackPlayer, whitePlayer, x1, y1, x2, y2);
    }
}

function checkingIfCurrentPlayerCanTakeChecker(currentPlayer: Player, waitingPlayer: Player,
                                               x1: number, y1: number, x2: number, y2: number) {
    if (y1 - y2 === 2) {
        if ((x1 - x2 === 2) && (waitingPlayer.searchCheckerByCoordinates(x1 - 1, y1 - 1) !== null)) {
            return true;
        }
        else if ((x2 - x1 === 2) && (waitingPlayer.searchCheckerByCoordinates(x1 + 1, y1 - 1) !== null)) {
            return true;
        }
        else {
            return false;
        }
    }
    else if (y2 - y1 === 2) {
        if ((x1 - x2 === 2) && (waitingPlayer.searchCheckerByCoordinates(x1 - 1, y1 + 1) !== null)) {
            return true;
        }
        else if ((x2 - x1 === 2) && (waitingPlayer.searchCheckerByCoordinates(x1 + 1, y1 + 1) !== null)) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false
    }
}

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
        currentPlayer.changeCheckerCoordinates(x1, y1, x2, y2);
        if (x1 - x2 === 2) {
            waitingPlayer.deleteChecker(x1 - 1, y1 - 1);
        }
        else {
            waitingPlayer.deleteChecker(x1 + 1, y1 - 1);
        }
    }
    else {
        currentPlayer.changeCheckerCoordinates(x1, y1, x2, y2);
        if (x1 - x2 === 2) {
            waitingPlayer.deleteChecker(x1 - 1, y1 + 1);
        }
        else if (y2 - y1 === 2) {
            waitingPlayer.deleteChecker(x1 + 1, y1 + 1);
        }
    }
}
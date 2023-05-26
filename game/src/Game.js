import React from 'react';
import Board from './Board';
import Player from './Player';
import {createBoard, addCheckers, playerCanTakeEnemyCheckers, checkerCanMove, playerCanTakeChecker,
    checkerCanTakeEnemyChecker, playerCanMoveOrTakeEnemyChecker, move, takeEnemyChecker} from './rules';
import './style.css';

export default class Game extends React.Component {
    constructor(props) {
        super(props);

        this.selectedCellsForMove = this.selectedCellsForMove.bind(this);
        this.selectedCellWithChecker = {x: null, y: null};
        this.checkerCanTakeAnotherEnemyChecker = false;

        this.currentPlayer = 'whitePlayer';
        this.whitePlayer = new Player('whitePlayer', 'white');
        this.blackPlayer = new Player('blackPlayer', 'black');
        addCheckers(this.whitePlayer, this.blackPlayer);

        this.state = {
            board: createBoard(this.whitePlayer, this.blackPlayer),
        }
    }

    render() {
        return (
            <div className='game'>
                <Board
                    board={this.state.board}
                    onClick={this.selectedCellsForMove}
                />
            </div>
        )
    }

    selectedCellsForMove(x: number, y: number, cellIsEmpty: Boolean, color: string) {
        if (cellIsEmpty === false) {
            if (this.currentPlayer === 'whitePlayer') {
                this.setSelectedCellWithChecker(this.whitePlayer, this.blackPlayer, x, y);
            }
            else {
                this.setSelectedCellWithChecker(this.blackPlayer, this.whitePlayer, x, y);
            }
        }
        else if (color === 'black' &&
            this.selectedCellWithChecker.x !== null && this.selectedCellWithChecker.y !== null)
        {
            if (this.moveChecker(x, y)) {
                this.selectedCellWithChecker = {x: null, y: null};
                this.changeCurrentPlayer();
            }
            else if (this.currentPlayerCanTakeEnemyChecker(x, y)) {
                takeEnemyChecker(this.whitePlayer, this.blackPlayer, this.currentPlayer,
                    this.selectedCellWithChecker.x, this.selectedCellWithChecker.y, x, y);

                if (this.checkingIfCheckerCanTakeAnotherEnemyChecker(x, y))
                {
                    this.selectedCellWithChecker.x = x;
                    this.selectedCellWithChecker.y = y;
                }
                else {
                    this.selectedCellWithChecker = {x: null, y: null};
                    this.changeCurrentPlayer();
                }
            }
        }
        let board = createBoard(this.whitePlayer, this.blackPlayer);
        this.setState({
            board: board,
        })
    }

    changeCurrentPlayer() {
        if (this.currentPlayer === 'whitePlayer') {
            if (playerCanMoveOrTakeEnemyChecker(this.blackPlayer, this.whitePlayer)) {
                this.currentPlayer = 'blackPlayer';
            }
            else {
                console.log('white player won');
            }
        }
        else {
            if (playerCanMoveOrTakeEnemyChecker(this.whitePlayer, this.blackPlayer)) {
                this.currentPlayer = 'whitePlayer';
            }
            else {
                console.log('black player won');
            }
        }
    }

    setSelectedCellWithChecker(currentPlayer: Player, waitingPlayer: Player,
                               x: number, y: number)
    {
        if (playerCanTakeEnemyCheckers(currentPlayer, waitingPlayer)) {
            if (checkerCanTakeEnemyChecker(currentPlayer, waitingPlayer, x, y)) {
                if (this.selectedCellWithChecker.x !== null &&
                    this.selectedCellWithChecker.y !== null)
                {
                    currentPlayer.changeCheckerSelected(
                        this.selectedCellWithChecker.x, this.selectedCellWithChecker.y, false);
                }
                if (currentPlayer.searchCheckerByCoordinates(x, y) !== null) {
                    this.selectedCellWithChecker = {x: x, y: y};
                    currentPlayer.changeCheckerSelected(x, y, true);
                }
            }
        }
        else {
            if (checkerCanMove(currentPlayer, waitingPlayer, x, y)) {
                if (this.selectedCellWithChecker.x !== null &&
                    this.selectedCellWithChecker.y !== null)
                {
                    currentPlayer.changeCheckerSelected(
                        this.selectedCellWithChecker.x, this.selectedCellWithChecker.y, false);
                }
                if (currentPlayer.searchCheckerByCoordinates(x, y) !== null) {
                    this.selectedCellWithChecker = {x: x, y: y};
                    currentPlayer.changeCheckerSelected(x, y, true);
                }
            }
        }
    }

    moveChecker(x: number, y: number) {
        if (this.currentPlayer === 'whitePlayer') {
            return move(this.whitePlayer, this.blackPlayer,
                this.selectedCellWithChecker.x, this.selectedCellWithChecker.y, x, y);
        }
        else {
            return move(this.blackPlayer, this.whitePlayer,
                this.selectedCellWithChecker.x, this.selectedCellWithChecker.y, x, y);
        }
    }

    currentPlayerCanTakeEnemyChecker(x: number, y:number) {
        return playerCanTakeChecker(this.whitePlayer, this.blackPlayer, this.currentPlayer,
            this.selectedCellWithChecker.x, this.selectedCellWithChecker.y, x, y);
    }

    checkingIfCheckerCanTakeAnotherEnemyChecker(x: number, y: number) {
        if (this.currentPlayer === 'whitePlayer') {
            if (checkerCanTakeEnemyChecker(this.whitePlayer, this.blackPlayer, x, y)) {
                this.checkerCanTakeAnotherEnemyChecker = true;
                return true;
            }
            this.whitePlayer.changeCheckerSelected(x, y, false);
        }
        else {
            if (checkerCanTakeEnemyChecker(this.blackPlayer, this.whitePlayer, x, y)) {
                this.checkerCanTakeAnotherEnemyChecker = true;
                return true;
            }
            this.blackPlayer.changeCheckerSelected(x, y, false);
        }
        this.checkerCanTakeAnotherEnemyChecker = false;
        return false;
    }
}
import React from 'react';
import Board from './Board';
import Player from './Player';
import {createBoard, addCheckers, checkingIfMoveIsPossible, move,
    checkingIfCanTakeChecker, take} from './rules';
import './style.css';

export default class Game extends React.Component {
    constructor(props) {
        super(props);

        this.selectedCellsForMove = this.selectedCellsForMove.bind(this);
        this.selectedCellWithChecker = {x: null, y: null};
        this.selectedCellWithoutChecker = {x: null, y: null};

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

    selectedCellsForMove(x: number, y: number, isEmpty: Boolean, color: string) {
        if (this.selectedCellWithChecker.x === null
            && this.selectedCellWithChecker.y === null) {
            if (isEmpty === false) {
                if (this.currentPlayer === 'whitePlayer' &&
                    this.whitePlayer.searchCheckerByCoordinates(x, y) !== null) {
                    this.selectedCellWithChecker = {x: x, y: y};
                }
                else if (this.currentPlayer === 'blackPlayer' &&
                    this.blackPlayer.searchCheckerByCoordinates(x, y) !== null) {
                    this.selectedCellWithChecker = {x: x, y: y};
                }
                console.log(this.selectedCellWithChecker.x + ' ' + this.selectedCellWithChecker.y);
            }
        }
        else {
            if (isEmpty === true && color === 'black') {
                this.selectedCellWithoutChecker = {x: x, y: y};

                if (this.moveIsPossible()) {
                    this.makeMove();
                    this.changeCurrentPlayer();
                }
                else if (this.takeCheckerIsPossible()) {
                    this.takeChecker();
                    this.changeCurrentPlayer();
                }
                else {
                    this.selectedCellWithoutChecker = {x: null, y: null};
                }
                let board = createBoard(this.whitePlayer, this.blackPlayer);
                this.setState({
                    board: board,
                })
            }
            else {
                if (this.currentPlayer === 'whitePlayer' &&
                    this.whitePlayer.searchCheckerByCoordinates(x, y) !== null) {
                    this.selectedCellWithChecker = {x: x, y: y};
                }
                else if (this.currentPlayer === 'blackPlayer' &&
                    this.blackPlayer.searchCheckerByCoordinates(x, y) !== null) {
                    this.selectedCellWithChecker = {x: x, y: y};
                }
                console.log(this.selectedCellWithChecker.x + ' ' + this.selectedCellWithChecker.y);
            }
        }
    }

    changeCurrentPlayer() {
        if (this.currentPlayer === 'whitePlayer') {
            this.currentPlayer = 'blackPlayer';
        }
        else {
            this.currentPlayer = 'whitePlayer';
        }
    }

    moveIsPossible() {
        return checkingIfMoveIsPossible(this.currentPlayer,
            this.selectedCellWithChecker.x, this.selectedCellWithChecker.y,
            this.selectedCellWithoutChecker.x, this.selectedCellWithoutChecker.y);
    }

    makeMove() {
        if (this.currentPlayer === 'whitePlayer') {
            move(this.whitePlayer,
                this.selectedCellWithChecker.x, this.selectedCellWithChecker.y,
                this.selectedCellWithoutChecker.x, this.selectedCellWithoutChecker.y);
        }
        else {
            move(this.blackPlayer,
                this.selectedCellWithChecker.x, this.selectedCellWithChecker.y,
                this.selectedCellWithoutChecker.x, this.selectedCellWithoutChecker.y);
        }
        this.selectedCellWithChecker = {x: null, y: null};
        this.selectedCellWithoutChecker = {x: null, y: null};
    }

    takeCheckerIsPossible() {
        return checkingIfCanTakeChecker(this.whitePlayer, this.blackPlayer, this.currentPlayer,
            this.selectedCellWithChecker.x, this.selectedCellWithChecker.y,
            this.selectedCellWithoutChecker.x, this.selectedCellWithoutChecker.y);
    }

    takeChecker() {
        take(this.whitePlayer, this.blackPlayer, this.currentPlayer,
            this.selectedCellWithChecker.x, this.selectedCellWithChecker.y,
            this.selectedCellWithoutChecker.x, this.selectedCellWithoutChecker.y);
        this.selectedCellWithChecker = {x: null, y: null};
        this.selectedCellWithoutChecker = {x: null, y: null};
    }
}
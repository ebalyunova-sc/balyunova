import React from 'react';
import Board from './Board';
import Player from './Player';
import {createBoard, addCheckers, move} from './rules';
import './style.css';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.selectedCellsForMove = this.selectedCellsForMove.bind(this);
        this.selectedCellWithChecker = {x: null, y: null};
        this.selectedCellWithoutChecker = {x: null, y: null};
    }

    selectedCellsForMove(x: number, y: number, isEmpty: Boolean, color: string) {
        if (this.selectedCellWithChecker.x === null
            && this.selectedCellWithChecker.y === null) {
            if (isEmpty === false) {
                this.selectedCellWithChecker = {x: x, y: y};
            }
        }
        else {
            if (isEmpty === true && color === 'black') {
                this.selectedCellWithoutChecker = {x: x, y: y};
                alert('x1 - ' + this.selectedCellWithChecker.x + ', y1 - ' + this.selectedCellWithChecker.y
                    + '\nx2 - ' + this.selectedCellWithoutChecker.x + ', y2 - ' + this.selectedCellWithoutChecker.y);
                this.makeMove();
            }
            else {
                this.selectedCellWithChecker = {x: x, y: y};
            }
        }
    }

    board: [];
    whitePlayer: Player;
    blackPlayer: Player;

    initGame() {
        this.whitePlayer = new Player('whitePlayer', 'white');
        this.blackPlayer = new Player('blackPlayer', 'black');
        addCheckers(this.whitePlayer, this.blackPlayer);
        this.board = createBoard(this.whitePlayer, this.blackPlayer);
    }
    
    render() {
        this.initGame();
        return (
            <div className='game'
            >
                <Board
                    board={this.board}
                    whitePlayer={this.whitePlayer}
                    blackPlayer={this.blackPlayer}
                    onClick={this.selectedCellsForMove}
                />
            </div>
        )
    }

    makeMove() {
        move(this.whitePlayer, this.blackPlayer,
            this.selectedCellWithChecker, this.selectedCellWithoutChecker);
    }
}
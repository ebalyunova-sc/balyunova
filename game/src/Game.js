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
        this.currentPlayer = 'whitePlayer';
        this.whitePlayer = new Player('whitePlayer', 'white');
        this.blackPlayer = new Player('blackPlayer', 'black');
        addCheckers(this.whitePlayer, this.blackPlayer);
        this.state = {
            board: createBoard(this.whitePlayer, this.blackPlayer),
        }
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
                //alert('x1 - ' + this.selectedCellWithChecker.x + ', y1 - ' + this.selectedCellWithChecker.y
                //    + '\nx2 - ' + this.selectedCellWithoutChecker.x + ', y2 - ' + this.selectedCellWithoutChecker.y);
                this.makeMove();
                let board = createBoard(this.whitePlayer, this.blackPlayer);
                this.setState({
                    board: board,
                })
            }
            else {
                this.selectedCellWithChecker = {x: x, y: y};
            }
        }
    }

    whitePlayer: Player;
    blackPlayer: Player;
    
    render() {
        return (
            <div className='game'
            >
                <Board
                    board={this.state.board}
                    onClick={this.selectedCellsForMove}
                />
            </div>
        )
    }

    changeCurrentPlayer() {
        if (this.currentPlayer === 'whitePlayer') {
            this.currentPlayer = 'blackPlayer';
        }
        else {
            this.currentPlayer = 'whitePlayer';
        }
    }

    makeMove() {
        if (this.currentPlayer === 'whitePlayer') {
            this.whitePlayer =
                move(this.whitePlayer,
                    this.selectedCellWithChecker.x, this.selectedCellWithChecker.y,
                    this.selectedCellWithoutChecker.x, this.selectedCellWithoutChecker.y);
        }
        this.setState({
            board: createBoard(this.whitePlayer, this.blackPlayer),
        });
        this.selectedCellWithChecker = {x: null, y: null};
        this.selectedCellWithoutChecker = {x: null, y: null};
    }
}
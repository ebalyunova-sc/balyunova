import React from 'react';
import Board from './Board';
import Player from './Player';
import {createBoard, addCheckers, move} from './rules';
import './style.css';

export default class Game extends React.Component {
    board: [];
    whitePlayer: Player;
    blackPlayer: Player;
    selectedChecker = null;

    onClick (target) {
        if (target.classList.contains('checker')) {
            if (this.selectedChecker !== null) {
                this.selectedChecker.classList.remove('selected');
            }
            target.classList.add('selected');
            this.selectedChecker = target;
        }
        
        if (target.classList.contains('cell' && 'black')
            && this.selectedChecker !== null) {
            target.classList.add('selectedCell');
            move(this.board);
            target.classList.remove('selectedCell');
            this.selectedChecker.classList.remove('selected');
            this.selectedChecker = null;
        }
    }

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
                 onClick={(click) => this.onClick(click.target)}
            >
                <Board
                    board={this.board}
                    whitePlayer={this.whitePlayer}
                    blackPlayer={this.blackPlayer}
                />
            </div>
        )
    }
}
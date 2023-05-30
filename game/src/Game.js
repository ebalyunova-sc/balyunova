import React from 'react';
import UserInfo from './UserInfo';
import Board from './Board';
import Player from './Player';
import {createBoard, addCheckers, playerCanTakeEnemyCheckers, checkerCanMove,
    playerCanTakeChecker, checkerCanTakeEnemyChecker,
    playerCanMoveOrTakeEnemyChecker, move, takeEnemyChecker} from './rules';
import './style.css';

export default class Game extends React.Component {
    constructor(props) {
        super(props);

        this.selectedCellsForMove = this.selectedCellsForMove.bind(this);
        this.selectedCellWithChecker = {x: null, y: null};
        this.checkerCanTakeAnotherEnemyChecker = false;

        this.currentPlayer = 'whitePlayer';
        this.whitePlayer = new Player(this.props.firstUserName, 'white');
        this.blackPlayer = new Player(this.props.secondUserName, 'black');
        addCheckers(this.whitePlayer, this.blackPlayer);

        this.state = {
            board: createBoard(this.whitePlayer, this.blackPlayer),
        }
    }

    render() {
        return (
            <div className='game'>
                <UserInfo
                    userName={this.props.firstUserName}
                    color={'white'}
                    currentPlayer={this.currentPlayer === 'whitePlayer' ? true : false}
                />
                <Board
                    board={this.state.board}
                    onClick={this.selectedCellsForMove}
                />
                <UserInfo
                    userName={this.props.secondUserName}
                    color={'black'}
                    currentPlayer={this.currentPlayer === 'blackPlayer' ? true : false}
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
            if (this.currentPlayer === 'whitePlayer') {
                this.setSelectedCellWithoutChecker(this.whitePlayer, this.blackPlayer, x, y);
            }
            else {
                this.setSelectedCellWithoutChecker(this.blackPlayer, this.whitePlayer, x, y);
            }
        }
        let board = createBoard(this.whitePlayer, this.blackPlayer);
        this.setState({
            board: board,
        })
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

    setSelectedCellWithoutChecker(currentPlayer: Player, waitingPlayer: Player,
                                  x: number, y: number)
    {
        if (playerCanTakeEnemyCheckers(currentPlayer, waitingPlayer)) {
            if (playerCanTakeChecker(currentPlayer, waitingPlayer,
                this.selectedCellWithChecker.x, this.selectedCellWithChecker.y, x, y))
            {
                takeEnemyChecker(this.whitePlayer, this.blackPlayer, this.currentPlayer,
                    this.selectedCellWithChecker.x, this.selectedCellWithChecker.y, x, y);
                if (checkerCanTakeEnemyChecker(currentPlayer, waitingPlayer, x, y))
                {
                    this.checkerCanTakeAnotherEnemyChecker = true;
                    this.selectedCellWithChecker.x = x;
                    this.selectedCellWithChecker.y = y;
                }
                else {
                    currentPlayer.changeCheckerSelected(x, y, false);
                    this.checkerCanTakeAnotherEnemyChecker = false;
                    this.selectedCellWithChecker = {x: null, y: null};
                    this.changeCurrentPlayer();
                }
            }
        }
        else if (move(currentPlayer, waitingPlayer,
            this.selectedCellWithChecker.x, this.selectedCellWithChecker.y, x, y))
        {
            this.selectedCellWithChecker = {x: null, y: null};
            this.changeCurrentPlayer();
        }
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
}
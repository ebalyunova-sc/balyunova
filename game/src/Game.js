import React from 'react';
import Board from './Board';
import Player from './Player';
import addCheckers from './rules';
import './style.css';

export default class Game extends React.Component {
    render() {
        let whitePlayer = new Player('whitePlayer', 'white');
        let blackplayer = new Player('blackPlayer', 'black');
        addCheckers(whitePlayer, blackplayer);
        
        return (
            <div className='game'>
                <Board
                    whitePlayer={whitePlayer}
                    blackPlayer={blackplayer}
                />
            </div>
        )
    }
}
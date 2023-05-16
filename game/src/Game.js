import React from 'react';
import Board from './Board';
import Player from './Player';
import addCheckers from './rules';
import './style.css';

export default class Game extends React.Component {
    updateData = (value) => {
        this.setState({name: value})
    }
    
    onClick (target) {
        switch (target.className){
            case "checker whiteChecker":
                //
                break;
            case "checker blackChecker":
                //
                break;
            case "cell black":
                //
                break;
            default:
                break;
        }
    }
    
    render() {
        let whitePlayer = new Player('whitePlayer', 'white');
        let blackplayer = new Player('blackPlayer', 'black');
        addCheckers(whitePlayer, blackplayer);
        
        return (
            <div className='game'
                 onClick={(click) => this.onClick(click.target)}
            >
                <Board
                    whitePlayer={whitePlayer}
                    blackPlayer={blackplayer}
                />
            </div>
        )
    }
}
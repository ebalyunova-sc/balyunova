import React from 'react';
import Cell from './Cell';
import Checker from './Checker';
import './style.css';

export default class Board extends React.Component {
  render() {
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
        if (this.props.whitePlayer.searchCheckersByCoordinates(x, y) !== null) {
          checker = this.props.whitePlayer.searchCheckersByCoordinates(x, y);
        }
        else if (this.props.blackPlayer.searchCheckersByCoordinates(x, y) !== null) {
          checker = this.props.blackPlayer.searchCheckersByCoordinates(x, y);
        }
        else {
          checker = null;
        }
        row.push({x, y, color, checker});
      }
      board.push(row);
    }

    return (
        <div className='board'>
          {
            board.map((row) =>
                row.map((cell) => (
                    <Cell
                        x={cell.x}
                        y={cell.y}
                        color={cell.color}
                        checker={cell.checker}
                    />
                ))
            )
          }
        </div>
    )
  }
}
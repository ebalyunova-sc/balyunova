import React from 'react';
import Cell from './Cell';
import './style.css';

export default class Board extends React.Component {
  board: [];
  
  render() {
    return (
        <div className='board'>
          {
            this.props.board.map((row) =>
                row.map((cell) => (
                    <Cell
                        x={cell.x}
                        y={cell.y}
                        color={cell.color}
                        checker={cell.checker}
                        key={cell.x*10 + cell.y}
                        id={cell.x*10 + cell.y}
                    />
                ))
            )
          }
        </div>
    )
  }
}
import React from 'react';
import Checker from './Checker';

export default class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.getСoordinates = this.getСoordinates.bind(this);
    }

    checker: Checker | null;

    render() {
        const x = this.props.x;
        const y = this.props.y;
        const cellIsEmpty = ((this.props.checker === null) ? true : false);
        const color = this.props.color;
        return (
            <div className={['cell', this.props.color].join(' ')}
                 x={x}
                 y={y}
                 cellIsEmpty={cellIsEmpty}
                 color={color}
                 onClick={this.getСoordinates}
            >
                {
                    (!cellIsEmpty) ? (this.renderChecker()) : <div/>
                }
            </div>
        )
    }

    getСoordinates(e) {
        this.props.onClick(e.target.x, e.target.y, e.target.cellIsEmpty, e.target.color);
    }

    renderChecker() {
        return (
            <Checker
                color={this.props.checker.getColor()}
                selected={this.props.checker.getSelected()}
            />
        )
    }
}
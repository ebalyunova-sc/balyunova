import React from 'react';
import Checker from './Checker';
import './style.css';

export default class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.getСoordinates = this.getСoordinates.bind(this);
    }

    checker: Checker | null;

    render() {
        const x = this.props.x;
        const y = this.props.y;
        let isEmpty = ((this.props.checker === null) ? true : false);
        const color = this.props.color;
        return (
            <div className={['cell', this.props.color].join(' ')}
                 x={x}
                 y={y}
                 isEmpty={isEmpty}
                 color={color}
                 onClick={this.getСoordinates}
            >
                {
                    (!isEmpty) ? (this.renderChecker()) : <div/>
                }
            </div>
        )
    }

    getСoordinates(e) {
        this.props.onClick(e.target.x, e.target.y, e.target.isEmpty, e.target.color);
    }

    renderChecker() {
        return (
            <Checker
                color={this.props.checker.getColor()}
            />
        )
    }
}
import React from 'react';
import Checker from './Checker';
import './style.css';

export default class Cell extends React.Component {
    x: number;
    y: number;
    color: string;
    checker: Checker | null;
    id: number;

    constructor(x: number, y: number, color: string, checker: Checker | null) {
        super();
        this.x = x;
        this.y = y;
        this.color = color;
        this.checker = checker;
        this.id = x*10 + y;
    }
    
    render() {
        return (
            <div className={['cell', this.props.color].join(' ')}>
                {
                    (this.isEmpty() === false) ? (this.renderChecker()) : <div/>
                }
            </div>
        )
    }
    
    isEmpty() {
        return (
            this.props.checker === null
        )
    }

    renderChecker() {
        return (
            <Checker
                color={this.props.checker.getColor()}
            />
        )
    }
}
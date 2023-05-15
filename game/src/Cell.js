import React from 'react';
import Checker from './Checker';
import './style.css';

export default class Cell extends React.Component {
    checker: Checker | null;
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
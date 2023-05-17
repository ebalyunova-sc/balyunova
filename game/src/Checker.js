import React from 'react';

export default class Checker extends React.Component {
    x: number;
    y: number;
    color: string;
    
    constructor(x: number, y: number, color: string) {
        super();
        this.x = x;
        this.y = y;
        this.color = color;
    }
    
    render() {
        return (
            <div className={['checker', (this.props.color + 'Checker')].join(' ')}>
            </div>
        )
    }

    getX() {
        return this.x;
    }
    
    getY() {
        return this.y;
    }
    
    getColor() {
        return this.color;
    }

    setCoordinates(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
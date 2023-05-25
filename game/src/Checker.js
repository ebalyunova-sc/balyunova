import React from 'react';

export default class Checker extends React.Component {
    x: number;
    y: number;
    color: string;
    selected: Boolean;
    
    constructor(x: number, y: number, color: string) {
        super();
        this.x = x;
        this.y = y;
        this.color = color;
        this.selected = false;
    }
    
    render() {
        return (
            <div className={['checker', (this.props.color + 'Checker'),
                (this.props.selected ? 'selected' : '')].join(' ')}>
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

    getSelected() {
        return this.selected;
    }

    setCoordinates(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    changeSelected(selected: Boolean) {
        this.selected = selected;
    }
}
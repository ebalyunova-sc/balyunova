import React from 'react';

export default class Checker extends React.Component {
    x: number;
    y: number;
    color: string;
    type: string;
    selected: Boolean;
    
    constructor(x: number, y: number, color: string) {
        super();
        this.x = x;
        this.y = y;
        this.color = color;
        // men - обычная шашка, lady - дамка
        this.type = 'men';
        this.selected = false;
    }
    
    render() {
        return (
            <div className={['checker', (this.props.color + 'Checker'),
                (this.props.selected ? 'selected' : ''),
                ((this.props.type === 'lady') ? 'lady' : '')].join(' ')}>
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

    getType() {
        return this.type;
    }

    getSelected() {
        return this.selected;
    }

    setCoordinates(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    inLady() {
        this.type = 'lady';
    }

    changeSelected(selected: Boolean) {
        this.selected = selected;
    }
}
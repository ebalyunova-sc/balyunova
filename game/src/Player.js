import Checker from './Checker';

export default class Player {
    name: string;
    color: string;
    checkers: Checker[];

    constructor(name: string, color: string) {
        this.name = name;
        this.color = color;
        this.checkers = [];
    }

    addCheckersToPlayer(x: number, y: number) {
        this.checkers.push(new Checker(x, y, this.color));
    }

    searchCheckerByCoordinates(x: number, y: number) {
        for (let i = 0; i < this.checkers.length; i++) {
            if (this.checkers[i].getX() === x && this.checkers[i].getY() === y) {
                return this.checkers[i];
            }
        }
        return null; 
    }
    
    searchSelectedChecker() {
        for (let i = 0; i < this.checkers.length; i++) {
            if (this.checkers[i].classList.contains('selected')) {
                return this.checkers[i];
            }
        }
    }
}
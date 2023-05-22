import Checker from './Checker';

export default class Player {
    name: string;
    color: string;
    checkers: Checker[] | null;

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
            if (this.checkers[i] !== null && this.checkers[i].getX() === x && this.checkers[i].getY() === y) {
                return this.checkers[i];
            }
        }
        return null; 
    }

    changeCheckerCoordinates(x1: number, y1: number, x2:number, y2: number) {
        if (this.searchCheckerByCoordinates(x1, y1) !== null) {
            this.searchCheckerByCoordinates(x1, y1).setCoordinates(x2, y2);
        }
    }

    deleteChecker(x: number, y: number) {
        for (let i = 0; i < this.checkers.length; i++) {
            if (this.checkers[i] !== null && this.checkers[i].getX() === x && this.checkers[i].getY() === y) {
                this.checkers[i] = null;
            }
        }
    }
}
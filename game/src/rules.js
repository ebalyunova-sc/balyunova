import Player from './Player';

export default function addCheckers(whitePlayer: Player, blackPlayer: Player) {
    for (let i = 1; i < 4; i++) {
        for (let j = 1; j < 9; j++) {
            if ((i + j) % 2 !== 0) {
                blackPlayer.addCheckerToPlayer(j, i);
            }
        }
    }
    for (let i = 6; i < 9; i++) {
        for (let j = 1; j < 9; j++) {
            if ((i + j) % 2 !== 0) {
                whitePlayer.addCheckerToPlayer(j, i);
            }
        }
    }
}
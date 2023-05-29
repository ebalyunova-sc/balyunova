export default class User {
    name: string;
    avatar: string;
    id: number;
    //wonGames: number;
    //totalPlayed: number;

    constructor(name: string, avatar: string, id: number,
                /*wonGames: number, totalPlayed: number*/)
    {
        this.name = name;
        this.avatar = avatar;
        this.id = id;
        //this.wonGames = wonGames;
        //this.totalPlayed = totalPlayed;
    }

    getUserName() {
        return this.name;
    }

    getUserAvatar() {
        return this.avatar;
    }
}
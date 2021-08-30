import Twitt from "./twitt";

export class User{
    public userId: string;
    public username: string;
    public twitts: Twitt[];
    public photoURL: string;

    constructor(userId: string, username: string, photoURL: string, twitts: Twitt[]){
        this.userId = userId;
        this.username = username;
        this.photoURL = photoURL;
        this.twitts = twitts;
    }
}
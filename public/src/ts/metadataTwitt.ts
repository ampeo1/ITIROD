import Twitt from "./twitt";
import { User } from "./user";

export class MetadataTwitt{
    public twitt: Twitt;
    public user: User;

    constructor(twitt: Twitt, user: User){
        this.twitt = twitt;
        this.user = user;
    }
}
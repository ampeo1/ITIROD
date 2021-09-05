import Twitt from "./twitt";
import { User } from "./user";

export class MetadataTwitt{
    public twitt?: Twitt;
    public user?: User;
    public isLike?: boolean;
    public isRetwitt?: boolean;
    public idTwitt?: string;

    constructor(twitt?: Twitt, user?: User, isLike?: boolean, isRetwitt?: boolean, idTwitt?: string){
        this.twitt = twitt;
        this.user = user;
        this.isLike = isLike;
        this.isRetwitt = isRetwitt;
        this.idTwitt = idTwitt;
    }
}
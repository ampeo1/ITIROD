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

    public static HTMLPresentationForSearch(user: User){
        var div = <HTMLDivElement>document.createElement("div");
        div.setAttribute('class', 'search-user margin-bottom-15');

        var img = <HTMLImageElement>document.createElement("img");
        img.setAttribute('class', 'profile-avatar twitt-avatar-size');
        img.setAttribute('src', user.photoURL);

        var a = <HTMLAnchorElement>document.createElement('a');
        a.innerHTML = user.username;
        a.setAttribute('href', `profile_page.html?uid=${user.userId}`);

        div.append(img);
        div.append(a);

        return div;
    }
}
import Twitt from "./twitt";

export class User{
    public userId: string;
    public username: string;
    public twitts: Twitt[];
    public photoURL: string;
    public countSubscribers: number;
    public countSubscriptions: number;

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

    public static HTMLPresentation(user: User){
        var div = <HTMLDivElement>document.createElement("div");
        div.setAttribute('class', 'three-grid-item border');

        var section = <HTMLElement>document.createElement("section");
        section.setAttribute('class', 'card');

        var img = <HTMLImageElement>document.createElement("img");
        img.setAttribute('class', 'profile-avatar user-page-size-avatar text-center');
        img.setAttribute('src', user.photoURL);
        section.append(img);

        var username = <HTMLHeadingElement>document.createElement("h3");
        username.setAttribute('class', 'main-text text-center users-text-padding');
        username.innerText = user.username;
        section.append(username);

        var countSubscribers = <HTMLHeadingElement>document.createElement("h3");
        countSubscribers.setAttribute('class', 'main-text text-center users-text-padding');
        countSubscribers.innerText = `Подписчиков: ${user.countSubscribers}`;
        section.append(countSubscribers);

        var countSubscriptions = <HTMLHeadingElement>document.createElement("h3");
        countSubscriptions.setAttribute('class', 'main-text text-center users-text-padding');
        countSubscriptions.innerText = `Подписок: ${user.countSubscriptions}`;
        section.append(countSubscriptions);
        
        var button = <HTMLButtonElement>document.createElement("button");
        button.setAttribute('class', 'button-main');
        button.innerText = 'Профиль';
        button.addEventListener('click', () => {
            window.location.href = `profile_page.html?uid=${user.userId}`
        })
        section.append(button);

        div.append(section);

        return div;
    }
}
import { MetadataTwitt } from "./metadataTwitt";
import { User } from "./user";

export default class Twitt{
    public readonly userId: string;
    public readonly text?: string;
    public readonly likes?: number;
    public readonly retwitt?: number;

    constructor(userId: string, text: string, likes: number, retwitt: number){
        this.userId = userId;
        this.text = text;
        this.likes = likes;
        this.retwitt = retwitt;
    }

    public static HTMLPresentation(metadataTwitt: MetadataTwitt){
        console.log(metadataTwitt.user);
        var li = document.createElement("li");
        var div = document.createElement('div');
        div.setAttribute('class', 'twitt');

        var image = document.createElement('img');
        image.setAttribute('class', 'profile-avatar twitt-avatar-size');
        image.setAttribute('src', metadataTwitt.user.photoURL);
        div.appendChild(image);

        var mainPartTweetDiv = document.createElement('div');
        mainPartTweetDiv.setAttribute('class', 'main-part-tweet');

        var username = document.createElement('h4') as HTMLHeadingElement;
        username.setAttribute('class', 'nickname-on-tweet');
        username.innerHTML = metadataTwitt.user.username;
        mainPartTweetDiv.appendChild(username);

        var tweet = document.createElement('article') as HTMLElement;
        tweet.setAttribute('class', 'margin-text-tweet');
        tweet.innerHTML = metadataTwitt.twitt.text;
        mainPartTweetDiv.appendChild(tweet);

        div.appendChild(mainPartTweetDiv);
        li.appendChild(div);
        return li;
    }
};
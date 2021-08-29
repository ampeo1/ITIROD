export default class Twitt{
    public readonly username?: string;
    public readonly photoURL?: string;
    public readonly text?: string;
    public readonly likes?: number;
    public readonly retwitt?: number;

    constructor(username: string, photoURL: string, text: string, likes: number, retwitt: number){
        this.username = username;
        this.photoURL = photoURL;
        this.text = text;
        this.likes = likes;
        this.retwitt = retwitt;
    }

    public static HTMLPresentation(twitt: Twitt){
        var li = document.createElement("li");
        var div = document.createElement('div');
        div.setAttribute('class', 'twitt');

        var image = document.createElement('img');
        image.setAttribute('class', 'profile-avatar twitt-avatar-size');
        image.setAttribute('src', twitt.photoURL);
        div.appendChild(image);

        var mainPartTweetDiv = document.createElement('div');
        mainPartTweetDiv.setAttribute('class', 'main-part-tweet');

        var username = document.createElement('h4') as HTMLHeadingElement;
        username.setAttribute('class', 'nickname-on-tweet');
        username.innerHTML = twitt.username;
        mainPartTweetDiv.appendChild(username);

        var tweet = document.createElement('article') as HTMLElement;
        tweet.setAttribute('class', 'margin-text-tweet');
        tweet.innerHTML = twitt.text;
        mainPartTweetDiv.appendChild(tweet);

        div.appendChild(mainPartTweetDiv);
        li.appendChild(div);
        return li;
    }
};
import * as firebase from "firebase";
import Firebase from "./firebase";
import { MetadataTwitt } from "./metadataTwitt";
import { User } from "./user";

export default class Twitt{
    public readonly userId: string;
    public readonly text?: string;
    public likes?: number;
    public retwitt?: number;

    constructor(userId: string, text: string, likes: number, retwitt: number){
        this.userId = userId;
        this.text = text;
        this.likes = likes;
        this.retwitt = retwitt;
    }

    public static HTMLPresentation(metadataTwitt: MetadataTwitt, firebase: Firebase){
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

        var actionOnTwitts = document.createElement('div');
        actionOnTwitts.setAttribute('class', 'actions-on-tweet');
        
        //retwitt
        var retwitt = document.createElement('div');
        retwitt.setAttribute('class', 'retweet');

        var countRetwitt = document.createElement('h3');
        countRetwitt.setAttribute('class', 'maint-font');
        countRetwitt.innerText = `${metadataTwitt.twitt.retwitt}`;
        
        var retwittSvg: SVGSVGElement;
        console.log(metadataTwitt.isRetwitt);
        if (metadataTwitt.isRetwitt == true){
            retwittSvg = Twitt.RetwittSvg(retwitt, countRetwitt, firebase, metadataTwitt);
        }
        else{ 
            retwittSvg = Twitt.DisableRetwittSvg(retwitt, countRetwitt, firebase, metadataTwitt);
        }

        retwitt.appendChild(retwittSvg);
        retwitt.appendChild(countRetwitt);
        actionOnTwitts.appendChild(retwitt);

        //like
        var like = document.createElement('div');
        like.setAttribute('class', 'like');
        
        var countLike = document.createElement('h3');
        countLike.setAttribute('class', 'maint-font');
        countLike.innerText = `${metadataTwitt.twitt.likes}`;

        var likeSvg: SVGSVGElement;
        if (metadataTwitt.isLike == true){
            likeSvg = Twitt.LikeSvg(like, countLike, firebase, metadataTwitt);
        }
        else{ 
            likeSvg = Twitt.DisableLikeSvg(like, countLike, firebase, metadataTwitt);
        }

        like.appendChild(likeSvg);
        like.appendChild(countLike);
        actionOnTwitts.appendChild(like);

        li.appendChild(actionOnTwitts);
        return li;
    }

    private static CreateSvg(){
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '24');
        svg.setAttribute('height', '24');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');

        return svg;
    }

    private static CreatePath(d: string, fill: string){
        var pathSvg = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathSvg.setAttribute('d', d);
        pathSvg.setAttribute('fill', fill);

        return pathSvg
    }

    private static DisableRetwittSvg(div: HTMLDivElement, count: HTMLHeadingElement, firebase: Firebase, twitt: MetadataTwitt){
        var retwittSvg = Twitt.CreateSvg();

        retwittSvg.addEventListener('click', () => {
            div.replaceChild(Twitt.RetwittSvg(div, count, firebase, twitt), retwittSvg);
            twitt.twitt.retwitt += 1;
            count.innerText = `${twitt.twitt.retwitt}`;
            firebase.retwittTwitt(twitt.idTwitt);
        })

        var d = 'M23.7793 17.0685C23.4871 16.6436 23.0116 16.6436 22.7184 17.0685L20.4964 20.2877V5.43863C20.4964 2.43981 18.812 0.000725358 16.7431 0.000725358H10.888C10.4737 0.000725358 10.1374 0.487961 10.1374 1.08831C10.1374 1.68865 10.4737 2.17589 10.888 2.17589H16.7431C17.9842 2.17589 18.9951 3.64049 18.9951 5.43863V20.2877L16.7732 17.0685C16.4799 16.6436 16.0045 16.6436 15.7122 17.0685C15.42 17.4934 15.418 18.1822 15.7122 18.6056L19.2153 23.681C19.3604 23.8941 19.5526 24 19.7458 24C19.9389 24 20.1291 23.8956 20.2762 23.681L23.7793 18.6056C24.0736 18.1822 24.0736 17.4934 23.7793 17.0685ZM13.11 21.8248H7.25485C6.01376 21.8248 5.00288 20.3602 5.00288 18.5621V3.713L7.22482 6.93224C7.37295 7.1454 7.56512 7.25126 7.75729 7.25126C7.94946 7.25126 8.14162 7.1454 8.28775 6.93224C8.58101 6.50736 8.58101 5.81856 8.28775 5.39512L4.78469 0.319749C4.49143 -0.106583 4.01601 -0.106583 3.72376 0.319749L0.220693 5.39512C-0.0735644 5.81856 -0.0735644 6.50736 0.220693 6.93224C0.514951 7.35712 0.988365 7.35712 1.28162 6.93224L3.50357 3.713V18.5621C3.50357 21.5609 5.18804 24 7.25685 24H13.112C13.5263 24 13.8626 23.5128 13.8626 22.9124C13.8626 22.3121 13.5253 21.8248 13.112 21.8248H13.11Z';
        var fill = '#6B6868';
        var path = Twitt.CreatePath(d, fill);
        count.setAttribute('class', 'maint-font');
        retwittSvg.appendChild(path);

        return retwittSvg;
    }

    private static RetwittSvg(div: HTMLDivElement, count: HTMLHeadingElement, firebase: Firebase, twitt: MetadataTwitt){
        var retwittSvg = Twitt.CreateSvg();

        retwittSvg.addEventListener('click', () => {
            div.replaceChild(Twitt.DisableRetwittSvg(div, count, firebase, twitt), retwittSvg);
            twitt.twitt.retwitt -= 1;
            count.innerText = `${twitt.twitt.retwitt}`;
            firebase.disableRetwittTwitt(twitt.idTwitt);
        })

        var d = 'M23.615 15.477c-.47-.47-1.23-.47-1.697 0l-1.326 1.326V7.4c0-2.178-1.772-3.95-3.95-3.95h-5.2c-.663 0-1.2.538-1.2 1.2s.537 1.2 1.2 1.2h5.2c.854 0 1.55.695 1.55 1.55v9.403l-1.326-1.326c-.47-.47-1.23-.47-1.697 0s-.47 1.23 0 1.697l3.374 3.375c.234.233.542.35.85.35s.613-.116.848-.35l3.375-3.376c.467-.47.467-1.23-.002-1.697zM12.562 18.5h-5.2c-.854 0-1.55-.695-1.55-1.55V7.547l1.326 1.326c.234.235.542.352.848.352s.614-.117.85-.352c.468-.47.468-1.23 0-1.697L5.46 3.8c-.47-.468-1.23-.468-1.697 0L.388 7.177c-.47.47-.47 1.23 0 1.697s1.23.47 1.697 0L3.41 7.547v9.403c0 2.178 1.773 3.95 3.95 3.95h5.2c.664 0 1.2-.538 1.2-1.2s-.535-1.2-1.198-1.2z';
        var fill = '#00ba7c';
        var path = Twitt.CreatePath(d, fill);
        retwittSvg.appendChild(path);

        count.setAttribute('class', 'retwitt-color');

        return retwittSvg;
    }

    private static DisableLikeSvg(div: HTMLDivElement, count: HTMLHeadingElement, firebase: Firebase, twitt: MetadataTwitt){
        var likeSvg = Twitt.CreateSvg();

        likeSvg.addEventListener('click', () => {
            div.replaceChild(Twitt.LikeSvg(div, count, firebase, twitt), likeSvg);
            twitt.twitt.likes += 1;
            count.innerText = `${twitt.twitt.likes}`;
            firebase.likeTwitt(twitt.idTwitt);
        })

        var d = 'M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z';
        var fill = '#6B6868';
        var path = Twitt.CreatePath(d, fill);
        likeSvg.appendChild(path);

        count.setAttribute('class', 'maint-font');
        
        return likeSvg;
    }

    private static LikeSvg(div: HTMLDivElement, count: HTMLHeadingElement, firebase: Firebase, twitt: MetadataTwitt){
        var likeSvg = Twitt.CreateSvg();

        likeSvg.addEventListener('click', () => {
            div.replaceChild(Twitt.DisableLikeSvg(div, count, firebase, twitt), likeSvg);
            twitt.twitt.likes -= 1;
            count.innerText = `${twitt.twitt.likes}`;
            firebase.disableLikeTwitt(twitt.idTwitt);
        })

        var d = 'M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z';
        var fill = '#f91880';
        var path = Twitt.CreatePath(d, fill);
        likeSvg.appendChild(path);

        count.setAttribute('class', 'like-color');
        
        return likeSvg;
    }
};
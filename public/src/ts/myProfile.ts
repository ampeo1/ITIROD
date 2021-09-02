import Firebase from './firebase';
import Twitt from './twitt';
import { User } from './user';

export default class MyProfile{
    private static firebase : Firebase;
    private static avatar: HTMLImageElement;
    private static user: User;

    public static Initialize(firebase: Firebase, userId: string){
        this.firebase = firebase;
        MyProfile.GetUser(userId).then((user) => {
            this.user = user;
            var usernameTitle = <HTMLElement>document.querySelector('#title-username');
            usernameTitle.innerHTML = this.user.username;

            this.avatar = <HTMLImageElement>document.querySelector('#avatar');
            this.avatar.setAttribute('src', this.user.photoURL);
    
            this.AddEventListenerForTwitts();

            var loadAvatarButton = <HTMLButtonElement>document.querySelector('#load-avatar');
            var input = <HTMLInputElement>document.querySelector('#file');
            var form = <HTMLFormElement>document.querySelector('#add-twitt-form');
            if (this.firebase.currentUserId != user.userId){
                loadAvatarButton.setAttribute('class', 'display-none');
                form.setAttribute('class', 'display-none');
            }

            input.addEventListener('input', MyProfile.UpdateAvatar);
            loadAvatarButton.addEventListener('click', () => {
                input.click();
            })
        });

        var addTwittButton = <HTMLButtonElement>document.querySelector('#newTwittButton');
        addTwittButton.addEventListener('click', MyProfile.addTwitt);

    }

    private static UpdateAvatar(this: HTMLInputElement, ev: Event) {
        if (this.files.length != 1){
            return;
        }

        MyProfile.firebase.uploadAvatar(this.files[0], MyProfile.avatar);
    }

    private static addTwitt(){
        var textTwitt = <HTMLTextAreaElement>document.querySelector("#textForNewTwittInput");
        var idTwitt = MyProfile.firebase.addTwitt(textTwitt.value);
        textTwitt.value = "";
        MyProfile.firebase.registerTwittForUser(idTwitt);
    }

    private static UploadTwitts(){
        MyProfile.firebase.getTwittsUser().then((twitts) => {
            var list = <HTMLUListElement>document.querySelector("#twitts");
            twitts.forEach((twitt) => {
                list.insertAdjacentElement('afterbegin', Twitt.HTMLPresentation(twitt));
            });
            
            console.log(twitts.length);
        });
    }

    private static AddEventListenerForTwitts(){
        var list = <HTMLUListElement>document.querySelector("#twitts");
        MyProfile.firebase.eventListenerForTwitts(list, this.user.userId);
    }

    private static GetUser(userId: string){
        return this.firebase.getUser(userId)
    }
};
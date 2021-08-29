import Firebase from './firebase';
import Twitt from './twitt';

export default class MyProfile{
    private static firebase : Firebase;
    private static avatar: HTMLImageElement;
    public static Initialize(firebase: Firebase){
        this.firebase = firebase;
        var usernameTitle = <HTMLElement>document.querySelector('#title-username');
        usernameTitle.innerHTML = this.firebase.getUserName();
        var loadAvatarButton = <HTMLButtonElement>document.querySelector('#load-avatar');
        var addTwittButton = <HTMLButtonElement>document.querySelector('#newTwittButton');
        addTwittButton.addEventListener('click', MyProfile.addTwitt);
        var input = <HTMLInputElement>document.querySelector('#file');
        input.addEventListener('input', MyProfile.UpdateAvatar);
        loadAvatarButton.addEventListener('click', () => {
            input.click();
        })

        this.avatar = <HTMLImageElement>document.querySelector('#avatar');
        this.avatar.setAttribute('src', this.firebase.URLAvatar);

        this.UploadTwitts();
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
        MyProfile.firebase.registerTwittForUser(idTwitt);
    }

    private static UploadTwitts(){
        MyProfile.firebase.getTwittsUser().then((twitts) => {
            var list = <HTMLUListElement>document.querySelector("#twitts");
            twitts.forEach((twitt: Twitt) => {
                list.insertAdjacentElement('afterbegin', Twitt.HTMLPresentation(twitt));
            });
        });
    }
};
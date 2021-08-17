import Firebase from './firebase';

export default class MyProfile{
    private static firebase : Firebase;

    public static Initialize(fire: Firebase){
        this.firebase = fire;
        var usernameTitle = <HTMLElement>document.querySelector('#title-username');
        usernameTitle.innerHTML = this.firebase.getUserName();
    }
};
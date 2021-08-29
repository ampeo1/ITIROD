import Firebase from './firebase';

export default class Header{
    private static firebase : Firebase;

    public static Initialize(fire: Firebase){
        Header.firebase = fire;
        document.querySelector('.signOut').addEventListener('click', Header.signOut);
    }

    private static signOut(){
        Header.firebase.signOutUser();
    }
};
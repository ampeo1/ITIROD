import firebase from 'firebase';
import 'firebase/auth';

export default class Firebase{
    private auth: firebase.auth.Auth;
    constructor(){
        const firebaseConfig = {
            apiKey: "AIzaSyB2rHhh-DunCAEn_4Y3yLWMChOLvSHmIwo",
            authDomain: "itirod-5a46c.firebaseapp.com",
            databaseURL: "https://itirod-5a46c-default-rtdb.firebaseio.com",
            projectId: "itirod-5a46c",
            storageBucket: "itirod-5a46c.appspot.com",
            messagingSenderId: "612338687337",
            appId: "1:612338687337:web:03023a82c83a92fd0431f8",
            measurementId: "G-93D5D9YYLL"
        }

        firebase.initializeApp(firebaseConfig);
        this.auth = firebase.auth();
    }

    public createUser(email: string, password: string, username: string){
        var result = false;
        this.auth.createUserWithEmailAndPassword(email, password).then((user) =>{
            user.user.updateProfile({
                displayName: username,
            })

            result = true;
        })
        .catch((error) =>{
            alert(error);
        });

        return result;
    }

    public loginUser(email: string, password: string){
        this.auth.signInWithEmailAndPassword(email, password) 
        .catch((error) => {
            alert(error.code);
            alert(error.message);
        });
    }
    
    public async userIsSigned(){
        var result: boolean = false;
        await this.auth.onAuthStateChanged((user) => {
            if (user == null){
                console.log("Пользователь не авторизован");
                console.log(window.location.pathname);
                if (window.location.pathname != '/index.html'){
                    window.location.href = 'http://127.0.0.1:5500/index.html';
                }
            }
            else {
                this.auth.updateCurrentUser(user);
                console.log("Пользователь авторизован: " + user.email);
            }
        });

        return result;
    }

    public signOutUser(){
        this.auth.signOut();
    }

    public getUserName(){
        return this.auth.currentUser.displayName;
    }
}
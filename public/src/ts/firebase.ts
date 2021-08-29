import firebase from 'firebase';
import 'firebase/auth';
import Twitt from './twitt';

export default class Firebase{
    private auth: firebase.auth.Auth;
    private storage: firebase.storage.Storage;
    private database: firebase.database.Database;

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
        this.storage = firebase.storage();
        this.database = firebase.database();
    }

    public async createUser(email: string, password: string, username: string){
        var result = false;
        await this.auth.createUserWithEmailAndPassword(email, password).then((user) => {
            user.user.updateProfile({
                displayName: username,
                photoURL: 'img/method-draw-image.svg',
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
    
    public userIsSigned(){
        var result: boolean = false;
        this.auth.onAuthStateChanged(async (user) => {
            if (user == null){
                console.log("Пользователь не авторизован");
                if (window.location.pathname != '/index.html'){
                    window.location.href = 'http://127.0.0.1:5500/index.html';
                }
            }
            else {
                await this.auth.updateCurrentUser(user);
                console.log("Пользователь авторизован: " + user.email);
            }
        });

        return result;
    }

    public signOutUser(){
        this.auth.signOut();
    }

    public getUserName(){
        console.log(this.auth);
        console.log(this.auth.currentUser);
        return this.auth.currentUser.displayName;
    }

    public uploadAvatar(data: Blob, image: HTMLImageElement){
        var ref = this.storage.ref();
        var uploadTask = ref.child(`users/${this.auth.currentUser.uid}/avatar`).put(data);

        uploadTask.on('state_changed', (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
        }, (error) => {
            console.log(error);
        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                this.auth.currentUser.updateProfile({
                    photoURL: downloadURL,
                });
                image.setAttribute('src', downloadURL);
            })
        })
    }

    public get URLAvatar(){
        return this.auth.currentUser.photoURL;
    }

    public addTwitt(textTwitt: string){
        console.log(this.database);
        var twitt = new Twitt(this.auth.currentUser.displayName, this.auth.currentUser.photoURL, textTwitt, 0, 0);
        var idTwitt = this.database.ref('twitts').push(twitt).key;

        return idTwitt;
    }

    public registerTwittForUser(idTwitt: string){
        this.database.ref(`users/${this.auth.currentUser.uid}/twitts`).push({
            idTwitt: idTwitt,
        });
    }

    public async getTwittsUser(){
        let idTwitts: string[] = [];
        this.database.ref(`users/${this.auth.currentUser.uid}/twitts`).once('value', (snapshot) => {
            snapshot.forEach((childShaphot) => {
                idTwitts.push(childShaphot.val().idTwitt);
            });
        });

        return await this.getTwittsById(idTwitts);
    }

    private async getTwittsById(idTwitts: string[]){
        let twitts : Twitt[] = [];
        await this.database.ref(`twitts`).once('value', (snapshot) => {
            snapshot.forEach((childShaphot) => {
                if(idTwitts.includes(childShaphot.key)){
                    twitts.push(<Twitt>childShaphot.val());
                }
            })
        })

        return twitts;
    }
}
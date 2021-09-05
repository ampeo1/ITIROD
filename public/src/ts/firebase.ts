import firebase from 'firebase';
import 'firebase/auth';
import { MetadataTwitt } from './metadataTwitt';
import Twitt from './twitt';
import { User } from './user';

export default class Firebase{
    private auth: firebase.auth.Auth;
    private storage: firebase.storage.Storage;
    private database: firebase.database.Database;
    private currentUserUid: string;

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

    public get currentUserId(){
        return this.currentUserUid;
    }

    public async createUser(email: string, password: string, username: string){
        var result = false;
        const defaultPhotoURL = 'img/method-draw-image.svg';
        await this.auth.createUserWithEmailAndPassword(email, password).then((user) => {
            user.user.updateProfile({
                displayName: username,
                photoURL: defaultPhotoURL,
            })
            
            this.database.ref(`users/${this.auth.currentUser.uid}`).set({
                username: username,
                photoURL: defaultPhotoURL,
                userId: user.user.uid,
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
                this.currentUserUid = this.auth.currentUser.uid;
                console.log("Пользователь авторизован: " + user.email);
            }
        });

        return result;
    }

    public signOutUser(){
        this.auth.signOut();
    }

    public async Subscribe(userId: string){
        await this.database.ref(`users/${userId}/subscribers`).orderByChild('userId').once('value', async (snapshot) => {
            var isContains = false;
            snapshot.forEach(item => {
                var id = <string>item.val().userId;
                if (id === this.auth.currentUser.uid) {
                    isContains = true;
                }
            });

            if (!isContains) {
                this.database.ref(`users/${this.auth.currentUser.uid}/subscriptions`).push({
                    userId: userId
                });
    
                this.database.ref(`users/${userId}/subscribers`).push({
                    userId: this.auth.currentUser.uid
                });
            }
        });
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

                this.database.ref(`users/${this.auth.currentUser.uid}`).update({
                    photoURL: downloadURL,
                });

                image.setAttribute('src', downloadURL);
            })
        })
    }

    public addTwitt(textTwitt: string){
        var twitt = new Twitt(this.auth.currentUser.uid, textTwitt, 0, 0);
        var idTwitt = this.database.ref('twitts').push(twitt).key;

        return idTwitt;
    }

    public registerTwittForUser(idTwitt: string){
        this.database.ref(`users/${this.auth.currentUser.uid}/twitts`).push({
            idTwitt: idTwitt,
        }); 
    }

    public removeTwittForUser(idTwitt: string){
        this.database.ref(`users/${this.auth.currentUser.uid}/twitts`).orderByChild(idTwitt).equalTo(idTwitt).ref.remove();
    }

    public async getTwittsUser(){
        let twitts: MetadataTwitt[] = [];
        await this.database.ref(`users/${this.auth.currentUser.uid}/twitts`).once('value', (snapshot) => {
            snapshot.forEach((childShaphot) => {
                var item = childShaphot.val();
                var metaData = new MetadataTwitt();
                metaData.idTwitt = item.idTwitt;
                metaData.isLike = item.isLike;
                metaData.isRetwitt = item.isRetwitt;
                twitts.push(metaData);
            });
        });
        
        return await this.getTwittsById(twitts);
    }

    public eventListenerForTwitts(list: HTMLUListElement, userId: string){
        var twittsRef = this.database.ref(`users/${userId}/twitts`);
        twittsRef.on('child_added', (data) => {
            var item = data.val();
            var metadataTwitt = new MetadataTwitt();
            metadataTwitt.idTwitt = item.idTwitt;
            this.getHistory(metadataTwitt).then(metadataTwitt => {
                this.getTwittsById([metadataTwitt]).then((twitts) => {
                    twitts.forEach((twitt) => {
                        list.insertAdjacentElement('afterbegin', Twitt.HTMLPresentation(twitt, this));
                    })
                });
            });
        })
    }

    public eventListenerForSubscribers(heading: HTMLAnchorElement, userId: string){
        var subscribersRef = this.database.ref(`users/${userId}/subscribers`);
        var countSubscribers;
        subscribersRef.on('child_added', (snapshot) => {
            countSubscribers = snapshot.numChildren();
            heading.innerText = `Подписчиков: ${countSubscribers}`;
        })
    }

    public eventListenerForSubscriptions(heading: HTMLAnchorElement, userId: string){
        var subscribersRef = this.database.ref(`users/${userId}/subscriptions`);
        var countSubscriptions;
        subscribersRef.on('child_added', (snapshot) => {
            countSubscriptions = snapshot.numChildren();
            heading.innerText = `Подписок: ${countSubscriptions}`;
        })
    }

    private async getTwittsById(twitts: MetadataTwitt[]){
        await this.database.ref(`twitts`).once('value', async (snapshot) => {
            snapshot.forEach((childShaphot) => {
                var index = twitts.findIndex(item => item.idTwitt === childShaphot.key);
                if(index != -1){
                    twitts[index].twitt = <Twitt>childShaphot.val();
                }
            })
        })

        for(var i = 0; i < twitts.length; i++) {
            twitts[i].user = await this.getUser(twitts[i].twitt.userId);         
        }

        return twitts;
    }

    public async disableLikeTwitt(twittId: string){
        this.database.ref(`users/${this.auth.currentUser.uid}/history/${twittId}`).update({
            isLike: false,
        })

        var count: number;
        await this.database.ref(`twitts/${twittId}`).once('value', (snapshot) => {
            count = snapshot.val().likes;
        })

        this.database.ref(`twitts/${twittId}`).update({
            likes: count - 1,
        })
    }

    public async likeTwitt(twittId: string){
        this.database.ref(`users/${this.auth.currentUser.uid}/history/${twittId}`).update({
            isLike: true,
        })

        var count: number;
        await this.database.ref(`twitts/${twittId}`).once('value', (snapshot) => {
            count = snapshot.val().likes;
        })

        this.database.ref(`twitts/${twittId}`).update({
            likes: count + 1,
        })
    }

    public async retwittTwitt(twittId: string){
        this.database.ref(`users/${this.auth.currentUser.uid}/history/${twittId}`).update({
            isRetwitt: true,
        });

        var count: number;
        await this.database.ref(`twitts/${twittId}`).once('value', (snapshot) => {
            count = snapshot.val().retwitt;
        })

        this.database.ref(`twitts/${twittId}`).update({
            retwitt: count + 1,
        })

        this.registerTwittForUser(twittId);
    }

    public async disableRetwittTwitt(twittId: string){
        this.database.ref(`users/${this.auth.currentUser.uid}/history/${twittId}`).update({
            isRetwitt: false,
        });

        var count: number;
        await this.database.ref(`twitts/${twittId}`).once('value', (snapshot) => {
            count = snapshot.val().retwitt;
        })

        this.database.ref(`twitts/${twittId}`).update({
            retwitt: count - 1,
        })

        this.removeTwittForUser(twittId);
    }

    public async getHistory(metadataTwitt: MetadataTwitt){
        await this.database.ref(`users/${this.auth.currentUser.uid}/history/${metadataTwitt.idTwitt}`).once('value', snapshot => {
            var item = snapshot.val();
            metadataTwitt.isLike = item?.isLike;
            metadataTwitt.isRetwitt = item?.isRetwitt;
        })

        return metadataTwitt;
    }

    public async getUser(userId?: string){
        if (userId == null){
            userId = this.auth.currentUser.uid;
        }

        var user: User;
        await this.database.ref(`users/${userId}`).once('value', (snapshot) => {
            user = <User>snapshot.val();
            user.countSubscribers = snapshot.child('subscribers').numChildren();
            user.countSubscriptions = snapshot.child('subscriptions').numChildren();
        })

        await this.database.ref(`users/${userId}/subscribers`)

        return user;
    }

    public async searchUsers(username: string){
        var users: User[] = [];
        await this.database.ref('users').orderByChild('username').startAt(username).once('value', (snapshot) => {
            snapshot.forEach((user) => {
                users.push(<User>user.val());
            })
        });

        return users;
    }

    public async getUsers(userId: string, type: string){
        var users: User[] = [];
        var userIds: string[] = [];
        await this.database.ref(`users/${userId}/${type}`).once('value', (snapshot) => {
            snapshot.forEach((userId) => {
                userIds.push(<string>userId.val().userId);
            });
        });

        for (var i = 0; i < userIds.length; i++){
            var user = await this.getUser(userIds[i]);
            users.push(user);
        }

        return users;
    }
}
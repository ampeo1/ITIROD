import Firebase from './firebase';
import { User } from './user';

export default class Users{
    private static firebase : Firebase;
    private static type: string;
    private static userId: string;

    public static Initialize(firebase: Firebase, userId: string, type: string){
       this.firebase = firebase;
       this.type = type;
       this.userId = userId;
    
        var div = <HTMLDivElement>document.querySelector('#users-container');
        firebase.getUsers(this.userId, this.type).then(users => {
           users.forEach(user => {
               div.append(User.HTMLPresentation(user));
           })
        });
    }
};
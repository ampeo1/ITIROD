import Auth from './auth';
import Firebase from './firebase';
import Header from './header';
import MyProfile from './myProfile';
import Users from './users';

var firebase = new Firebase();
firebase.userIsSigned();
setTimeout(() => {
    Header.Initialize(firebase);

    if (window.location.pathname == '/index.html'){
        Auth.Initialize(firebase);
    }

    if (window.location.pathname == '/profile_page.html'){
        let uid = getParameters(window.location.search.substr(1))[0];
        MyProfile.Initialize(firebase, uid);
    }

    if (window.location.pathname == '/users.html'){
        var values = getParameters(window.location.search.substr(1));
        Users.Initialize(firebase, values[0], values[1]);
    }

}, 2000);


function getParameters(str: string){
    var arr = str.split('&');
    var values: string[] = [];
    arr.forEach(item => {
        values.push(item.split('=')[1]);
    })

    return values;
}
import Auth from './auth';
import Firebase from './firebase';
import Header from './header';
import MyProfile from './myProfile';

var firebase = new Firebase();
firebase.userIsSigned();
setTimeout(() => {
    Header.Initialize(firebase);

    if (window.location.pathname == '/index.html'){
        Auth.Initialize(firebase);
    }

    if (window.location.pathname == '/profile_page.html'){
        MyProfile.Initialize(firebase);
    }
}, 1000);

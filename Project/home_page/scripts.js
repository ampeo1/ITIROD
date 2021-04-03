const firebaseConfig = {
    apiKey: "AIzaSyB2rHhh-DunCAEn_4Y3yLWMChOLvSHmIwo",
    authDomain: "itirod-5a46c.firebaseapp.com",
    projectId: "itirod-5a46c",
    storageBucket: "itirod-5a46c.appspot.com",
    messagingSenderId: "612338687337",
    appId: "1:612338687337:web:03023a82c83a92fd0431f8",
    measurementId: "G-93D5D9YYLL",
    databaseURL: "https://itirod-5a46c-default-rtdb.firebaseio.com/"
  };

firebase.initializeApp(firebaseConfig);
  /*var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        console.log("вошёл");
        return true;
      },
      uiShown: function() {
        console.log("render");
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'http://127.0.0.1:5500/home_page/home_page.html',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };*/

//document.querySelector('#register').addEventListener("click", registerDialog);

function registerDialog(){
    /*let dialog = document.querySelector('#registerDialog');
    dialog.open = true;*/
}

//document.querySelector('#logIn').addEventListener("click", logInDialog);

/*function logInDialog(){
    ui.start('#firebaseui-auth-container', uiConfig);
    let dialog = document.querySelector('#logInDialog');
    dialog.open = true;
}*/

    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            console.log("вошёл");
            return true;
        },
        uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            console.log("вошёл");
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'http://127.0.0.1:5500/home_page/home_page.html',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
        tosUrl: '<your-tos-url>',
    // Privacy policy url.
        privacyPolicyUrl: '<your-privacy-policy-url>'
    };

    document.querySelector('#showRegisterDialog').addEventListener("click", showRegisterDialog);
    function showRegisterDialog(){
        /*ui.start('#firebaseui-auth-container', {
            signInOptions: [
              firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            // Other config options...
        });*/
        let dialog = document.querySelector('#registerDialog');
        dialog.showModal()
    }

    document.querySelector('#cancelRegisterDialog').addEventListener("click", cancelRegisterDialog);
    function cancelRegisterDialog(){
        let dialog = document.querySelector('#registerDialog');
        dialog.close();
    }

    document.querySelector('#showLogInDialog').addEventListener("click", showLogInDialog);
    function showLogInDialog(){
        //ui.start('#firebaseui-auth-container', uiConfig);
        let dialog = document.querySelector('#logInDialog');
        dialog.showModal()
    }

    document.querySelector('#cancelLogInDialog').addEventListener("click", cancelLogInDialog);
    function cancelLogInDialog(){
        let dialog = document.querySelector('#logInDialog');
        dialog.close()
    }

    function register(){
        console.log("register submit");
        let username = this.querySelector("input[name=username]").value;
        let mail = this.querySelector("input[name=mail]").value;
        let password = this.querySelector("input[name=password]").value;
        let dateOfBirth = this.querySelector("input[name=dateOfBirth]").value;

        ui.createUserWithEmailAndPassword(mail, password).then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            console.log("Пользователь зарегистрирован.");
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            console.log(errorCode)
            var errorMessage = error.message;
            console.log(errorMessage)
        });

    }

    document.getElementById('register').onsubmit = register;
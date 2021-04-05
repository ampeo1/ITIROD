firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("пользователь авторизован")
        console.log(user.email)
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      // ...
    } else {
        console.log("пользователь не авторизован")
      // User is signed out
      // ...
    }
});

    let errorMail = "";
    let errorPassword = "";

    document.querySelector('#showRegisterDialog').addEventListener("click", showRegisterDialog);
    function showRegisterDialog(){
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
        var username = this.querySelector("input[name=username]").value;
        var mail = this.querySelector("input[name=mail]").value;
        var password = this.querySelector("input[name=password]").value;
        var dateOfBirth = this.querySelector("input[name=dateOfBirth]").value;

        firebase.auth().createUserWithEmailAndPassword(mail, password).then((userCredential) => {
            var user = userCredential.user;
            user.displayName = username;
        })
        .catch((error) => console.log(error));

    }

    document.getElementById('register').onsubmit = register;

    function logIn(event){
        event.preventDefault();

        var email = this.querySelector("input[name=mail]");
        var password = this.querySelector("input[name=password]");

        firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            var user = userCredential.user;
            document.location = "/home_page/profile_page.html"
        })
        .catch((error) => {
            var errorCode = error.code;
            console.log(errorCode);
            var errorMessage = error.message;
            console.log(errorMessage);
            event.stopPropagation
        });
    }

    document.getElementById('logIn').addEventListener('submit', logIn)

    document.querySelector('#signOut').addEventListener("click", signOut);
    function signOut(){
        if (firebase.auth().currentUser != null){
            firebase.auth().signOut();
        }
    }
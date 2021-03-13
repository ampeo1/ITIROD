document.querySelector('#register').addEventListener("click", registerDialog);

function registerDialog(){
    let dialog = document.querySelector('#registerDialog');
    dialog.open = true;
}

document.querySelector('#logIn').addEventListener("click", logInDialog);

function logInDialog(){
    let dialog = document.querySelector('#logInDialog');
    dialog.open = true;
}
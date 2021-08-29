import { User } from './user';
import Firebase from './firebase';

export default class Auth{
    private static firebase : Firebase;

    public static Initialize(fire: Firebase){
        Auth.firebase = fire;
        document.querySelector('#showRegisterDialog').addEventListener("click", Auth.showRegisterDialog);
        document.querySelector('#cancelRegisterDialog').addEventListener("click", Auth.cancelRegisterDialog);
        document.querySelector('#showLogInDialog').addEventListener("click", Auth.showLogInDialog);
        document.querySelector('#cancelLogInDialog').addEventListener("click", Auth.cancelLogInDialog);
        document.querySelector('#registerButton').addEventListener("click", Auth.register);
        var form = <HTMLFormElement>document.querySelector('#register');
        form = <HTMLFormElement>document.querySelector('#logIn');
        form.onsubmit = Auth.logIn;
    }

    private static showRegisterDialog(){
        var dialog = <HTMLDialogElement>document.querySelector("#registerDialog");
        dialog.showModal();
    }

    private static cancelRegisterDialog(){
        var dialog = <HTMLDialogElement>document.querySelector("#registerDialog");
        dialog.close();
    }

    private static showLogInDialog(){
        var dialog = <HTMLDialogElement>document.querySelector("#logInDialog");
        dialog.showModal();
    }

    private static cancelLogInDialog(){
        var dialog = <HTMLDialogElement>document.querySelector("#logInDialog");
        dialog.close();
    }

    private static register() {
        var form = <HTMLFormElement>document.querySelector("#register");
        var username = <HTMLInputElement>document.querySelector("input[name=username]");
        var mail = <HTMLInputElement>document.querySelector("input[name=mail]");
        var password = <HTMLInputElement>document.querySelector("input[name=password]");
        var dateOfBirth = <HTMLInputElement>document.querySelector("input[name=dateOfBirth]");
        var isCreated = Auth.firebase.createUser(mail.value, password.value, username.value);
        console.log(isCreated);
        if (isCreated){
            Auth.cancelRegisterDialog();
        }

        return true;  
    }

    private static logIn(){
        var form = <HTMLFormElement>document.querySelector("#logIn");
        var mail = <HTMLInputElement>form.querySelector("input[name=mail]");
        var password = <HTMLInputElement>document.querySelector("input[name=password]");
        Auth.firebase.loginUser(mail.value, password.value);
        Auth.cancelLogInDialog();

        return false;
    }
};
class Authorization{
    private static initialize = (() => {
        document.querySelector('#showRegisterDialog').addEventListener("click", Authorization.showRegisterDialog);
        document.querySelector('#cancelRegisterDialog').addEventListener("click", Authorization.cancelRegisterDialog);
        document.querySelector('#showLogInDialog').addEventListener("click", Authorization.showLogInDialog);
        document.querySelector('#cancelLogInDialog').addEventListener("click", Authorization.cancelLogInDialog);
    })();

    private static showRegisterDialog(): void{
        console.log("showRegisterDialog");
        let dialog: HTMLDialogElement = document.querySelector('#registerDialog');
        dialog.showModal()
    };

    private static cancelRegisterDialog(): void{
        console.log("cancelRegisterDialog");
        let dialog: HTMLDialogElement = document.querySelector('#registerDialog');
        dialog.close();
    };

    private static showLogInDialog(){
        console.log("showLogInDialog");
        let dialog: HTMLDialogElement = document.querySelector('#logInDialog');
        dialog.showModal()
    };

    private static cancelLogInDialog(){
        console.log("cancelLogInDialog");
        let dialog: HTMLDialogElement = document.querySelector('#logInDialog');
        dialog.close()
    };
}
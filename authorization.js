var Authorization = /** @class */ (function () {
    function Authorization() {
    }
    Authorization.showRegisterDialog = function () {
        console.log("showRegisterDialog");
        var dialog = document.querySelector('#registerDialog');
        dialog.showModal();
    };
    ;
    Authorization.cancelRegisterDialog = function () {
        console.log("cancelRegisterDialog");
        var dialog = document.querySelector('#registerDialog');
        dialog.close();
    };
    ;
    Authorization.showLogInDialog = function () {
        console.log("showLogInDialog");
        var dialog = document.querySelector('#logInDialog');
        dialog.showModal();
    };
    ;
    Authorization.cancelLogInDialog = function () {
        console.log("cancelLogInDialog");
        var dialog = document.querySelector('#logInDialog');
        dialog.close();
    };
    ;
    Authorization.initialize = (function () {
        document.querySelector('#showRegisterDialog').addEventListener("click", Authorization.showRegisterDialog);
        document.querySelector('#cancelRegisterDialog').addEventListener("click", Authorization.cancelRegisterDialog);
        document.querySelector('#showLogInDialog').addEventListener("click", Authorization.showLogInDialog);
        document.querySelector('#cancelLogInDialog').addEventListener("click", Authorization.cancelLogInDialog);
    })();
    return Authorization;
}());

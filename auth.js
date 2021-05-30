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

import Firebase from './firebase';
import { User } from './user';

export default class Header {
    private static firebase: Firebase;

    public static Initialize(fire: Firebase) {
        Header.firebase = fire;
        document.querySelector('.signOut').addEventListener('click', Header.signOut);
        var searchInput = <HTMLInputElement>document.querySelector('#search-input');
        searchInput.addEventListener('input', Header.search);

        document.body.addEventListener("click", function (e) {
            var element = <Element>e.target;
            if (element.id != "search-input"){
                document.getElementById("myDropdown").classList.remove("show");
            }
        });
    }

    private static signOut() {
        Header.firebase.signOutUser();
    }

    private static search(this: HTMLInputElement, ev: Event) {
        var div = <HTMLDivElement>document.getElementById("myDropdown");
        if (this.value.length == 1){
            div.classList.toggle("show");
        }

        div.innerHTML = '';
        Header.firebase.searchUsers(this.value).then((users) => {
            users.forEach((user) => {
                div.insertAdjacentElement('beforeend', User.HTMLPresentationForSearch(user));
            })
        });
    }
};
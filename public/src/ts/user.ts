export class User{
    public username: string;
    public password: string;
    public email: string;
    public dateOfBirth: string;

    constructor(username: string, password: string, email: string, dateOfBirth: string){
        this.username = username;
        this.password = password;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
    }
}
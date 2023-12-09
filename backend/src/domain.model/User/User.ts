
export class User {
    id: number;
    name: string;
    username: string;
    profilePicture: string;
    constructor(id: number, name: string, username: string, profilePicture: string) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.profilePicture = profilePicture;
    }
}

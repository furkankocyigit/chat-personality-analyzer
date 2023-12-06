export interface IUserSession {
    userID: string | number;
    accessToken: string;
    refreshToken: string;
    isVerified: boolean;
}

export class UserSession implements IUserSession {
    userID: string | number;
    accessToken: string;
    refreshToken: string;
    isVerified: boolean;
    constructor(userID: string | number, accessToken: string, refreshToken: string, isVerified: boolean) {
        this.userID = userID;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.isVerified = isVerified;
    }
}

export interface UserSession {
    userID: string | number;
    accessToken: string;
    refreshToken: string;
    isVerified: boolean;
}

import { User } from '@/domain/User/User';
import { IHttpClient } from '../httpClient/IHttpClient';
import { plainToInstance } from 'class-transformer';

export interface IUserRepository {
    getAllUsersInDm(): Promise<User[]>;
}

export class UserRepository implements IUserRepository {
    private readonly httpClient: IHttpClient;
    private readonly userUrl: string;
    constructor(httpClient: IHttpClient, userUrl: string) {
        this.httpClient = httpClient;
        this.userUrl = userUrl;
    }

    async getAllUsersInDm(): Promise<User[]> {
        const response = await this.httpClient.getAll(this.userUrl);

        const users = response.map((user) => {
            return plainToInstance(User, user);
        });

        return users;
    }
}

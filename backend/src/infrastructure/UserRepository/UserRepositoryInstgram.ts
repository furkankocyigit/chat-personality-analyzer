import { IgApiClient } from 'instagram-private-api';
import { inject, injectable } from 'inversify';
import { IUserRepository } from './IUserRepository';
import { CLIENTS } from '../../config/identifiers';
import { User } from '../../domain.model';
import { ErrorWithCode, StatusCode } from '../../utils';
import axios from 'axios';

//jsut for testing
const mockUsers = [
    new User(1, 'test1', 'test1', 'test1'),
    new User(2, 'test2', 'test2', 'test2'),
    new User(3, 'test3', 'test3', 'test3'),
];
@injectable()
export class UserRepositoryInstagram implements IUserRepository {
    private ig: IgApiClient;
    constructor(@inject(CLIENTS.IgApiClient) ig: IgApiClient) {
        this.ig = ig;
    }
    async getAllUsersInDm(): Promise<User[]> {
        const allDmMessageThreads = await this.ig.feed.directInbox().items();

        const users: User[] = [];
        const AxiosInstance = axios.create();
        for (const thread of allDmMessageThreads) {
            const user = thread.users.map((user) => user);
            if (user.length > 1)
                throw new ErrorWithCode(
                    'Multiple users in one thread is not supported for now',
                    StatusCode.NOT_SUPPORTED
                );

            const userPicture = await AxiosInstance.get(user[0].profile_pic_url, { responseType: 'arraybuffer' });
            const userPictureBuf = Buffer.from(userPicture.data, 'binary').toString('base64');
            users.push(new User(user[0].pk, user[0].full_name, user[0].username, userPictureBuf));
        }
        //const users = mockUsers;
        return users;
    }
}

import { IgApiClient } from 'instagram-private-api';
import { inject, injectable } from 'inversify';
import { IUserRepository } from './IUserRepository';
import { CLIENTS } from '../../config/identifiers';
import { User } from '../../domain.model';
import { ErrorWithCode, StatusCode } from '../../utils';

@injectable()
export class UserRepositoryInstagram implements IUserRepository {
    private ig: IgApiClient;
    constructor(@inject(CLIENTS.IgApiClient) ig: IgApiClient) {
        this.ig = ig;
    }
    async getAllUsersInDm(): Promise<User[]> {
        const allDmMessageThreads = await this.ig.feed.directInbox().items();

        const users: User[] = [];
        for (const thread of allDmMessageThreads) {
            const user = thread.users.map((user) => user);
            if (user.length > 1)
                throw new ErrorWithCode(
                    'Multiple users in one thread is not supported for now',
                    StatusCode.NOT_SUPPORTED
                );
            users.push(new User(user[0].pk, user[0].full_name, user[0].username, user[0].profile_pic_url));
        }
        return users;
    }
}

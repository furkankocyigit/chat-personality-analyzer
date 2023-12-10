import { User } from '../../domain.model';

export interface IUserRepository {
    getAllUsersInDm(): Promise<User[]>;
}

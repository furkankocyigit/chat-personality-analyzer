import { User } from '../../domain.model';

export interface IUserService {
    getAllUsersInDm(): User[] | Promise<User[]>;
}

import { User } from '@/domain/User/User';
import { IUserRepository } from '@/infrastructure/repository/UserRepository';

export interface IUserService {
    getAllUsersInDm(): Promise<User[]>;
}

export class UserService implements IUserService {
    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async getAllUsersInDm(): Promise<User[]> {
        const users = await this.userRepository.getAllUsersInDm();
        return users;
    }
}

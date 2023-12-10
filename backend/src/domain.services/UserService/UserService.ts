import { inject, injectable } from 'inversify';
import { User } from '../../domain.model';
import { IUserRepository } from '../../infrastructure/';
import { IUserService } from './IUserService';
import { REPOSITORIES } from '../../config/identifiers';

@injectable()
export class UserService implements IUserService {
    private userRepository: IUserRepository;

    constructor(@inject(REPOSITORIES.UserRepository) userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    getAllUsersInDm(): Promise<User[]> {
        return this.userRepository.getAllUsersInDm();
    }
}

import { UserRepository } from '../repositories/user.repository';
import { User } from '../models/user';
import { Login } from '../models/login';
export declare class UserController {
    private userRepo;
    constructor(userRepo: UserRepository);
    createUser(user: User): Promise<User>;
    login(login: Login): Promise<User>;
    getDonationsByUserId(userId: number, dateFrom: Date, coolVariable: string): Promise<void>;
    loginWithQuery(login: Login): Promise<User>;
    getAllUsers(): Promise<Array<User>>;
    getUserById(id: number): Promise<User>;
}
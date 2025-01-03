import { User } from '../models/User';

export interface UserActions {
    registerUser(user: User): void;
    updateUser(email: string, user: User): void;
    deleteUser(email: string): void;
    get usersList(): string;
}
import { GenericRepository } from '@core/database/generic/generic.repository';
import { User } from './user.entity';

export const UserRepositoryKey = 'UserRepositoryKey';

export interface IUserRepository extends GenericRepository<User> {
    findOneByUsername(username: string): Promise<User | null>;
}

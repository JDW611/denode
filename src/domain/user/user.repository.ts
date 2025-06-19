import { GenericTypeOrmRepository } from '@core/database/typeorm/generic-typeorm.repository';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { IUserRepository } from './user-repository.interface';
import { EntityTarget } from 'typeorm';

@Injectable()
export class UserRepository extends GenericTypeOrmRepository<User> implements IUserRepository {
    getName(): EntityTarget<User> {
        return User.name;
    }

    async findOneByUsername(username: string): Promise<User | null> {
        return await this.getRepository().findOneBy({ username });
    }
}

import { BaseTimeEntity } from '@core/database/typeorm/base-time.entity';
import { compareSync, hashSync } from 'bcrypt';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseTimeEntity {
    @Column({ type: 'varchar', unique: true, nullable: false })
    username: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    isValidPassword(password: string): boolean {
        return compareSync(password, this.password);
    }

    static signup(username: string, password: string): User {
        const user = new User();
        user.username = username;
        user.password = hashSync(password, 10);

        return user;
    }
}

import { BaseTimeEntity } from '@core/database/typeorm/base-time.entity';
import { compareSync } from 'bcrypt';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseTimeEntity {
    @Column({ type: 'varchar', unique: true, nullable: false })
    username: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'varchar', nullable: false })
    company: string;

    isValidPassword(password: string): boolean {
        return compareSync(password, this.password);
    }
}

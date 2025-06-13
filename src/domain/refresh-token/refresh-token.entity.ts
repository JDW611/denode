import { BaseTimeEntity } from '@core/database/typeorm/base-time.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { LocalDateTime } from '@js-joda/core';
import { LocalDateTimeTransformer } from '@core/database/typeorm/transformer';

@Entity({ name: 'refresh_tokens' })
export class RefreshToken extends BaseTimeEntity {
    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;

    @Column({ type: 'int', name: 'user_id', nullable: false })
    userId!: number;

    @Column({ type: 'varchar', nullable: false })
    accessTokenId!: string;

    @Column({ type: 'varchar', nullable: false })
    token!: string;

    @Column({ type: 'timestamp', nullable: false, transformer: new LocalDateTimeTransformer() })
    expiredAt!: LocalDateTime;

    @Column({ type: 'int', nullable: false })
    createdBy!: number;

    @Column({ type: 'int', nullable: false })
    lastModifiedBy: number;

    static of(
        user: User,
        accessTokenId: string,
        token: string,
        expiredAt: LocalDateTime,
    ): RefreshToken {
        const e = new RefreshToken();
        e.user = user;
        e.accessTokenId = accessTokenId;
        e.token = token;
        e.expiredAt = expiredAt;
        e.createdBy = user.id;
        e.lastModifiedBy = user.id;
        return e;
    }

    tokenRotate(newToken: string, userId: number) {
        this.token = newToken;
        this.lastModifiedBy = userId;
    }
}

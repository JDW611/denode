import { Injectable } from '@nestjs/common';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class TransactionManager {
    constructor(private readonly txHost: TransactionHost<TransactionalAdapterTypeOrm>) {}

    getEntityManager(): EntityManager {
        return this.txHost.tx;
    }
}

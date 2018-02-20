import Datastore = require('./index');
import { DatastoreKey, OneOrMany } from './entity';
import { Query } from './query';
import { CommitCallback, CommitResult, DatastoreRequest } from './request';


declare class DatastoreTransaction extends DatastoreRequest {
    constructor(datastore: Datastore);

    // tslint:disable-next-line unified-signatures (Arg is semantically different)
    createQuery(namespace: string, kind: string): Query;
    createQuery(kind: string): Query;

    save(entities: OneOrMany): void;

    delete(keyOrKeys: DatastoreKey | ReadonlyArray<DatastoreKey>): void;

    commit(): Promise<CommitResult>;
    commit(callback: CommitCallback): void;

    rollback(): Promise<RollbackResult>;
    rollback(callback: RollbackCallback): void;

    run(callback: TransactionCallback): void;
    run(): Promise<TransactionResult>;
}

interface BeginTransactionResponse {
    transaction: string;
}

type RollbackCallback = (err: Error, rollbackResponse: {}) => void;
type RollbackResult = [{}];

type TransactionCallback = (err: Error,
                            tx: DatastoreTransaction,
                            beginTxResponse: BeginTransactionResponse) => void;
type TransactionResult = [DatastoreTransaction, BeginTransactionResponse];

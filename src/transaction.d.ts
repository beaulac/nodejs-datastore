declare module '@google-cloud/datastore/transaction' {
    import Datastore_ = require('@google-cloud/datastore');
    import { DatastoreKey, OneOrMany } from '@google-cloud/datastore/entity';
    import { Query } from '@google-cloud/datastore/query';
    import { DatastoreRequest, CommitCallback, CommitResult } from '@google-cloud/datastore/request';

    class DatastoreTransaction extends DatastoreRequest {
        constructor(datastore: Datastore_);

        // tslint:disable-next-line unified-signatures (Arg is semantically different)
        createQuery(namespace: string, kind: string): Query;
        createQuery(kind: string): Query;

        save(entities: OneOrMany<object>): void;

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
}

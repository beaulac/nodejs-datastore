declare module "@google-cloud/datastore/transaction" {
    import Datastore = require('@google-cloud/datastore');
    import DatastoreRequest = require('@google-cloud/datastore/request');
    import Query = require('@google-cloud/datastore/query');
    import { DatastoreKey, OneOrMany } from '@google-cloud/datastore/entity';


    export = DatastoreTransaction;


    class DatastoreTransaction extends DatastoreRequest {
        constructor(datastore: Datastore);

        // tslint:disable-next-line unified-signatures (Arg is semantically different)
        createQuery(namespace: string, kind: string): Query;
        createQuery(kind: string): Query;

        save(entities: OneOrMany): void;

        delete(keyOrKeys: DatastoreKey | ReadonlyArray<DatastoreKey>): void;

        commit(): Promise<DatastoreRequest.CommitResult>;
        commit(callback: DatastoreRequest.CommitCallback): void;

        rollback(): Promise<DatastoreTransaction.RollbackResult>;
        rollback(callback: DatastoreTransaction.RollbackCallback): void;

        run(callback: DatastoreTransaction.TransactionCallback): void;
        run(): Promise<DatastoreTransaction.TransactionResult>;
    }

    namespace DatastoreTransaction {
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
}
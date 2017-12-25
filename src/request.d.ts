declare module '@google-cloud/datastore/request' {
    import { DatastoreKey, OneOrMany } from '@google-cloud/datastore/entity';
    import { Query, QueryCallback, QueryOptions, QueryResult } from '@google-cloud/datastore/query';

    /**
     * Creates requests to the Datastore endpoint.
     * Designed to be inherited by {@link Datastore} & {@link DatastoreTransaction}
     */
    abstract class DatastoreRequest {
        allocateIds(incompleteKey: DatastoreKey, n: number, callback: AllocateIdsCallback): void;
        allocateIds(incompleteKey: DatastoreKey, n: number): Promise<AllocateIdsResult>;

        createReadStream(keys: DatastoreKey | ReadonlyArray<DatastoreKey>,
                         options: QueryOptions): NodeJS.ReadableStream;

        delete(keyOrKeys: DatastoreKey | ReadonlyArray<DatastoreKey>, callback: CommitCallback): void;
        delete(keyOrKeys: DatastoreKey | ReadonlyArray<DatastoreKey>): Promise<CommitResult> | void;

        get(key: DatastoreKey, options: QueryOptions, callback: GetCallback<object>): void;
        get(keys: ReadonlyArray<DatastoreKey>, options: QueryOptions, callback: GetCallback<object[]>): void;
        get(key: DatastoreKey, callback: GetCallback<object>): void;
        get(keys: ReadonlyArray<DatastoreKey>, callback: GetCallback<object[]>): void;

        get(key: DatastoreKey, options?: QueryOptions): Promise<[object | undefined]>;
        get(keys: ReadonlyArray<DatastoreKey>, options?: QueryOptions): Promise<[object[]]>;

        runQuery(query: Query, options: QueryOptions, callback: QueryCallback): void;
        runQuery(query: Query, callback: QueryCallback): void;
        runQuery(query: Query, options?: QueryOptions): Promise<QueryResult>;

        runQueryStream(query: Query, options?: QueryOptions): NodeJS.ReadableStream;

        save(entities: OneOrMany<object>, callback: CommitCallback): void;
        save(entities: OneOrMany<object>): Promise<CommitResult> | void;

        insert(entities: OneOrMany<object>, callback: CommitCallback): void;
        insert(entities: OneOrMany<object>): Promise<CommitResult>;

        update(entities: OneOrMany<object>, callback: CommitCallback): void;
        update(entities: OneOrMany<object>): Promise<CommitResult>;

        upsert(entities: OneOrMany<object>, callback: CommitCallback): void;
        upsert(entities: OneOrMany<object>): Promise<CommitResult>;
    }

    interface MutationResult {
        key: DatastoreKey;
        conflictDetected: boolean;
        version: number;
    }

    interface CommitResponse {
        mutationResults: MutationResult[];
        indexUpdates: number;
    }

    type CommitCallback = (err: Error, result: CommitResponse) => void;
    type CommitResult = [CommitResponse];

    type GetCallback<T> = (err: Error, entity: T) => void;

    type AllocateIdsCallback = (err: Error, keys: DatastoreKey[]) => void;
    type AllocateIdsResult = [DatastoreKey[]];
}

/// <reference types="node" />
declare module "@google-cloud/datastore/request" {
    import { DatastoreKey, OneOrMany } from "@google-cloud/datastore/entity";
    import Query = require("@google-cloud/datastore/query");
    import QueryOptions = Query.QueryOptions;
    import QueryCallback = Query.QueryCallback;
    import QueryResult = Query.QueryResult;
    import CommitCallback = DatastoreRequest.CommitCallback;
    import CommitResult = DatastoreRequest.CommitResult;


    export = DatastoreRequest;


    abstract class DatastoreRequest {
        allocateIds(incompleteKey: DatastoreKey, n: number, callback: DatastoreRequest.AllocateIdsCallback): void;
        allocateIds(incompleteKey: DatastoreKey, n: number): Promise<DatastoreRequest.AllocateIdsResult>;

        createReadStream(keys: DatastoreKey | ReadonlyArray<DatastoreKey>,
                         options: QueryOptions): NodeJS.ReadableStream;

        delete(keyOrKeys: DatastoreKey | ReadonlyArray<DatastoreKey>, callback: CommitCallback): void;
        delete(keyOrKeys: DatastoreKey | ReadonlyArray<DatastoreKey>): Promise<CommitResult> | void;

        get(key: DatastoreKey, options: QueryOptions, callback: DatastoreRequest.GetCallback<object>): void;
        get(keys: ReadonlyArray<DatastoreKey>, options: QueryOptions, callback: DatastoreRequest.GetCallback<object[]>): void;
        get(key: DatastoreKey, callback: DatastoreRequest.GetCallback<object>): void;
        get(keys: ReadonlyArray<DatastoreKey>, callback: DatastoreRequest.GetCallback<object[]>): void;

        get(key: DatastoreKey, options?: QueryOptions): Promise<[object | undefined]>;
        get(keys: ReadonlyArray<DatastoreKey>, options?: QueryOptions): Promise<[object[]]>;

        runQuery(query: Query, options: QueryOptions, callback: QueryCallback): void;
        runQuery(query: Query, callback: QueryCallback): void;
        runQuery(query: Query, options?: QueryOptions): Promise<QueryResult>;

        runQueryStream(query: Query, options?: QueryOptions): NodeJS.ReadableStream;

        save(entities: OneOrMany, callback: CommitCallback): void;
        save(entities: OneOrMany): Promise<CommitResult> | void;

        insert(entities: OneOrMany, callback: CommitCallback): void;
        insert(entities: OneOrMany): Promise<CommitResult>;

        update(entities: OneOrMany, callback: CommitCallback): void;
        update(entities: OneOrMany): Promise<CommitResult>;

        upsert(entities: OneOrMany, callback: CommitCallback): void;
        upsert(entities: OneOrMany): Promise<CommitResult>;
    }

    namespace DatastoreRequest {
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
}
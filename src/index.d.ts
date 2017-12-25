/// <reference types="node" />

import { DatastoreDouble, DatastoreGeopoint } from '@google-cloud/datastore/entity';

declare module '@google-cloud/datastore' {
    export = Datastore;

    import {
        DatastoreKey,
        KEY_SYMBOL,
        DatastoreInt,
        DatastoreDouble,
        DatastoreGeopoint,
        DatastoreKeyPath,
        DatastoreKeyOptions,
        DatastoreCoords,
        OneOrMany
    } from '@google-cloud/datastore/entity';
    import {
        DatastoreRequest as DatastoreRequest_,
        CommitCallback,
        CommitResult
    } from '@google-cloud/datastore/request';
    import {
        Query as DatastoreQuery,
        MoreResultsAfterCursor,
        MoreResultsAfterLimit,
        NoMoreResults
    } from '@google-cloud/datastore/query';
    import { DatastoreTransaction } from '@google-cloud/datastore/transaction';

    class Datastore extends DatastoreRequest_ {
        constructor(options: InitOptions);

        readonly KEY: KEY_SYMBOL;
        readonly MORE_RESULTS_AFTER_CURSOR: MoreResultsAfterCursor;
        readonly MORE_RESULTS_AFTER_LIMIT: MoreResultsAfterLimit;
        readonly NO_MORE_RESULTS: NoMoreResults;

        // tslint:disable-next-line unified-signatures (Arg is semantically different)
        createQuery(namespace: string, kind: string): DatastoreQuery;
        createQuery(kind: string): DatastoreQuery;

        save(entities: OneOrMany<object>, callback: CommitCallback): void;
        save(entities: OneOrMany<object>): Promise<CommitResult>;

        delete(keyOrKeys: DatastoreKey | ReadonlyArray<DatastoreKey>, callback: CommitCallback): void;
        delete(keyOrKeys: DatastoreKey | ReadonlyArray<DatastoreKey>): Promise<CommitResult>;

        transaction(): DatastoreTransaction;

        int(value: string | number): DatastoreInt;

        isInt(value: any): value is DatastoreInt;

        double(value: string | number): DatastoreDouble;

        isDouble(value: any): value is DatastoreDouble;

        geoPoint(coordinates: DatastoreCoords): DatastoreGeopoint;

        isGeoPoint(value: any): value is DatastoreGeopoint;

        key(pathOrOptions: DatastoreKeyPath | DatastoreKeyOptions): DatastoreKey;

        isKey(value: any): value is DatastoreKey;

        determineBaseUrl_(customApiEndpoint?: string): void;
    }

    interface InitOptions {
        apiEndpoint?: string;
        namespace?: string;
        projectId?: string;
        keyFilename?: string;
        credentials?: object;
    }

    namespace Datastore {
        const KEY: KEY_SYMBOL;
        const MORE_RESULTS_AFTER_CURSOR: MoreResultsAfterCursor;
        const MORE_RESULTS_AFTER_LIMIT: MoreResultsAfterLimit;
        const NO_MORE_RESULTS: NoMoreResults;

        const Query: typeof DatastoreQuery;
        const DatastoreRequest: typeof DatastoreRequest_;
        const Transaction: typeof DatastoreTransaction;
    }
}

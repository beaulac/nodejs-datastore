/// <reference types="node" />
/// <reference path="./query.d.ts" />
/// <reference path="./request.d.ts" />
declare module "@google-cloud/datastore" {
    import {
        DatastoreCoords,
        DatastoreDouble,
        DatastoreGeopoint,
        DatastoreInt,
        DatastoreKey,
        DatastoreKeyOptions,
        DatastoreKeyPath,
        KEY_SYMBOL,
        OneOrMany
    } from '@google-cloud/datastore/entity';
    import * as DatastoreRequest from '@google-cloud/datastore/request';
    import * as Query from '@google-cloud/datastore/query';
    import * as DatastoreTransaction from '@google-cloud/datastore/transaction';


    export = Datastore;


    class Datastore extends DatastoreRequest {
        constructor(options: DatastoreOptions);

        KEY: typeof KEY_SYMBOL;
        static readonly KEY: typeof KEY_SYMBOL;

        MORE_RESULTS_AFTER_CURSOR: Query.MoreResultsAfterCursor;
        static MORE_RESULTS_AFTER_CURSOR: Query.MoreResultsAfterCursor;

        MORE_RESULTS_AFTER_LIMIT: Query.MoreResultsAfterLimit;
        static MORE_RESULTS_AFTER_LIMIT: Query.MoreResultsAfterLimit;

        NO_MORE_RESULTS: Query.NoMoreResults;
        static NO_MORE_RESULTS: Query.NoMoreResults;

        static Query: typeof Query;
        static DatastoreRequest: typeof DatastoreRequest;
        static Transaction: typeof DatastoreTransaction;

        // tslint:disable-next-line unified-signatures (Arg is semantically different)
        createQuery(namespace: string, kind: string): Query;
        createQuery(kind: string): Query;

        save(entities: OneOrMany, callback: DatastoreRequest.CommitCallback): void;
        save(entities: OneOrMany): Promise<DatastoreRequest.CommitResult>;

        delete(keyOrKeys: DatastoreKey | ReadonlyArray<DatastoreKey>, callback: DatastoreRequest.CommitCallback): void;
        delete(keyOrKeys: DatastoreKey | ReadonlyArray<DatastoreKey>): Promise<DatastoreRequest.CommitResult>;

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

    interface DatastoreOptions {
        apiEndpoint?: string;
        namespace?: string;
        projectId?: string;
        keyFilename?: string;
        credentials?: object;
    }
}
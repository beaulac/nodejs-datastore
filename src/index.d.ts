/// <reference types="node" />
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
} from './entity';
import { CommitCallback, CommitResult, DatastoreRequest } from './request';
import { MoreResultsAfterCursor, MoreResultsAfterLimit, NoMoreResults, Query as DatastoreQuery } from './query';
import { DatastoreTransaction } from './transaction';


export = Datastore;


declare class Datastore extends DatastoreRequest {
    constructor(options: DatastoreOptions);

    KEY: typeof KEY_SYMBOL;
    static readonly KEY: typeof KEY_SYMBOL;

    MORE_RESULTS_AFTER_CURSOR: MoreResultsAfterCursor;
    static MORE_RESULTS_AFTER_CURSOR: MoreResultsAfterCursor;

    MORE_RESULTS_AFTER_LIMIT: MoreResultsAfterLimit;
    static MORE_RESULTS_AFTER_LIMIT: MoreResultsAfterLimit;

    NO_MORE_RESULTS: NoMoreResults;
    static NO_MORE_RESULTS: NoMoreResults;

    static Query: typeof DatastoreQuery;
    static DatastoreRequest: typeof DatastoreRequest;
    static Transaction: typeof DatastoreTransaction;

    // tslint:disable-next-line unified-signatures (Arg is semantically different)
    createQuery(namespace: string, kind: string): DatastoreQuery;
    createQuery(kind: string): DatastoreQuery;

    save(entities: OneOrMany, callback: CommitCallback): void;
    save(entities: OneOrMany): Promise<CommitResult>;

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

interface DatastoreOptions {
    apiEndpoint?: string;
    namespace?: string;
    projectId?: string;
    keyFilename?: string;
    credentials?: object;
}

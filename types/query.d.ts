/// <reference types="node" />
import { DatastoreKey } from './entity';
import * as DatastoreRequest from './request';


export = Query;


declare class Query {
    scope: DatastoreRequest;
    kinds: string;
    namespace?: string;

    constructor(scope: DatastoreRequest, kinds: string, namespace: string);

    filter(property: string, operator: Query.QueryFilterOperator, value: any): this;
    filter(property: string, value: any): this;

    hasAncestor(key: DatastoreKey): this;

    order(property: string, options?: Query.OrderOptions): this;

    groupBy(properties: string | ReadonlyArray<string>): this;

    select(properties: string | ReadonlyArray<string>): this;

    start(cursorToken: string): this;

    end(cursorToken: string): this;

    limit(n: number): this;

    offset(n: number): this;

    run(callback: Query.QueryCallback): void;
    run(options: Query.QueryOptions, callback: Query.QueryCallback): void;
    run(options?: Query.QueryOptions): Promise<Query.QueryResult>;

    runStream(): NodeJS.ReadableStream;
}

declare namespace Query {
    type QueryFilterOperator = '<' | '<=' | '=' | '>=' | '>';

    interface OrderOptions {
        descending?: boolean;
    }

    interface QueryOptions {
        consistency?: 'strong' | 'eventual';
        maxApiCalls?: number;
    }

    type MoreResultsAfterCursor = 'MORE_RESULTS_AFTER_CURSOR';
    type MoreResultsAfterLimit = 'MORE_RESULTS_AFTER_LIMIT';
    type NoMoreResults = 'NO_MORE_RESULTS';

    interface QueryInfo {
        endCursor?: string;
        readonly moreResults: MoreResultsAfterCursor | MoreResultsAfterLimit | NoMoreResults;
    }

    type QueryCallback = (err: Error, entities: object[], info: QueryInfo) => void;
    type QueryResult = [object[], QueryInfo];
}


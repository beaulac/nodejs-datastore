declare module '@google-cloud/datastore/query' {
    import { DatastoreKey } from '@google-cloud/datastore/entity';

    type MoreResultsAfterCursor = 'MORE_RESULTS_AFTER_CURSOR';
    type MoreResultsAfterLimit = 'MORE_RESULTS_AFTER_LIMIT';
    type NoMoreResults = 'NO_MORE_RESULTS';

    class Query {
        constructor(scope: string, kinds: string, namespace: string);

        filter(property: string, operator: QueryFilterOperator, value: any): this;
        filter(property: string, value: any): this;

        hasAncestor(key: DatastoreKey): this;

        order(property: string, options?: OrderOptions): this;

        groupBy(properties: string | ReadonlyArray<string>): this;

        select(properties: string | ReadonlyArray<string>): this;

        start(cursorToken: string): this;

        end(cursorToken: string): this;

        limit(n: number): this;

        offset(n: number): this;

        run(callback: QueryCallback): void;
        run(options: QueryOptions, callback: QueryCallback): void;
        run(options?: QueryOptions): Promise<QueryResult>;

        runStream(): NodeJS.ReadableStream;
    }

    type QueryFilterOperator = '<' | '<=' | '=' | '>=' | '>';

    interface OrderOptions {
        descending: boolean;
    }

    interface QueryOptions {
        consistency?: 'strong' | 'eventual';
        maxApiCalls?: number;
    }

    interface QueryInfo {
        endCursor?: string;
        readonly moreResults: MoreResultsAfterCursor | MoreResultsAfterLimit | NoMoreResults;
    }

    type QueryCallback = (err: Error, entities: object[], info: QueryInfo) => void;
    type QueryResult = [object[], QueryInfo];
}

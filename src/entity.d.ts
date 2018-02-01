declare module '@google-cloud/datastore/entity' {
    interface DatastoreInt {
        value: string;
    }

    interface DatastoreDouble {
        value: string;
    }

    interface DatastoreCoords {
        latitude: number;
        longitude: number;
    }

    interface DatastoreGeopoint {
        value: DatastoreCoords;
    }

    /**
     * DatastoreKeyPath is structured as [kind, identifier, kind, identifier, ...]
     * `kind` must be a string, `identifier` is a PathElement
     */
    type PathElement = string | number | DatastoreInt;
    type DatastoreKeyPath = PathElement[];

    interface DatastoreKeyOptions {
        namespace?: string;
        path: ReadonlyArray<PathElement>;
    }

    class DatastoreKey {
        constructor(options: DatastoreKeyOptions);

        kind: string;
        id?: string;
        name?: string;

        readonly path: DatastoreKeyPath;

        parent?: DatastoreKey;

        namespace: string;
    }

    type KEY_SYMBOL = symbol;

    interface DatastorePayload<T> {
        key: DatastoreKey;
        data: T | EntityDataProperty[];
        excludeFromIndexes?: string[];
    }

    interface EntityDataProperty {
        name: string;
        value: any;
        excludeFromIndexes?: boolean;
    }

    /**
     * NB: TS does not support computed symbol keys (yet: https://github.com/Microsoft/TypeScript/pull/15473)
     * If using a raw T object, it MUST have a {@link Datastore_#KEY} symbol property of type {@link DatastoreKey}.
     */
    type ObjOrPayload<T> = T | DatastorePayload<T>;
    type OneOrMany<T = object> = ObjOrPayload<T> | Array<ObjOrPayload<T>>;
}

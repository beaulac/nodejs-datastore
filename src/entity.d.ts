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

    type PathElement = string | number | DatastoreInt;

    /**
     * DatastoreKeyPath is structured as [kind, identifier, kind, identifier, ...]
     * `kind` must be a string, `identifier` is a PathElement
     */
    type DatastoreKeyPath = PathElement[];

    interface DatastoreKeyOptions {
        namespace?: string;
        path: DatastoreKeyPath;
    }

    interface DatastoreKey {
        kind: string;
        id?: string;
        name?: string;

        readonly path: DatastoreKeyPath;

        parent?: DatastoreKey;
    }

    type KEY_SYMBOL = symbol;

    interface DatastorePayload<T> {
        key: DatastoreKey;
        // TODO Include possibility of 'raw data' with indexing options, etc
        data: T | object;
        excludeFromIndexes?: string[];
    }

    /**
     * NB: TS does not support computed symbol keys (yet: https://github.com/Microsoft/TypeScript/pull/15473)
     * If using a raw T object, it MUST have a {@link Datastore_#KEY} symbol property of type {@link DatastoreKey}.
     */
    type ObjOrPayload<T> = T | DatastorePayload<T>;
    type OneOrMany<T> = ObjOrPayload<T> | Array<ObjOrPayload<T>>;
}

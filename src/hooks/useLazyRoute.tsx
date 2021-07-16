import { lazy, LazyExoticComponent, useCallback, useState } from 'react';
import { routeType } from '../App';

export enum DEFERRED_IMPORT_STATUS {
    LAZY,
    FINISHED,
    ENABLED,
}

export type lazyComponent = LazyExoticComponent<any>;

export const useLazyRoute = (route: routeType): void => {
    const [state, setState] = useState(init);

    const enableComponent = useCallback(() => {
        if (state.status === DEFERRED_IMPORT_STATUS.FINISHED) {
            setState((prev) => ({
                ...prev,
                status: DEFERRED_IMPORT_STATUS.ENABLED,
            }));
            state.deferred.resolve();
        }
    }, [state]);

    route.component = state.DeferredComponent;
    route.hasImportFinished = state.status === DEFERRED_IMPORT_STATUS.FINISHED;
    route.enableComponent = enableComponent;
    return;

    function init() {
        const deferred: {
            resolve: (value: void | PromiseLike<void>) => void;
            promise: Promise<void>;
        } = (function deferPromise() {
            let resolve: (value: void | PromiseLike<void>) => void;
            const promise = new Promise<void>((_resolve) => {
                resolve = _resolve;
            });
            // deliberate ignore
            // @ts-ignore
            return { resolve, promise };
        })();
        const DeferredComponent = lazy(() => {
            return Promise.all([
                route.module().then((imp) => {
                    setState((prev) => ({
                        ...prev,
                        status: DEFERRED_IMPORT_STATUS.FINISHED,
                    }));
                    return imp;
                }),
                deferred.promise,
                ...route.relatedMedia,
            ]).then(([imp]) => imp);
        });

        return {
            status: DEFERRED_IMPORT_STATUS.LAZY,
            DeferredComponent,
            deferred,
        };
    }
};

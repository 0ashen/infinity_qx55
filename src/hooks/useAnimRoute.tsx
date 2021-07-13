import React, { lazy, useCallback, useState } from 'react';
import { ReactLazyPreloadReturnType } from '../utils/reactLazyPreload';
import { RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';

export enum DEFERRED_IMPORT_STATUS {
    LAZY,
    FINISHED,
    ENABLED,
}

type lazyComponent = React.LazyExoticComponent<
    React.VoidFunctionComponent<
        RouteComponentProps<any, StaticContext, unknown>
    >
>;
type hasImportWasFinished = boolean;
type enableComponent = () => void;

export type useAnimRouteReturnType = [
    lazyComponent,
    hasImportWasFinished,
    enableComponent,
];

export const useAnimRoute = (
    lazyComponent: ReactLazyPreloadReturnType,
): useAnimRouteReturnType => {
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

    return [
        state.DeferredComponent,
        state.status === DEFERRED_IMPORT_STATUS.FINISHED,
        enableComponent,
    ];

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
        const DeferredComponent = lazy(() =>
            Promise.all([
                lazyComponent.preload().then((imp) => {
                    setState((prev) => ({
                        ...prev,
                        status: DEFERRED_IMPORT_STATUS.FINISHED,
                    }));
                    return imp;
                }),
                deferred.promise,
            ]).then(([imp]) => imp),
        );

        return {
            status: DEFERRED_IMPORT_STATUS.LAZY,
            DeferredComponent,
            deferred,
        };
    }
};

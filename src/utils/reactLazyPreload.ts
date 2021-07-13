import React, {
    ComponentPropsWithRef,
    ExoticComponent,
    VoidFunctionComponent,
} from 'react';
import { RouteComponentProps } from 'react-router-dom';

export type ReactLazyPreloadReturnType = ExoticComponent<
    ComponentPropsWithRef<VoidFunctionComponent<RouteComponentProps<any>>>
> & { readonly _result: VoidFunctionComponent<RouteComponentProps<any>> } & {
    preload: () => Promise<{
        default: VoidFunctionComponent<RouteComponentProps<any>>;
    }>;
};

export const ReactLazyPreload = (
    importStatement: () => Promise<{
        default: VoidFunctionComponent<RouteComponentProps<any>>;
    }>,
): ReactLazyPreloadReturnType => {
    const Component = React.lazy(importStatement);
    return Object.assign(Component, {
        preload: importStatement,
    });
};

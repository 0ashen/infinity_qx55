import { VFC } from 'react';

export type LoadSpinnerType = VFC<{
    hasImportFinished?: boolean;
    enableComponent?: () => void;
}>;

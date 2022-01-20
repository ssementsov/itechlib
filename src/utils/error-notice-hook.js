import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

export const useErrorNotice = () => {
    const { enqueueSnackbar } = useSnackbar();

    const setMainError = useCallback(() => {
        enqueueSnackbar('Something went wrong... Please retry.', {
            variant: 'error',
        });
    }, [enqueueSnackbar]);

    return [setMainError];
};

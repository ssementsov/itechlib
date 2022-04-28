import React, { useState } from 'react';
import { Button } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useTheme } from '@mui/material/styles';
import { useBoolean } from '../../../utils/boolean-hook';

export const SortButton = (props) => {
    const { title } = props;
    let theme = useTheme();
    const [isDescending, setIsDescending, setNotIsDescending] = useBoolean(true);
    const [isTurnedOffSort, setIsTurnedOffSort] = useState(true);

    const getSortDirection = () => {
        if (isDescending && isTurnedOffSort) {
            setNotIsDescending();
            setIsTurnedOffSort(false);
        } else if (!isDescending && !isTurnedOffSort) {
            setIsDescending();
        } else if (isDescending && !isTurnedOffSort) {
            setIsDescending();
            setIsTurnedOffSort(true);
        }
    };

    return (
        <Button
            onClick={getSortDirection}
            sx={{
                color: 'text.secondary',
                fontSize: '1rem',
                fontWeight: 400,
            }}
            endIcon={
                isDescending ? (
                    <ArrowDownwardIcon
                        sx={isTurnedOffSort ? null : { color: theme.palette.primary.main }}
                    />
                ) : (
                    <ArrowUpwardIcon
                        sx={isTurnedOffSort ? null : { color: theme.palette.primary.main }}
                    />
                )
            }
        >
            {title}
        </Button>
    );
};

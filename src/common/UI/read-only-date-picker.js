import DatePicker from '@mui/lab/DatePicker';
import { TextField } from '@mui/material';
import React, { useState } from 'react';

export const ReadOnlyDatePicker = (props) => {
    const { datePickerProps, textFieldProps, onChange } = props;
    const { disabled } = datePickerProps;
    const [isOpen, setOpen] = useState(false);

    return (
        <DatePicker
            open={isOpen}
            onChange={(value) => {
                setOpen(false);
                onChange(value);
            }}
            inputProps={{ readOnly: true }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    onClick={() => {
                        !disabled && setOpen(true);
                    }}
                    inputProps={{
                        ...params.inputProps,
                        placeholder: '',
                    }}
                    {...textFieldProps}
                />
            )}
            {...datePickerProps}
        />
    );
};
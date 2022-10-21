import { TextField } from '@mui/material';

export const StyledTextField = (props) => {
    const { children, ...rest } = props;
    return (
        <TextField fullWidth margin='dense' name='title' variant='outlined' {...rest}>
            {children}
        </TextField>
    );
};
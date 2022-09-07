import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getFormatedDate } from '../../../utils/functions/get-formated-date';

export const PendingAcceptanceMessage = (props) => {
    const {startDate, finishDate} = props;
    const theme = useTheme();
    const formatedStartDate = getFormatedDate(startDate);
    const formatedFinishDate = getFormatedDate(finishDate);

    return(
        <Box sx={{
            backgroundColor: theme.palette.primary.light,
            left: '30%',
            transform: 'translateX(calc(-30% + 96px)) translateY(-120%)',
            padding: '10px',
            borderRadius: '8px',
            fontWeight: 700,
            position: 'absolute',
            [theme.breakpoints.down('sm')]: {
                transform: 'translateX(0) translateY(-120%)',
                left: '96px',
            },
        }}>
            {`You have a request to accept the book from ${formatedStartDate} till ${formatedFinishDate}`}
        </Box>
    )
}
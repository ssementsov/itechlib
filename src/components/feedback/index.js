import { Box, Grid, Divider, Typography } from '@mui/material';
import { format } from 'date-fns';

function Feedback(props) {
    const { author, text, date } = props;
    const newFormatDate = format(new Date(date), 'MM.dd.yyyy');

    return (
        <Box
            component="div"
            sx={{
                pt: 3,
                pb: 2,
                overflow: 'hidden',
            }}
        >
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <Typography variant="h6">{author}</Typography>
                </Grid>
                <Grid
                    container
                    direction="row"
                    item
                    justifyContent="space-between"
                    spacing={2}
                >
                    <Grid item md={10} xs={9}>
                        <Typography varian="body1" color="textSecondary">
                            {text}
                        </Typography>
                    </Grid>
                    <Grid item md={2} xs={3} alignSelf="flex-end">
                        <Typography
                            varian="body1"
                            color="textSecondary"
                            textAlign="right"
                        >
                            {newFormatDate}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Divider />
        </Box>
    );
}

export default Feedback;

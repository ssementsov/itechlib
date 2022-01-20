import { Box, Grid, Divider, Typography } from "@mui/material";

function Feedback(props) {
   const { author, text } = props;
   return (
      <Box
         component="div"
         sx={{
            pt: 3,
            pb: 2,
            overflow: "hidden",
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
               <Grid item xs={9}>
                  <Typography varian="body1" color="textSecondary">
                     {text}
                  </Typography>
               </Grid>
               <Grid item xs={3} alignSelf="flex-end">
                  <Typography
                     varian="body1"
                     color="textSecondary"
                     textAlign="right"
                  >
                     {"20.20.20"}
                  </Typography>
               </Grid>
            </Grid>
         </Grid>
         <Divider />
      </Box>
   );
}

export default Feedback;

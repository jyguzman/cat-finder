import React from 'react';
import { makeStyles, withStyles, Grid, Box, Typography } from '@material-ui/core';

import Rating from '@material-ui/lab/Rating';
import PetsIcon from '@material-ui/icons/Pets';

const useStyles = makeStyles((theme) => ({
    typography: {
        textAlign: "center"
    },
}));

const StyledRating = withStyles({
    iconFilled: {
      color: '#00008B',
    }
})(Rating);

const StatRating = (props) => {
    const classes = useStyles();
    const rating = props.value;
    return (
        <Grid item container direction="column" justify="center">
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography className={classes.typography} component="legend">{props.stat}</Typography>
                <StyledRating
                name="customized-empty"
                defaultValue={props.value}
                size="large"
                readOnly
                icon={<PetsIcon />}
                />
            </Box>
        </Grid>
    );
}

export default StatRating;
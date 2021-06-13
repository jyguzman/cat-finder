import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles, Grid, Box, Typography, Paper } from '@material-ui/core';

import Rating from '@material-ui/lab/Rating';
import PetsIcon from '@material-ui/icons/Pets';

const useStyles = makeStyles((theme) => ({
    typography: {
    },
    paper: {
        padding: 5,
        display: "inline-block"
    }, 
}));

const StyledRating = withStyles({
    iconFilled: {
      color: '#00008B',
    }
})(Rating);

const Filter = (props) => {
    const classes = useStyles();
    const filter = props.filter;
    const [rating, setRating] = useState(props.rating);
    const reset = props.reset;

    useEffect(() => {
        if (reset)
            setRating(0);
    }, [reset]);
        
    return (    
        <Grid item container direction="column" justify="center">
            <Box component="fieldset" mb={3} borderColor="transparent">
                    <Grid item container direction="column">
                        <Grid item>
                            <Typography className={classes.typography} component="legend">{props.stat}</Typography>
                        </Grid>
                        <Grid item>
                        <Paper className={classes.paper} elevation={1}>
                            <StyledRating
                                name={filter}
                                value={rating || 0}
                                size="large"
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                    props.updateFilter({ [props.filter] : newValue });
                                }}
                                icon={<PetsIcon />}
                            />
                        </Paper>
                        </Grid>
                    </Grid>
            </Box>
        </Grid>
    );
}

export default Filter;


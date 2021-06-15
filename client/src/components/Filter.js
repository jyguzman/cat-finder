import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles, Grid, Box, Typography, Paper, Button, ButtonGroup} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import PetsIcon from '@material-ui/icons/Pets';

const useStyles = makeStyles((theme) => ({
    typography: {
    },
    paper: {
        padding: 5,
        display: "inline-block"
    }, 
    paper2: {
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
    },
    button: {
        display: "flex",
        justifyContent: "center",
        cursor: "pointer"
    }
}));

const StyledRating = withStyles({
    iconFilled: {
      color: '#00008B',
    },
    iconHover: {
      color: '#00008B',

    }
})(Rating);

const Filter = (props) => {
    const classes = useStyles();
    const filters = props.filters;
    const filter = props.filter;
    console.log(filters);
    console.log(filter);
    let levels = []; 
    if (filters[filter] != null) levels = filters[filter];
    const [rating, setRating] = useState(props.rating);
    const reset = props.reset;
    const reset2 = props.reset2;
    const [clicked1, setClicked1] = useState(levels.includes("low"));
    const [clicked2, setClicked2] = useState(levels.includes("moderate"));
    const [clicked3, setClicked3] = useState(levels.includes("high")); 
    const [clicked, setClicked] = useState([false, false, false]);

    const handleClick = (num) => {
        if (num === 1) 
            setClicked1(clicked1 => !(clicked1));
        if (num === 2)
            setClicked2(clicked2 => !(clicked2));
        if (num === 3)
            setClicked3(clicked3 => !(clicked3));
    }

    /*useEffect(() => {
        if (reset)
            setRating(0);
    }, [reset]);*/

    useEffect(() => {
        if (reset2) {
            setClicked1(false);
            setClicked2(false);
            setClicked3(false);
        }
    }, [reset2]);
        
    return (    
        <Grid item container direction="column" justify="center">
            <Box component="fieldset" mb={3} borderColor="transparent">
                    <Grid item container direction="column">
                        <Grid item>
                            <Typography className={classes.typography} component="legend">{props.stat}</Typography>
                        </Grid>
                        <Grid item container justify="center" alignItems="center">
                            <ButtonGroup>
                                <Button variant="contained" color={clicked1 ? "primary" : "default"} 
                                    onClick={() => {props.updateFilter2(filter, "low"); handleClick(1)} }>Low</Button>
                                <Button variant="contained" color={clicked2 ? "primary" : "default"} 
                                    onClick={() => {props.updateFilter2(filter, "moderate"); handleClick(2)} }>Moderate</Button>
                                <Button variant="contained" color={clicked3 ? "primary" : "default"} 
                                    onClick={() => {props.updateFilter2(filter, "high"); handleClick(3)} }>High</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
            </Box>
        </Grid>
    );
}

/*<ButtonGroup>
                                <Button variant="contained" color={clicked1 ? "primary" : "default"} 
                                    onClick={() => {props.updateFilter(filter, "low"); handleClick(1)} }>Low</Button>
                                <Button variant="contained" color={clicked2 ? "primary" : "default"} 
                                    onClick={() => {props.updateFilter(filter, "moderate"); handleClick(2)} }>Moderate</Button>
                                <Button variant="contained" color={clicked3 ? "primary" : "default"} 
                                    onClick={() => {props.updateFilter(filter, "high"); handleClick(3)} }>High</Button>
                            </ButtonGroup>*/
/*
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
*/

export default Filter;


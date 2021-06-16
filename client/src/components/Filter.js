import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Button, ButtonGroup} from '@material-ui/core';

const Filter = (props) => {
    const filters = props.filters; const filter = props.filter;
    let levels = []; 
    if (filters[filter] != null) levels = filters[filter];
    const reset = props.reset;
    const [clicked1, setClicked1] = useState(levels.includes("low"));
    const [clicked2, setClicked2] = useState(levels.includes("moderate"));
    const [clicked3, setClicked3] = useState(levels.includes("high")); 

    const handleClick = (num) => {
        if (num === 1) setClicked1(clicked1 => !(clicked1));
        if (num === 2) setClicked2(clicked2 => !(clicked2));
        if (num === 3) setClicked3(clicked3 => !(clicked3));
    }

    useEffect(() => {
        if (reset) {
            setClicked1(false); setClicked2(false); setClicked3(false);
        }
    }, [reset]);
        
    return (    
        <Grid item container direction="column" justify="center">
            <Box component="fieldset" mb={3} borderColor="transparent">
                    <Grid item container direction="column">
                        <Grid item>
                            <Typography component="legend">{props.stat}</Typography>
                        </Grid>
                        <Grid item container justify="center" alignItems="center">
                            <ButtonGroup>
                                <Button variant="contained" color={clicked1 ? "primary" : "default"} 
                                    onClick={() => {props.updateFilters(filter, "low"); handleClick(1)} }>Low</Button>
                                <Button variant="contained" color={clicked2 ? "primary" : "default"} 
                                    onClick={() => {props.updateFilters(filter, "moderate"); handleClick(2)} }>Moderate</Button>
                                <Button variant="contained" color={clicked3 ? "primary" : "default"} 
                                    onClick={() => {props.updateFilters(filter, "high"); handleClick(3)} }>High</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
            </Box>
        </Grid>
    );
}
export default Filter;


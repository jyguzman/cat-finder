import React from 'react';
import { Button, Grid } from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import { useHistory } from 'react-router-dom';

const LearnMoreButton = (props) => {
    const history = useHistory();
    const handleClick = () => {
        history.push("/"+ props.cat.name);
    }

    return (
        <Grid container justify="center">
            <Button variant="contained" 
                color="primary" 
                startIcon={<PetsIcon />}
                onClick={handleClick}>
                Learn More
            </Button>
        </Grid>
    );
}

export default LearnMoreButton;
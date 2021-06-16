import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import StatList from './StatList';

const useStyles = makeStyles((theme) => ({
    list: {
        paddingLeft: "20px",
        maxWidth: "320px",
    },
}));

const CatStats = (props) => {
    const cat = props.cat;
    const classes = useStyles();
    return (
        <Grid item container direction="row" justify="center" className={classes.list}>
            <StatList key="1" stats={[
                {"Vocalization": cat.vocalisation}, 
                {"Energy Level" : cat.energy_level},
                {"Intelligence" : cat.intelligence},
                {"Affection Level" : cat.affection_level}
            ]} />
            <StatList key="2" stats={[
                {"Friendliness with Dogs": cat.dog_friendly}, 
                {"Friendliness with Children" : cat.child_friendly},
                {"Friendliness with Strangers" : cat.stranger_friendly},
                {"Grooming Required" : cat.grooming},
            ]} />
        </Grid>
    );
}

export default CatStats;
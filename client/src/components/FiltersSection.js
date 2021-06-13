import React from 'react';
import Filter from './Filter';

import { makeStyles, Grid, Container, Button, Typography} from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        display: "flex",
        justifyContent: "space-between"
    },
    typography: {
        paddingBottom: "15px"
    },
    button: {
        marginBottom: "25px"
    }
});

const FiltersSection = (props) => {
    const classes = useStyles();
    let filters = props.filters;
    return (
        <Container >
            <Typography className={classes.typography} variant="h4">Filter Breeds</Typography>
            <Grid container spacing={1} justify="center" alignItems="center">
                <Grid container item xs={12} sm={6} md={4} lg={4} justify="center" alignItems="center">
                    <Filter reset={props.reset} updateFilter={props.updateFilter} stat={"Energy Level"} filter={"energy_level"} 
                        rating={Object.keys(filters).length === 0 ? 0 : filters["energy_level"]} />
                        
                        <Filter reset={props.reset} updateFilter={props.updateFilter} stat={"Affection Level"} filter={"affection_level"} 
                        rating={Object.keys(filters).length === 0 ? 0 : filters["affection_level"]} />
                </Grid>

                <Grid container item xs={12} sm={6} md={4} lg={4}>
                        <Filter reset={props.reset} updateFilter={props.updateFilter} stat={"Grooming Requirements"} filter={"grooming"} 
                        rating={Object.keys(filters).length === 0 ? 0 : filters["grooming"]} />
                        <Filter reset={props.reset} updateFilter={props.updateFilter} stat={"Vocality"} filter={"vocalisation"} 
                        rating={Object.keys(filters).length === 0 ? 0 : filters["vocalisation"]} />
                </Grid>

                <Grid container item xs={12} sm={6} md={4} lg={4}>
                        <Filter reset={props.reset} updateFilter={props.updateFilter} stat={"Friendliness with Children"} filter={"child_friendly"} 
                        rating={Object.keys(filters).length === 0 ? 0 : filters["child_friendly"]} />
                        <Filter reset={props.reset} updateFilter={props.updateFilter} stat={"Friendliness with Dogs"} filter={"dog_friendly"} 
                        rating={Object.keys(filters).length === 0 ? 0 : filters["dog_friendly"]} />
                </Grid>
            </Grid>
            <Button className={classes.button} color="primary" variant="contained" onClick={props.resetFilters}>Reset Filters</Button>
        </Container>
    );
}

export default FiltersSection;
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
                    <Filter reset2={props.reset} updateFilters={props.updateFilters} stat={"Energy Level"} filter={"energy_level"} filters={filters} />
                    <Filter reset2={props.reset} updateFilters={props.updateFilters} stat={"Affection Level"} filter={"affection_level"} filters={filters} />
                </Grid>

                <Grid container item xs={12} sm={6} md={4} lg={4}>
                        <Filter reset2={props.reset} updateFilters={props.updateFilters} stat={"Grooming Requirements"} filter={"grooming"} filters={filters }/>
                        <Filter reset2={props.reset} updateFilters={props.updateFilters} stat={"Vocality"} filter={"vocalisation"} filters={filters} />
                </Grid>

                <Grid container item xs={12} sm={6} md={4} lg={4}>
                        <Filter reset2={props.reset} updateFilters={props.updateFilters} stat={"Friendliness with Children"} filter={"child_friendly"} filters={filters}  />
                        <Filter reset2={props.reset}  updateFilters={props.updateFilters} stat={"Friendliness with Dogs"} filter={"dog_friendly"} filters={filters} />
                </Grid>
            </Grid>
            <Button className={classes.button} color="primary" variant="contained" onClick={props.resetFilters}>Reset Filters</Button>
        </Container>
    );
}

export default FiltersSection;
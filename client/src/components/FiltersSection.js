import React , { useState } from 'react';
import Filter from './Filter';
import { makeStyles, Grid, Button, Typography} from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles({
    container: {
        display: "flex",
        justifyContent: "space-between"
    },
    typography: {
        paddingBottom: "15px"
    },
    button: {
        marginTop: "25px",
        marginBottom: "25px"
    },
    accordion: {
        boxShadow: "none",
        backgroundColor: "#F5F5F5",
        border: "none",
        "&.MuiAccordion-root::before": {
            display: 'none'
        }
    },
});

const FiltersSection = (props) => {
    const classes = useStyles();
    let filters = props.filters;
    const [moreFilters, setMoreFilters] = useState(false);

    const showMoreFilters = () => {
      setMoreFilters(prev => !prev);
    }

    return (
        <Grid container justify="center" alignItems="center">
            <Typography className={classes.typography} variant="h4">Filter Breeds</Typography>
            <Grid item container direction="column" justify="center" alignItems="center" spacing={1}>
                <Grid container item direction="row" justify="center" alignItems="center" xs={12} sm={12} md={12} lg={12} >
                    <Grid item>
                        <Filter filterCats={props.filterCats} reset={props.reset} updateFilters={props.updateFilters} stat={"Energy Level"} filter={"energy_level"} filters={filters} />
                    </Grid>
                    <Grid item>
                        <Filter filterCats={props.filterCats} reset={props.reset} updateFilters={props.updateFilters} stat={"Affection Level"} filter={"affection_level"} filters={filters} />
                    </Grid>
                    <Grid item>
                        <Filter filterCats={props.filterCats} reset={props.reset} updateFilters={props.updateFilters} stat={"Grooming Requirements"} filter={"grooming"} filters={filters }/>
                    </Grid>
                </Grid>

                <Grid item container justify="center" xs={12}>
                    <Accordion onChange={showMoreFilters} className={classes.accordion} >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography align="center">{moreFilters ? "Show Fewer Filters" : "Show More Filters"}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container item direction="row" justify="center" alignItems="center" xs={12} sm={12} md={12} lg={12}>
                                <Grid item >
                                    <Filter filterCats={props.filterCats} reset={props.reset} updateFilters={props.updateFilters} stat={"Vocality"} filter={"vocalisation"} filters={filters} />
                                </Grid>
                                <Grid item>
                                    <Filter filterCats={props.filterCats} reset={props.reset} updateFilters={props.updateFilters} stat={"Friendliness with Children"} filter={"child_friendly"} filters={filters}  />
                                </Grid>
                                <Grid item>
                                    <Filter filterCats={props.filterCats} reset={props.reset}  updateFilters={props.updateFilters} stat={"Friendliness with Dogs"} filter={"dog_friendly"} filters={filters} />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>

            </Grid>
            <Button className={classes.button} color="primary" variant="contained" onClick={props.resetFilters}>Reset Filters</Button>
        </Grid>
    );
}

export default FiltersSection;
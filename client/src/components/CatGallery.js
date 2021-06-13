import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import CatCard from './CatCard' 

const useStyles = makeStyles((theme) => ({
    container: {
    },
})); 


const CatGallery = (props) => {
    const classes = useStyles();
    const cats = props.cats;    
    const page = props.page;
    const perPage = props.perPage;

    return (
        <Container className={classes.container}>
        <Grid container justify="center" spacing={3}>
            {  
                cats.slice((page - 1) * perPage, page * perPage)
                .map((cat, index) => {
                    return (
                        <CatCard cat={cat} key={index} />
                    )
                })
            }
        </Grid> 
        </Container>
    );
}

export default CatGallery;
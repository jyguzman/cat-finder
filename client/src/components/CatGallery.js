import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import CatCard from './CatCard' 

const useStyles = makeStyles((theme) => ({
    container: {
        marginLeft: "25px"
    },
})); 


const CatGallery = (props) => {
    const classes = useStyles();
    const cats = props.cats;    
    const page = props.page;
    const perPage = props.perPage;

    return (
            <Grid container item justify="center" alignItems="center" spacing={3}>
                {  
                    cats.slice((page - 1) * perPage, page * perPage)
                    .map((cat, index) => {
                        return (
                            <CatCard cat={cat} key={index} />
                        )
                    })
                }
            </Grid> 
    );
}

export default CatGallery;
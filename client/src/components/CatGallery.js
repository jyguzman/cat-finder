import React from 'react';
import { Grid } from '@material-ui/core';
import CatCard from './CatCard' 


const CatGallery = (props) => {
    const cats = props.cats;    
    return (
        <Grid container justify="center" spacing={3}>
            {  
                cats.map((cat, index) => {
                    return (
                        <CatCard cat={cat} key={index} />
                    )
                })
            }
        </Grid> 
    );
}

export default CatGallery;
import React from 'react';
import { Grid } from '@material-ui/core';
import CatCard from './CatCard' 
import firebase from 'firebase';

const CatGallery = (props) => {
    const db = firebase.firestore();
    const cats = props.cats;    
    const page = props.page;
    const perPage = props.perPage;
    const user = props.user; 
    const favoriteBreeds = props.favoriteBreeds;

    return (
        <Grid container item justify="center" alignItems="center" spacing={3}>
            {  
                cats.slice((page - 1) * perPage, page * perPage)
                .map((cat, index) => {
                    return (
                        <CatCard user={user} handleLike={props.handleLike} updateFavorites={props.updateFavorites} favoriteBreeds={favoriteBreeds} cat={cat} key={index} />
                    )
                })
            }
        </Grid> 
    );
}

export default CatGallery;
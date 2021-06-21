import React from 'react';
import { Grid } from '@material-ui/core';
import CatCard from './CatCard' 
import firebase from 'firebase';

const FavoriteBreeds = (props) => {
    const db = firebase.firestore();
    const cats = props.cats;    
    const page = props.page;
    const perPage = props.perPage;
    const user = props.user; 
    const favoriteBreeds = props.favoriteBreeds;

    return (
        <Grid container item justify="center" alignItems="center" spacing={3}>
            {  
                favoriteBreeds.slice((page - 1) * perPage, page * perPage)
                .map((cat, index) => {
                    return (
                        <CatCard user={user} updateFavorites={props.updateFavorites} favoriteBreeds={favoriteBreeds} cat={cat} key={index} />
                    )
                })
            }
        </Grid> 
    );
}

export default FavoriteBreeds;
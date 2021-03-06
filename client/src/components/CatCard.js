import React, { useState }  from 'react';
import firebase from 'firebase';
import { Divider, Card, CardMedia, CardContent, CardActions, Grid, Typography, makeStyles } from '@material-ui/core';
import LearnMoreButton from './LearnMoreButton';
import FavoriteButton from './FavoriteButton';
import UnfavoriteButton from './UnfavoriteButton';

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
        borderRadius: "15px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
    },
    media: {
        maxWidth: 345,
        maxHeight: 345,
        borderRadius: "10px",
    },
});

const CatCard = (props) => {
    const db = firebase.firestore();
    const classes = useStyles();
    const cat = props.cat;
    const user = props.user;
    const isFavorited = ((user != null) && (props.favoriteBreeds != null) && props.favoriteBreeds.includes(cat.id));
    //const [favState, setFavState] = useState(isFavorited);
 
    const favorite = async () => {
        const ref = db.collection("Users").doc(user.email);
        await ref.get().then((doc) => {
            ref.update({
                favBreeds: firebase.firestore.FieldValue.arrayUnion(cat.id)
            });
        })
        .catch(err => console.log(err));
        props.updateFavorites();
    }

    const unfavorite = async () => {
        const ref = db.collection("Users").doc(user.email);
        await ref.get().then((doc) => {
            ref.update({
                favBreeds: firebase.firestore.FieldValue.arrayRemove(cat.id)
            });
        })
        .catch(err => console.log(err));
        props.updateFavorites();
    }

    return (
        <Grid item container justify="center" xs={12} sm={6} md={4} lg={4} xl={4}>
            <Card className={classes.card}>            
                <CardMedia className={classes.media}
                    component="img"
                    src={cat.image.url}
                />
                <CardContent>
                    <Typography variant="h5" paragraph gutterBottom>{cat.name}</Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>{cat.temperament}</Typography>
                </CardContent>
                <Divider variant="middle"/>
                <CardActions>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={4}>
                        <Grid item><LearnMoreButton cat={cat} /></Grid>
                        {isFavorited ? <Grid item><UnfavoriteButton handleLike={props.handleLike} favorite={favorite} unfavorite={unfavorite} user={user} /></Grid> 
                                    : <Grid item><FavoriteButton handleLike={props.handleLike} favorite={favorite} unfavorite={unfavorite} user={user} /></Grid>}
                    </Grid>
                </CardActions>
            </Card>            
        </Grid>
    );
}

export default CatCard;
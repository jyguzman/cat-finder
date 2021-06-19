import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton, Button} from "@material-ui/core";


const FavoriteButton = (props) => {
    const db = firebase.firestore();
    const cat = props.cat;
    const image = props.image;
    const [filled, setFilled] = useState(false);
    const user = props.user;

    const favorite = async () => {
        if (filled) {
            props.unfavorite();
        } else {
            props.favorite();
        }
    };

    return (
            <IconButton onClick={() => {favorite(); setFilled(prev => !prev);}}>
                {filled ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton> 
        );
}

export default FavoriteButton;
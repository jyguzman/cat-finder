import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { IconButton, Button} from "@material-ui/core";

const UnfavoriteButton = (props) => {
    const db = firebase.firestore();
    const cat = props.cat;
    const image = props.image;
    const [unfilled, setUnfilled] = useState(false);
    const user = props.user;

    const unfavorite = async () => {
        if (unfilled) {
            props.favorite();
        } else {
            props.unfavorite();
        }
    };

        return (
            <IconButton onClick={() => { unfavorite(); setUnfilled(prev => !prev);}}>
                {unfilled ? <FavoriteBorderIcon /> : <FavoriteIcon />}
            </IconButton> 
        );
}

export default UnfavoriteButton;
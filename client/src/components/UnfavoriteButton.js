import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { IconButton, Button} from "@material-ui/core";

const UnfavoriteButton = (props) => {
    const db = firebase.firestore();
    const cat = props.cat;
    const [unfilled, setUnfilled] = useState(false);
    const user = props.user;

    const handleClick = async () => {
        if (unfilled) {
            props.favorite();
        } else {
            props.unfavorite();
        }
    };

        return (
            user != null ? <IconButton onClick={() => { handleClick(); setUnfilled(prev => !prev);}}>
                {unfilled ? <FavoriteBorderIcon /> : <FavoriteIcon />}
            </IconButton> : null
        );
}

export default UnfavoriteButton;
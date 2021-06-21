import React, { useState } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Favorite from "@material-ui/icons/Favorite";
import IconButton from '@material-ui/core/IconButton';

const FavButton = (props) => {
    const [fav, setFav] = useState(false);
    const user = props.user;

    const handleClick = async () => {
        setFav(prev => !prev);
        if (fav) {
            props.favorite();
        } else {
            props.unfavorite();
        }
    };
    return (

        user != null ? (fav ? <IconButton onClick={handleClick}  aria-label="delete" color="primary">
        <FavoriteBorderIcon></FavoriteBorderIcon>
        </IconButton>
        :
        <IconButton onClick={handleClick} aria-label="delete" color="primary">
            <Favorite></Favorite>
            </IconButton>)

        : null
    );
}

export default FavButton;
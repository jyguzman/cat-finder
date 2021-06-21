import React, { useState } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton } from "@material-ui/core";


const FavoriteButton = (props) => {
    const [filled, setFilled] = useState(false);
    const user = props.user;

    const handleClick = () => {
        setFilled(prev => !prev);
        if (filled) {
            props.unfavorite();
        } else {
            props.favorite();
        }
        props.handleLike();
    };

    return (
            user != null ? <IconButton onClick={() => {handleClick(); }}>
                {filled ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton> : null
        );
}

export default FavoriteButton;
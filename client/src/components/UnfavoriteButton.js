import React, { useState } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { IconButton} from "@material-ui/core";

const UnfavoriteButton = (props) => {
    const [unfilled, setUnfilled] = useState(false);
    const user = props.user;

    const handleClick = () => {
        setUnfilled(prev => !prev);
        if (unfilled) {
            props.favorite();
        } else {
            props.unfavorite();
        }
        props.handleLike();
    };

        return (
            user != null ? <IconButton onClick={() => {  handleClick(); }}>
                {unfilled ? <FavoriteBorderIcon /> : <FavoriteIcon />}
            </IconButton> : null
        );
}

export default UnfavoriteButton;
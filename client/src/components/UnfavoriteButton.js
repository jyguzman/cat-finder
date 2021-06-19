import React, { useState } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { IconButton} from "@material-ui/core";

const UnfavoriteButton = (props) => {
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
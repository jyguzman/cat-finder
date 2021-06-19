import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';

const ShowFavoritesCheckbox = (props) => {
    const user = props.user;

    return (
        user != null ? <FormControlLabel
            onChange={props.handleShowFavorites}
            control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
            label="Include Only Favorites"
        /> : null
    );
}

export default ShowFavoritesCheckbox;
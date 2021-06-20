import React from 'react';
import { IconButton } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';

const ShowFavoritesCheckbox= (props) => {
    const user = props.user;
    const [filled, setFilled] = React.useState(props.showFavorites);
    return (
        user != null ? <IconButton onClick={() => { props.handleShowFavorites(); setFilled(prev => !prev); }}>
            {filled ? <Favorite /> : <FavoriteBorder />}
            
            </IconButton> : null
    );
    /*return (
        user != null ? <FormControlLabel
            checked={checked}
            onChange={() => { props.handleShowFavorites(); setChecked(prev => !prev); }}
            control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
            label="Include Only Favorites"
        /> : null
    );*/
}

export default ShowFavoritesCheckbox;
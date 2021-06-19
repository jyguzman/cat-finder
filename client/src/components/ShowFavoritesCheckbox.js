import React, { useState } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import { mergeClasses } from '@material-ui/styles';

const ShowFavoritesCheckbox = (props) => {
    const [checked, setChecked] = useState(false);

    return (
        <FormControlLabel
            onChange={props.handleShowFavorites}
            control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
            label="Include Only Favorites"
        />
    );
}

export default ShowFavoritesCheckbox;
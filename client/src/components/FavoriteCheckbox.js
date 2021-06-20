import React, { useEffect, useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import firebase from 'firebase';

const FavoritesCheckbox = (props) => {
    const [checked, setChecked] = useState(props.isFavorited);
    const [user, setUser] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      setUser(user);
    })
  }, []);

    return (
        user != null ? 
        <Checkbox
            onChange={(event) => {props.handleFavoriting(checked); setChecked(event.target.checked);}}
            checked={checked}
            icon={<FavoriteBorder />} 
            checkedIcon={<Favorite />} 
        /> 
        : null
    );
}

export default FavoritesCheckbox;
import React from 'react';
import { makeStyles, Autocomplete, TextField } from '@material-ui/lab/Autocomplete'; 

const useStyles = makeStyles((theme) => ({
    list: {
      border: '2px solid #fff'
    }
}));

const SearchBar = (props) => {
    const classes = useStyles();
    return (
        <Autocomplete
            className={classes.list}
            options={props.breeds}
            getOptionLabel={option => option.breedName}
            onChange={props.submitHandler}
            style={{ width: 300 }}
            renderInput={ params => 
                <TextField {...params} 
                label="Search by breed name." 
                variant="outlined"/>}
        />
    );
}

export default SearchBar;
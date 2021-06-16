import React from 'react';
import { makeStyles, Paper, Autocomplete, TextField } from '@material-ui/lab/Autocomplete'; 
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    list: {
      border: '2px solid #fff'
    }
}));

const SearchBar = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const handleChange = (value) => {
        history.push("/" + value)
    }
    return (
        <Paper>
            <Autocomplete
            className={classes.list}
            options={props.breeds}
            getOptionLabel={option => option.breedName}
            onChange={(event, value) => handleChange(value)}
            style={{ width: 300 }}
            renderInput={ params => 
                <TextField {...params} 
                label="Search by breed name." 
                variant="outlined"/>}
            />
        </Paper>
    );
}

export default SearchBar;
import React from 'react';
import { makeStyles, Paper, TextField } from '@material-ui/core'; 
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    list: {
      border: '2px solid #fff'
    },
    paper: {
        padding: 10,
        marginBottom: 25
    }
}));

const SearchBar = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const searchType = props.searchType;

    const handleChange = (value) => {
        if (searchType === "breeds") 
            history.push("/" + value);
        if (searchType === "images") {
            props.fetchImages(value['label']);
        }
        if (searchType === "gifs") {
            props.fetchGifs(value['label']);
        }
    }

    return (
        <Paper elevation={6} className={classes.paper}>
            <Autocomplete
                className={classes.list}
                options={props.options}
                getOptionLabel={(option) => option.label}
                onChange={(event, value) => handleChange(value)}
                style={{ width: 300 }}
                renderInput={ params => 
                    <TextField {...params} 
                    label={searchType === "breed" ? "Search by breed name." : "Search by category."} 
                    variant="outlined"/>}
                />
        </Paper>
    );
}

export default SearchBar;
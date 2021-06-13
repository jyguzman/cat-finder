import React from 'react'
import { makeStyles, AppBar, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    typography: {

    },
    appbar: {
        padding: "15px",
    }
});

const Header = () => {
    const classes = useStyles();
    return (
        <AppBar className={classes.appbar}>
            <Typography variant="h4" component="h4">Cats</Typography>
        </AppBar>
    );
}

export default Header;
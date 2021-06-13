import React from 'react'
import {Container, Button, Toolbar, makeStyles, AppBar, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const useStyles = makeStyles((theme) => ({
    typography: {
        marginRight: theme.spacing(5)
    },
    root: {
        flexGrow: 1,
    },
    button: {
        flexGrow: 1,
    }
}));

const Header = () => {
    const classes = useStyles();
    return (
        <Container className={classes.root}>
        <AppBar>
            <Toolbar>
                <Typography className={classes.typography} variant="h4">Cats</Typography>
                <Button className={classes.button} startIcon={<ArrowBackIcon />}>
                        Back
                    </Button>
            </Toolbar>
        </AppBar>
        </Container>
    );
}

export default Header;
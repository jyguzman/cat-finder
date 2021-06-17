import React, { useState } from 'react'
import { useMediaQuery, Grid, IconButton, Toolbar, makeStyles, AppBar, Typography, Tab, Tabs } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import NavMenu from "./NavMenu";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
    typography: {
        marginRight: theme.spacing(5),
    },
    root: {
        flexGrow: 1,
    },
    button: {
        flexGrow: 1,
    }, 
    appbar: {
        display: "flex"
    }
}));

const Header = () => {
    const classes = useStyles();

    const history = useHistory();
    const goToBreeds = () => history.push("/");
    const goToImages = () => history.push("/images");
    const goToGifs = () => history.push("/gifs");

    const smallScreen = useMediaQuery(theme => theme.breakpoints.down("sm"));
    const [open, setOpen] = useState(false);

    const handleDrawer = () => {
        //setOpen(true);
        setOpen(prev => !prev);
    };

    /*const handleDrawerClose = () => {
        setOpen(false);
    };*/
    
    return (
        <AppBar className={classes.appbar}>
            <Grid container justify="flex-start" alignItems="center">
                <Grid item>
                    <Toolbar>
                        <Typography align="center" className={classes.typography} variant="h4">Cats</Typography>
                    </Toolbar>
                </Grid>
                {smallScreen ? 
                    <Toolbar className={classes.typography}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawer}
                            edge="start"
                        >
                            <MenuIcon />
                        </IconButton>
                        <NavMenu open={open} handleDrawer={handleDrawer} /> 
                    </Toolbar>
                    :
                    <Grid item>
                        <Tabs >
                            <Tab onClick={goToBreeds} label="Breeds" />
                            <Tab onClick={goToImages} label="Images"  />
                            <Tab onClick={goToGifs} label="Gifs"  />
                        </Tabs>
                    </Grid>}
            </Grid>
        </AppBar>
    );
}

export default Header;
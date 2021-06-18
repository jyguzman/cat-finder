import React, { useState, useEffect } from 'react'
import { useMediaQuery, Grid, IconButton, Toolbar, makeStyles, AppBar, Typography, Tab, Tabs } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import NavMenu from "./NavMenu";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
    typography: {
        marginRight: theme.spacing(5),
    },
    button: {
        marginLeft: "auto"
    },
    tabs: {
        marginLeft: "auto"
    },
    appbar: {
        display: "flex"
    }
}));

const Header = (props) => {
    const classes = useStyles();
    const user = props.user;
    const history = useHistory();
    const location = useLocation();
    const goToBreeds = () => history.push("/");
    const goToImages = () => history.push("/images");
    const goToGifs = () => history.push("/gifs");
    const goToSignIn = () => history.push("/signin");
    const goToSignOut = () => history.push("/signout");

    const smallScreen = useMediaQuery(theme => theme.breakpoints.down("sm"));
    const [open, setOpen] = useState(false);
    const [tab, setTab] = useState(1);

    useEffect(() => {
        console.log("hey");
        if (location.pathname === "/")
            setTab(1);
        else if (location.pathname === "/images")
            setTab(2);
        else if (location.pathname === "/gifs")
            setTab(3);
        else if (location.pathname === "/signup" || location.pathname === "/signout")
            setTab(4);
        else setTab(1);
    });

    const handleDrawer = () => {
        setOpen(prev => !prev);
    };

    return (
        <AppBar className={classes.appbar}>
            <Toolbar>
                <Typography align="center" className={classes.typography} variant="h4">Cats</Typography>    
                {smallScreen ? 
                    <>
                        <IconButton className={classes.button}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawer}
                            edge="start"
                        >
                            <MenuIcon />
                        </IconButton>
                        <NavMenu user={user} open={open} handleDrawer={handleDrawer} /> 
                    </>
                    :
                    <Tabs value={tab} className={classes.tabs}>
                        <Tab onClick={() => { goToBreeds(); setTab(1); }} label="Breeds" value={1}/>
                        <Tab onClick={() => { goToImages(); setTab(2); }} label="Images"  value={2}/>
                        <Tab onClick={() => { goToGifs(); setTab(3); }} label="Gifs"  value={3}/>
                        {user != null ? <Tab onClick={() => { goToSignOut(); setTab(4); }} label="Sign Out"  value={4}/>
                            : <Tab onClick={() => { goToSignIn(); setTab(4); }} label="Sign In"  value={4}/>}
                    </Tabs>}
            </Toolbar>
        </AppBar>
    );
}

export default Header;
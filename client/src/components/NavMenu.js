import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, MenuItem, Button, IconButton } from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const NavMenu = (props) => {
    const history = useHistory();
    const goToBreeds = () => history.push("/");
    const goToImages = () => history.push("/images");
    const goToGifs = () => history.push("/gifs");
    const goToSignUp = () => history.push("/signup");

    const handleClick = (event) => {
        const targetText = event.currentTarget.textContent;

        if (targetText === "Breeds")
            goToBreeds();
        if (targetText === "Images")
            goToImages();
        if (targetText === "Gifs")
            goToGifs();
        if (targetText === "Sign Up")
            goToSignUp();
    }

    return (   
        <>
            <Drawer
                variant="persistent"
                anchor="left"
                open={props.open}
                >
                <IconButton onClick={props.handleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
                <List >
                    {['Breeds', 'Images', 'Gifs', 'Sign Up'].map((text, index) => (
                        <ListItem onClick={(event) => handleClick(event)} button key={text}>
                        <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}

export default NavMenu;
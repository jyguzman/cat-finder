import React from 'react';
import { useHistory } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const NavMenu = (props) => {
    const user = props.user;
    const history = useHistory();
    const goToBreeds = () => history.push("/");
    const goToImages = () => history.push("/images");
    const goToGifs = () => history.push("/gifs");
    const goToSignIn = () => history.push("/signin");
    const goToSignOut = () => history.push("/signout");

    const handleClick = (event) => {
        const targetText = event.currentTarget.textContent;
        if (targetText === "Breeds")
            goToBreeds();
        if (targetText === "Images")
            goToImages();
        if (targetText === "Gifs")
            goToGifs();
        if (targetText === "Sign In")
            goToSignIn();
        if (targetText === "Sign Out")
            goToSignOut();
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
                    {['Breeds', 'Images', 'Gifs', user != null ? 'Sign Out' : 'Sign In'].map((text, index) => (
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
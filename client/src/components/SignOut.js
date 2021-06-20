import React from 'react';
import firebase from 'firebase';
import { firebaseConfig } from '../firebase/firebase'
import { makeStyles, Paper, Typography, Button, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: "25px",
        marginTop: "25px",
        marginBottom: "25px",
    },
})); 



const handleSignOut = () => {
    firebase.auth().signOut().then(() => {}).catch(err => console.log(err));
}

const SignOut = () => {
    const classes = useStyles();
    const history = useHistory();
    const goToBreeds = () => history.push("/");

    return (
        <>
            <Paper elevation={4} className={classes.paper}>
                <Typography variant="h5">Welcome to the Cat Repawsitory!</Typography>
                <Typography varitant="body2">You can now save all of your favorite cats.</Typography>
            </Paper>
            <Grid container justify="center" spacing={4}>
                <Grid item><Button color="secondary" variant="contained" onClick={() => {handleSignOut(); goToBreeds();}}>Sign Out</Button></Grid>
                
            </Grid>
        </>
    );
}

/**<Grid item><Button color="primary" variant="contained">Favorites</Button></Grid> */
export default SignOut;
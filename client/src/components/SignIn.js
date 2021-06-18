// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { firebaseConfig } from '../firebase/firebase'
import { makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: "25px",
        marginTop: "25px",
        marginBottom: "25px",
    },
})); 


//firebase.initializeApp(firebaseConfig);

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: 'redirect',
  signInSuccessUrl: '/signout',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
};

const SignIn = () => {
    const classes = useStyles();
    return (
        <>
            <Paper elevation={4} className={classes.paper}>
                <Typography variant="h5">Sign in to the Cat Repawsitory</Typography>
                <Typography varitant="body2">to save your favorite cats and images.</Typography>
            </Paper>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </>
    );
}

export default SignIn;
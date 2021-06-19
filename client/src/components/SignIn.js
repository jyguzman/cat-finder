// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { firebaseConfig } from '../firebase/firebase'
import { makeStyles, Paper, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: "25px",
        marginTop: "25px",
        marginBottom: "25px",
    },
})); 

const SignIn = () => {
    const classes = useStyles();
    const db = firebase.firestore();
    const history = useHistory();
    const addUser = async (email) => {
        await db.collection("Users").doc(email).set( { "email": email, "favBreed": [], "favImages": [] } )
    }

    const uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                var user = authResult.user;
                var isNewUser = authResult.additionalUserInfo.isNewUser;
                if (isNewUser) {
                    addUser(user.email);
                }
                history.push("/signout");
            }
        },
        signInFlow: 'redirect',
        signInSuccessUrl: '/signout',
        signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
    };

    return (
        <>
            <Paper elevation={4} className={classes.paper}>
                <Typography variant="h5">Sign in to the Cat Repawsitory</Typography>
                <Typography varitant="body2">to save your favorite cats.</Typography>
            </Paper>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </>
    );
}

export default SignIn;
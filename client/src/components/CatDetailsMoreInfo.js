import React, { useState, useEffect } from 'react';
import { CircularProgress, Box, Divider, CardMedia, Grid, makeStyles } from '@material-ui/core';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    images: {
        paddingTop: "25px",
        paddingBottom: "15px"
    },
    media: {
        maxWidth: 350,
        maxHeight: 350,
        borderRadius: 20
    }
})); 


const CatDetailsMoreInfo = (props) => {
    const classes = useStyles();
    const cat = props.cat;

    return (
        null
    );
}

export default CatDetailsMoreInfo;
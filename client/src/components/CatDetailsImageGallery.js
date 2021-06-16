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


const CatDetailsImageGallery = (props) => {
    const classes = useStyles();
    const cat = props.cat;
    const [images, setImages] = useState([]);

    const fetchImages = () => {
        axios.get("/images", { params : { id : cat.id } } )
        .then(res => {
            setImages(res.data.images);
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <Grid item container justify="center" >
            <Grid container direction="row" justify="center" alignItems="center" spacing={4} xs={12} sm={12} md={12} lg={10} className={classes.images}>
                    {  
                        images.map((image, index) => {
                            return (
                                <Grid item xs={12} sm={6} md={6} lg={4}>
                                    <CardMedia className={classes.media}
                                        component="img"
                                        src={image}
                                        key={index}
                                    />
                                </Grid>
                            )
                        })
                    }
            </Grid>
        </Grid>
    );
}

export default CatDetailsImageGallery;
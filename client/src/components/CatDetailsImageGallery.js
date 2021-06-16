import React, { useState, useEffect } from 'react';
import { CircularProgress, Typography, Accordion, AccordionDetails, AccordionSummary, CardMedia, Grid, makeStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
    },
    accordion: {
        boxShadow: "none"
    },
})); 


const CatDetailsImageGallery = (props) => {
    const classes = useStyles();
    const cat = props.cat;
    const [images, setImages] = useState([]);
    const [expand, setExpand] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = () => {
        if (images.length === 0) {
            fetchImages();
        }
        setExpand(prev => !prev);
    }

    const fetchImages = () => {
        setLoading(true);
        axios.get("/images", { params : { id : cat.id } } )
        .then(res => {
            setImages(res.data.images);
            setLoading(false);
        })
        .catch(err => console.log(err));
    }

    return (
        <Accordion onChange={handleChange} className={classes.accordion}>
            <AccordionSummary expandIcon={loading ? <CircularProgress color="primary"/> : <ExpandMoreIcon />}>
                <Typography align="center">{expand ? "Hide Images" : "Show Images"}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {loading ? <CircularProgress color="primary"/> : <Grid item container justify="center" >
                    <Grid item container direction="row" justify="center" alignItems="center" spacing={4} xs={12} sm={12} md={12} lg={10} className={classes.images}>
                            {  
                                images.map((image, index) => {
                                    return (
                                        <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                                            <CardMedia className={classes.media}
                                                component="img"
                                                src={image}
                                                key={index + image}
                                            />
                                        </Grid>
                                    )
                                })
                            }
                    </Grid>
                </Grid>}
            </AccordionDetails>
        </Accordion>
    );
}

export default CatDetailsImageGallery;
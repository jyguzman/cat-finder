import React, { useState, useEffect } from "react";
import { makeStyles, Paper, CardMedia, CircularProgress, Grid, Typography } from "@material-ui/core";
import Paginator from './Paginator';
import axios from 'axios';
import SearchBar from "./SearchBar";

const useStyles = makeStyles((theme) => ({
    media: {
        maxWidth: 250,
        maxHeight: 250,
        borderRadius: 20
    },
    header: {
        padding: 30,
        margin: 30
    },
    gallery: {
        paddingTop: 20
    } 
})); 

const CategoryImages = () => {
    const classes = useStyles();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const categories = [
        {label: "hats"},
        {label: "sunglasses"},
        {label: "boxes"},
        {label: "clothes"},
        {label: "sinks"},
        {label: "ties"},
        {label: "space"}
    ]

    const perPage = 9;
    const [page, setPage] = useState(1);
    //const [perPage, setPerPage] = useState(9);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const fetchImages = (category) => {
        setLoading(true);
        axios.get("/category", { params : { category : category } } )
        .then(res => {
            setImages(res.data.images);
        })
        .catch(err => console.log(err));
        setLoading(false);
    }

    return (
        loading ? <CircularProgress /> : 
        <>
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid item>
                    <Paper elevation={4} className={classes.header}>
                        <Typography variant="h5"> Search for images by cateogory. </Typography>
                    </Paper>
                </Grid>
                <Grid item> 
                    <SearchBar options={categories} searchType="images" fetchImages={fetchImages}/> 
                </Grid>
                <Grid className={classes.gallery} item container direction="row" justify="center" alignItems="center" spacing={4} xs={12} sm={12} md={12} lg={10}>
                    {  
                        images.slice((page - 1) * perPage, page * perPage)
                        .map((image, index) => {
                            return (
                                <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                                    <CardMedia 
                                        className={classes.media}
                                        component="img"
                                        src={image.url}
                                        key={index + image.url}
                                    />
                                </Grid>
                                )
                            })
                    }
                </Grid>
            </Grid>
            <Paginator 
                page={page}
                pages={Math.ceil(images.length/perPage)}
                handlePageChange={handlePageChange}
            />
        </>
    )
}

export default CategoryImages;
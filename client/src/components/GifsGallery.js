import React, { useState } from "react";
import { Typography, makeStyles, Paper, CardMedia, CircularProgress, Grid } from "@material-ui/core";
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
    sadCat: {
        maxWidth: 600,
        maxHeight: 600,
        borderRadius: 20
    }
})); 

const SadCat = (props) => {
    const classes = useStyles();
    return (
        props.searched ? 
        <>
            <Typography variant="h5" gutterBottom paragraph>Oh no! No gifs available for this category...</Typography>
            <CardMedia 
                component="img"
                className={classes.media}
                src="sad-cat.jpg"
            />
        </>
        : null
    )
}

const GifsGallery = () => {
    const classes = useStyles();
    const [gifs, setGifs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

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

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const fetchGifs = (category) => {
        setSearched(true);
        setLoading(true);
        axios.get("/gifs", { params : { category : category } } )
        .then(res => {
            setGifs(res.data.gifs);
        })
        .catch(err => console.log(err));
        setLoading(false);
    }

    return (
        <>
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid item>
                    <Paper elevation={4} className={classes.header}>
                        <Typography variant="h5"> Search for gifs by cateogory. </Typography>
                    </Paper>
                </Grid>
                <Grid item> 
                    <SearchBar options={categories} searchType="gifs" fetchGifs={fetchGifs}/> 
                </Grid>

                {gifs.length > 0 ? <Grid item container direction="row" justify="center" alignItems="center" spacing={4} xs={12} sm={12} md={12} lg={10}>
                    {  
                        gifs.slice((page - 1) * perPage, page * perPage)
                        .map((gif, index) => {
                            return (
                                <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                                    <CardMedia className={classes.media}
                                        component="img"
                                        src={gif.url}
                                        key={index + gif.url}
                                    />
                                </Grid>
                            )
                        })
                    } 
                </Grid> : <SadCat searched={searched} />}
            </Grid> 
            <Paginator 
            page={page}
            pages={Math.ceil(gifs.length/perPage)}
            handlePageChange={handlePageChange}
            />
        </>
    )
}

export default GifsGallery;
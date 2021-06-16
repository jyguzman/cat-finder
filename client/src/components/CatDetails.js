import React from 'react';
import { Container, CardMedia, Button, Paper, Grid, makeStyles } from '@material-ui/core';
import StatList from './StatList';
import CatStats from './CatStats';
import CatDetailsImageGallery from './CatDetailsImageGallery';
import { Divider, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory, useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: "20px",
        borderRadius: "20px",
    },
    media: {
        maxWidth: "550px",
        maxHeight: "550px",
        marginBottom: "15px",
        borderRadius: "15px",
    },
    typography: {
        maxWidth: "450px",
        textAlign: "center"
    },
    list: {
        paddingLeft: "20px",
        maxWidth: "320px",
    },
}));

const CatDetails = (props) => {
    const classes = useStyles();
    let cats = props.cats;
    const { name } = useParams();
    const history = useHistory();
    const handleClick = () => history.goBack();
    const cat = cats.filter(cat => cat.name === name);

    return (
        cat.map((cat, index) => {
            return ( 
                <Container key="container">
                    <Paper elevation={8} className={classes.paper} key={index}>
                        <Grid item container direction="row" justify="center" alignItems="center" className={classes.content} key="grid">
                            <Grid item container direction="column" justify="center" xs={12} sm={6} md={6} lg={6} xl={6} key="mediagrid">
                                <CardMedia className={classes.media}
                                    component="img"
                                    src={cat.image.url}
                                    key="image"
                                    />
                                <Typography className={classes.typography} variant="body1" key="description">{cat.description}</Typography> 
                            </Grid>
                            <CatStats cat={cat} key={cat.name}/>                            
                        </Grid>
                        <CatDetailsImageGallery cat={cat} key={cat.id}/>
                        <Button onClick={handleClick} startIcon={<ArrowBackIcon />} key="button">
                            Back
                        </Button>
                    </Paper>
                </Container>
            );
        })       
    )    
}

export default CatDetails;
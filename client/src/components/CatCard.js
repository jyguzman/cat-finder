import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Grid, Typography, makeStyles, Paper } from '@material-ui/core';
import LearnMoreButton from './LearnMoreButton';

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
        borderRadius: "15px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
    },
    media: {
        maxWidth: 345,
        maxHeight: 345,
        borderRadius: "10px",
    },
});

const CatCard = (props) => {
    const classes = useStyles();
    const cat = props.cat;

    return (
        <Grid item container justify="center" xs={12} sm={6} md={4} lg={4} xl={4}>
            <Card className={classes.card}>            
                <CardMedia className={classes.media}
                    component="img"
                    src={cat.image.url}
                />
                <CardContent>
                    <Typography variant="h5" paragraph gutterBottom>{cat.name}</Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>{cat.temperament}</Typography>
                </CardContent>
                <CardActions>
                    <LearnMoreButton cat={cat} />
                </CardActions>
            </Card>            
        </Grid>
    );
}

export default CatCard;
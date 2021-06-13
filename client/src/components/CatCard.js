import React, { useState } from 'react';
import { Card, CardMedia, CardContent, CardActions, Grid, Typography, makeStyles } from '@material-ui/core';
import LearnMoreButton from './LearnMoreButton';

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
        borderRadius: "15px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around"
    },
    media: {
        maxWidth: 345,
        maxHeight: 345,
        borderRadius: "10px",
    },
    typographyContainer: {
        
    },
    catName: {
        paddingBottom: "15px"
    }
});

const CatCard = (props) => {
    const classes = useStyles();
    const cat = props.cat;

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    return (
        <Grid item container justify="center" xs={12} sm={6} md={4} lg={4} xl={4}>
            <Card className={classes.card}>
                <CardMedia className={classes.media}
                    component="img"
                    src={cat.image.url}
                />
                <CardContent>
                    <Typography variant="h5" className={classes.catName}>{cat.name}</Typography>
                    <Typography variant="body1" className="temperament">{cat.temperament}</Typography>
                </CardContent>
                <CardActions>
                    <LearnMoreButton cat={cat} handleOpen={handleOpen}/>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default CatCard;
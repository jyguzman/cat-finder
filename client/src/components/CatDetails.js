import React from 'react';
import { Container, CardMedia, Button, Paper, Grid, makeStyles } from '@material-ui/core';
import StatList from './StatList';
import { Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory, useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: "25px",
        borderRadius: "20px",
    },
    container: {
        display: "flex",
        justifyContent: "center",
        position: "relative"
    },
    content: {
        paddingBottom: "15px",
        
    },
    media: {
        maxWidth: "550px",
        maxHeight: "550px",
        marginBottom: "15px",
        borderRadius: "15px",
    },
    typography: {
        maxWidth: "450px"
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

    return (
        cats.filter(cat => cat.name === name)
        .map((cat, index) => {
            return ( 
                <Container className={classes.container}>
                <Paper className={classes.paper} key={index}>
                    <Grid item container direction="row" justify="center" alignItems="center" className={classes.content}>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <CardMedia className={classes.media}
                                component="img"
                                src={cat.image.url}
                                />
                            <Typography className={classes.typography} variant="body1">{cat.description}</Typography> 
                        </Grid>
                        <Grid item container direction="row" justify="center" className={classes.list}>
                            <StatList key="1" stats={[
                                {"Vocalization": cat.vocalisation}, 
                                {"Energy Level" : cat.energy_level},
                                {"Intelligence" : cat.intelligence},
                                {"Affection Level" : cat.affection_level}
                            ]} />
                            <StatList key="2" stats={[
                                {"Friendliness with Dogs": cat.dog_friendly}, 
                                {"Friendliness with Children" : cat.child_friendly},
                                {"Friendliness with Strangers" : cat.stranger_friendly},
                                {"Grooming Required" : cat.grooming},
                            ]} />
                        </Grid>
                    </Grid>
                    <Button onClick={handleClick} startIcon={<ArrowBackIcon />}>
                        Back
                    </Button>
                 </Paper>
                </Container>
            );
        })       
    )    
}
/*
<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <List > 
                                    <ListItem><StatBar stat={"Shedding Level"} value={cat.shedding_level} /></ListItem>
                                    <ListItem><StatBar stat={"Friendliness with Dogs"} value={cat.dog_friendly} /></ListItem>
                                    <ListItem><StatBar stat={"Friendliness with Children"} value={cat.child_friendly} /></ListItem>
                                </List>
                            </Grid>
                            <Grid item xs={14} sm={6} md={6} lg={6}  xl={6}>
                                    <List > 
                                        <ListItem><StatBar stat={"Vocalization"} value={cat.vocalization} /></ListItem>
                                        <ListItem><StatBar stat={"Energy Level"} value={cat.energy_level} /></ListItem>
                                        <ListItem><StatBar stat={"Intelligence"} value={cat.intelligence} /></ListItem>
                                    </List>
                            </Grid>
*/

export default CatDetails;
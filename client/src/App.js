import React, { useState, useEffect } from 'react';
import './App.css';
import CatGallery from './components/CatGallery';
import CatDetails from './components/CatDetails';
import Header from './components/Header';
import FiltersSection from './components/FiltersSection';
import Paginator from './components/Paginator';
import CategoryImages from './components/CategoryImages';
import GifsGallery from './components/GifsGallery';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import ShowFavoritesCheckbox from './components/ShowFavoritesCheckbox';
import SearchBar from './components/SearchBar';
import { CircularProgress, makeStyles, Container, Divider, Typography, Grid } from '@material-ui/core';
import { Route } from 'react-router-dom';
import axios from 'axios';
import firebase from 'firebase';
var qs =  require('qs');

const useStyles = makeStyles((theme) => ({
  breedCount: {
      textAlign: "left",
      paddingBottom: "20px",
  }
}));

function App(props) {
  const db = firebase.firestore();
  const classes = useStyles();
  const [cats, setCats] = useState([]);
  const [filteredCats, setFilteredCats] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [favoriteBreeds, setFavoriteBreeds] = useState([]);
  const [favoriteImages, setFavoriteImages] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      if (user != null) getFavoriteBreeds(user.email);
    })
  }, []);

  const getFavoriteBreeds = (email) => {
    const ref = db.collection("Users").doc(email);
    ref.get().then((doc) => {
      if (doc.exists) {
        setFavoriteBreeds(doc.data().favBreeds);
      }
    }).catch(err => console.log(err));
  };

  const getFavoriteImages = (user) => {
    const ref = db.collection("Users").doc(user.email);
    ref.get().then((doc) => {
      if (doc.exists) {
        setFavoriteImages(doc.data().favImages);
      }
    }).catch(err => console.log(err));
  };

  const updateFavorites = () => {
    if (user != null ) getFavoriteBreeds(user.email);
  };

  const handleShowFavorites = () => {
    setShowFavorites(prev => !prev);
    getFavoriteBreeds(user.email);
  }

  const setFilled = () => {

  }

  const perPage = 6;
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const resetFilters = () => {
    if (Object.keys(filters).length !== 0) setFilters({});
  }

  const updateFilters = (filter, level) => {
    if ( !(filter in filters) ) {
      setFilters((prev) => ({
        ...prev,
        [filter]: [level]
      }));
    } else {
        let levels = filters[filter];
        if (levels.includes(level)) {
          levels = levels.filter(lvl => lvl !== level);
        } else {
          levels.push(level);
        }
        setFilters((prev) => ({
          ...prev,
          [filter]: levels
        }));
    }
  }

  useEffect(() => {
    const getCats = async () => {
      await axios.get("/cats")
      .then(res => {
        let breeds = res.data.breeds;
        breeds = breeds.filter(breed => "image" in breed);
        setCats(breeds);
        setFilteredCats(breeds);
      })
      .catch(err => console.log(err));
    }
    
    getCats();
    setLoading(false);
  }, []);

  const filterCats = () => {
    setLoading(true);
    axios.get("/filter", {
      params: {
        grooming: filters["grooming"],
        affection_level: filters['affection_level'],
        energy_level: filters["energy_level"],
        dog_friendly: filters["dog_friendly"],
        child_friendly: filters['child_friendly'],
        vocalisation: filters['vocalisation'],
      }
    })
    .then(res => {
      const namesOfFilteredCats = res.data.filtered_cats;
      const list = qs.stringify(namesOfFilteredCats, {encode:false});
      if (showFavorites)
        setFilteredCats(cats.filter(cat => list.includes(cat.name) && favoriteBreeds.includes(cat.id)));
      else setFilteredCats(cats.filter(cat => list.includes(cat.name)));
      
    }).catch(err => console.log(err));
    setLoading(false);
  }

  useEffect(() => {
    filterCats();
}, [filters, showFavorites, favoriteBreeds]);

  useEffect(() => {
    setPage(1);
  }, [showFavorites]);

  return (
    <Container className="App">
      <Header user={user}/>

      <Route exact path="/">
        <FiltersSection filters={filters} updateFilters={updateFilters} 
          reset={Object.keys(filters).length === 0} 
          resetFilters={resetFilters}/>
        {loading ? <CircularProgress /> : <Container className={classes.breedCount}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item><Typography>{filteredCats.length} cat breeds</Typography></Grid>
            <Grid item><ShowFavoritesCheckbox showFavorites={showFavorites} user={user} handleShowFavorites={handleShowFavorites}/></Grid>
          </Grid>
          <Divider />
          </Container>}
        <CatGallery user={user} updateFavorites={updateFavorites} favoriteBreeds={favoriteBreeds} cats={filteredCats} page={page} perPage={perPage} />
        <Paginator 
          page={page}
          pages={Math.ceil(filteredCats.length/perPage)}
          handlePageChange={handlePageChange}
        />
      </Route>
      
      <Route path ="/:name">
        <CatDetails cats={filteredCats} />
      </Route>

      <Route path="/images">
        <CategoryImages />
      </Route>

      <Route path="/gifs">
        <GifsGallery />
      </Route>

      <Route path="/signin">
        <SignIn />
      </Route>

      <Route path="/signout">
        <SignOut />
      </Route>

    </Container>
  );
}

export default App;

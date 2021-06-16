import React, { useState, useEffect } from 'react';
import './App.css';
import CatGallery from './components/CatGallery';
import CatDetails from './components/CatDetails';
import Header from './components/Header';
import FiltersSection from './components/FiltersSection';
import Paginator from './components/Paginator';
import { makeStyles, Container, Divider, Typography } from '@material-ui/core';
import { Route } from 'react-router-dom';
import axios from 'axios';
var qs =  require('qs');

const useStyles = makeStyles((theme) => ({
  breedCount: {
      textAlign: "left",
      paddingBottom: "20px"
  },
}));

function App(props) {
  const classes = useStyles();
  const [cats, setCats] = useState([]);
  const [filteredCats, setFilteredCats] = useState([]);
  const [filters, setFilters] = useState({});

  const perPage = 6;
  let [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const resetFilters = () => {
    setFilters({});
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
    axios.get("/cats")
    .then(res => {
      let breeds = res.data.breeds;
      breeds = breeds.filter(breed => "image" in breed);
      setCats(breeds);
      setFilteredCats(breeds);
    })
  }, []);

  useEffect(() => {
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
        setFilteredCats(cats.filter(cat => list.includes(cat.name)));
      }).catch(err => console.log(err));
      setPage(1);
  }, [filters]);

  return (
    <Container className="App">
      <Header />
      <Route exact path="/">
        <FiltersSection filters={filters} updateFilters={updateFilters} reset={Object.keys(filters).length === 0} resetFilters={resetFilters} />
        <Container className={classes.breedCount}>
          <Typography>{filteredCats.length} cat breeds</Typography>
          <Divider />
        </Container>
        <CatGallery cats={filteredCats} page={page} perPage={perPage} />
        <Paginator 
          page={page}
          pages={Math.ceil(filteredCats.length/perPage)}
          handlePageChange={handlePageChange}
        />
      </Route>
      
      <Route path ="/:name">
        <CatDetails cats={filteredCats} />
      </Route>
    </Container>
  );
}

export default App;

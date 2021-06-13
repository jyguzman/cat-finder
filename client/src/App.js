import React, { useState, useEffect } from 'react';
import './App.css';
import CatGallery from './components/CatGallery';
import CatDetails from './components/CatDetails';
import Header from './components/Header';
import FiltersSection from './components/FiltersSection';
import { Container } from '@material-ui/core';
import { Route } from 'react-router-dom';
import axios from 'axios';

const filterCats = (cats, filters) => {
  for (const attribute in filters) {
      cats = cats.filter(cat => cat[attribute] === filters[attribute]);
  }
  return cats;
}

function App(props) {
  const [cats, setCats] = useState([]);
  const [filters, setFilters] = useState({});
  const [filteredCats, setFilteredCats] = useState([]);

  const resetFilters = () => {
    setFilters({});
  }

  const updateFilter = (filter) => {
    if (Object.keys(filter) in filters) {
      filters[Object.keys(filter)] = filter[Object.keys(filter)];
      setFilters({...filters})
    } else {
      setFilters((prev) => ({
        ...prev,
        [Object.keys(filter)]: filter[Object.keys(filter)]
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
    setFilteredCats(filterCats(cats, filters));
  }, [filters]);

  return (
    <Container className="App">
      <Header />
      <Route exact path="/">
        <Container>
        <FiltersSection filters={filters} reset={Object.keys(filters).length === 0} updateFilter={updateFilter} resetFilters={resetFilters}/>
        </Container>
        <CatGallery cats={filteredCats}/>
      </Route>
      
      <Route path ="/:name">
        <CatDetails cats={cats} resetFilters={resetFilters} />
      </Route>
    </Container>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import './App.css';
import CatGallery from './components/CatGallery';
import CatDetails from './components/CatDetails';
import Header from './components/Header';
import FiltersSection from './components/FiltersSection';
import Paginator from './components/Paginator';
import { Container } from '@material-ui/core';
import { Route } from 'react-router-dom';
import axios from 'axios';
var qs =  require('qs');

const filterCats = (cats, filters) => {
  for (const attribute in filters) {
      cats = cats.filter(cat => cat[attribute] === filters[attribute]);
  }
  return cats;
}

function App(props) {
  const [cats, setCats] = useState([]);
  const [filteredCats, setFilteredCats] = useState([]);
  const [filters, setFilters] = useState({});

  const [test, setTest] = useState({});

  const perPage = 6;
  let [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const resetFilters = () => {
    setFilters({});
  }

  const resetFilters2 = () => {
    setTest({});
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

  const updateFilter2 = (filter, level) => {
    if ( !(filter in test) ) {
      setTest((prev) => ({
        ...prev,
        [filter]: [level]
      }));
    } else {
        let levels = test[filter];
        if (levels.includes(level)) {
          levels = levels.filter(lvl => lvl !== level);
        } else {
          levels.push(level);
        }
        setTest((prev) => ({
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
          grooming: test["grooming"],
          affection_level: test['affection_level'],
          energy_level: test["energy_level"],
          dog_friendly: test["dog_friendly"],
          child_friendly: test['child_friendly'],
          vocalisation: test['vocalisation'],
        }
      })
      .then(res => {
        const namesOfFilteredCats = res.data.filtered_cats;
        const list = qs.stringify(namesOfFilteredCats, {encode:false});
        console.log(namesOfFilteredCats.length);
        setFilteredCats(cats.filter(cat => list.includes(cat.name)));
      }).catch(err => console.log(err));
      setPage(1);
  }, [test]);

  /*useEffect(() => {
    let filtered = filterCats(cats, filters);
    setFilteredCats(filtered);
  }, [filters]);*/

  return (
    <Container className="App">
      <Header />
      <Route exact path="/">
        <Container>
        <FiltersSection filters={test} updateFilter2={updateFilter2} reset2={Object.keys(test).length === 0} resetFilters2={resetFilters2} />
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

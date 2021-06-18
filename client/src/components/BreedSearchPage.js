import React, { useState, useEffect } from 'react';
import CatGallery from './CatGallery';
import CatDetails from './CatDetails';
import FiltersSection from './FiltersSection';
import Paginator from './Paginator';
import { Route } from 'react-router-dom';
import { makeStyles, Container, Divider, Typography } from '@material-ui/core';
import axios from 'axios';
var qs =  require('qs');

const useStyles = makeStyles((theme) => ({
  breedCount: {
      textAlign: "left",
      paddingBottom: "20px"
  },
}));

const BreedSearchPage = (props) => {
  const classes = useStyles();
  const cats = props.cats;
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
        <Container>
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
        </Container>
    );
}

export default BreedSearchPage;
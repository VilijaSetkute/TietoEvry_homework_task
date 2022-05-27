import React, { useContext, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import mainContext from '../../context/mainContext';
import DropdownButton from '../dropdown/DropdownButton';
import './styles.css';

import http from '../../plugins/http';

const dishes = [
  'Alcohol cocktail',
  'Biscuits and cookies',
  'Bread',
  'Cereals',
  'Condiments and sauces',
  'Drinks',
  'Desserts',
  'Egg',
  'Main course',
  'Omelet',
  'Pancake',
  'Preps',
  'Preserve',
  'Salad',
  'Sandwiches',
  'Soup',
  'Starter',
];
const meals = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snack',
];

function Search() {
  const {
    dishType, setDishType, mealType, setMealType, setRecipes, setShowSearch,
    searchMessage, setSearchMessage, searchKeyword, setSearchKeyword, searchError, setSearchError,
  } = useContext(mainContext);
  const recipeName = useRef();

  function handleClose() {
    setShowSearch(false);
    recipeName.current.value = '';
    setDishType('Select dish type');
    setMealType('Select meal type');
    setSearchError('');
    setSearchMessage('');
  }

  async function clearSearch() {
    recipeName.current.value = '';
    setDishType('Select dish type');
    setMealType('Select meal type');
    setSearchError('');
    setSearchMessage('');
    const data = await http.get('/initial-recipes');
    if (data.success) {
      setRecipes(data.data.hits);
    }
  }

  function handleKeyword(event) {
    event.preventDefault();
    setSearchKeyword(event.target.value);
  }

  async function handleSearch() {
    const searchArgs = {
      name: searchKeyword,
      meal: mealType,
      dish: dishType,
    };
    const data = await http.post('/search', searchArgs);
    if (data.success) {
      setRecipes(data.data.hits);
      setSearchMessage(data.message);
      setSearchError('');
    } else {
      setSearchError(data.message);
      setSearchMessage('');
    }
  }

  return (
    <div className="container search">
      <div className="d-flex justify-content-between mb-3">
        <div className="fw-bold fs-5 text-center p-2">Search by ingredient, meal, dish types</div>
        <FontAwesomeIcon icon={faClose} className="text-danger pointer" onClick={handleClose} />
      </div>
      {searchMessage && <div className="text-success text-center mb-3 fw-bold">{searchMessage}</div>}
      {searchError && <div className="text-danger text-center mb-3 fw-bold">{searchError}</div>}
      <input
        ref={recipeName}
        type="text"
        placeholder="enter ingredient"
        className="my-1 w-100 input-unmerged"
        onChange={handleKeyword}
      />
      <div className="my-2">
        <DropdownButton list={meals} getter={mealType} setter={setMealType} />
      </div>
      <div className="my-2">
        <DropdownButton list={dishes} getter={dishType} setter={setDishType} />
      </div>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-outline-secondary my-1 me-2"
          onClick={clearSearch}
        >
          Clear search
        </button>
        <button type="button" className="btn btn-outline-success my-1" onClick={handleSearch}>Search</button>
      </div>

    </div>
  );
}

export default Search;

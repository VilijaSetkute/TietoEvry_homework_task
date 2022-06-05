import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import mainContext from '../../context/mainContext';
import RecipeCard from '../cards/RecipeCard';
import Search from './Search';
import http from '../../plugins/http';

function Start() {
  const {
    recipes, showSearch, weightLogs, setRecipes, searchKeyword,
    mealType, dishType, setSearchMessage, setSearchError, user,
  } = useContext(mainContext);
  async function getRecipes() {
    if (searchKeyword.length === 0) {
      const data = await http.get('/initial-recipes');
      if (data.success) {
        setRecipes(data.data.hits);
      }
    } else {
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
    window.scrollTo(0, 0);
  }

  return (
    <div>
      <div
        className="d-flex justify-content-center fw-bold fs-4 mb-2 mt-5 bg-success
        bg-opacity-25 rounded py-2 text-center"
      >
        Vegetarian meals from all over the world
      </div>
      {(user && weightLogs.length === 0)
                && (
                <div className="fs-5 text-danger d-flex flex-column justify-content-center align-items-center m-3">
                  <div className="text-center">
                    Before you start exploring -
                    please enter your body composition information
                  </div>
                  <Link to="/calculator">
                    <button type="button" className="mt-3 btn btn-outline-success">
                      Go to calculator
                    </button>
                  </Link>
                </div>
                )}
      {showSearch
            && (
            <div>
              <Search />
            </div>
            )}
      <div className="d-flex flex-wrap justify-content-center">
        {recipes.map((el) => <RecipeCard key={el.recipe.uri} id={el.recipe.uri} recipe={el} />)}
      </div>
      <div className="d-flex justify-content-center mb-5">
        {recipes.length === 20
                    && (
                    <button
                      type="button"
                      className="btn btn-outline-success"
                      onClick={getRecipes}
                    >
                      Load more recipes
                    </button>
                    )}
      </div>
    </div>

  );
}

export default Start;

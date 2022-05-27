import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import mainContext from '../../context/mainContext';
import RecipeCard from '../cards/RecipeCard';
import Search from './Search';
import http from '../../plugins/http';

function Start() {
  const {
    recipes, showSearch, weightLogs, setRecipes, searchKeyword,
    mealType, dishType, setSearchMessage, setSearchError,
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
      <div className="d-flex justify-content-center mt-4 fs-4 fw-bold text-center">
        Vegetarian meals from all over the world
      </div>
      {weightLogs.length === 0
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
        {recipes.map((x, i) => <RecipeCard key={i} id={x.recipe.uri} recipe={x} />)}
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

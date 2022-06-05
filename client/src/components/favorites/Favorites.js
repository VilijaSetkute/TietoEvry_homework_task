import React, { useContext, useEffect } from 'react';
import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import mainContext from '../../context/mainContext';
import RecipeCard from '../cards/RecipeCard';
import http from '../../plugins/http';

function Favorites() {
  const {
    favorites, setFavorites, user, setAuthOption,
  } = useContext(mainContext);
  const nav = useNavigate();

  useEffect(() => {
    async function userFavorites() {
      const data = await http.post('/user-favorites', { user });
      if (data.success) {
        setFavorites(data.favorites);
      }
    }
    userFavorites();
  }, []);

  function logReg(option) {
    setAuthOption(option);
    nav('/auth');
  }

  return (
    <div>
      {!user
        ? (
          <div className="d-flex flex-column justify-content-center align-items-center m-5">
            <div className="fs-3 fw-bold text-center">You have to login to see this content</div>
            <button
              type="button"
              className="mt-3 btn btn-outline-success"
              onClick={() => logReg('login')}
            >
              Login
            </button>
          </div>
        )
        : (
          <div className="d-flex flex-column justify-content-center">
            {favorites.length > 0
              ? (
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <div
                    className="w-100 d-flex justify-content-center fw-bold fs-4
              mb-2 mt-5 bg-success bg-opacity-25 rounded py-2"
                  >
                    Favorite meals
                  </div>
                  <div className="d-flex flex-wrap justify-content-center">
                    {favorites.map((el) => <RecipeCard key={el.recipe.uri} id={el.recipe.uri} recipe={el} />)}
                  </div>
                </div>
              )
              : (
                <div className="d-flex flex-column justify-content-center align-items-center m-5">
                  <div className="fs-3 fw-bold text-center">You have no favorite meals</div>
                  <div className="fs-4 text-center">Check out more awesome vegetarian meals!</div>
                  <Link to="/">
                    <button type="button" className="mt-3 btn btn-outline-success">Go to recipes</button>
                  </Link>
                </div>
              )}
          </div>
        )}
    </div>
  );
}

export default Favorites;

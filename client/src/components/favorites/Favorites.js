import React, { useContext } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import mainContext from '../../context/mainContext';
import RecipeCard from '../cards/RecipeCard';

function Favorites() {
  const { favorites } = useContext(mainContext);

  return (
    <div className="d-flex flex-column justify-content-center">
      {favorites.length > 0
        ? (
          <div className="d-flex flex-column justify-content-center align-items-center m-3">
            <div className="fs-3 fw-bold">Favorite meals</div>
            <div className="d-flex flex-wrap justify-content-center">
              {favorites.map((x, i) => <RecipeCard key={i} id={x.recipe.uri} recipe={x} />)}
            </div>
          </div>
        )
        : (
          <div className="d-flex flex-column justify-content-center align-items-center m-5">
            <div className="fs-3 fw-bold text-center">You have no favorite meals</div>
            <div className="fs-4 text-center">Check out more awesome vegetarian meals!</div>
            <Link to="/"><button type="button" className="mt-3 btn btn-outline-success">Go to recipes</button></Link>
          </div>
        )}
    </div>
  );
}

export default Favorites;

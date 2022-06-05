import React, { useContext, useEffect, useState } from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import mainContext from '../../context/mainContext';
import http from '../../plugins/http';

function RecipeCard({ id, recipe }) {
  const {
    favorites, setFavorites, planned, setPlanned, user,
  } = useContext(mainContext);
  const [nutrition, setNutrition] = useState({ fats: 0, carbs: 0, proteins: 0 });
  const [toggleFavorites, setToggleFavorites] = useState(false);
  const [toggleMealPlan, setToggleMealPlan] = useState(false);
  const [tooltipFavorites, setTooltipFavorites] = useState(false);
  const [tooltipPlan, setTooltipPlan] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    async function userFavorites() {
      const data = await http.post('/user-favorites', { user });
      if (data.success) {
        setFavorites(data.favorites);
        const isFavorite = favorites.filter((el) => el.recipe.uri === id);
        if (isFavorite.length > 0) {
          setToggleFavorites(true);
        }
      }
    }
    userFavorites();
  }, []);

  useEffect(() => {
    async function userPlanned() {
      const data = await http.post('/user-planned', { user });
      if (data.success) {
        setPlanned(data.planned);
        const isPlanned = planned.filter((el) => el.recipe.uri === id);
        if (isPlanned.length > 0) {
          setToggleMealPlan(true);
        }
      }
    }
    userPlanned();
  }, []);

  useEffect(() => {
    function nutritionCalc() {
      const total = recipe.recipe.digest[0].total + recipe.recipe.digest[1].total + recipe.recipe.digest[2].total;
      const percent = {
        fats: ((recipe.recipe.digest[0].total / total) * 100).toFixed(0),
        carbs: ((recipe.recipe.digest[1].total / total) * 100).toFixed(0),
        proteins: ((recipe.recipe.digest[2].total / total) * 100).toFixed(0),
      };
      setNutrition(percent);
    }
    nutritionCalc();
  }, []);

  async function handleFavorites() {
    const checkInFav = {
      user,
      recipe: recipe.recipe,
    };
    const data = await http.post('/handle-favorites', checkInFav);
    if (data.success) {
      setFavorites(data.favorites);
    }
    setToggleFavorites(!toggleFavorites);
  }

  async function handleMealPLan() {
    const checkInPlan = {
      user,
      recipe: recipe.recipe,
    };
    const data = await http.post('/handle-planned', checkInPlan);
    if (data.success) {
      setPlanned(data.planned);
    }
    setToggleMealPlan(!toggleMealPlan);
  }

  function navigateRecipe() {
    const rid = recipe.recipe.uri.split('#');
    nav(`/recipe/${rid[1]}`);
  }

  return (
    <div className="recipe-card">
      <div className="position-relative d-flex justify-content-center">
        <img
          className="pointer"
          src={recipe.recipe.images.SMALL.url}
          alt={recipe.recipe.label}
          onClick={() => navigateRecipe()}
          aria-hidden="true"
        />
        {user && (
        <div className="position-absolute d-flex flex-column">
          <div className="position-relative">
            <FontAwesomeIcon
              className={`${toggleFavorites ? 'red' : 'text-dark'} pointer fs-4 m-1 p-2 rounded-circle`}
              icon={faHeart}
              onClick={() => handleFavorites()}
              onMouseOver={() => setTooltipFavorites(true)}
              onMouseOut={() => setTooltipFavorites(false)}
            />
            {tooltipFavorites
            && (
              <div className="position-absolute bg-success p-1 rounded text-white text-center
                        tooltip-text position-absolute__card"
              >
                <span>
                  {toggleFavorites ? 'Remove from' : 'Add to'}
                  {' '}
                  favorites
                </span>
              </div>
            )}
          </div>

          <div className="position-relative">
            <FontAwesomeIcon
              className={`${toggleMealPlan ? 'text-success' : 'text-dark'} pointer fs-4 m-1 p-2 rounded-circle`}
              icon={faUtensils}
              onClick={() => handleMealPLan()}
              onMouseOver={() => setTooltipPlan(true)}
              onMouseOut={() => setTooltipPlan(false)}
            />
            {tooltipPlan
            && (
              <div className="position-absolute bg-success p-1 rounded text-white text-center
                        tooltip-text position-absolute__card"
              >
                <span>
                  {toggleMealPlan ? 'Remove from' : 'Add to'}
                  {' '}
                  plan
                </span>
              </div>
            )}
          </div>
        </div>
        )}

      </div>

      <div className="p-2 fs-5 fw-bold text-center recipe-card-title-wrap">{recipe.recipe.label}</div>
      <div>
        <div>
          <span className="fw-bold">Category:</span>
          {' '}
          <span className="text-primary text-capitalize">{recipe.recipe.dishType}</span>
        </div>
        <div>
          <span className="fw-bold">For:</span>
          {' '}
          <span className="text-primary text-capitalize">{recipe.recipe.mealType}</span>
        </div>
        <div>
          Calories:
          {Math.ceil(recipe.recipe.calories)}
          {' '}
          kcal
        </div>
        <div>
          Whole meal:
          {Math.ceil(recipe.recipe.totalWeight)}
          {' '}
          g.
        </div>
        <br />

        <div className="d-flex justify-content-between align-items-center">
          <div>
            Fats:
            {Math.ceil(recipe.recipe.digest[0].total)}
            {' '}
            g.
          </div>
          <div className="progress w-50">
            <div
              className="progress-bar bg-warning"
              role="progressbar"
              style={{ width: `${nutrition.fats}%` }}
              aria-valuenow={nutrition.fats}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              {nutrition.fats}
              %
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            Carbs:
            {Math.ceil(recipe.recipe.digest[1].total)}
            {' '}
            g.
          </div>
          <div className="progress w-50">
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${nutrition.carbs}%` }}
              aria-valuenow={nutrition.carbs}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              {nutrition.carbs}
              %
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            Proteins:
            {Math.ceil(recipe.recipe.digest[2].total)}
            {' '}
            g.
          </div>
          <div className="progress w-50">
            <div
              className="progress-bar bg-primary"
              role="progressbar"
              style={{ width: `${nutrition.proteins}%` }}
              aria-valuenow={nutrition.proteins}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              {nutrition.proteins}
              %
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;

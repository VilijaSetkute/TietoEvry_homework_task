import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import {
  faHeart, faUtensils, faCircle, faCircleHalfStroke, faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';
import mainContext from '../../context/mainContext';
import http from '../../plugins/http';

function StatisticsCard({ id, recipe, setCalsStatistics }) {
  const nav = useNavigate();
  const {
    favorites, setFavorites, planned, setPlanned, user,
  } = useContext(mainContext);
  const [nutrition, setNutrition] = useState({ fats: 0, carbs: 0, proteins: 0 });
  const [toggleFavorites, setToggleFavorites] = useState(false);
  const [toggleMealPlan, setToggleMealPlan] = useState(false);
  const [tooltipFavorites, setTooltipFavorites] = useState(false);
  const [tooltipPlan, setTooltipPlan] = useState(false);

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

  async function mealQuarter(q) {
    const data = await http.post('/update-quarter', { user, id, quarter: q });
    if (data.success) {
      setPlanned(data.planned);
    }
  }

  function navigateRecipe() {
    const rid = recipe.recipe.uri.split('#');
    nav(`/recipe/${rid[1]}`);
  }

  return (
    <div className="recipe-card__horizontal">
      <div className="d-flex justify-content-between">
        <div className="p-2 fs-5 fw-bold">{recipe.recipe.label}</div>
        {user && (
        <div className="position-relative d-flex">
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
              className={`${recipe.recipe.quarter > 0 ? 'text-success opacity-25' : 'text-success pointer'} 
              fs-4 m-1 p-2 rounded-circle`}
              icon={faUtensils}
              onClick={() => handleMealPLan()}
              onMouseOver={() => setTooltipPlan(true)}
              onMouseOut={() => setTooltipPlan(false)}
            />
            {(tooltipPlan && recipe.recipe.quarter === 0)
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
      <div className="card-data">
        <img
          className="pointer"
          src={recipe.recipe.images.THUMBNAIL.url}
          alt={recipe.recipe.label}
          onClick={navigateRecipe}
          aria-hidden="true"
        />
        <div className="block-margin info-block-width">
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
        </div>
        <div className="block-margin">
          <div className="d-flex align-items-center">
            <div className="progress-name-width">
              Fats:
              {Math.ceil(recipe.recipe.digest[0].total)}
              {' '}
              g.
            </div>
            <div className="progress ms-5 progress-bar-width">
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

          <div className="d-flex align-items-center">
            <div className="progress-name-width">
              Carbs:
              {Math.ceil(recipe.recipe.digest[1].total)}
              {' '}
              g.
            </div>
            <div className="progress ms-5 progress-bar-width">
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
          <div className="d-flex align-items-center">
            <div className="progress-name-width">
              Proteins:
              {Math.ceil(recipe.recipe.digest[2].total)}
              {' '}
              g.
            </div>
            <div className="progress ms-5 progress-bar-width">
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
        <div className="block-margin">
          <div>Choose how much you have eaten of this meal</div>
          <div className="d-flex text-secondary">
            <div
              className={`position-relative ${recipe.recipe.quarter > 0 ? 'text-success' : 'undefined'}`}
              onClick={() => mealQuarter(1)}
              role="button"
              aria-hidden="true"
            >
              <FontAwesomeIcon icon={faCircleHalfStroke} className="pointer fs-3 m-2 bg-white rotate180" />
              <FontAwesomeIcon
                icon={faCircleHalfStroke}
                className="pointer position-absolute text-white
              fs-3 m-2 rotate270"
              />
              <FontAwesomeIcon icon={faCircleNotch} className="pointer position-absolute fs-3 m-2 rotate45" />
              <FontAwesomeIcon icon={faCircleNotch} className="pointer position-absolute fs-3 m-2 rotate90" />
            </div>
            <FontAwesomeIcon
              icon={faCircleHalfStroke}
              className={`pointer fs-3 m-2 rotate180 ${recipe.recipe.quarter > 1
                ? 'text-success' : 'undefined'}`}
              onClick={() => mealQuarter(2)}
            />
            <div
              className={`position-relative ${recipe.recipe.quarter > 2 ? 'text-success' : 'undefined'}`}
              onClick={() => mealQuarter(3)}
              role="button"
              aria-hidden="true"
            >
              <FontAwesomeIcon icon={faCircleHalfStroke} className="pointer fs-3 m-2 rotate180" />
              <FontAwesomeIcon icon={faCircleHalfStroke} className="pointer position-absolute fs-3 m-2 rotate270" />
            </div>
            <FontAwesomeIcon
              icon={faCircle}
              className={`pointer fs-3 m-2 ${recipe.recipe.quarter > 3
                ? 'text-success' : 'undefined'}`}
              onClick={() => mealQuarter(4)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsCard;

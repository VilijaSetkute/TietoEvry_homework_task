import React, { useContext, useEffect, useState } from 'react';
import './styles.css';
import { useParams } from 'react-router-dom';
import mainContext from '../../context/mainContext';

function SingleRecipe() {
  const { recipes } = useContext(mainContext);
  const { rid } = useParams();
  const [recipe, setRecipe] = useState();

  useEffect(() => {
    function getRecipe() {
      const rec = recipes.find((el) => el.recipe.uri.includes(rid));
      setRecipe(rec.recipe);
    }
    getRecipe();
  }, []);

  return (
    <div>
      {!recipe
        ? <div>Loading...</div>
        : (
          <div>
            <div className="container d-flex my-5 justify-content-center">
              <div className="left-pane">
                <div className="position-relative">
                  <img src={recipe.images.LARGE.url} alt="recipe" />
                  <div className="w-100 fs-3 fw-bold p-3 text-center position-absolute
                  position-absolute__single-recipe"
                  >
                    {recipe.label}
                  </div>
                </div>
                <div className="my-3">
                  <div>
                    <div className="fw-bold fs-5">Cuisine</div>
                    <ul>{recipe.cuisineType.map((x, i) => <li key={i} className="text-capitalize">{x}</li>)}</ul>
                  </div>
                  <div>
                    <div className="fw-bold fs-5">Ingredients</div>
                    <ul>{recipe.ingredientLines.map((x, i) => <li key={i} className="">{x}</li>)}</ul>
                  </div>
                  <div>
                    <div className="fw-bold fs-5">Source</div>
                    <div>
                      Recipe found at
                      <a href={recipe.source}>{recipe.source}</a>
                    </div>
                    <div>
                      Link to recipe
                      <a href={recipe.url}>{recipe.url}</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="right-pane d-flex flex-column justify-content-between">
                <div>
                  <div className="fs-3 fw-bold px-3 pb-1 title-border">Nutrition Facts</div>
                  <div className="fw-bold card-text-14 my-1">Amount Per Serving</div>
                  <div className="py-3 pb-1 title-border-thin d-flex justify-content-between align-items-center">
                    <div className="fs-2 fw-bold">Calories</div>
                    <div>{Math.round(recipe.calories)}</div>
                  </div>
                  <div className="text-details d-flex justify-content-end">% Daily Value *</div>
                  <div className="d-flex justify-content-between border-top border-dark card-text-14 my-1">
                    <div>
                      <span className="fw-bold">Total Fat </span>
                      {(recipe.digest[0].total).toFixed(1)}
                      {' '}
                      {recipe.digest[0].unit}
                    </div>
                    <div className="fw-bold">
                      {Math.round(recipe.totalDaily.FAT.quantity)}
                      %
                    </div>
                  </div>
                  <div className="d-flex justify-content-between border-top border-dark card-text-14 my-1 ps-3">
                    <div>Saturated Fat</div>
                    <div className="fw-bold">
                      {Math.round(recipe.totalDaily.FASAT.quantity)}
                      %
                    </div>
                  </div>
                  <div className="d-flex justify-content-between border-top border-dark card-text-14 my-1">
                    <div>
                      <span className="fw-bold">Cholesterol </span>
                      {(recipe.digest[3].total).toFixed(1)}
                      {' '}
                      {recipe.digest[3].unit}
                    </div>
                    <div className="fw-bold">
                      {Math.round(recipe.totalDaily.CHOLE.quantity)}
                      %
                    </div>
                  </div>
                  <div className="d-flex justify-content-between border-top border-dark card-text-14 my-1">
                    <div>
                      <span className="fw-bold">Sodium </span>
                      {(recipe.digest[4].total).toFixed(1)}
                      {' '}
                      {recipe.digest[4].unit}
                    </div>
                    <div className="fw-bold">
                      {Math.round(recipe.totalDaily.NA.quantity)}
                      %
                    </div>
                  </div>
                  <div className="d-flex justify-content-between border-top border-dark card-text-14 my-1">
                    <div>
                      <span className="fw-bold">Total Carbohydrate </span>
                      {(recipe.digest[1].total).toFixed(1)}
                      {' '}
                      {recipe.digest[1].unit}
                    </div>
                    <div className="fw-bold">
                      {Math.round(recipe.totalDaily.CHOCDF.quantity)}
                      %
                    </div>
                  </div>
                  <div className="d-flex justify-content-between border-top border-dark card-text-14 my-1 ps-3">
                    <div>Fiber </div>
                    <div className="fw-bold">
                      {Math.round(recipe.totalDaily.FIBTG.quantity)}
                      %
                    </div>
                  </div>
                  <div className="d-flex justify-content-between border-top border-dark card-text-14 my-1">
                    <div>
                      <span className="fw-bold">Protein </span>
                      {(recipe.digest[2].total).toFixed(1)}
                      {' '}
                      {recipe.digest[2].unit}
                    </div>
                    <div className="fw-bold">
                      {Math.round(recipe.totalDaily.PROCNT.quantity)}
                      %
                    </div>
                  </div>
                  <div className="d-flex justify-content-between border-top border-dark card-text-14 my-1">
                    <div>
                      Vitamin D
                      {(recipe.digest[21].total).toFixed(1)}
                      {' '}
                      {recipe.digest[21].unit}
                    </div>
                    <div className="fw-bold">
                      {Math.round(recipe.totalDaily.VITD.quantity)}
                      %
                    </div>
                  </div>
                  <div className="d-flex justify-content-between border-top border-dark card-text-14 my-1">
                    <div>
                      Calcium
                      {(recipe.digest[5].total).toFixed(1)}
                      {' '}
                      {recipe.digest[5].unit}
                    </div>
                    <div className="fw-bold">
                      {Math.round(recipe.totalDaily.CA.quantity)}
                      %
                    </div>
                  </div>
                  <div className="d-flex justify-content-between border-top border-dark card-text-14 my-1">
                    <div>
                      Iron
                      {(recipe.digest[8].total).toFixed(1)}
                      {' '}
                      {recipe.digest[8].unit}
                    </div>
                    <div className="fw-bold">
                      {Math.round(recipe.totalDaily.FE.quantity)}
                      %
                    </div>
                  </div>
                  <div className="d-flex justify-content-between border-top border-dark card-text-14 my-1">
                    <div>
                      Potassium
                      {(recipe.digest[7].total).toFixed(1)}
                      {' '}
                      {recipe.digest[7].unit}
                    </div>
                    <div className="fw-bold">
                      {Math.round(recipe.totalDaily.K.quantity)}
                      %
                    </div>
                  </div>
                </div>
                <div className="text-small">*Percent Daily Values are based on a 2000 calorie diet</div>
              </div>
            </div>
          </div>
        )}
    </div>

  );
}

export default SingleRecipe;

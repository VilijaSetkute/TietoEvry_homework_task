import React, { useContext, useEffect, useState } from 'react';
import './styles.css';
import { useParams } from 'react-router-dom';
import mainContext from '../../context/mainContext';
import http from '../../plugins/http';

function SingleRecipe() {
  const { recipes } = useContext(mainContext);
  const { rid } = useParams();
  const [recipe, setRecipe] = useState();

  useEffect(() => {
    async function getRecipe() {
      const rec = recipes.find((el) => el.recipe.uri.includes(rid));
      if (!rec) {
        const data = await http.post('/find-single-recipe', { rid });
        if (data.success) {
          setRecipe(data.recipe);
        }
      } else {
        setRecipe(rec);
        await http.post('/save-single-recipe', { savingRecipe: rec });
      }
    }
    getRecipe();
  }, []);

  return (
    <div>
      {!recipe
        ? <div>Loading...</div>
        : (
          <div>
            <div className="container my-5 view-layout">
              <div className="left-pane">
                <div className="position-relative">
                  <img src={recipe.recipe.images.LARGE.url} alt="recipe" />
                  <div className="w-100 fs-3 fw-bold p-3 text-center position-absolute
                  position-absolute__single-recipe"
                  >
                    {recipe.recipe.label}
                  </div>
                </div>
                <div className="recipe-info my-3">
                  <div>
                    <div className="fw-bold fs-5">Cuisine</div>
                    <ul>{recipe.recipe.cuisineType.map((x, i) => <li key={x} className="text-capitalize">{x}</li>)}</ul>
                  </div>
                  <div>
                    <div className="fw-bold fs-5">Ingredients</div>
                    <ul>{recipe.recipe.ingredientLines.map((x, i) => <li key={x} className="">{x}</li>)}</ul>
                  </div>
                  <div>
                    <div className="fw-bold fs-5">Source</div>
                    <div>
                      Recipe found at
                      {' '}
                      <span className="fw-bold">
                        {recipe.recipe.source.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      Link to recipe
                      {' '}
                      <a href={recipe.recipe.url} target="_blank" rel="noreferrer">{recipe.recipe.url}</a>
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
                    <div>{Math.round(recipe.recipe.calories)}</div>
                  </div>
                  <div className="text-details d-flex justify-content-end">% Daily Value *</div>
                  <div className="d-flex justify-content-between border-top border-dark card-text-14 my-1">
                    <div>
                      <span className="fw-bold">Total Fat </span>
                      {(recipe.recipe.digest[0].total).toFixed(1)}
                      {' '}
                      {recipe.recipe.digest[0].unit}
                    </div>
                    <div className="fw-bold">
                      {Math.round(recipe.recipe.totalDaily.FAT.quantity)}
                      %
                    </div>
                  </div>
                  <div className="d-flex justify-content-between border-top border-dark card-text-14 my-1 ps-3">
                    <div>Saturated Fat</div>
                    <div className="fw-bold">
                      {Math.round(recipe.recipe.totalDaily.FASAT.quantity)}
                      %
                    </div>
                  </div>
                  <div className="d-flex justify-content-between border-top border-dark card-text-14 my-1">
                    <div>
                      <span className="fw-bold">Cholesterol </span>
                      {(recipe.recipe.digest[3].total).toFixed(1)}
                      {' '}
                      {recipe.recipe.digest[3].unit}
                    </div>
                    <div className="fw-bold">
                      {Math.round(recipe.recipe.totalDaily.CHOLE.quantity)}
                      %
                    </div>
                  </div>
                  <div className="d-flex justify-content-between border-top border-dark card-text-14 my-1">
                    <div>
                      <span className="fw-bold">Sodium </span>
                      {(recipe.recipe.digest[4].total).toFixed(1)}
                      {' '}
                      {recipe.recipe.digest[4].unit}
                    </div>
                    <div className="fw-bold">
                      {Math.round(recipe.recipe.totalDaily.NA.quantity)}
                      %
                    </div>
                  </div>
                  <div className="d-flex justify-content-between border-top border-dark card-text-14 my-1">
                    <div>
                      <span className="fw-bold">Total Carbohydrate </span>
                      {(recipe.recipe.digest[1].total).toFixed(1)}
                      {' '}
                      {recipe.recipe.digest[1].unit}
                    </div>
                    <div className="fw-bold">
                      {Math.round(recipe.recipe.totalDaily.CHOCDF.quantity)}
                      %
                    </div>
                  </div>
                  <div className="d-flex justify-content-between border-top border-dark card-text-14 my-1 ps-3">
                    <div>Fiber </div>
                    <div className="fw-bold">
                      {Math.round(recipe.recipe.totalDaily.FIBTG.quantity)}
                      %
                    </div>
                  </div>
                  <div className="d-flex justify-content-between border-top border-dark card-text-14 my-1">
                    <div>
                      <span className="fw-bold">Protein </span>
                      {(recipe.recipe.digest[2].total).toFixed(1)}
                      {' '}
                      {recipe.recipe.digest[2].unit}
                    </div>
                    <div className="fw-bold">
                      {Math.round(recipe.recipe.totalDaily.PROCNT.quantity)}
                      %
                    </div>
                  </div>
                  <div className="d-flex justify-content-between border-top border-dark card-text-14 my-1">
                    <div>
                      Vitamin D
                      {(recipe.recipe.digest[21].total).toFixed(1)}
                      {' '}
                      {recipe.recipe.digest[21].unit}
                    </div>
                    <div className="fw-bold">
                      {Math.round(recipe.recipe.totalDaily.VITD.quantity)}
                      %
                    </div>
                  </div>
                  <div className="d-flex justify-content-between border-top border-dark card-text-14 my-1">
                    <div>
                      Calcium
                      {(recipe.recipe.digest[5].total).toFixed(1)}
                      {' '}
                      {recipe.recipe.digest[5].unit}
                    </div>
                    <div className="fw-bold">
                      {Math.round(recipe.recipe.totalDaily.CA.quantity)}
                      %
                    </div>
                  </div>
                  <div className="d-flex justify-content-between border-top border-dark card-text-14 my-1">
                    <div>
                      Iron
                      {(recipe.recipe.digest[8].total).toFixed(1)}
                      {' '}
                      {recipe.recipe.digest[8].unit}
                    </div>
                    <div className="fw-bold">
                      {Math.round(recipe.recipe.totalDaily.FE.quantity)}
                      %
                    </div>
                  </div>
                  <div className="d-flex justify-content-between border-top border-dark card-text-14 my-1">
                    <div>
                      Potassium
                      {(recipe.recipe.digest[7].total).toFixed(1)}
                      {' '}
                      {recipe.recipe.digest[7].unit}
                    </div>
                    <div className="fw-bold">
                      {Math.round(recipe.recipe.totalDaily.K.quantity)}
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

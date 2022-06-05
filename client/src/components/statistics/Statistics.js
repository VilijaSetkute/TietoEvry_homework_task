import React, { useContext, useEffect, useState } from 'react';
import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import mainContext from '../../context/mainContext';
import StatisticsCard from '../cards/StatisticsCard';
import DoughnutChart from './DoughnutChart';
import http from '../../plugins/http';

function Statistics() {
  const {
    planned, setPlanned, weightLogs, setAuthOption, user,
  } = useContext(mainContext);
  const [calsStatistics, setCalsStatistics] = useState({
    total: {
      totalUsed: 0, totalUsedPerc: 0, totalLeft: 0, totalLeftPerc: 0,
    },
    fats: {
      fatsUsed: 0, fatsUsedPerc: 0, fatsLeft: 0, fatsLeftPerc: 0,
    },
    carbs: {
      carbsUsed: 0, carbsUsedPerc: 0, carbsLeft: 0, carbsLeftPerc: 0,
    },
    proteins: {
      proteinsUsed: 0, proteinsUsedPerc: 0, proteinsLeft: 0, proteinsLeftPerc: 0,
    },
  });

  const nav = useNavigate();

  async function tableCalculation() {
    const data = await http.post('/calorie-table', { user });
    if (data.success) {
      setCalsStatistics(data.statistics);
    }
  }

  function logReg(option) {
    setAuthOption(option);
    nav('/auth');
  }

  useEffect(() => {
    tableCalculation();
  }, [planned]);

  useEffect(() => {
    async function userPlanned() {
      const data = await http.post('/user-planned', { user });
      if (data.success) {
        setPlanned(data.planned);
      }
    }
    userPlanned();
  }, []);

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
          <div>
            <div className="text-center">
              <div
                className="d-flex justify-content-center fw-bold fs-4 mb-2 mt-5 bg-success bg-opacity-25 rounded py-2"
              >
                Statistics of the day
              </div>
              {weightLogs.length === 0
                ? (
                  <div className="fs-5 text-danger d-flex flex-column justify-content-center align-items-center m-5">
                    <div>
                      Before you start planning your nutrition for the day -
                      please enter your body composition information
                    </div>
                    <Link to="/calculator">
                      <button type="button" className="mt-3 btn btn-outline-success">
                        Go to calculator
                      </button>
                    </Link>
                  </div>
                )
                : (
                  <div className="mb-2">
                    <div className="d-flex flex-column justify-content-center">

                      <div className="charts justify-content-center align-content-center">
                        <div className="m-3">
                          <div className="m-2 fw-bold">Ideal proportion, %</div>
                          <DoughnutChart proportion={[32, 50, 18]} />
                        </div>
                        <div className="m-3">
                          <div className="m-2 fw-bold">Todays&apos; proportion, %</div>
                          <DoughnutChart proportion={[
                            Math.round((calsStatistics.fats.fatsUsed / calsStatistics.total.totalUsed) * 100),
                            Math.round((calsStatistics.carbs.carbsUsed / calsStatistics.total.totalUsed) * 100),
                            Math.round((calsStatistics.proteins.proteinsUsed / calsStatistics.total.totalUsed) * 100),
                          ]}
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center my-3">
                        <div className="mx-2 bg-warning rounded-1 text-white w50px">Fats</div>
                        <div className="mx-2 bg-success rounded-1 text-white w50px">Carbs</div>
                        <div className="mx-2 bg-primary rounded-1 text-white w50px">Proteins</div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <table className="table w-75 .table-responsive">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">kcal used</th>
                            <th scope="col">% used</th>
                            <th scope="col">kcal left</th>
                            <th scope="col">% left</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className={calsStatistics.total.totalLeft === 0 ? 'text-danger fw-bold' : 'fw-bold'}>
                            <td>Total</td>
                            <td>{calsStatistics.total.totalUsed}</td>
                            <td>
                              {calsStatistics.total.totalUsedPerc}
                              %
                            </td>
                            <td>{calsStatistics.total.totalLeft}</td>
                            <td>
                              {calsStatistics.total.totalLeftPerc}
                              %
                            </td>
                          </tr>
                          <tr className={(calsStatistics.fats.fatsLeft === 0 || calsStatistics.total.totalLeft === 0)
                            ? 'text-danger' : 'undefined'}
                          >
                            <td>Fats</td>
                            <td>{calsStatistics.fats.fatsUsed}</td>
                            <td>
                              {calsStatistics.fats.fatsUsedPerc}
                              %
                            </td>
                            <td>{calsStatistics.fats.fatsLeft}</td>
                            <td>
                              {calsStatistics.fats.fatsLeftPerc}
                              %
                            </td>
                          </tr>
                          <tr className={(calsStatistics.carbs.carbsLeft === 0 || calsStatistics.total.totalLeft === 0)
                            ? 'text-danger' : 'undefined'}
                          >
                            <td>Carbs</td>
                            <td>{calsStatistics.carbs.carbsUsed}</td>
                            <td>
                              {calsStatistics.carbs.carbsUsedPerc}
                              %
                            </td>
                            <td>{calsStatistics.carbs.carbsLeft}</td>
                            <td>
                              {calsStatistics.carbs.carbsLeftPerc}
                              %
                            </td>
                          </tr>
                          <tr
                            className={(calsStatistics.proteins.proteinsLeft === 0
                              || calsStatistics.total.totalLeft === 0)
                              ? 'text-danger' : 'undefined'}
                          >
                            <td>Proteins</td>
                            <td>{calsStatistics.proteins.proteinsUsed}</td>
                            <td>
                              {calsStatistics.proteins.proteinsUsedPerc}
                              %
                            </td>
                            <td>{calsStatistics.proteins.proteinsLeft}</td>
                            <td>
                              {calsStatistics.proteins.proteinsLeftPerc}
                              %
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="text-small pb-3">
                      * Please consume healthy fats, try to avoid saturated fats.
                    </div>
                  </div>
                )}
            </div>
            <div>
              <div className="d-flex justify-content-center fw-bold fs-4 my-2 bg-success bg-opacity-25 rounded py-2">
                Started meals
              </div>
              {planned.filter((el) => el.recipe.quarter > 0).length > 0
                ? (
                  <div>
                    {planned.flatMap((el) => (el.recipe.quarter > 0)
                    && (
                      <StatisticsCard
                        key={el['_id']}
                        id={el['_id']}
                        recipe={el}
                        setCalsStatistics={setCalsStatistics}
                      />
                    ))}
                  </div>
                )
                : (
                  <div className="fs-5 text-danger d-flex justify-content-center align-items-center m-5 text-center">
                    You have no started meals
                  </div>
                )}
            </div>
            <div>
              <div className="d-flex justify-content-center fw-bold fs-4 my-2 bg-success bg-opacity-25 rounded py-2">
                Planned meals
              </div>
              {planned.filter((el) => el.recipe.quarter === 0).length > 0
                ? (
                  <div>
                    {planned.flatMap((el) => (el.recipe.quarter === 0)
                    && (
                      <StatisticsCard
                        key={el['_id']}
                        id={el['_id']}
                        recipe={el}
                        setCalsStatistics={setCalsStatistics}
                      />
                    ))}
                  </div>
                )
                : (
                  <div className="fs-5 text-danger d-flex justify-content-center align-items-center m-5 text-center">
                    You have no planned meals
                  </div>
                )}
            </div>
          </div>
        )}

    </div>
  );
}

export default Statistics;

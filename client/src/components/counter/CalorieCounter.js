import React, {
  useState, useRef, useContext, useEffect,
} from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import mainContext from '../../context/mainContext';
import CalorieLogList from './CalorieLogList';
import http from '../../plugins/http';

function CalorieCounter() {
  const {
    weightLogs, setWeightLogs, user, setAuthOption,
  } = useContext(mainContext);
  const [gender, setGender] = useState('');
  const [activity, setActivity] = useState(0);
  const [logMessage, setLogMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showCalculator, setShowCalculator] = useState(true);
  const weightRef = useRef();
  const heightRef = useRef();
  const ageRef = useRef();
  const nav = useNavigate();

  async function calculateMetrics() {
    const metrics = {
      user,
      weight: Number(weightRef.current.value),
      height: Number(heightRef.current.value),
      age: Number(ageRef.current.value),
      gender,
      activity,
    };
    const data = await http.post('/metrics', metrics);
    if (data.success) {
      setWeightLogs(data.results);
      setLogMessage(data.message);
      setErrorMessage('');
      setShowCalculator(false);
    } else {
      setErrorMessage(data.message);
    }
  }

  function logReg(option) {
    setAuthOption(option);
    nav('/auth');
  }

  useEffect(() => {
    if (logMessage.length > 0) {
      const toRef = setTimeout(() => {
        setLogMessage('');
        clearTimeout(toRef);
      }, 5000);
    }
  }, [weightLogs]);

  useEffect(() => {
    if (weightLogs.length > 0) {
      setShowCalculator(false);
    }
  }, [weightLogs]);

  useEffect(() => {
    async function getLogs() {
      const data = await http.post('/all-weight-logs', { user });
      if (data.success) {
        setWeightLogs(data.results);
      }
    }
    getLogs();
  }, []);

  return (
    <div>
      {!user ? (
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
            <div className="counter d-flex flex-column">
              <div className="fs-4 fw-bold text-center">BMR* calculator</div>
              <div className="text-small mb-2 mt-4">
                *BMR - equivalent to the amount of energy (in the form of calories)
                that your body needs to function if it were to rest for 24 hours.
              </div>
              <div className="h30">
                {logMessage
              && <div className="text-success fst-italic text-center mt-1 mb-2 fade-away">{logMessage}</div>}
                {errorMessage
              && <div className="text-danger fst-italic text-center mt-1 mb-2 fade-away">{errorMessage}</div>}
              </div>
              <button
                className="btn btn-outline-success"
                onClick={() => setShowCalculator(!showCalculator)}
                type="button"
                aria-hidden="true"
              >
                {showCalculator ? 'Collapse' : 'Expand'}
                {' '}
                calculator
              </button>

              <div className="mt-3" style={{ display: showCalculator ? 'block' : 'none' }}>
                <fieldset className="d-flex flex-column mb-2">
                  <label htmlFor="counter-weight" className="fw-bold">Weight</label>
                  <input ref={weightRef} id="counter-weight" type="number" placeholder="Your weight (kg)" />
                </fieldset>
                <fieldset className="d-flex flex-column mb-2">
                  <label htmlFor="counter-height" className="fw-bold">Height</label>
                  <input ref={heightRef} id="counter-height" type="number" placeholder="Your height (cm)" />
                </fieldset>
                <fieldset className="d-flex flex-column mb-2">
                  <label htmlFor="counter-age" className="fw-bold">Age</label>
                  <input ref={ageRef} id="counter-age" type="number" placeholder="Your age" />
                </fieldset>

                <fieldset className="mb-2">
                  <div className="fw-bold">Gender</div>
                  <div>
                    <div
                      className={`${gender === 'male' ? 'calculator-option__selected' : 'calculator-option'} 
              calculator-option my-1 p-1 rounded-1`}
                      aria-hidden="true"
                      onClick={() => setGender('male')}
                    >
                      Male
                    </div>
                    <div
                      className={`${gender === 'female' ? 'calculator-option__selected' : 'calculator-option'} 
              calculator-option my-1 p-1 rounded-1`}
                      aria-hidden="true"
                      onClick={() => setGender('female')}
                    >
                      Female
                    </div>
                  </div>
                </fieldset>
                <fieldset className="mb-2">
                  <div className="fw-bold">Activity level</div>
                  <div>
                    <div
                      className={`${activity === 1 ? 'calculator-option__selected' : 'calculator-option'} 
              calculator-option my-1 p-1 rounded-1`}
                      aria-hidden="true"
                      onClick={() => setActivity(1)}
                    >
                      Sedentary (little or no exercise)
                    </div>
                    <div
                      className={`${activity === 2 ? 'calculator-option__selected' : 'calculator-option'} 
              calculator-option my-1 p-1 rounded-1`}
                      aria-hidden="true"
                      onClick={() => setActivity(2)}
                    >
                      Lightly active (light exercise/sports 1-3 days/week)
                    </div>
                    <div
                      className={`${activity === 3 ? 'calculator-option__selected' : 'calculator-option'} 
              calculator-option my-1 p-1 rounded-1`}
                      aria-hidden="true"
                      onClick={() => setActivity(3)}
                    >
                      Moderately active (moderate exercise/sports 3-5 days/week)
                    </div>
                    <div
                      className={`${activity === 4 ? 'calculator-option__selected' : 'calculator-option'} 
              calculator-option my-1 p-1 rounded-1`}
                      aria-hidden="true"
                      onClick={() => setActivity(4)}
                    >
                      Very active (hard exercise/sports 6-7 days a week)
                    </div>
                    <div
                      className={`${activity === 5 ? 'calculator-option__selected' : 'calculator-option'} 
              calculator-option my-1 p-1 rounded-1`}
                      aria-hidden="true"
                      onClick={() => setActivity(5)}
                    >
                      Extra active (very hard exercise/sports & a physical job)
                    </div>
                  </div>
                </fieldset>

                <button type="button" className="btn btn-outline-success" onClick={calculateMetrics}>Calculate</button>
              </div>
            </div>
            <div className="mb-4 text-center fw-bold fs-5">Your weight log history</div>
            <div className="overflow-box">
              {weightLogs.map((x, i) => <CalorieLogList key={x['_id']} log={x} />)
                .reverse()}
            </div>
          </div>
        )}
    </div>
  );
}

export default CalorieCounter;

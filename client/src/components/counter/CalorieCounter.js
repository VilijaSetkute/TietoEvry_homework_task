import React, {useState, useRef, useContext, useEffect} from 'react';
import './styles.css'
import mainContext from "../../context/mainContext";
import CalorieLogList from "./CalorieLogList";
import http from "../../plugins/http";

const CalorieCounter = () => {

    const {weightLogs, setWeightLogs} = useContext(mainContext)
    const [gender, setGender] = useState('')
    const [activity, setActivity] = useState(0)
    const [logMessage, setLogMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const weightRef = useRef()
    const heightRef = useRef()
    const ageRef = useRef()

    function genderValue(e) {
        setGender(e.target.value)
    }
    function activityValue(e) {
        setActivity(e.target.value)
    }

    async function calculateMetrics() {
        const metrics = {
            weight: Number(weightRef.current.value),
            height: Number(heightRef.current.value),
            age: Number(ageRef.current.value),
            gender,
            activity
        }
        console.log(metrics)
        const data = await http.post('/metrics', metrics)
        if (data.success) {
            console.log(data)
            setWeightLogs([...weightLogs, data.results])
            setLogMessage(data.message)
            setErrorMessage('')
        } else {
            console.log(data)
            setErrorMessage(data.message)
        }
    }

    useEffect(() => {
        if (logMessage.length > 0) {
            const toRef = setTimeout(() => {
                setLogMessage('');
                clearTimeout(toRef);
            }, 5000);
        }
    }, [weightLogs]);

    return (
        <div>
            <div className='counter d-flex flex-column'>
                <div className='fs-4 fw-bold text-center'>BMR* calculator</div>
                <div className='text-small mb-2 mt-4'>*BMR - equivalent to the amount of energy (in the form of calories) that your body needs to function if it were to rest for 24 hours.</div>
                <div className='h30'>
                    {logMessage && <div className='text-success fst-italic text-center mt-1 mb-2 fade-away'>{logMessage}</div>}
                    {errorMessage && <div className='text-danger fst-italic text-center mt-1 mb-2 fade-away'>{errorMessage}</div>}
                </div>

                <fieldset className='d-flex flex-column mb-2'>
                    <label id='counter-weight' className='fw-bold'>Weight</label>
                    <input ref={weightRef} id='counter-weight' type="number" placeholder='Your weight (kg)'/>
                </fieldset>
                <fieldset className='d-flex flex-column mb-2'>
                    <label id='counter-height' className='fw-bold'>Height</label>
                    <input ref={heightRef} id='counter-height' type="number" placeholder='Your height (cm)'/>
                </fieldset>
                <fieldset className='d-flex flex-column mb-2'>
                    <label id='counter-age' className='fw-bold'>Age</label>
                    <input ref={ageRef} id='counter-age' type="number" placeholder='Your age'/>
                </fieldset>
                <fieldset className='mb-2' onChange={genderValue}>
                    <div className='fw-bold'>Gender</div>
                    <div>
                        <input type="radio" id="counter-male" name="gender" value="male" className='me-1'/>
                        <label id="counter-male" htmlFor="counter-male">Male</label>
                    </div>
                    <div>
                        <input type="radio" id="counter-female" name="gender" value="female" className='me-1'/>
                        <label id="counter-female" htmlFor="counter-female">Female</label>
                    </div>
                </fieldset>
                <fieldset className='mb-2' onChange={activityValue}>
                    <div className='fw-bold'>Activity level</div>
                    <div>
                        <input type="radio" id="counter-activity__sedentary" name="activity" value="1" className='me-1'/>
                        <label id="counter-activity__sedentary" htmlFor="counter-activity__sedentary">Sedentary (little or no exercise)</label>
                    </div>
                    <div>
                        <input type="radio" id="counter-activity__light" name="activity" value="2" className='me-1'/>
                        <label id="counter-activity__light" htmlFor="counter-activity__light">Lightly active (light exercise/sports 1-3 days/week)</label>
                    </div>
                    <div>
                        <input type="radio" id="counter-activity__moderate" name="activity" value="3" className='me-1'/>
                        <label id="counter-activity__moderate" htmlFor="counter-activity__moderate">Moderately active (moderate exercise/sports 3-5 days/week)</label>
                    </div>
                    <div>
                        <input type="radio" id="counter-activity__active" name="activity" value="4" className='me-1'/>
                        <label id="counter-activity__active" htmlFor="counter-activity__active">Very active (hard exercise/sports 6-7 days a week)</label>
                    </div>
                    <div>
                        <input type="radio" id="counter-activity__intense" name="activity" value="5" className='me-1'/>
                        <label id="counter-activity__intense" htmlFor="counter-activity__intense">Extra active (very hard exercise/sports & a physical job)</label>
                    </div>
                </fieldset>

                <button className='btn btn-outline-success' onClick={calculateMetrics}>Calculate</button>
            </div>
            <div className='overflow-box'>
                {weightLogs.map((x, i) => <CalorieLogList key={i} log={x}/>).reverse()}
            </div>
        </div>

    );
};

export default CalorieCounter;
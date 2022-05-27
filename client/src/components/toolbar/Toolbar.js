import React, {useContext, useState} from 'react';
import './styles.css'
import {Link, useNavigate} from "react-router-dom";
import mainContext from "../../context/mainContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWeight, faHouse, faMagnifyingGlass, faBars} from "@fortawesome/free-solid-svg-icons";

const Toolbar = () => {

    const {weightLogs, favorites, setShowSearch, showSearch, setDishType, setMealType} = useContext(mainContext)
    const nav = useNavigate()
    const [toggleMenu, setToggleMenu] = useState(false)

    function handleSearchIcon() {
        setShowSearch(!showSearch)
        setDishType('Select dish type')
        setMealType('Select meal type')
        nav('/')
    }

    function handleMenuBar(url, status) {
        if (status) {
            setShowSearch(true)
        }
        if (!status) {
            setShowSearch(false)
        }
        nav(url)
        setToggleMenu(false)
    }

    return (
        <div>
            <div className='toolbar-desktop'>
                <div className='toolbar bg-success d-flex justify-content-between align-items-center'>
                    <div className='d-flex p-2 text-white align-items-center'>
                        <Link to='/'><FontAwesomeIcon icon={faHouse} className='my-1 fs-3 pointer'/></Link>
                        <Link to='favorites'>Favorites ({favorites.length})</Link>
                        <Link to='statistics'>Statistics</Link>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='m-1 fs-4 pointer' onClick={handleSearchIcon}/>
                    </div>
                    <div className='d-flex p-2 text-white align-items-center'>
                        <div className='mx-1'>BMI: {weightLogs.length > 0 ? weightLogs[weightLogs.length-1].bmi : '--'}</div>
                        <div className='fs-4'>|</div>
                        <div className='mx-1'>Calories needed: {weightLogs.length > 0 ? weightLogs[weightLogs.length-1].totalBmr: '--'} kcal</div>
                        <Link to='calculator'><FontAwesomeIcon icon={faWeight} className={`${weightLogs.length === 0 ? 'animate-icon' : 'undefined'} ms-2 me-1 fs-3`}/></Link>
                    </div>
                </div>
            </div>


            <div className='toolbar-mobile'>
                <div className='toolbar bg-success d-flex flex-column justify-content-between align-items-center position-relative'>
                    <div className='w-100 d-flex justify-content-between align-items-center p-2 text-white '>
                        <FontAwesomeIcon icon={faHouse} className='my-1 fs-3 pointer' onClick={() => handleMenuBar('/')}/>
                        <FontAwesomeIcon icon={faBars} className='m-1 fs-2 pointer' onClick={() => setToggleMenu(!toggleMenu)}/>
                    </div>
                    {toggleMenu && <div className='bg-success w-100 d-flex flex-column p-2 text-white border-top border-light position-absolute position-absolute__menu'>
                        <div className='py-1 d-flex justify-content-end pointer border-bottom' onClick={() => handleMenuBar('/favorites')}>
                            Favorites ({favorites.length})
                        </div>
                        <div className='py-1 d-flex justify-content-end pointer border-bottom' onClick={() => handleMenuBar('/statistics')}>
                            Statistics
                        </div>
                        <div className='py-1 d-flex justify-content-end pointer border-bottom' onClick={() => handleMenuBar('/', true)}>
                            Search recipe
                        </div>
                        <div className='py-1 d-flex justify-content-end pointer' onClick={() => handleMenuBar('/calculator')}>
                            Calculator
                        </div>
                    </div>}
                </div>
            </div>


        </div>
    );
};

export default Toolbar;
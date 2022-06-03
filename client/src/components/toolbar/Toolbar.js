import React, { useContext, useState } from 'react';
import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWeight, faHouse, faMagnifyingGlass, faBars, faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import mainContext from '../../context/mainContext';

function Toolbar() {
  const {
    weightLogs, favorites, setShowSearch, showSearch, setDishType, setMealType, user, setUser, setAuthOption,
  } = useContext(mainContext);
  const nav = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);

  function handleSearchIcon() {
    setShowSearch(!showSearch);
    setDishType('Select dish type');
    setMealType('Select meal type');
    nav('/');
  }

  function handleMenuBar(url, status) {
    if (status) {
      setShowSearch(true);
    }
    if (!status) {
      setShowSearch(false);
    }
    nav(url);
    setToggleMenu(false);
  }

  async function logOut() {
    setUser(null);
    setAuthOption('');
    nav('/');
    localStorage.removeItem('stayLoggedIn');
  }

  function logReg(option) {
    setAuthOption(option);
    nav('/auth');
  }

  function logRegMobile(option) {
    setAuthOption(option);
    nav('/auth');
    setToggleMenu(false);
  }

  return (
    <div>
      <div className="toolbar-desktop">
        <div className="toolbar bg-success d-flex justify-content-between align-items-center">
          <div className="d-flex p-2 text-white align-items-center">
            <Link to="/"><FontAwesomeIcon icon={faHouse} className="my-1 fs-3 pointer" /></Link>
            {user && (
            <div>
              <Link to="favorites">
                Favorites (
                {favorites.length}
                )
              </Link>
              <Link to="statistics">Statistics</Link>
            </div>
            )}

            <FontAwesomeIcon icon={faMagnifyingGlass} className="m-1 fs-4 pointer" onClick={() => handleSearchIcon()} />
          </div>
          <div className="d-flex p-2 text-white align-items-center">
            {user
            && (
            <div className="d-flex align-items-center">
              <div className="mx-1">
                BMI:
                {weightLogs.length > 0 ? weightLogs[weightLogs.length - 1].bmi : '--'}
              </div>
              <div className="fs-4">|</div>
              <div className="mx-1">
                Calories needed:
                {weightLogs.length > 0 ? weightLogs[weightLogs.length - 1].totalBmr : '--'}
                {' '}
                kcal
              </div>
              <Link to="calculator">
                <FontAwesomeIcon
                  icon={faWeight}
                  className={`${weightLogs.length === 0
                    ? 'animate-icon' : 'undefined'} ms-2 me-1 fs-3`}
                />
              </Link>
              <div>
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className="m-1 ms-2 fs-2 pointer"
                  onClick={() => logOut()}
                />
              </div>
            </div>
            )}
            {!user
            && (
            <div className="d-flex toolbar-item">
              <div
                role="button"
                aria-hidden="true"
                className="pointer"
                onClick={() => logReg('login')}
              >
                Login
              </div>
              <div className="mx-2">/</div>
              <div
                role="button"
                aria-hidden="true"
                className="pointer"
                onClick={() => logReg('register')}
              >
                Register
              </div>
            </div>
            )}
          </div>
        </div>
      </div>

      <div className="toolbar-mobile">
        <div className="toolbar bg-success d-flex flex-column justify-content-between
        align-items-center position-relative"
        >
          <div className="w-100 d-flex justify-content-between align-items-center p-2 text-white ">
            <FontAwesomeIcon icon={faHouse} className="my-1 fs-3 pointer" onClick={() => handleMenuBar('/')} />
            <FontAwesomeIcon icon={faBars} className="m-1 fs-2 pointer" onClick={() => setToggleMenu(!toggleMenu)} />
          </div>
          {toggleMenu && (
          <div className="bg-success w-100 d-flex flex-column p-2 text-white border-top border-light
          position-absolute position-absolute__menu"
          >
            {user && (
            <div>
              <div
                className="py-1 d-flex justify-content-end pointer border-bottom"
                onClick={() => handleMenuBar('/favorites')}
                role="button"
                aria-hidden="true"
              >
                Favorites (
                {favorites.length}
                )
              </div>
              <div
                className="py-1 d-flex justify-content-end pointer border-bottom"
                onClick={() => handleMenuBar('/statistics')}
                role="button"
                aria-hidden="true"
              >
                Statistics
              </div>
            </div>
            )}

            <div
              className="py-1 d-flex justify-content-end pointer border-bottom"
              onClick={() => handleMenuBar('/', true)}
              role="button"
              aria-hidden="true"
            >
              Search recipe
            </div>
            {user && (
            <div>
              <div
                className="py-1 d-flex justify-content-end pointer border-bottom"
                onClick={() => handleMenuBar('/calculator')}
                role="button"
                aria-hidden="true"
              >
                Calculator
              </div>
              <div
                className="py-1 d-flex justify-content-end pointer"
                onClick={() => handleMenuBar('/calculator')}
                role="button"
                aria-hidden="true"
              >
                Logout
              </div>
            </div>
            )}
            {!user
            && (
            <div>
              <div
                className="py-1 d-flex justify-content-end pointer border-bottom"
                onClick={() => logRegMobile('login')}
                role="button"
                aria-hidden="true"
              >
                Login
              </div>
              <div
                className="py-1 d-flex justify-content-end pointer"
                onClick={() => logRegMobile('register')}
                role="button"
                aria-hidden="true"
              >
                Register
              </div>
            </div>
            )}

          </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default Toolbar;

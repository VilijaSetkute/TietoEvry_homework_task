import React, { useContext, useRef } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import mainContext from '../../context/mainContext';
import http from '../../plugins/http';

function Login({ setAuthMessage, authMessage }) {
  const { setUser } = useContext(mainContext);
  const nav = useNavigate();
  const logEmail = useRef();
  const logPass = useRef();
  const stayLogged = useRef();

  async function handleLogin() {
    const loginInfo = {
      email: logEmail.current.value,
      pass: logPass.current.value,
      stayLoggedIn: stayLogged.current.checked,
    };
    const data = await http.post('/login', loginInfo);
    if (data.success) {
      setAuthMessage(null);
      setUser(data.user);
      nav('/');
      localStorage.setItem('stayLoggedIn', 'true');
    } else {
      setAuthMessage(data);
    }
  }

  return (
    <div className="auth-card bg-success rounded p-3 m-3">
      <div className="text-center mb-3 text-white fs-5 fw-bold">Login</div>
      {authMessage && <div className="my-2 text-warning text-center">{authMessage.message}</div>}
      <div className="d-flex flex-column justify-content-center">
        <input
          ref={logEmail}
          className="my-1 rounded-pill border-0 p-2 text-center"
          type="text"
          placeholder="enter your email"
        />
        <input
          ref={logPass}
          className="my-1 rounded-pill border-0 p-2 text-center"
          type="password"
          placeholder="enter password"
        />
        <div className="d-flex align-items-center justify-content-center my-2">
          <input ref={stayLogged} id="stayLoggedFormId" type="checkbox" className="me-2" />
          <label htmlFor="stayLoggedFormId" className="text-white fs-5">Stay logged in</label>
        </div>
        <button
          type="button"
          className="btn btn-outline-light mt-3 mx-auto"
          onClick={handleLogin}
          aria-hidden="true"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;

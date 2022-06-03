import React, { useContext, useRef } from 'react';
import './styles.css';
import mainContext from '../../context/mainContext';
import http from '../../plugins/http';

function Registration({ setAuthMessage, authMessage }) {
  const { setAuthOption } = useContext(mainContext);
  const regEmail = useRef();
  const regPass = useRef();
  const regPassRepeat = useRef();

  async function handleRegister() {
    const registerInfo = {
      email: regEmail.current.value,
      pass: regPass.current.value,
      passRepeat: regPassRepeat.current.value,
    };
    const data = await http.post('/register', registerInfo);
    if (data.success) {
      setAuthOption('login');
    }
    setAuthMessage(data);
  }

  return (
    <div className="auth-card bg-success rounded p-3 m-3">
      <div className="text-center mb-3 text-white fs-5 fw-bold">Registration</div>
      {authMessage && <div className="my-2 text-warning text-center">{authMessage.message}</div>}
      <div className="d-flex flex-column justify-content-center">
        <input
          ref={regEmail}
          className="my-1 rounded-pill border-0 p-2 text-center"
          type="text"
          placeholder="enter your email"
        />
        <input
          ref={regPass}
          className="my-1 rounded-pill border-0 p-2 text-center"
          type="password"
          placeholder="enter password"
        />
        <input
          ref={regPassRepeat}
          className="my-1 rounded-pill border-0 p-2 text-center"
          type="password"
          placeholder="repeat password"
        />
        <button
          type="button"
          className="btn btn-outline-light mt-3 mx-auto"
          onClick={handleRegister}
          aria-hidden="true"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Registration;

import React, { useState, useContext } from 'react';
import Login from '../components/auth/Login';
import Registration from '../components/auth/Registration';
import mainContext from '../context/mainContext';

function AuthorisationPage() {
  const { authOption } = useContext(mainContext);
  const [authMessage, setAuthMessage] = useState();

  return (
    <div className="screen-size">
      {authOption === 'login'
      && <Login authMessage={authMessage} setAuthMessage={setAuthMessage} />}
      {authOption === 'register'
      && <Registration authMessage={authMessage} setAuthMessage={setAuthMessage} />}
    </div>
  );
}

export default AuthorisationPage;

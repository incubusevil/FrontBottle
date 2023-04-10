import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import decode from 'jwt-decode';
import { Provider, Context } from './providers';
import { LoginPage } from '../features/LoginPage';
import { AdminPanel } from '../features/AdminPanel';
import { ManagerPanel } from '../features/ManagerPanel';
import { OperatorPanel } from '../features/OperatorPanel';

// move domain name in to global variable in configuration file

export default function App() {
  const [context, setContext] = useContext(Context);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setContext({ ...context, token: savedToken });
    if (savedToken) {
      axios.get('http://localhost:8080/rest/api/auth/tokenCheck', {
        headers: { Authorization: `Bearer ${savedToken}` },
      }).then(setContext({ ...context, user: decode(savedToken), token: null }))
        .catch(setContext({ ...context, user: null, token: null }));
    }
  }, []);

  const isUserAdmin = !!context.user?.role?.find(({ authority }) => authority === 'ADMIN');
  const isUserOperator = !!context.user?.role?.find(({ authority }) => authority === 'OPERATOR');
  const isUserManager = !!context.user?.role?.find(({ authority }) => authority === 'MANAGER');

  return (
    <Provider>
      {!context.user && <LoginPage />}
      {isUserAdmin && <AdminPanel />}
      {isUserOperator && <OperatorPanel />}
      {isUserManager && <ManagerPanel />}
    </Provider>
  );
}

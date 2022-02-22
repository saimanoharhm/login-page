import AuthForm from '../components/Main/AuthForm';
import React, { Fragment } from 'react';

interface AuthProps {
  onLogin: () => void;
  isLoggedIn: boolean;
}

const AuthPage: React.FC<AuthProps> = ({ onLogin, isLoggedIn }) => {
  return (
    <Fragment>
      <main>{!isLoggedIn && <AuthForm onLogin={onLogin} />}</main>
    </Fragment>
  );
};

export default AuthPage;

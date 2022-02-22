import React, { useState } from 'react';
import classes from './AuthForm.module.css';
import { useNavigate } from 'react-router-dom';

interface AuthProps {
  onLogin: () => void;
}

const AuthForm: React.FC<AuthProps> = ({ onLogin }) => {
  const [enteredEmail, setEnteredEmail] = useState<string>('');
  const [emailIsValid, setEmailIsValid] = useState<boolean | undefined>();
  const [enteredPassword, setEnteredPassword] = useState<string>('');
  const [passwordIsValid, setPasswordIsValid] = useState<boolean | undefined>();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const navigate = useNavigate();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredEmail(event.target.value);
    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6
    );
  };

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredPassword(event.target.value);
    setFormIsValid(
      enteredEmail.includes('@') && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin();
    setIsLoading(true);
    navigate('/home');
    fetch('https://anisoft.us/airbackup/api/user/validateuser', {
      method: 'POST',
      body: JSON.stringify({
        Username: enteredEmail,
        Password: enteredPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
        localStorage.setItem('auth', data.token);
      });
    });
    if (!isLogin) {
      fetch('https://anisoft.us/airbackup/api/user/createuser', {
        method: 'POST',
        body: JSON.stringify({
          Username: enteredEmail,
          Password: enteredPassword,
          ConfirmPassword: enteredPassword,
          Zipcode: null,
          DeviceId: '76693dc0910c04d4',
          Latitude: '13.3462067',
          Longitude: '74.794477',
          Timezone: null,
          TimezoneId: 0,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        response.json().then((data) => {
          console.log(data);
          localStorage.setItem('auth', '1');
        });
      });
    }

    // .then((res) => {
    //   if (res.ok) {
    //     return res.text();
    //   } else {
    //     return res.json().then((data) => {
    //       let errorMessage = 'authentication failed';
    //       throw new Error(errorMessage);
    //     });
    //   }
    // })
    // .then((data) => {
    //   obj = data;
    //   AuthCtx.login(obj);
    //   console.log(obj);
    //   history.replace('/');
    // })
    // .catch((err) => {
    //   console.log(err.message);
    // });
  };

  return (
    <section className={classes.auth}>
      <h1 className={classes.header}>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button className={classes.login} disabled={!formIsValid}>
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

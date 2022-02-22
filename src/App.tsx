import { Route, Routes, useNavigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Layout from './components/Layout/Layout';
import StartingPage from './components/Main/StartingPage';
import { useState, useEffect } from 'react';

const App: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('auth');
    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (): void => {
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('auth');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <Layout isAuthenticated={isLoggedIn} onLogout={logoutHandler}>
      <Routes>
        <Route
          path="/"
          element={<AuthPage onLogin={loginHandler} isLoggedIn={isLoggedIn} />}
        />
        <Route path="/home" element={<StartingPage />} />
      </Routes>
    </Layout>
  );
};

export default App;

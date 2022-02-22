import { Link } from 'react-router-dom';
import classes from './MainNavigation.module.css';

interface NavProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const MainNavigation: React.FC<NavProps> = ({ isAuthenticated, onLogout }) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Login Page</div>
      <nav>
        <ul>
          {!isAuthenticated && (
            <li>
              <Link to="/">Login</Link>
            </li>
          )}
          {isAuthenticated && (
            <li>
              <button onClick={onLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

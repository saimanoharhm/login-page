import { Fragment } from 'react';
import MainNavigation from './MainNavigation';

interface LayoutProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  isAuthenticated,
  onLogout,
  children,
}) => {
  return (
    <Fragment>
      <MainNavigation isAuthenticated={isAuthenticated} onLogout={onLogout} />
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;

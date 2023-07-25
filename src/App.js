import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Item from './components/Items';
import itemService from './services/items';
import loginService from './services/login';
import LoginForm from './components/LoginForm';

import './css/app.css';

const Home = () => {
  return <div>Home Page</div>;
};

const Listings = ({ items }) => {
  return (
    <div>
      <h2>Items</h2>
      {items.map((item) => (
        <Link key={item.id} to={`/bid/${item.id}`}>
          <Item item={item} />
        </Link>
      ))}
    </div>
  );
};

const Bidding = () => {
  return <div>Bid Page</div>;
};

const App = () => {
  const [items, setItems] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    itemService.getAll().then((items) => setItems(items));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      itemService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    const user = await loginService.login({ username, password });

    window.localStorage.setItem('loggedappUser', JSON.stringify(user));
    itemService.setToken(user.token);
    setUser(user);
    setUsername('');
    setPassword('');
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.clear();
    setUser(null);
  };

  const handleLoginSuccess = () => {
    window.location.href = '/';
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Auctioneers</Link>
            </li>
            <li>
              <Link to="/items">Listings</Link>
            </li>

            <li className="login-logout">
              {user === null ? (
                <span onClick={() => window.location.href = '/login'}>Login</span>
              ) : (
                <>
                  <> Welcome back, {user.firstName} </>
                  <button onClick={handleLogout} type="submit">logout</button>
                </>
              )}
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/items" 
            element={<Listings items={items} />} />
          <Route 
            path="/bid/:id" 
            element={<Bidding />} />
          <Route
            path="/login"
            element={
              <LoginForm
                handleLogin={handleLogin}
                username={username}
                setUsername={setUsername}
                setPassword={setPassword}
                password={password}
                onLoginSuccess={handleLoginSuccess}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

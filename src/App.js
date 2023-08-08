import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Item from './components/Items';
import itemService from './services/items';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AuctionForm from './components/AuctionForm'

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

  const handleRegister = async (userData) => {
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      alert('Registration successful!');
      window.location.href = '/login';
    } catch (error) {
      alert(error);
    }
  }

  const handleCreateAuction = async (itemName, category, description, startingBid, startTime, startDate) => {
    const auction = await itemService.create({
      itemName,
      category,
      description,
      startingBid,
      startTime,
      startDate,
    })

    setItems(items.concat(auction))
  }


return (
  <Router>
    <div>
    <nav>
          <ul>
            <div className="left-links">
              <li className="link-item">
                <Link to="/">Auctioneer</Link>
              </li>
              <li className="link-item">
                <Link to="/items">Listings</Link>
              </li>
            </div>
            <div className="right-links">
              {user === null ? (
                <li className="link-item">
                  <Link to="/register">Register</Link>
                </li>
              ) : null}
              <li className="login-logout">
                {user === null ? (
                  <Link to="/login">Login</Link>
                ) : (
                  <>
                    <AuctionForm handleCreateAuction={handleCreateAuction} />
                    <> Welcome back, {user.firstName} </>
                    <button onClick={handleLogout} type="submit">logout</button>
                  </>
                )}
              </li>
            </div>
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
        <Route
            path="/register"
            element={<RegisterForm handleRegister={handleRegister} />}
          />
      </Routes>
    </div>
  </Router>
);
};

export default App;

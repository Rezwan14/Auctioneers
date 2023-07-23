import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Item from './components/Items';
import itemService from './services/items';
import './css/app.css'


const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    itemService.getAll().then((items) => setItems(items));
  }, []);

  return (
    <Router>

      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Autioneers</Link>
            </li>
            <li>
              <Link to="/items">Listings</Link>
            </li>
            <li>
              <Link to="/bid">Bid</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/items"
            element={
              <div>
                <h2>Items</h2>
                {items.map((item) => (
                  <Item key={item.id} item={item} />
                ))}
              </div>
            }
          />

          <Route path="/bid" element={<div>Bid Page</div>} />

          <Route path="/" element={<div>Home Page</div>} />

        </Routes>

      </div>

    </Router>

  );
};

export default App;

import { useEffect, useState } from 'react';
import { Routes, BrowserRouter as Router, Route, Navigate  } from 'react-router-dom';

import './App.css';
import Navigation from './components/Navigation';
import Auth from './pages/Auth';
import Home from './pages/Home';

function App() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    setLogin(localStorage.getItem("token"));

  }, [login]);


  return (
    <div>
      <Router>
        <header>
          <Navigation />
        </header>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={ login ? <Navigate to="/" /> : <Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

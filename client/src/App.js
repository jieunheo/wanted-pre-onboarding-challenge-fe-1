import { useEffect, useState } from 'react';
import { Routes, BrowserRouter as Router, Route, Navigate  } from 'react-router-dom';

import './App.css';
import Navigation from './components/Navigation';
import Auth from './pages/Auth';
import Home from './pages/Home';
import ToDos from './pages/ToDos';
import NotFound from './pages/NotFound';
import TodoItem from './pages/ToDoItem';

function App() {
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState(null);
  
  
  useEffect(() => {
    if(token === localStorage.getItem('token')) return;
    
    if(localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
      setLogin(true);

    } else {
      setToken(null);
      setLogin(false);
    }

  }, [token]);


  return (
    <div>
      <Router>
        <header>
          <Navigation login={login} setToken={setToken} />
        </header>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={!login ? <Auth /> : <Navigate to='/' />} />
          <Route path='/todos/' element={login ? <ToDos /> :  <Auth />} />
          <Route path='/todos/:id' element={login ? <ToDos /> :  <Auth />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

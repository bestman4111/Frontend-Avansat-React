import './App.css';
import ArtistsPage from './artists/ArtistsPage';
import ArtistPage from './artists/ArtistPage';
import { Provider } from 'react-redux';
import { store } from './state';

import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './home/HomePage';

function App() {
    return(
      <Provider store={store}>
        <Router>
          <header className='sticky'>
            <span className='logo'>
              <img src='/assets/logo-no-background.svg' alt='logo' width='75' height='150'/>
            </span>
            <NavLink to='/' className='button rounded'>
              <span className='icon-home'></span>
              Home
            </NavLink>
            <NavLink to='/projects' className='button rounded'>
              Projects
            </NavLink>
          </header>
          <div className='container'>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/projects" element={<ArtistsPage/>}/>
              <Route path='/projects/:id' element={<ArtistPage/>}/>
            </Routes>
          </div>
        </Router>
      </Provider>
    );
};

export default App;

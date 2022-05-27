import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Toolbar from './components/toolbar/Toolbar';
import StartPage from './pages/StartPage';
import CounterPage from './pages/CounterPage';
import FavoritesPage from './pages/FavoritesPage';
import StatisticsPage from './pages/StatisticsPage';
import SingleRecipePage from './pages/SingleRecipePage';
import mainContext from './context/mainContext';
import http from './plugins/http';

function App() {
  const [weightLogs, setWeightLogs] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [dishType, setDishType] = useState('Select dish type');
  const [mealType, setMealType] = useState('Select meal type');
  const [favorites, setFavorites] = useState([]);
  const [planned, setPlanned] = useState([]);
  const [started, setStarted] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchMessage, setSearchMessage] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    async function initialRecipes() {
      const data = await http.get('/initial-recipes');
      if (data.success) {
        setRecipes(data.data.hits);
      }
    }
    initialRecipes();
  }, []);

  return (
    <mainContext.Provider value={{
      weightLogs,
      setWeightLogs,
      recipes,
      setRecipes,
      dishType,
      setDishType,
      mealType,
      setMealType,
      favorites,
      setFavorites,
      planned,
      setPlanned,
      showSearch,
      setShowSearch,
      started,
      setStarted,
      searchMessage,
      setSearchMessage,
      searchKeyword,
      setSearchKeyword,
      searchError,
      setSearchError,
    }}
    >
      <div className="App">
        <Router>
          <Toolbar />
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/calculator" element={<CounterPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/recipe/:rid" element={<SingleRecipePage />} />
          </Routes>
        </Router>
      </div>
    </mainContext.Provider>
  );
}

export default App;

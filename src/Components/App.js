import {BrowserRouter as Router, Routes, Route, useParams} from 'react-router-dom';
import '../Styles/App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import RecipeCard from './RecipeCard';
import MoreInfo from './MoreInfo';
import {useEffect, useState } from 'react';
function App() {
  const [recipes, setRecipes] = useState([]);
  const params = useParams();
  console.log(params)

 
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<RecipeCard recipes = {recipes} setRecipes= {setRecipes}/>}/>
          <Route path='/moreInfo/:id' element={<MoreInfo recipes = {recipes}/>}/>
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;

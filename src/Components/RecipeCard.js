import React from 'react'
import ActualCard from './ActualCard';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../Styles/RecipeCard.css';
import Button from 'react-bootstrap/Button';


function RecipeCard(props) {
  const APP_ID = '5d82d324';
  const APP_KEY = '44b03456762ae6dbaff4473245e8c536';
  
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('Chole');
  const [from,setFrom] = useState(0);
  const [to,setTo] = useState(0);
  const[checkArr,setcheckArr] = useState([]);
  const [upto,setUpto] = useState([]);
 
  useEffect(()=>{
    getRecipes();
  },[query]);

  useEffect(()=>{

  },[checkArr]);

const filteredArr = async()=>{
  let calVal = `${from}-${to}`;
  let ingrVal = `${upto}`;
  
  let strDiet = checkArr.join('&diet=');
  let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  if((from>0&&to>0)||(from==0&&to>0)){
    url =url.concat('&calories=',calVal);
    console.log(url);
  }
  if((checkArr.length>0)){
    url =url.concat('&diet=',strDiet);
    console.log(url);
  }
  if((upto>0)){
    url =url.concat('&ingr=',ingrVal);
    console.log(url);
  }
  await fetch(url).then(response=>response.json()).then((data)=>{
    const recipeFound = data.hits;
    props.setRecipes(recipeFound);
  }).catch(err=>{
    console.log(err,'error');
  })
}

const setNewArr = (e)=>{
  let isChecked = e.target.checked;
  if(isChecked){
    setcheckArr([...checkArr, e.target.value])
    console.log(checkArr,'my new array')
  }
  else{
    return;
  }
}


  const getRecipes = async()=>{
    await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`).then(response=>response.json()).then((data)=>{
      const recipeFound = data.hits;
      props.setRecipes(recipeFound);
    }).catch(err=>{
      console.log(err,'error');
    })
  };

  const updateSearch = (e)=>{
    setSearch(e.target.value);
  };
  const getSearch = (e)=>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }
    
 
  return (
    <div>
        {/* navbar */}
        <Navbar bg="warning" expand="md">
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>Food Search</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
            </Nav>
            <Form className="d-flex" onSubmit={getSearch}>
              <Form.Control
                type="text"
                placeholder="Search"
                className="me-3 "
                aria-label="Search"
                value={search} onChange={updateSearch}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
        </Navbar>


        {/* filter bar */}
        <div className='filterBox'>
        <DropdownButton id="dropdown-basic-button" title="Refine Search By Calories, Diet, Ingredients " variant='success'>
          <div className='filteringCard'>
           <section className='caloriesDiv commonDiv'>
           <h6>Calories</h6>
           <div className='commonInnerDiv'>
           <Form>
              <Form.Label>
                From
              </Form.Label>
              <Form.Control
                type="number"
                onChange={(e)=>setFrom(e.target.value)}
              />
              <Form.Label>
                To
              </Form.Label>
              <Form.Control
                type="number"
                onChange={(e)=>setTo(e.target.value)}
              />
            </Form>
           </div>
           </section>
           {/* diet */}
           <section className='dietDiv commonDiv'>
           <h6>Diet</h6>
           <div className='commonInnerDiv'>
            <Form>
            <Form.Check
            type={'checkbox'}
            label={'Low-Sodium'}
            value='low-sodium'
            onChange={(e)=>setNewArr(e)}
          />
          <Form.Check
            type={'checkbox'}
            label={'High-Fiber'}
            onChange={(e)=>setNewArr(e)}
            value='high-fiber'
          />
          <Form.Check
            type={'checkbox'}
            label={'Low-Carb'}
            onChange={(e)=>setNewArr(e)}
            value='low-carb'
          />
            </Form>
           </div>
          </section>
          <section className='ingreDiv commonDiv'>
          <h6>Ingredients</h6>
          <div className='commonInnerDiv'>
            <Form>
              <Form.Label>
                Upto
              </Form.Label>
              <Form.Control
                type="number"
                onChange={(e)=>setUpto(e.target.value)}
              />
            </Form>
           </div>
          </section>
          </div>
          <Button onClick={filteredArr}>Submit</Button>
        </DropdownButton>
        </div>
       

        {/* cards list */}
        <div className='recipe-main-container'>
        {props.recipes.map(item=>(<ActualCard key={item.recipe.uri} recipeData={item.recipe}/>))}
    </div>
    </div>
  )
}

export default RecipeCard
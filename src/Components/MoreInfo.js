import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import '../Styles/MoreInfo.css';

function MoreInfo() {
//  
  const params = useParams();
  // api key id
  const APP_ID = '5d82d324';
  const APP_KEY = '44b03456762ae6dbaff4473245e8c536';

  // state for single item
  const [single, updateSingle] = useState([]);
  console.log(single.ingredientLines,'recipe');

  // function to fetch api data
  const getOne = async()=>{
    await fetch(`https://api.edamam.com/api/recipes/v2/${params.id}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`).then(response=>response.json()).then((data)=>{
      const recipeFound = data.recipe;
      console.log(data)
      // setting state
      updateSingle(recipeFound);
    }).catch(err=>{
      console.log(err,'error');
    })
  };

  
  useEffect(()=>{
    getOne();
  },[])
 

  return (
    <div className='mainOuterDiv'>
      <div className='firstDiv'>
        <Card style={{ width: '18rem' }}className='imgCard'>
          <Card.Img variant="top" src={single.image}  />
        </Card>
        <Card className='infoCard'>
        <h5>{single.label}</h5>
        <div className='ingreDiv'>
          {/* iterating over array */}
          <ul>
            {single.ingredientLines.map(item=>(<li>{item}</li>))}
          </ul>
        </div>
        <div>
        </div>
        </Card>
      </div>
      <Card className='secondDiv'>
      <Badge bg="secondary">Calories<h6>{single.calories}</h6></Badge>
      <Badge bg="secondary" style={{minWidth:'80px'}}>Time<h6>{single.totalTime}</h6></Badge>
      </Card>
    </div>
  )
}

export default MoreInfo;
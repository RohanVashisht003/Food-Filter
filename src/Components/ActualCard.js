import Card from 'react-bootstrap/Card';
import '../Styles/ActualCard.css';
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';


function ActualCard(props) {
  const{recipeData} = props;
  let uri= recipeData.uri.slice(51);
  return (
    <Card className='cardStyle'>
      <Card.Img variant="top" src={recipeData.image}/>
      <Card.Body className='cardContentContainer'>
        <Card.Title className='titleFont'>{recipeData.label}</Card.Title>
        <div className='infoDiv'>
        <span><span className='variableTextColor'>{Math.round(recipeData.calories)}</span>&nbsp; Calories</span>
        <div className='vr'></div>
        <span><span className='variableTextColor'>{Math.round(recipeData.ingredients.length)}</span>&nbsp; Ingredients</span>
        </div>
        <div className='buttonsDiv'>
        <p className="badge bg-secondary text-wrap text-capitalize">{recipeData.cuisineType}</p>
        
        <Nav.Link as={Link} to={`/moreInfo/${uri}`}>
        More Info &gt;
        </Nav.Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ActualCard;
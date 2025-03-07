import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './RecipeCard.css';


export default function RecipeCard({recipe}) {
  const navigate = useNavigate();
  
  const handleRecipe = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:8000/recipes/${recipe.id}/`, {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + token
      },
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/detail", { state: { recipe: data } });
      } else {

      }
  
  }
// https://www.youtube.com/watch?v=i6A5iEmbCJM



  return (
    <Card className="my-card">
      <Card.Img variant="top" src="holder.js/100px180" className="my-card-img" />
      <Card.Body className="text-center">
        <Card.Title className="my-card-title">{recipe.name}</Card.Title>
        <Card.Text className="my-card-text">
          <div>Diet: {recipe.diets}</div>
          <div>Cuisine: {recipe.cuisine}</div>
          <div>Servings: {recipe.serving}</div>
          <div>Ingredients:</div>
          <div>
            {recipe.ingredients.map( (ingredient) => (
              <div>{ingredient.quantity} {ingredient.name}</div>
            ))}
          </div>
          <div>Steps:</div>
          <div>
            {recipe.steps.map( (step) => (
              <div>{step.description} for {step.prep_time}</div>
            ))}
          </div>
        </Card.Text>
        <Button variant="primary" className="my-card-button" onClick={handleRecipe}>
          View Recipe
        </Button>
      </Card.Body>
    </Card>
  );
}


RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired
}

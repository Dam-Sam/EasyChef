import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import './Detail.css';

function Detail() {
  const location = useLocation();
  const initialRecipe = location.state?.recipe;
  const [recipe, setRecipe] = useState(initialRecipe);
  const [newServing, setNewServing] = useState('')
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const token = localStorage.getItem('token')
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    setNewServing(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:8000/recipes/${recipe.id}/change_serving/${newServing}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })

    if (response.ok) {
      const updatedRecipe = await response.json();
      setRecipe(updatedRecipe);
    } 
  }

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleRating = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:8000/recipes/${recipe.id}/rate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ rating: rating }),
    })

    if (response.ok) {
      const data = await response.json();
      setRecipe(data);
    } 
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:8000/recipes/${recipe.id}/comment/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ comment: comment }),
    })

    if (response.ok) {
      const data = await response.json();
      setRecipe(data);
      
    } 
  }

  const handleMark = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:8000/recipes/${recipe.id}/mark/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })

    if (response.ok) {
      const data = await response.json();
      setRecipe(data);
    } 
  }

  const handleBase = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:8000/recipes/${recipe.id}/create_with_base/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })

    if (response.ok) {
      const data = await response.json();
      setRecipe(data);
      navigate("/myrecipes");
      return;
    } 
  }



  const handleAddToShoppingList = async () => {
    const response = await fetch(`http://127.0.0.1:8000/recipes/${recipe.id}/add/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    if (response.ok) {
      alert('Recipe added to shopping list');
    } 
  };


  return (
    <div className='recipe_body'>
      <div className='detail_container'>
        <h1 className='detail-header'>{recipe.name}</h1>
        <p className='detail-subheader'>Diet: {recipe.diets}</p>
        <p className='detail-subheader'>Cuisine: {recipe.cuisine}</p>
        <p className='detail-subheader'>Servings: {recipe.serving}</p>
        <h3 className='detail-subheader'>Ingredients: </h3>
        <ul className='detail-list'>
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.quantity} {ingredient.name}
            </li>
          ))}
        </ul>


        <h3 className='detail-subheader'>Steps:</h3>
        <ol className='detail-text'>
          {recipe.steps.map((step) => (
            <li key={step.id}>{step.description}
              <div>Prep Time: {step.prep_time}</div>
              <div>Cooking Time: {step.cooking_time}</div>
              <div>Photo: {step.photo}</div>
              <div>video: {step.video}</div>
            </li>
          ))}

        </ol>

        <h4 className='detail-subheader'>Comment:</h4>
        <ol className='detail-text'>
          {recipe.comment.map((comment) => (
            <li key={comment.id}>{comment.comment}
              <div>user: {comment.commentator}</div>
              <div>Photo: {comment.photo}</div>
              <div>video: {comment.video}</div>
            </li>
          ))}

        </ol>

        <p>Prep Time: {recipe.prep_time}</p>
        <p>Cooking Time: {recipe.cooking_time}</p>
        <p>Likes: {recipe.likes}</p>
        <p>Rating:  {recipe.rating}</p>
        <p>Creator: {recipe.creator}</p>
        <p>Photo: {recipe.photo}</p>
        <p>video: {recipe.video}</p>
        <div className='detail-form'> <button onClick={handleAddToShoppingList}> Add to shopping list </button> </div>
        
        <div className='detail-form'>
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              value={newServing}
              onChange={handleInputChange}
              placeholder="Enter new serving"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div class="row">
          <div class="col-sm-4" className='detail-form'>
            <p>Your Rating: </p>
            <form onSubmit={handleRating}>
              <input
                type="number"
                placeholder="Enter a number between 1-5"
                max={5}
                min={1}
                value={rating}
                onChange={handleRatingChange}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
          

          <div class="col-sm-4" className='detail-form'>
          <p>Your Commnet: </p>
            <form onSubmit={handleComment}>
              <input
                type="text"
                placeholder="Enter comment"
                value={comment}
                onChange={handleCommentChange}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>

        <div> <button class="btn btn-warning" onClick={handleMark}> Mark/Unmark </button> </div>
        <div> <button class="btn btn-secondary" onClick={handleBase}> Create as base </button> </div>

      </div>
    </div>
  );
}

export default Detail;
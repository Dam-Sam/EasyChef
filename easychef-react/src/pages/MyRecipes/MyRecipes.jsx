import React from "react";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import RecipeCard from '../../components/Cards/RecipeCard';
import Button from 'react-bootstrap/Button';
// eslint-disable-next-line no-unused-vars
import RecipeSearchResults from "../../components/RecipeSearchResults";
import './MyRecipes.css';
//Basic MyRecipes page - requires work

class MyRecipes extends React.Component {
    
    constructor() {
      super()
      this.state = { recipes: [] }
    }
  
    componentDidMount() {
      //let recipes = [];
      // eslint-disable-next-line no-unused-vars

      const token = localStorage.getItem("token");

      fetch('http://127.0.0.1:8000/recipes/myrecipes/', {
        
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token
        }
      })
        .then(response => response.json())
        .then(data => {
          this.setState({ recipes: data })
        }).catch(console.error);
        
    }

    onDeleteClick = async (recipeId) => {
      const response = await fetch(`http://127.0.0.1:8000/recipes/${recipeId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem("token"),
        },
      });

      if (response.status === 200) {
        window.location.reload();
      } else {
        const errorText = await response.text();
        alert("FAIL: " + errorText);
      }
    };

    render() {
      let slideIndex = 0;

    return (
      <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={120}
      totalSlides={this.state.recipes.length}>
      <div className="slider_controls">
        <ButtonBack class='btn btn-warning custom-btn'>Previous</ButtonBack>
        <ButtonNext class='btn btn-warning custom-btn2'>Next</ButtonNext>
      </div>


      <Slider>
        {this.state.recipes.map((recipe) => (
            <Slide index={slideIndex++}>
                <RecipeCard recipe={recipe}/>
                <a href={`/editRecipe/${recipe.id}`} className="btn btn-primary">
                Edit Recipe
                </a>
                <br></br>
                <button onClick={() => this.onDeleteClick(recipe.id)} className="btn btn-primary" color="black">
                  Delete Recipe
                </button>
            </Slide>
        )
        )}
      
      </Slider>
      
    </CarouselProvider>
      )
  }
  }



export default MyRecipes;



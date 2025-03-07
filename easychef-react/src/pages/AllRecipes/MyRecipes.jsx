import React from "react";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import RecipeCard from '../../components/Cards/RecipeCard';
import Button from 'react-bootstrap/Button';
// eslint-disable-next-line no-unused-vars
import RecipeSearchResults from "../../components/RecipeSearchResults";

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

      fetch('http://127.0.0.1:8000/recipes/allrecipes/', {
        
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


    render() {
      let slideIndex = 0;

    return (
      <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={120}
      totalSlides={this.state.recipes.length}>
                  <ButtonBack>Previous</ButtonBack>
      <ButtonNext>Next</ButtonNext>

      <Slider>
        {this.state.recipes.map((recipe) => (
            <Slide index={slideIndex++}>
                <RecipeCard recipe={recipe}/>
            </Slide>
        )
        )}
      
      </Slider>
      
    </CarouselProvider>
      )
  }
  }



export default MyRecipes;



import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './Carousel.css';
import RecipeCard from './RecipeCard';
//import useToken from './components/useToken';

class RecipeCarousel extends React.Component {
    
    constructor() {
      super()
      this.state = { recipes: [] }
    }
  
    componentDidMount() {
      //let recipes = [];
  
      fetch(global.config.recipes.popular, {
        method: 'GET'
        // headers: {
        //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMDcwMDYxLCJpYXQiOjE2ODA5ODM2NjEsImp0aSI6IjVmYWExOWM3ZWM3MjQ5NGZiY2Y0MTk3NTc1OGUyNGRjIiwidXNlcl9pZCI6MX0.POfFLg_69DyYkICJK7AVddhgBgkSKZVBQAxl87iBPLw'
        // }
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
      <div className="slider_controls">
        <ButtonBack class='btn btn-warning custom-btn'>Previous</ButtonBack>
        <ButtonNext class='btn btn-warning custom-btn2'>Next</ButtonNext>
      </div>

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



export default RecipeCarousel;



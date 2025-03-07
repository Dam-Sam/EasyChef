import React, { useState} from 'react'
import { Button } from 'react-bootstrap';
import '../../App.css';
import RecipeInfo from '../../components/Recipeinfo/Recipeinfo';
import Steps from '../../components/Steps/Steps';
import { useNavigate } from 'react-router-dom';

function CreateRecipe() {
    const [responseMessage, setResponseMessage] = useState('');
    const [recipe, setRecipe] = useState();

    const navigate = useNavigate();

    const token = localStorage.getItem("token");


    function callSteps (steps){
        let updatedRecipe = recipe;
        updatedRecipe.steps = steps;
        setRecipe(updatedRecipe)
        console.log(updatedRecipe)
        return(steps)
    }

    function callRecipeInfo (recipe){
        setRecipe(recipe);
        console.log(recipe)
        return(recipe)
    }

    function createRecipeForSubmit() {
        return {
            name: recipe.name,
            diets: recipe.diets,
            cuisine: recipe.cuisine,
            serving: recipe.serving,
            prep_time: recipe.prep_time,
            cooking_time: recipe.cooking_time,
            ingredients: [],
            steps: []
          };
    }

    const saveIngredient = async (ingredient) => {

        const ingResponse = await fetch(global.config.recipes.createIngredient, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(ingredient)
          })
            .then(response => {
              if(response.status === 201)
              {
                //navigate("/recipecreatedsuccesfully");


              }
              else{
                alert("INGREDIENT FAIL " + response.text())
              }
 
              return response;
            });
      
        const savedIngredient = await ingResponse.json();

        return savedIngredient.id;

    }

    const saveStep = async (step) => {
        step.photo = null;

        const ingResponse = await fetch(global.config.recipes.createStep, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(step)
          })
            .then(response => {
              if(response.status === 201)
              {
                //navigate("/recipecreatedsuccesfully");


              }
              else{
                alert("STEP FAIL " + response.text())
              }
 
              return response;
            });
      
        const savedIngredient = await ingResponse.json();

        return savedIngredient.id;

    }


    const saveRecipe = async (recipe) => {
      let response = await fetch(global.config.recipes.create, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(recipe),
      });
    
      if (response.status === 201) {
        
      } else {
        const errorText = await response.text();
        alert("FAIL: " + errorText);
      }
      const savedRecipe = await response.json();
      return savedRecipe.id;
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        let ingredients = recipe.ingredients;
        let steps = recipe.steps;

        let recipeForSubmit = createRecipeForSubmit();

        for(let i = 0; i < ingredients.length; i++) {
            recipeForSubmit.ingredients.push(await saveIngredient(ingredients[i]))
        }

        for(let i = 0; i < steps.length; i++) {
            recipeForSubmit.steps.push(await saveStep(steps[i]))
        }
        
        //Submit 
        let id = await saveRecipe(recipeForSubmit);

        return navigate("/recipecreatedsuccessfully" + id);

      }
    

    return (
        <>
            <RecipeInfo handleCallRecipeInfo={callRecipeInfo}/>
            <Steps handleCallSteps={callSteps}/>
            <Button style={{ backgroundColor: 'black' }} onClick={handleSubmit}>
          SAVE THIS RECIPE
        </Button>

        </>
    );
}

export default CreateRecipe;
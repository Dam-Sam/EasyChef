import { useState } from 'react';
import { Form, Row, Col, CloseButton, Button } from 'react-bootstrap';
import './Recipeinfo.css';
import DropdownListCheckbox from "../../components/DropdownListCheckbox";
import Select from "react-select";

const RecipeInfo = (props) => {

  const ingredient = {
    name: "",
    quantity: ""
  }
  const [dietOptions, setDietOptions] = useState();
  const [cuisineOptions, setCuisineOptions] = useState();
  const [imagePreview, setImagePreview] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState( {
    name: "",
    diets: "",
    cuisine: "",
    serving: 0,
    prep_time: "",
    cooking_time: "",
    ingredients: [],
    steps: []
  });

  const updateRecipeData = (recipe) => {
    const updatedRecipe = recipe;
    updatedRecipe.ingredients = ingredients;
    setRecipe(updatedRecipe);
    props.handleCallRecipeInfo(updatedRecipe);
  }

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ingredient]);
    updateRecipeData(recipe);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
    updateRecipeData(recipe);

  };

  const handleIngredientChange = (event, index, key) => {
    const newIngredients = [...ingredients];
    newIngredients[index][key] = event.target.value;
    setIngredients(newIngredients);
    updateRecipeData(recipe);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (event) => {
    const updatedRecipe = recipe;
    updatedRecipe.name = event.target.value;
    updateRecipeData(recipe);
  }

  const handleDietChange = (selected) => {
    setDietOptions(selected);
    let dietsString = "";
    selected.map( (dietOption) => {
      dietsString += (dietOption.value+ ", ");
    })
    const updatedRecipe = recipe;
    updatedRecipe.diets = dietsString;
    updateRecipeData(recipe);
    
  };

  const handleCuisineChange = (selected) => {
    setCuisineOptions(selected);
    let cuisinesString = "";
    selected.map( (cuisineOption) => {
      cuisinesString += (cuisineOption.value + ", ");
    })
    const updatedRecipe = recipe;
    updatedRecipe.cuisine = cuisinesString;
    updateRecipeData(recipe);

  };

  const handleServingsChange = (event) => {
    const updatedRecipe = recipe;
    updatedRecipe.serving = event.target.value;
    updateRecipeData(recipe);
  }

  const handlePreptimeChange = (event) => {
    const updatedRecipe = recipe;
    updatedRecipe.prep_time = event.target.value;
    updateRecipeData(recipe);
  }

  const handleCooktimeChange = (event) => {
    const updatedRecipe = recipe;
    updatedRecipe.cooking_time = event.target.value;
    updateRecipeData(recipe);
  }



  return (
    <>
      <div className="d-flex" style={{ maxHeight: '500px' }}>
        <div className="p-5 lign-content-stretch flex-wrap" style={{ backgroundColor: 'orange', 'border-bottom': '5px solid black', 'border-right': '5px solid black', 'border-left': '5px solid black' }}>
          <Form.Group controlId="formFile" style={{}}>
            <Form.Label>Upload Cover Image</Form.Label>
            {imagePreview ? (
              <img src={imagePreview} alt="Recipe Preview" style={{ maxWidth: '300px', maxHeight: '300px', border: '5px solid black' }} />
            ) : (
              <span style={{ border: '5px solid black' }}>No Image Selected</span>
            )}
            <Form.Control type="file" onChange={handleImageChange} style={{ 'margin-top': '10px' }} />
          </Form.Group>
        </div>
        <div className="p-2 flex-grow-1" style={{ backgroundColor: 'orange', 'border-bottom': '5px solid black', 'border-right': '5px solid black' }}>
          <Form>
            <Form.Group controlId="formRecipeName" className="mt-3 mb-3">
              <Form.Label>Recipe Name</Form.Label>
              <Form.Control type="text" placeholder="Enter recipe name" onChange={handleNameChange} />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group controlId="formDiets" className="mb-3">
                  <Form.Label>Diets</Form.Label>
                  <Select
                    options={global.config.diets}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                      DropdownListCheckbox
                    }}
                    onChange={handleDietChange}
                    allowSelectAll={true}
                    value={dietOptions}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formCuisine" className="mb-3">
                  <Form.Label>Cuisine</Form.Label>
                  <Select
                    options={global.config.cuisines}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                      DropdownListCheckbox
                    }}
                    onChange={handleCuisineChange}
                    allowSelectAll={true}
                    value={cuisineOptions}
                  />

                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formTotalPrepTime" className="mb-3">
                  <Form.Label>Total Prep Time (minutes)</Form.Label>
                  <Form.Control type="number" placeholder="Enter total prep time" onChange={handlePreptimeChange}/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formTotalCookTime" className="mb-3">
                  <Form.Label>Total Cook Time (minutes)</Form.Label>
                  <Form.Control type="number" placeholder="Enter total cook time" onChange={handleCooktimeChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formServings" className="mb-3">
                  <Form.Label>Total Servings</Form.Label>
                  <Form.Control type="number" placeholder="Enter total servings" onChange={handleServingsChange} />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <div className="mb-5" style={{ backgroundColor: 'orange', 'border-left': '5px solid black', 'border-right': '5px solid black', 'border-bottom': '5px solid black' }}>
        <h1>Ingredient List</h1>
        <div className="div">
          <Form.Group controlId="formIngredients">
            {ingredients.map((ingredient, index) => (
              <Row key={index} className="justify-content-center mb-3">
                <Col xs={6}>
                  <Form.Control
                    type="text"
                    value={ingredient.name}
                    onChange={(event) => handleIngredientChange(event, index, 'name')}
                    placeholder="Ingredient Name" />
                </Col>
                <Col xs={2}>
                  <Form.Control
                    type="text"
                    value={ingredient.quantity}
                    onChange={(event) => handleIngredientChange(event, index, 'quantity')}
                    placeholder="Quantity" />
                </Col>
                <Col xs={1}>
                  <CloseButton style={{ border: 'solid red 5px', borderRadius: '20px' }} onClick={() => handleRemoveIngredient(index)} />
                </Col>
              </Row>
            ))}
          </Form.Group>
        </div>
        <Button style={{ backgroundColor: 'orange' }} onClick={handleAddIngredient}>
          + Add Ingredient
        </Button>
      </div>
    </>
  );
};

export default RecipeInfo;

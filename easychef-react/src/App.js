import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import SignupSuccess from './pages/Signup/SignupSuccess';
import CreateRecipe from './pages/CreateRecipe/CreateRecipe';
import useToken, { tokenInfo } from './components/useToken';
import Protected from './components/Protected';
import MyRecipes from './pages/MyRecipes/MyRecipes';
import Search from './pages/Search/Search';
import MarkedRecipes from './pages/MarkedRecipes/MyRecipes';
import AllRecipes from './pages/AllRecipes/MyRecipes';
import RecipeCreatedSuccesfully from "./pages/CreateRecipe/RecipeCreatedSuccesfully";
import Edit from "./pages/EditProfile/Edit";
import Detail from "./pages/RecipeDetail/Deta";
import EditRecipe from "./pages/EditRecipe/EditRecipe";
import DeleteRecipe from "./pages/EditRecipe/DeleteRecipe";
import ShoppingList from "./pages/ShoppingList/ShoppingList";

function App() {
  // eslint-disable-next-line
  const { token, setToken } = useToken();
  const { isLoggedIn } = tokenInfo();
  

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<Search />} />
          <Route path="/signupsuccess" element={<SignupSuccess />} />
          <Route path="/recipecreatedsuccessfully" element={<RecipeCreatedSuccesfully />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/editRecipe/:recipeId" element={<EditRecipe />} />
          <Route path="/deleteRecipe/:recipeId" element={<DeleteRecipe />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/shoppinglist" element={<ShoppingList />} />
          <Route path="/create" element={
            <Protected isLoggedIn={isLoggedIn} >
               <CreateRecipe />
            </Protected>
          } />
          <Route path="/myrecipes" element={
            <Protected isLoggedIn={isLoggedIn} >
               <MyRecipes />
            </Protected>
          } />
          <Route path="/marked" element={
            <Protected isLoggedIn={isLoggedIn} >
               <MarkedRecipes />
            </Protected>
          } />
          <Route path="/all" element={
            <Protected isLoggedIn={isLoggedIn} >
               <AllRecipes />
            </Protected>
          } />
        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;

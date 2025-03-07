import React from "react";



//This is a basic starter for a results list component 
//that can be used for search results, my recipes, etc
export default function RecipeSearchResults(results) {
    if(!Array.isArray(results)) return "";

    return (
        <>
        <div>

            {
                results.map((recipe) => (
                <div>
                    <span>{recipe.name} - CHANGE TO A LINK</span>
                </div>
                ))
            }

            </div>

        </>

    )
}
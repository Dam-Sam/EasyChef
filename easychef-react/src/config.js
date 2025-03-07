const baseUrl = "http://localhost:8000/";

module.exports = global.config = {
    serverUrl: baseUrl,

    accounts: {
        loginUrl: baseUrl + "accounts/login/",
        logoutUrl: baseUrl + "accounts/logout/",
        signupUrl: baseUrl + "accounts/signup/",
        enableAuth: true,
    },

    recipes: {
        all: baseUrl + "recipes/allrecipes/",
        popular: baseUrl + "recipes/popular_on_rating/",
        create: baseUrl + "recipes/create/",
        createIngredient: baseUrl + "recipes/createingre/",
        createStep: baseUrl + "recipes/createstep/"
    },  
    search: {
        byName: baseUrl + "search/ByRecipeName/",
        generateByNameUrl: (name) => { return global.config.search.byName + name + "/"}
    },
    diets: [
        { value: "Vegetarian", label: "Vegetarian" },
        { value: "Vegan", label: "Vegan" },
        { value: "Gluten-free", label: "Gluten-free" },
        { value: "Dairy-free", label: "Dairy-free" },
    ],
    cuisines: [
        { value: "Italian", label: "Italian" },
        { value: "Mexican", label: "Mexican" },
        { value: "Chinese", label: "Chinese" },
        { value: "Japanese", label: "Japanese" },
    ],
};

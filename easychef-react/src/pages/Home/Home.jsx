import React from 'react'
import '../../App.css';
import RecipeCarousel from '../../components/Cards/RecipeCarousel';
import Searchbar from '../../components/Searchbar/Searchbar';
import Video from '../../components/Videomain/Videomain';

function Home() {
    return (
        <>
            <Video />
            <Searchbar />
            <RecipeCarousel />
        </>
    );
}

export default Home;
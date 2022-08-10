import * as React from 'react'
import './RecipeGrid.css'
import RecipeCard from '../RecipeCard/RecipeCard'
import apiClient from "../../Services/ApiClient"
import {useAuthNavContext} from "../../Contexts/authNav"
import Loading from '../Loading/Loading'
import { useNavigate } from 'react-router-dom'


export default function RecipeGrid(){
    const [recipes, setRecipes] = React.useState([])
    const {setError, showLoginForm, user} = useAuthNavContext()
    const navigate = useNavigate()
    // page is loading state variable 
    const [pageIsLoading, setPageIsLoading] = React.useState(false)

    const addRecipe = async () => {
        if(!user?.email){
          showLoginForm();
          setError((e) => ({ ...e, form:"You need to be logged in!" }))}
        
        if(user?.email){
          navigate("/recipe/create")
        }
    }

    const mealPlan = async () => {
        if(!user?.email){
          showLoginForm();
          setError((e) => ({ ...e, form:"You need to be logged in!" }))}
        
        if(user?.email){
          navigate("/mealplanner")
        }
    }

    React.useEffect(() => {
        const getRandomRecipes = async () => {
            // set is loading before calling the api
            setPageIsLoading(true)
            const {data, error} = await apiClient.getRecommended()
            if (error) setError((e) => ({ ...e, recommended: error }))
            if (data?.recipes) {
                setRecipes(data.recipes)
            }
            // set is loading after calling the api
            setPageIsLoading(false)
        }
        getRandomRecipes()
    }, [setRecipes])
    return(
        <div className='recipe-over'>
            <div className="recipe-container"> 
                <div className="recipe-btn-wrapper">
                    <h1 className="grid-title">Recommended</h1>
                    <div className="btn-wrapper">
                        <button onClick={addRecipe}>Add a Recipe</button>
                        <button onClick={mealPlan}>My Meal Plan</button>
                    </div>
                </div>
                <hr />
                <div className="recipe-grid">
                    {pageIsLoading ?
                    <Loading />
                    :
                    recipes?.map((recipe, idx) => (
                        <RecipeCard title={recipe.title}
                        recipe_url={recipe.recipe_url}
                        recipe_id={recipe.recipe_id}
                        ownername={recipe.ownername}
                        owner_url={recipe.owner_url}
                        owner_id={recipe.owner_id}
                        category={recipe.category}
                        calories={recipe.calories}
                        key={idx}
                        />
                    ))}
                </div>
            </div>
        </div>
        
    )
}
import * as React from 'react'
import { useParams, Link } from 'react-router-dom'
import {useAuthNavContext} from "../../Contexts/authNav"
import apiClient from "../../Services/ApiClient"
import './RecipeDetail.css'
import Overlay from '../Overlay/Overlay'
import { stripHtml } from "string-strip-html"
import ReviewCard from '../ReviewCard/ReviewCard'
import TextareaAutosize from 'react-autosize-textarea';
import Loading from '../Loading/Loading'
import Updating from '../Updating/Updating'


export default function RecipeDetail() {
  
  //get the recipe parameter from the url
  const {recipeId} = useParams()

  /**
   * Use React useEffect to get more details of the recipe from the API backend.
   */
  const {setError} = useAuthNavContext()

  // the current details of the recipe we are on
  const [recipe, setRecipe] = React.useState([])

  // the recipe is loading state variables
  const [recipeIsFectching, setRecipeIsFetching] = React.useState(false)
  
  React.useEffect(() => {
      const getRecipeById = async () => {
        
        // set recipeIsFetching before calling the api
        setRecipeIsFetching(true)
          const {data, error} = await apiClient.recipeById(recipeId)
          if (error) setError((e) => ({ ...e, recommended: error }))
          if (data?.recipe) {
          setRecipe(data.recipe);
          }
          // set recipeIsFetching after calling the api
        setRecipeIsFetching(false)
      }

      // function to scroll to the top of the page
      const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'auto'});
      }


      getRecipeById()
      //Scroll to the Top of the page
      scrollToTop()
  }, [setRecipe, setError, recipeId])


  React.useMemo(() => {
     // function to scroll to the top of the page
     const scrollToTop = () => {
      window.scrollTo({top: 0, behavior: 'auto'});
    }
    scrollToTop()
  })


  return (
    <div className='recipe-detail-container'>

      {/* Main Information */}
      <RecipeMain recipe={recipe} recipeIsFectching={recipeIsFectching}/>
      {/* Detailed Step Information */}
      <RecipeStep recipe={recipe} recipeIsFectching={recipeIsFectching}/>
        
      <RecipeReview recipeId={recipeId}/>

      <Overlay />
    </div>
  )
}
 

function RecipeMain(recipe){
  const [savedrecipe, setSavedRecipe] = React.useState([])
  const [isSaved, setIsSaved] = React.useState(false)

  // The fetchsave state variable
  // toggle this function between true and false any time the save button is clicked
  const [fetchSave, setFetchSave] = React.useState(false)


  const [longDescription, setLongDescription] = React.useState(false)
  const [totalSaved, setTotalSaved] = React.useState(0)
  const {recipeId} = useParams()
  const {setError, user, showLoginForm, showMealPlannerAddForm, setPopupType, setDeleteAction, showPopup} = useAuthNavContext()

  // function runs when either the save or not saved button is clicked
    const saveRecipe = async () => {

      // Check if the user is not logged in and redirect them to the login form
      if(!user?.email){
        showLoginForm();
        setError((e) => ({ ...e, form:"You need to be logged in!" }))
        return
      }
      
        // if the user is logged in call the api
      if(user?.email){
        const {data, error} = await apiClient.savedRecipe({
          user_id:user.id,
          recipe_id:recipeId
        })

        // if the user did not save the recipe
        if (error) {
          setError((e) => ({ ...e, recommended: error }))
          return
        }
    }

    // toggle fetch save
    if(fetchSave)setFetchSave(false)
    else setFetchSave(true)
  }

    

    // handle when user wants to delete a recipe
    const deleteRecipe = () => { 
      setPopupType("Confirm")
      setDeleteAction("recipe")
      showPopup()
    }


// handle when user want to add a recipe to their mealplan, logged in or not logged in
  const addPlan = async () => {
    if(!user?.email){
      showLoginForm();
      setError((e) => ({ ...e, form:"You need to be logged in!" }))}
    
    if(user?.email){
      showMealPlannerAddForm();
    }
  }

    //run everytime the component is mounted

    const presentableDescription = () => {
        // function to cut description string
        if(!recipe?.recipe?.description?.length){
            return "This recipe has no description"
        }
        else{
          const strArr = stripHtml(recipe.recipe.description).result.split(". ")
          const seeLess = strArr.slice(0,Math.floor(strArr.length / 3)).join(". ")
          const seeMore = strArr.slice(Math.floor(strArr.length / 3) + 1).join(". ")
          return [seeLess, seeMore]
        }

    }

    // updating saved recipes state variable 
    const [saveIsUpdating, setSaveIsUpdating] = React.useState(false)

  // useEffect to fetch the user's saved recipes
    React.useEffect(()=>{
      const getSavedRecipes = async () => {
        const {data, error} = await apiClient.getUsersSavedRecipes()
              if (error) setError((e) => ({ ...e, savedRecipe: error }))
              if (data?.savedrecipe) {
                setSavedRecipe(data.savedrecipe)
              }
              setIsSaved(false)
              data?.savedrecipe?.every( idx => {
                if(parseInt(idx.recipe_id)===parseInt(recipeId)){
                  setIsSaved(true);
                  return ;
                }
              })
      }
      const getTotalSaved = async () => {
        // get the number of saved recipes
        if(true){
          // set setSaveIsUpdating before calling the api
          setSaveIsUpdating(true)
          const {data, error} = await apiClient.totalSaved(recipeId)
        if(data)setTotalSaved(data.num_total)
       }
       // set setSaveIsUpdating after calling the api
       setSaveIsUpdating(false)
      }


      // run the two commands beneath to get the status of saved and the total saved
      getSavedRecipes()
      getTotalSaved()
      
    }, [fetchSave])


  const date= new Date(recipe?.recipe?.recipeadd_date?.split("T")[0]).toDateString().split(" ")
  const nth = function(d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
}


  return(
      <div className="recipe-detail-main">
        {/* Recipe detail info */}
        {
          recipe.recipeIsFectching
          ?
          <Loading />
          :
        <div className="recipe-detail-info">
          {/* Recipe image  */}
          <div className="recipe-detail-img">
            <img src={recipe.recipe.recipe_url} alt="" />
          </div>
          {/* Recipe Text */}
          <div className="recipe-detail-text">
            <h1> {recipe.recipe.name} </h1>
            <h3> Created on {date[1]} {parseInt(date[2])}<sup>{nth(parseInt(date[2]))}</sup> {date[3]}</h3>
            <h3> Recipe by <Link style={{textDecoration: 'none'}} to={`/profile/${recipe?.recipe?.user_id}`}>{recipe.recipe.username}</Link></h3>
            <h4> Categories : {recipe.recipe.category?.charAt(0).toUpperCase()+ recipe.recipe.category?.slice(1)} </h4>
            <h4> Calories: {recipe.recipe.calories} kcal</h4>
            {saveIsUpdating
            ?
            <Updating />
            : 
            totalSaved > 0 
            ? 
            <h6> <i> {totalSaved} users have saved this recipe </i></h6>
            :
            <></>
            }
            <div>
              <p>{presentableDescription()[0]+ ". "}{longDescription? null : <span className='dots' onClick={() => setLongDescription(e => !e)}>(See More)</span>}{longDescription ? <span className='more'>{presentableDescription()[1]} </span> : null}{longDescription? <span className='dots' onClick={() => setLongDescription(e => !e)}>(See Less)</span> : null}</p>
            </div>
          </div>
        </div>
}
          

        {/* Recipe Edit buttons */}
        <div className="recipe-edit-buttons">
          <button onClick={()=>{addPlan();}}> Add to Meal Plan </button>
          {(fetchSave || isSaved) && user?.email ? <button onClick={()=>{saveRecipe()}}> Unsave </button> :<button onClick={()=>{saveRecipe()}}> Save </button>}
          <a href="#review-scroll"><button> Reviews </button></a>
          {/* Recipe Delete button */}
          {recipe.recipe.user_id===user.id && <button onClick={deleteRecipe}> Delete </button>}      
        </div>
      </div>
  )
}

function RecipeStep(recipe){
  const ingredients=[]

  //Maps through recipe.ingredients and pushes them into ingredients array created above
  recipe?.recipe?.ingredients?.split(', '||',').map((element,idx) => {
    ingredients.push(element)})
    
  //Remove all duplicate ingredients from the ingredients array
  const uniqueIngredients = [...new Set(ingredients)];

    // ingredients display state variable
    const [displayIngredients, setDisplayIngredients] = React.useState(false)

    // show ingredients on click
    const showIngredientsOnClick = () => {
      // toggle the displayIngredients state variable
      if(displayIngredients) setDisplayIngredients(false)
      else setDisplayIngredients(true)
    }


    // ingredients display state variable
    const [displayDirections, setDisplayDirections] = React.useState(false)

    // show ingredients on click
    const showDirectionsOnClick = () => {
      // toggle the displayIngredients state variable
      if(displayDirections) setDisplayDirections(false)
      else setDisplayDirections(true)
    }

  return(
    <div className="recipe-detail-step">

      {/* recipe Ingredients */}
      <div className="recipe-detail-ingredients">
        <p className="ingredients-header"> Ingredients </p>
        <hr />
        <p className="dropdown" onClick={showIngredientsOnClick}> {!displayIngredients ? "Show Ingredients" : "Hide Ingredients"} </p>
          {
            recipe.recipeIsFectching 
            ?
            <Loading />
            :
            <ul className={`ingredients-list ${displayIngredients ? "" : "disappear"}`}>
          {uniqueIngredients?.map((element,idx) => {
            if (element !== "" && element !== " ") {
              return <li key={idx}>{element}</li>;
            }
              })}
        </ul>
        }
      </div>


      {/* Recipe directions */}
      <div className="recipe-detail-directions">
        <p className="directions-header"> Directions </p>
        <hr />
        <p className="dropdown" onClick={showDirectionsOnClick}> {!displayDirections ? "Show Directions" : "Hide Directions"} </p>
        {
          recipe.recipeIsFectching
          ?
          <Loading />
          :
          <ol className={`directions-list ${displayDirections ? "" : "disappear"}`}>
        {recipe?.recipe?.instructions?.split('. '||'! ').map((element,idx) => {
          if(element!==""){
              return <li key={idx}>{element}</li>;
          }
        })}
              
        </ol>
        }
      </div>
    </div>
  )
}

function RecipeReview({recipeId}) {
  //use State for review form
  const [comment, setComment] = React.useState("")

  const {user, isLoading, setIsLoading, setError, showLoginForm, reviews, setReviews, showRegisterForm} = useAuthNavContext()

  //fetch all current review on render
  React.useEffect(()=> {
    const fetchReviews = async () => {
      setIsLoading(true)
      const {data, error} = await apiClient.fetchRecipeReviews(recipeId)
      if (error) {
        setError((e) => ({ ...e, reviews:"Something went wrong fetching reviews!" }))
      }

      if(data?.reviews) {
        setReviews(data.reviews)
      }

      setIsLoading(false)
    }

    fetchReviews()
  }, [setError, setIsLoading, setReviews])

  // handle user's comment on the recipe
  const handleOnInputChange = (e) => {
    setComment(e.target.value)
  }

  // handle when user want to post their comment
  const handleOnPost = async () => {
    if(!user?.email){
      showLoginForm();
      setError((e) => ({ ...e, form:"You need to be logged in!" }))
      return
    }
    
    setIsLoading(true)
    const {data, error} = await apiClient.postReview(recipeId, user.id, comment)
    setComment("")
    if (error) {
      setError((e) => ({ ...e, review:"Something went wrong posting review!" }))
    }
    if (data?.review) {
      const {data, error} = await apiClient.fetchRecipeReviews(recipeId)
      if (error) {
        setError((e) => ({ ...e, reviews:"Something went wrong fetching reviews!" }))
      }

      if(data?.reviews) {
        setReviews(data.reviews)
      }
    }

    setIsLoading(false)
  }



  return(
    <div className="recipe-review-main" id="review-scroll">
      <h1>Reviews</h1>
      {/* Add review form */}
      <div className="add-review">
        <div className='add-review-image'>
        {
          user?.imageUrl
          ?
          <img src={user.imageUrl} alt="user profile" />
          :
          <img src="https://toppng.com/uploads/preview/circled-user-icon-user-pro-icon-11553397069rpnu1bqqup.png" alt="default profile" />
        }
        </div>
        <div className='add-review-text'>
          {/* Conditional rendering for when the user is logged in/ not logged in */}
          {window.innerWidth > 420 
          ?
            user?.email ? <TextareaAutosize placeholder={'Leave a review'} onChange={handleOnInputChange} value={comment} style={{ minHeight: 20}}/>
            : <span>You must be <span className="links" onClick={showLoginForm}>logged in</span> to leave a review. Don't have an account? Sign up <span className="links" onClick={showRegisterForm}>here!</span></span>
          :
          user?.email ? <TextareaAutosize placeholder={'Leave a review'} onChange={handleOnInputChange} value={comment} style={{ minHeight: 10, height:10}}/>
            : <span>You must be <span className="links" onClick={showLoginForm}>logged in</span> to leave a review. Don't have an account? Sign up <span className="links" onClick={showRegisterForm}>here!</span></span>
          }
          <hr />
          {user?.email ? <button disabled={!user?.email} onClick={handleOnPost}>{isLoading ? "Loading" : "Post"}</button> : null}
          </div>
      </div>
        {/* Message for when there are no recipe yet */}
      {!reviews.length ? <h3>No reviews yet. Be the first to leave a review!</h3> : null}

      <br />
      {reviews.map((review) => (
        <ReviewCard review={review}  key={review.id} setReviews={setReviews}/>
      ))}
    </div>
)
}
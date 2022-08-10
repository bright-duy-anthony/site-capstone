import * as React from 'react'
import './Popup.css'
import {useAuthNavContext} from "../../Contexts/authNav"
import apiClient from "../../Services/ApiClient"
import { useNavigate, useParams } from 'react-router-dom'
import MealPlannerSuggestion from '../MealPlannerSuggestion/MealPlannerSuggestion'
import PhoneInput from 'react-phone-input-2'
import DragDropFile from '../DragDrop/DragDrop'
import validator from 'validator'

export default function Popup(){
    //needed functions from useAuthNavContext
    const {popupType, closePopup, showRegisterForm, showLoginForm, error, setError, setUser, isLoading, setIsLoading, user, setMealPlan, getMealPlan, deleteAction, setDeleteAction, deleteAllGetMealPlan, isPwChanged, setIsPwChanged, displaySuggestion, setDisplaySuggestion, setReviews, file, setFile} = useAuthNavContext()

    const [form, setForm] = React.useState({
        email: "",
        password: "",
        confirm_password: "",
        username: "",
        dob: "",
        last_name: "",
        first_name: "",
        image_url: file?.fileByteA ? file?.fileByteA : null,
        bio: ""
    })

    //Recipe ID for Recipe Details page
    const {recipeId} = useParams()
    // suggestion list state variable
    const [suggestionList, setSuggestionList] = React.useState([])

    //Form made specifically for meal planner
    const [formPlan, setFormPlan] = React.useState({
        recipe_id: '',
        day: 'Sunday',
        user_id: '',
        recipe_name: ""
    })
    //Form made specifically for meal planner add button
    const [formPlanAdd, setFormPlanAdd] = React.useState({
        recipe_id: '',
        day: 'Sunday',
        user_id: '',
    })
    //Form made specifically for meal planner shopping list button
    const [formPlanShoppingList, setformPlanShoppingList] = React.useState({
        phone_number: ``,
        message:``
    })

    //use state for register pages
    const [page, setPage] = React.useState("page1")

    const navigate = useNavigate()

    //Function that handles the value of form for login/signup
    const handleOnFormInputChange = (event) => {
        //prevent the events default behaviour  
        event.preventDefault()
        
        if (event.target.name === "email") {
            if (!validator.isEmail(event.target.value)) {
                setError((e) => ({ ...e, email: "Please enter a valid email." }))
            } else {
                setError((e) => ({ ...e, email: null }))
            }
        }
        if (event.target.name === "password" && popupType === "Register") {
            if (event.target.value !== form.confirm_password) {
                setError((e) => ({ ...e, confirm_password: "Password do not match." }))
            } else {
                setError((e) => ({ ...e, confirm_password: null }))
            }
        }
        if (event.target.name === "confirm_password" && popupType === "Register") {
            if (event.target.value !== form.password) {
                setError((e) => ({ ...e, confirm_password: "Password do not match." }))
            } else {
                setError((e) => ({ ...e, confirm_password: null }))
            }
        }
        //set the value of the form

        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }
    //Function that handles the value of form for mealplanner form
    const handleOnFormInputChangeMealPlanner = async (event) => {
        //prevent the events default behaviour  
        event.preventDefault()
        
        setFormPlan((f) => ({ ...f, [event.target.name]: event.target.value }))

        // change the suggestion list if the input changed is the recipe name
        if(event.target.name === "recipe_name"){

            // get the value from the input field
            var word = event.target.value

            // if word is empty, replace it
            if(word === ""){
                word = "%20"
            }
            // call the api client
            const {data} = await apiClient.getSuggestion(word)

            if(data){
                setSuggestionList(data.suggestions)
        }
        }
    }

    const inputRef = React.useRef(null);

    // function for pressing enter while searching
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && form.email !== "" && form.password !== "") {
            handleOnSubmit(event)
        }
    }

    // Function that runs when the input field is focused on
    const handleOnFormInputFocusMealPlanner = async (event) => {
        //prevent the events default behaviour  
        event.preventDefault()

        //display the suggestions
        setDisplaySuggestion(true)

        // get the text from the input field
        var word = formPlan.recipe_name

        // if word is empty, replace it
        if(word === ""){
            word = "%20"
        }
        // call the api client
        const {data} = await apiClient.getSuggestion(word)

        if(data){
            setSuggestionList(data.suggestions)
        }
    }

    //Function that handles the value of form for mealplanner add button form
    const handleOnFormInputChangeMealPlannerAdd = (event) => {
        //prevent the events default behaviour  
        event.preventDefault()
        
        setFormPlanAdd((f) => ({ ...f, [event.target.name]: event.target.value }))
    }

    const handleOnFormInputShoppingList = (event) => {
        setformPlanShoppingList((f)=>({...f, phone_number: event}))
    }

    //signup/signin/mealplanner function
    const handleOnSubmit = async () => {
        setIsLoading(true)
        setError((e) => ({ ...e, form: null }))
        setError((e) => ({ ...e, email: null }))
        setError((e) => ({ ...e, confirm_password: null }))
        
        if ((form.password_confirm === "" || form.password !== form.confirm_password) && popupType === "Register") {
            return
        }

        var dataUse, errorUse
        if (popupType === "Register") {
            const {data, error} = await apiClient.signupUser({
                firstName: form.first_name,
                lastName: form.last_name,
                email: form.email,
                dob: form.dob,
                password: form.password,
                userName: form.username,
                description:form.bio,
                image_url: file?.fileByteA ? file?.fileByteA : "",
            })
            dataUse = data
            errorUse = error
        } else if (popupType === "Login") {
            const {data, error} = await apiClient.loginUser({
                email: form.email,
                password: form.password
            })
            dataUse = data
            errorUse = error
        }else if (popupType === "MealPlanner") {

            if(inputRef.current.value === "" || inputRef.current.value === " "){
                setError((e) => ({ ...e, form: "Recipe does not exist" }))
                setIsLoading(false)
                return
            }

            // check if the recipe exists
            const dataprior = await apiClient.getRecipeIdByName(formPlan.recipe_name)
            
            // check if datapriior has an error and set it 
            if(dataprior.error){
                errorUse = dataprior.error
                setError((e) => ({ ...e, form: errorUse }))
                setIsLoading(false)
                return
            }
            

            const {data, error} = await apiClient.createMealPlan({
                recipe_id: dataprior.data.recipe_id.id,
                weekday: formPlan.day,
                user_id: user?.id
            })
            dataUse = data
            errorUse = error
            inputRef.current.value = ""
        }else if (popupType === "MealPlannerAdd") {
            const {data, error} = await apiClient.createMealPlan({
                recipe_id: recipeId,
                weekday: formPlanAdd.day,
                user_id: user?.id
            })
            dataUse = data
            errorUse = error
        }else if (popupType === "ShoppingList") {
            const message=localStorage.getItem("shoppinglist")
            const {data, error} = await apiClient.sendsms({
                to:formPlanShoppingList.phone_number,
                body:message
            })
            localStorage.setItem("shoppinglist",null)
            dataUse = data
            errorUse = error
        }
                
        if (errorUse) {
            setError((e) => ({ ...e, form: errorUse }))
            setIsLoading(false)
            return
            }
        if (dataUse?.user) {
            apiClient.setToken(dataUse.token)
            setUser(dataUse?.user)
            reset()
        }
        setIsLoading(false)

        if(popupType==="MealPlanner"){
            //Going to be used for the Meal Planner Page to close the popup and update the mealplanner
            closePopup();
            getMealPlan();
        }else if(popupType==="MealPlannerAdd"){
            //Going to be used for the Meal Planner Page to close the popup and redirect the mealplanner
            closePopup();
            navigate("/mealplanner")
        }
        else if(popupType==="ShoppingList"){
            closePopup();
        }
        
    }

    // handle logging out the user when they delete their account
    const handleLogout = async () => {
        await apiClient.logoutUser()
        setUser({})
        setError(null)
        reset()
        navigate("/")
    }

    // handle the functionality when the user confirm their action
    const handleOnConfirm = async () => {
        setIsLoading(true)
        if (deleteAction === "account") {
            const {data, error} = await apiClient.deleteUser({
                user_id: user.id
            })
            if (error) { 
                setError((e) => ({ ...e, userDelete: error }))
                return
            }
            handleLogout()
        } else if (deleteAction === "mealPlan") {
            deleteAllGetMealPlan()
        } else if (deleteAction === "recipe") {
            const {data, error} = await apiClient.recipeDelete(recipeId)
            if (error) {
                setError((e) => ({ ...e, recipeDelete: error }))
                return
            }
            navigate("/")
        } else if (deleteAction === "review") {
            const review_id = localStorage.getItem("review_id")
            const {data, error} = await apiClient.deleteReview(review_id)
            if (error) {
                setError((e) => ({ ...e, reviewDelete: error }))
                return
            } else {
                const {data, error} = await apiClient.fetchRecipeReviews(recipeId)
                if (error) {
                    setError((e) => ({ ...e, reviews:"Something went wrong fetching reviews!" }))
                }

                if(data?.reviews) {
                    setReviews(data.reviews)
                }
            }
            localStorage.setItem("review_id", null)
        }
        setDeleteAction("")
        closePopup()
        
        setIsLoading(false)
    }

    //reset form and errors function 
    const reset = () => {
        setFile({})
        setForm((f) => ({ ...f, ["first_name"]: "" }))
        setForm((f) => ({ ...f, ["last_name"]: "" }))
        setForm((f) => ({ ...f, ["email"]: "" }))
        setForm((f) => ({ ...f, ["password"]: "" }))
        setForm((f) => ({ ...f, ["confirm_password"]: "" }))
        setForm((f) => ({ ...f, ["username"]: "" }))
        setForm((f) => ({ ...f, ["dob"]: "" }))
        setForm((f) => ({ ...f, ["bio"]: "" }))
        setError((e) => ({ ...e, form: null }))
        setError((e) => ({ ...e, email: null }))
        setError((e) => ({ ...e, confirm_password: null }))
        setPage("page1")
    }

    //useEffect to close the popup form when user are logged in
    React.useEffect(() => {
        if (user?.email && popupType!=="MealPlanner" && popupType!=="MealPlannerAdd" && popupType!=="ShoppingList") {
            closePopup()
        }
    })

    var formHTML
    
    // creating different popup type
    if (popupType === "Login") {
        formHTML = 
        <div className="form">
            <div className="input-field">
                <label htmlFor="Email">Email</label>
                <input type="email" name="email" placeholder="user@gmail.com"  onChange={handleOnFormInputChange} onKeyDown={handleKeyDown} maxLength="70"/>
            </div>
            <div className="input-field">
                <label htmlFor="Password">Password</label>
                <input type="password" name="password" placeholder="password"  onChange={handleOnFormInputChange} onKeyDown={handleKeyDown} maxLength="60"/>
            </div>
            <div className="footer">
                <p>Don't have an account? <br/> Sign up&nbsp;
                    <span className='here-btn' onClick={(e) => {e.stopPropagation();setError((e) => ({ ...e, form: null }));setError((e) => ({ ...e, email: null }));showRegisterForm(); }}>here</span>.
                </p>
                <button className="footer-btn" disabled={isLoading} onClick={handleOnSubmit}>
                    {isLoading ? "Loading..." : "SIGNIN"}
                </button>
            </div>
        </div>
    } else if (popupType === "Register") {
        if (page === "page1") {
        formHTML = <div className="form">
        <div className="input-field split">
            <div className="input-row">
                <label htmlFor="First Name">First Name</label>
                <input type="text" name="first_name" value={form.first_name} placeholder="first"  onChange={handleOnFormInputChange} maxLength="30"/>
            </div>
            <div className="input-row">
                <label htmlFor="Last Name">Last Name</label>
                <input type="text" name="last_name" value={form.last_name} placeholder="last"  onChange={handleOnFormInputChange} maxLength="30"/>
            </div>
        </div>
        <div className="input-field">
            <label htmlFor="Email">Email</label>
            <input type="email" name="email" value={form.email} placeholder="user@gmail.com"  onChange={handleOnFormInputChange} maxLength="70"/>
        </div>
        <div className="input-field">
            <label htmlFor="Password">Password</label>
            <input type="password" name="password" value={form.password} placeholder="password" onChange={handleOnFormInputChange} maxLength="60"/>
        </div>
        <div className="input-field">
            <label htmlFor="Confirm Password">Confirm Password</label>
            <input type="password" name="confirm_password" value={form.confirm_password} placeholder="password" onChange={handleOnFormInputChange} maxLength="60"/>
        </div>
        {(error?.confirm_password !== null && form.confirm_password !== "")  ? <span className="error">Password do not match.</span> : null}
        <div className="footer">
            <p>Already have an account? <br/> Sign in&nbsp;
                <span className='here-btn' onClick={(e) => {e.stopPropagation();setError((e) => ({ ...e, form: null }));setError((e) => ({ ...e, email: null }));showLoginForm(); }}>here</span>.
            </p>
            <button disabled={form.first_name === "" || form.last_name === "" || form.password === "" || form.confirm_password === "" || form.email === "" || error?.email || error?.confirm_password} className="footer-btn" onClick={() => setPage("page2")}>
                NEXT
            </button>
        </div>
    </div>
    } else {
        formHTML = <div className="form">
            <div className="input-field split">
                <div className="input-row">
                    <label htmlFor="username">Username *</label>
                    <input type="text" name="username" placeholder="username" value={form.username} onChange={handleOnFormInputChange} maxLength="30"/>
                </div>
                <div className="input-row">
                    <label htmlFor="DOB">DOB *</label>
                    <input type="date" name="dob" className='calendar' onChange={handleOnFormInputChange}/>
                </div>

            </div>
            <div className="input-field">
                {/* Using drag and drop upload file instead of image URL */}
                <label htmlFor="Image">Image (Optional)</label>
                <DragDropFile />

            </div>
            <div className="input-field">
                <label htmlFor="description">Bio (Optional)</label>
                <input type="text" name="bio" placeholder="Bio" value={form.bio} onChange={handleOnFormInputChange} maxLength="280"/>
            </div>
            <div className="footer">
                <p>Already have an account? <br/> Sign in&nbsp;
                    <span className='here-btn' onClick={(e) => {e.stopPropagation();setError((e) => ({ ...e, form: null }));setError((e) => ({ ...e, email: null }));showLoginForm(); }}>here</span>.
                </p>
                <button className="footer-btn" disabled={isLoading || form.dob === "" || form.username === "" } onClick={handleOnSubmit}>
                    {isLoading ? "Loading..." : "SIGNUP"}
                </button>
            </div>
        </div>}
        
    }else if(popupType==="MealPlanner"){
        formHTML = 
        <div className="form">
            <div className="input-field">
                <label htmlFor="RecipeName">Recipe's Name</label>
                <input type="name" name="recipe_name" onChange={handleOnFormInputChangeMealPlanner} onFocus={handleOnFormInputFocusMealPlanner} ref={inputRef} maxLength="60"/>
            </div>
            <div className="meal-suggestion">
                {displaySuggestion 
                ?
                <MealPlannerSuggestion suggestionList={suggestionList} setFormPlan={setFormPlan} setDisplaySuggestion={setDisplaySuggestion} inputRef={inputRef}/>
                :
                <></>
                }
            </div>
            <div className="input-field">
                <label htmlFor="Password">Day of week</label>
                <select id="day" name="day" onChange={handleOnFormInputChangeMealPlanner}>
                    <option name="day" disabled={true}>--Select your option--</option>
                    <option name="day">Sunday</option>
                    <option name="day">Monday</option>
                    <option name="day">Tuesday</option>
                    <option name="day">Wednesday</option>
                    <option name="day">Thursday</option>
                    <option name="day">Friday</option>
                    <option name="day">Saturday</option>
                </select>
            </div>
            <div className="footer">
                <button className="footer-btn" disabled={isLoading} onClick={handleOnSubmit}>
                    {isLoading ? "Loading..." : "ADD"}
                </button>
            </div>
        </div>
    }else if(popupType==="MealPlannerAdd"){
        formHTML = 
        <div className="form">
            <div className="input-field">
                <label htmlFor="Password">Day of week</label>
                <select id="day" name="day" onChange={handleOnFormInputChangeMealPlannerAdd}>
                    <option name="day" disabled={true}>--Select your option--</option>
                    <option name="day">Sunday</option>
                    <option name="day">Monday</option>
                    <option name="day">Tuesday</option>
                    <option name="day">Wednesday</option>
                    <option name="day">Thursday</option>
                    <option name="day">Friday</option>
                    <option name="day">Saturday</option>
                </select>
            </div>
            <div className="footer">
                <button className="footer-btn" disabled={isLoading} onClick={handleOnSubmit}>
                    {isLoading ? "Loading..." : "ADD"}
                </button>
            </div>
        </div>
    } else if (popupType === "Confirm") {
        // the confirm popup 
        formHTML = <div className="delete-confirm">
        <div className="delete-header">
            {deleteAction === "account" ? <h3>Delete Account</h3> : null}
            {deleteAction === "mealPlan" ? <h3>Reset Meal Plan</h3> : null}
            {deleteAction === "recipe" ? <h3>Delete Recipe</h3> : null}
            {deleteAction === "account" ? <span>Are you sure you want to delete your account? [Caution:] This action is irreversible! </span> : null}
            {deleteAction === "mealPlan" ? <span>Are you sure you want to reset your meal plan? [Caution:] This action is irreversible! </span> : null}
            {deleteAction === "recipe" ? <span>Are you sure you want to delete this recipe? [Caution:] This action is irreversible! </span> : null}
            {deleteAction === "review" ? <span>Are you sure you want to delete this review? [Caution:] This action is irreversible! </span> : null}
        </div>
        <div className="delete-footer">
            <button onClick={closePopup}>Cancel</button>
            {deleteAction === "account" ? <button onClick={handleOnConfirm}>Delete Account</button> : null}
            {deleteAction === "mealPlan" ? <button onClick={handleOnConfirm}>Reset Meal Plan </button> : null}
            {deleteAction === "recipe" ? <button onClick={handleOnConfirm}>Delete Recipe</button> : null}
            {deleteAction === "review" ? <button onClick={handleOnConfirm}>Delete Review</button> : null}
        </div>
    </div>
    }else if(popupType==="ShoppingList"){
        formHTML = 
        <div className="form">
            <div className="input-field">
                <label htmlFor="Password">Enter Phone Number:</label>
                <PhoneInput country="us" type="tel" value={formPlanShoppingList.phone_number} name="phone_number" onChange={handleOnFormInputShoppingList} maxLength="40"/>
            </div>
            <div className="footer">
                <button className="footer-btn" disabled={isLoading} onClick={handleOnSubmit}>
                    {isLoading ? "Loading..." : "SEND"}
                </button>
            </div>
        </div>
    } 

    return(
        <div className="popup-container" >
            <div className={`popup-card ${popupType.toLowerCase()}`} onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={(e) => {e.stopPropagation();closePopup(); reset();}}>&times;</button>
                {popupType === "Register" && page !== "page1" ? <div className="back-btn" onClick={(e) => {e.stopPropagation();setPage("page1");}}><i className="fa-regular fa-circle-left"></i></div> : null}
                {popupType === "Login" || popupType === "Register" || popupType === "Confirm" ? <h1>{popupType}</h1> : null}
                {popupType === "MealPlanner" || popupType === "MealPlannerAdd" ? <h1>Add to Meal Plan</h1> : null}
                {(error?.form) ? <span className="error">{error?.form}</span> : null}
                {(error?.email !== null && form.email !== "") ? <span className="error">Please enter a valid email.</span> : null}
                {formHTML}
            </div>
        </div>
    )
}
import * as React from 'react'
import './SearchResultCard.css'
import {Link} from 'react-router-dom'
import moment from 'moment'
import { stripHtml } from "string-strip-html"

export default function SearchResultCard({even, recipe}) {
    
    
    //run everytime the component is mounted

    const presentableDescription = () => {
        // function to cut description string
        if(recipe.description.length > 217){
            return stripHtml(recipe.description).result.substring(0,217) + "..."
        }
        else{
            return stripHtml(recipe.description).result
        }

    }
    React.useEffect(() => {
        
        
    }, [])

  return (
    <div className={`search-result-card ${even ? "even" : ""}`}>

         {/* displays the result card */}
        <div className="result-image">
                {/* Load the main image here */}
            <Link to={`/recipe/${recipe.id}`}>
                <img src={recipe.recipe_url ? recipe.recipe_url : "https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Chocolate-Lover-s-Pancakes_EXPS_TOHCA19_133776_B03_15_3b_rms.jpg"} alt=""/>
            </Link>
        </div>

        {/* displays the result information */}
        <div className="result-information">
            
            {/* displays result name */}
            <div className="result-name">
                <Link to={`/recipe/${recipe.id}`}>
                    <h1> {recipe.name} </h1>
                </Link>
            </div>

            {/* displays result details */}
            <div className="result-detail">

                {/* displays user's profile image */}
                <div className="result-profile-img">
                    <Link to={`/profile/${recipe.user_id}`}>
                    {recipe.user_url 
                    ? 
                    <img src={recipe.user_url} /> 
                    : 
                    <img src="https://toppng.com/uploads/preview/circled-user-icon-user-pro-icon-11553397069rpnu1bqqup.png" alt="" className='default'/>
                    }
                    </Link>
                </div>

                {/* displays the user's handle */}
                <div className="result-profile-name">
                    <Link to={`/profile/${recipe.user_id}`}>
                        <p>By {recipe.owner}</p>
                    </Link>
                </div>

                {/* displays the result stars */}
                <div className="result-stars">
                    {/* <p><b>PlaceHolder Stars</b></p> */}
                    {/* <p> 3 stars </p> */}
                </div>
            </div>

            {/* displays the contents of the result */}
            <div className="result-contains">
                <p> <b> {presentableDescription()} </b> </p>
            </div>

            {/* displays the result creation date in moment form */}
            <div className="result-creation-date">
                <p> Last updated: {recipe.updated_at ? moment(recipe.updated_at).fromNow() : moment(recipe.created_at).fromNow()} </p>
            </div>
        </div>
    </div>
  )
}

import * as React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown'
import './Sidebar.css'
import { useAuthNavContext } from '../../Contexts/authNav'

export default function Sidebar(){
    const navigate = useNavigate()

    // Variable to control the dropdown of the category button on the sidebar
    const [isDropped, setIsDropped] = React.useState(false) 

    // setResultsType from the auth context 
    const {setResultsType, visibleSidebar, setVisibleSidebar} = useAuthNavContext()

    // Function that handles category dropdown
    const handleCategoryDropdown = (event) =>{
        //prevent the default behviour
        event.preventDefault()

        /** Reverse the state of dropdown when the button is clicked.
         * 
         * True => False  and False => True
        **/
         if(isDropped) closeDropdown()
         else setIsDropped(true)
        
    }

    /*Function to close the categories dropdown
            This function should be called when any link is clicked
    */ 
    const closeDropdown = () => {
        setIsDropped(false)
    }

    const handleSidebarOnClick = (name) => {

       if( name.includes("user")){
        // set the resultstype to name
        setResultsType(name)

        // navigate to the search link
        navigate('/usersearch')
        setVisibleSidebar(false)
        return
       }

        // set the resultstype to name
        setResultsType(name)

        // navigate to the search link
        navigate('/search')
        setVisibleSidebar(false)
    }

    return(

        // The container for all the sidebar components
        <aside className={visibleSidebar ? "sidebar-open" : "sidebar-closed"} >
            
            {/* The div containing the various buttons to the various pages as a flex box */}
            <div className="sidebar-open-contents">

                {/* The Categories button  To be changed to a drop down*/}
                <button>
                    <img src="https://cdn-icons-png.flaticon.com/512/4743/4743041.png" alt="categories" />  
                    <p> Categories </p>
                    <img src="https://cdn-icons-png.flaticon.com/512/271/271228.png" alt="dropdown" id="category-dropdown" className={isDropped ? 'drop' : ''} onClick={handleCategoryDropdown}/>
                </button>


                {/* Conditional rendering for the Category dropdown based on the {isDropped} state*/}

                {isDropped ? <CategoryDropdown /> : <></>}


                {/* Recent button */}
                    <div className='toppy' onClick={() => {handleSidebarOnClick('recents')}}>
                        <img src="https://www.shareicon.net/data/512x512/2015/09/28/108596_clock_512x512.png" alt="recent" />
                        <p> Recents </p>
                    </div>
                
                <div className='toppy' onClick={() => {handleSidebarOnClick('randomuser')}}>

                    <img src="https://icons-for-free.com/iconfiles/png/512/person+user+icon-1320166085409390336.png" alt="search users" />
                    <p> Users </p>  
                </div>
                
                {/* Liked Recipe button */}
                <Link to='/about' onClick={() => setVisibleSidebar(false)}>
                    <img src="https://w7.pngwing.com/pngs/69/977/png-transparent-retail-shop-fitting-metal-about-us-icon-cdr-retail-eps-thumbnail.png" alt="liked recipes" /> 
                    <p> About us </p>
                </Link>
                
            </div>
        </aside>
    )
}
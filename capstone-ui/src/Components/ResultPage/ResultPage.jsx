import * as React from 'react'
import './ResultPage.css'
import SearchResultGrid from '../SearchResultGrid/SearchResultGrid'
import { useAuthNavContext } from '../../Contexts/authNav'
import ApiClient from '../../Services/ApiClient'
import Overlay from '../Overlay/Overlay'
import { useLocation } from 'react-router-dom'


export default function ResultPage() {


  /** Get the resultsType,
   *  searchWord
   *  state from the authcontext*/  
  const {resultsType, searchWord, currCategory, setResultsType, setSearchWord} = useAuthNavContext()

  // display filter state variable
  const [displayFilter, setDisplayFilter] = React.useState(false)

  // filter condition state variable
  const [filter, setFilter] = React.useState("")

  // Recipe array state variable
  const [recipeList, setRecipeList] = React.useState([])

  // Banner Content state variable
  const [bannerContent, setBannerContent] = React.useState("")

   // page is loading state variable 
   const [pageIsLoading, setPageIsLoading] = React.useState(false)

  // Onclick function to fiter the search result
  const handleOnSetFilter = (mealType) => {
    //This function sets the filter variable to a word, allowing us to filter the recipe list by meal type

    //set filter variable
    setFilter(mealType)

    //set the results type to the special condition if mealType is not ("")
    if(mealType !== "") setResultsType("searchbar filter")
  }

  //Create a React useEffect that will handle A ton of conditional rendering
  React.useEffect(() => {

    async function run() {

    /**  Special condition for the resultsType, 
     * 
     * check if resultsType does not contain (filter)
    */
    if(!resultsType.includes("filter")){
      //set the filter to empty
      handleOnSetFilter("")
    }
    // If the webpage is routed to using the search bar setDisplayFilter to true
    if(resultsType.includes("searchbar")) {
      // display the filter button
      setDisplayFilter(true)

      // If the searchword is empty, do nothing //Error checking 
      if(searchWord === "")  return


      // set is loading before calling the api
      setPageIsLoading(true)
      //Call the corresponding api request
      const {data, error} = await ApiClient.recipeSearch(searchWord.replace(/ /g, '%20'), filter.replace(/ /g, '%20'))
      // If there is an error send it to the console
      if(error) console.error(error)

      //If there is data, set recipe list to it
      if(data) setRecipeList(data.result)
    
      // set is loading after calling the api
      setPageIsLoading(false)
      scrollToTop()
    }
    else {
      setSearchWord("")
      if(resultsType === "sidebar"){
        //  Make filter options invisible when coming from sidebar
        setDisplayFilter(false)

        // set is loading before calling the api
      setPageIsLoading(true)

        //Call the corresponding api request
        const {data, error} = await ApiClient.recipeCategory(currCategory.replace(/ /g, '%20'))
        // If there is an error send it to the console
        if(error) console.error(error)

        //If there is data, set recipe list to it
        if(data) setRecipeList(data.result)

        // set is loading after calling the api
      setPageIsLoading(false)
      scrollToTop()
      }

      if(resultsType === "recents"){
        //  Make filter options invisible when coming from sidebar
        setDisplayFilter(true)

         // set is loading before calling the api
      setPageIsLoading(true)

        //Call the corresponding api request
        const {data, error} = await ApiClient.recipeRecent()
        // If there is an error send it to the console
        if(error) console.error(error)

        //If there is data, set recipe list to it
        if(data) setRecipeList(data.result)
        // set is loading after calling the api
      setPageIsLoading(false)
      scrollToTop()
        }

        
      }
    
  }
    
  // run the above function
  run()

  // function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  } 

  
  }, [resultsType, searchWord, currCategory, filter])

  
  return (
    <div className='result-page'>

      {/* the div containing the result display*/}
        <SearchResultGrid recipeList={recipeList} displayFilter={displayFilter} handleOnSetFilter={handleOnSetFilter} filter={filter} pageIsLoading={pageIsLoading}/>
        <Overlay />
    </div>
  )
}
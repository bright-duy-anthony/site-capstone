import * as React from 'react'
import './FollowPage.css'
import UserSearchGrid from '../UserSearchGrid/UserSearchGrid'
import ApiClient from '../../Services/ApiClient'
import { useAuthNavContext } from '../../Contexts/authNav'
import Overlay from '../Overlay/Overlay'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'


export default function FollowPage() {
  // User array state variable
  const [usersList, setUsersList] = React.useState([])

  // loading followers state variable
  const [followIsLoading, setFollowerIsLoading] = React.useState(false)

  //get profileId and the followType from the useparams
  const {profileId, followType} = useParams()

  React.useEffect(() => {
    async function run(){

        // check the followType
        if(followType === "following"){

          // set the loading variable before calling the api
          setFollowerIsLoading(true)

          // Call the corresponding api request
            const {data, error} = await ApiClient.getProfileFollowing(profileId)

            //If there is an error send it to the console
            if(error) console.error(error)

            // If there is data, set recipe list to it
            if(data) setUsersList(data.result)

            // set the loading variable after calling the api
          setFollowerIsLoading(false)
        }
        else if(followType === "followers"){
          // set the loading variable before calling the api
          setFollowerIsLoading(true)

            // Call the corresponding api request
            const {data, error} = await ApiClient.getProfileFollowers(profileId)

            //If there is an error send it to the console
            if(error) console.error(error)

            // If there is data, set recipe list to it
            if(data) setUsersList(data.result)

            // set the loading variable after calling the api
          setFollowerIsLoading(false)
        }
        else{
        }
    }

    // run the above function
    run()
    
 }, [])


  return (
    <div className='usersearchpage'>
      
      {/* the div containing the result display*/}
        {followIsLoading 
        ?
        <Loading />
        :
          <UserSearchGrid usersList={usersList}/>
          }
        <Overlay />
    </div>
  )
}
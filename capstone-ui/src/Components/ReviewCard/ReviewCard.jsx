import * as React from 'react'
import './ReviewCard.css'
import { useAuthNavContext } from '../../Contexts/authNav'
import { Link } from 'react-router-dom'

export default function ReviewCard({review}) {
    
    const [comment, setComment] = (review?.comment)
    const {user, setPopupType, setDeleteAction, showPopup} = useAuthNavContext()

    function timeSince() {

        var seconds = new Date(Date.now()) - new Date(review?.created_at);
    
        var interval = seconds / 31536000000;
    
        if (interval > 1) {
            return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000000;
        if (interval > 1) {
            return Math.floor(interval) + " months";
        }
        interval = seconds / 86400000;
        if (interval > 1) {
            return Math.floor(interval) + " days";
        }
        interval = seconds / 3600000;
        if (interval > 1) {
            return Math.floor(interval) + " hours";
        }
        interval = seconds / 60000;
        if (interval > 1) {
            return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds / 1000) + " seconds";
    }

    const handleOnDelete = () => {
        setPopupType("Confirm")
        setDeleteAction("review")
        localStorage.setItem("review_id", review.id)
        showPopup()
    }

  return ( 
    <div className='review-card'>
        <div className="review-img">
            <Link to={`/profile/${review.user_id}`}>
                <img src={review?.image_url ? review.image_url : "https://toppng.com/uploads/preview/circled-user-icon-user-pro-icon-11553397069rpnu1bqqup.png"} alt="profile-img" />
            </Link>
        </div>
        <div className="review-detail">
            <div className="review-content">
                <Link to={`/profile/${review.user_id}`}>
                    <h5>{review?.username} <span>{timeSince()} ago</span></h5>
                </Link>
                <p>{review?.comment}</p>
            </div>
            {user?.id === review?.user_id ? <div className="review-btns" onClick={handleOnDelete}>
                <span className='close-btn'>x</span>
            </div> : null}
        </div>
    </div>
  )
}

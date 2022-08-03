import * as React from 'react'
import './AboutUs.css'
import Bright from '../../Assets/Bright.JPG'
import {Link} from 'react-router-dom'

export default function AboutUs() {
  return (
    <div className='about-page'>
        <div className="about-content">

          {/* A section that explains who we are */}
          <div className="about-section">
            {/* the title of such section */}
            <div className="about-title">
              <h1> Who We Are </h1>
            </div>
            <div className="about-section-content">
              <p>
                Reciholic is a social media application built to connect individuals who are passionate about food,
                recipes, cuisines and dishes. We allow users <b>AND</b> non-users to connect to any meals and recipes
                found on our website even without an account. Users have the option to create an account and provide
                details about themselves. Once you have an account you have the ability to create and post recipes.
                We also offer all our registered users a weekly meal plan feature, a shopping cart feature, a review
                recipe section and option to follow other users. This website is built as a hub for connecting people
                and recipes and vice versa. 
              </p>
            </div>
          </div>
          {/* A section that details information about the developers */}
          <div className="about-section">
            {/* the title of such section */}
            <div className="about-title">
              <h1> Developers </h1>
            </div>
            <div className="about-section-content">
              <div className="about-section-card-area">
                {/* Bright */}
                <div className="person-card">
                  <div className="card-img">
                    <img src={Bright} alt="" />
                  </div>
                  <div className="card-text">
                  <p className='name'>
                      Name: Nnaemeka Odedo
                    </p>
                  <p className='occupation'>
                    Occupation: student at GSU
                  </p>
                  <p className="age">
                    age: 19
                  </p>
                  <p className="about-title-socials"><b> Socials </b></p>
                  <div className="social-handles">
                    <Link to='https://www.instagram.com/_brightee/?hl=en'>
                      <img src="https://similarpng.com/instagram-icon-isolated-on-transparent-background-png-2/" alt="" />
                    </Link>
                    <a href="https://cdn.icon-icons.com/icons2/791/PNG/512/instagram_f_icon-icons.com_65485.png" className='social-media-link'><img src="https://similarpng.com/instagram-icon-isolated-on-transparent-background-png-2/" alt="" /></a>
                  </div>
                  <p className="about-title-about"><b> About me </b></p>
                  <p className="about">I am a college student who currently has a passion for 
                  web development and web design. I like to practice leetcode and hackerrank 
                  questions in my free time. I hope to progress into the cyber security field 
                  and one day revolutionize the cyber security field.

                  </p>
                  </div>
                </div>
                {/* Anthony */}
                <div className="person-card">
                <div className="card-img">
                    <img src="" alt="" />
                  </div>
                  <div className="card-text">
                  <p className='name'>
                      Name: Anthony Martin
                    </p>
                  <p className='occupation'>
                    Occupation: student at Florida International University
                  </p>
                  <p className="age">
                    age: 21
                  </p>
                  <p className="about-title-socials"><b> Socials </b></p>
                  <div className="social-handles">
                    <Link to='https://www.instagram.com/_brightee/?hl=en'>
                      <img src="https://similarpng.com/instagram-icon-isolated-on-transparent-background-png-2/" alt="" />
                    </Link>
                    <a href="https://cdn.icon-icons.com/icons2/791/PNG/512/instagram_f_icon-icons.com_65485.png" className='social-media-link'><img src="https://similarpng.com/instagram-icon-isolated-on-transparent-background-png-2/" alt="" /></a>
                  </div>
                  <p className="about-title-about"><b> About me </b></p>
                  <p className="about">Fill Section. I like to dance butt naked
                  in front of my mirror, take rides with my friends on the weekends
                  and I love meeting new people. I wanna build a machine as an 
                  engineer in the future.

                  </p>
                  </div>
                </div>
                {/* Duy */}
                <div className="person-card">
                <div className="card-img">
                    <img src="" alt="" />
                  </div>
                  <div className="card-text">
                  <p className='name'>
                      Name: Duy Nguyen
                    </p>
                  <p className='occupation'>
                    Occupation: student at Michigan Univesity
                  </p>
                  <p className="age">
                    age: 20
                  </p>
                  <p className="about-title-socials"><b> Socials </b></p>
                  <div className="social-handles">
                    <Link to='https://www.instagram.com/_brightee/?hl=en'>
                      <img src="https://similarpng.com/instagram-icon-isolated-on-transparent-background-png-2/" alt="" />
                    </Link>
                    <a href="https://cdn.icon-icons.com/icons2/791/PNG/512/instagram_f_icon-icons.com_65485.png" className='social-media-link'><img src="https://similarpng.com/instagram-icon-isolated-on-transparent-background-png-2/" alt="" /></a>
                  </div>
                  <p className="about-title-about"><b> About me </b></p>
                  <p className="about">Fill Section

                  </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* A section that explains our terms of service */}
          <div className="about-section">
            {/* the title of such section */}
            <div className="about-title">
              <h1> Disclaimer </h1>
            </div>
            <div className="about-section-content">
              <p>
                <i>*** we are not affiliated with spoonacular ***</i>
                <br />
                <br />
                <br />
                
                We declare that we do not own any of the recipes posted on this website - Reciholic. All information that
                is presented by us is published in good faith and for general information purpose only.reciholic does
                not make any warranties about the completeness, reliability and accuracy of this information. 
                Any action you take upon the information you find on this website (reciholic), is strictly at 
                your own risk. reciholic will not be liable for any losses and/or damages in connection with 
                the use of our website.
                From our website, you can visit other websites by following hyperlinks to such external sites. 
                While we strive to provide only quality links to useful and ethical websites, we have no control 
                over the content and nature of these sites. These links to other websites do not imply a recommendation
                for all the content found on these sites. Site owners and content may change without notice and may 
                occur before we have the opportunity to remove a link which may have gone 'bad'.
                Please be also aware that when you leave our website, other sites may have different privacy policies
                and terms which are beyond our control. Please be sure to check the Privacy Policies of these 
                sites as well as their "Terms of Service" before engaging in any business or uploading any information.
                <br />
                <br />
                By using our website, you hereby consent to our disclaimer and agree to its terms. Update Should we 
                update, amend or make any changes to this document, those changes will be prominently posted here.
                <br />
                <br />
                <br />
                <i>*** we are not affiliated with spoonacular ***</i>
              </p>
            </div>
          </div>
          {/* A section that gives the user a contact form */}
          <div className="about-section">
            {/* the title of such section */}
            <div className="about-title">
              <h1> Contact </h1>
            </div>
            <div className="about-section-content">
                <label htmlFor="title">Title</label>
                <input type="text" name='title' />
                <label htmlFor="email">email</label>
                <input type="email" name="email"/>
                <label htmlFor="detail">Body</label>
                <textarea name="detail" id="" cols="30" rows="10"></textarea>
                <button> send </button>
            </div>
          </div>
        </div>
    </div>
  )
}


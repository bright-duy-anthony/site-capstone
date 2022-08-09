import * as React from 'react'
import axios from "axios"
import './AboutUs.css'
import Bright from '../../Assets/Bright.JPG'
import Anthony from '../../Assets/Anthony.jpg'
import {Link} from 'react-router-dom'
import TextareaAutosize from 'react-autosize-textarea';


export default function AboutUs() {

  // contact form state variable
  const [contactForm, setContactForm] = React.useState({
    title : "",
    email : "",
    body : ""
  })

  // handle contact form on change
  const handleContactFormOnChange = (event) => {
    // prevent default behaviour
    event.preventDefault()

    // check if email is valid
    if(event.target.name === "email"){
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) {
        setContactError(true)
      }
      else{
        setContactError(false)
      }
    }
    // set the form 
    setContactForm((f) => ({ ...f, [event.target.name]: event.target.value }))

    
  }

  // form is submitted state variable
  const [contactIsSubmitting, setContactIsSubmitting] = React.useState(false)

  // form is submitted state variable
  const [contactIsSubmitted, setContactIsSubmitted] = React.useState(false)

  // form error state variable
  const [contactError, setContactError] = React.useState(false)

  const inputRef = React.useRef(null)
  const emailRef = React.useRef(null)
  const textAreaRef = React.useRef(null)

  // handle contact form on submit function
  const submitContact = () => {
    
    setContactIsSubmitted(false)
    setContactIsSubmitting(true)

    // if email error do not submit
    if(contactError || contactForm.email === ""){
      return 
    }

    //call to form submit service that emails us the form information
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.post('https://formsubmit.co/ajax/anthony.martin.site@codepath.org', {
    title: contactForm.title,
    email: contactForm.email,
    body: contactForm.body,
})
    .then(response => {
      setContactIsSubmitting(false); 
      setContactIsSubmitted(true);})
    .catch(error => setContactError(error));

    inputRef.current.value = ""
    emailRef.current.value = ""
    textAreaRef.current.value = ""
    
  }
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
                    Occupation: Student at Georgia State University
                  </p>
                  <p className="about-title-socials"><b> Socials </b></p>
                  <div className="social-handles">
                    <a href="https://www.instagram.com/_brightee/?hl=en" target="_blank">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="https://github.com/brightodedo" target="_blank">
                      <i className="fa-brands fa-github"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/nnaemeka-odedo-b67297230/" target="_blank">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
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
                    <img src={Anthony} alt="" />
                  </div>
                  <div className="card-text">
                  <p className='name'>
                      Name: Anthony Martin
                    </p>
                  <p className='occupation'>
                    Occupation: Student at Florida International University
                  </p>
                  <p className="about-title-socials"><b> Socials </b></p>
                  <div className="social-handles">
                  <a href="https://github.com/amart1015" target="_blank">
                      <i className="fa-brands fa-github"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/anthony-martin-a573a31a7" target="_blank">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                  </div>
                  <p className="about-title-about"><b> About me </b></p>
                  <p className="about">
                  I am a computer engineering student interested in expanding my knowledge of backend web development. In my free time, I enjoy working on side projects as well as going out with friends. In the future, I hope to work for a large automotive company as a backend web developer.

                  </p>
                  </div>
                </div>
                {/* Duy */}
                <div className="person-card">
                <div className="card-img">
                    <img src="data:image/png;base64,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" alt="" />
                  </div>
                  <div className="card-text">
                  <p className='name'>
                      Name: Duy Nguyen
                    </p>
                  <p className='occupation'>
                    Occupation: Student at University of Michigan
                  </p>
                  <p className="about-title-socials"><b> Socials </b></p>
                  <div className="social-handles">
                  <a href="https://github.com/doowee0509" target="_blank">
                      <i className="fa-brands fa-github"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/duy-nguyennn" target="_blank">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                  </div>
                  <p className="about-title-about"><b> About me </b></p>
                  <p className="about">
                    I'm a college student looking for more experience in the web development field. I enjoy playing volleyball and video games in my free time. I'm currently watching a show called Prison Break. 
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
              <div className="contact-form" >
                <label htmlFor="title">Title</label>
                <input type="text" name='title' value={contactForm.title} onChange={handleContactFormOnChange} ref={inputRef}/>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={contactForm.email} onChange={handleContactFormOnChange} placeholder='janedoe@gmail.com' ref={emailRef}/>
                {
                  contactError
                  ?
                  <p className='error'>Enter a valid email</p>
                  :
                  <></>
                }
                <label htmlFor="detail">Body</label>
                <TextareaAutosize placeholder={'What would you like us to know?'} style={{ minHeight: 20}} name='body' value={contactForm.body}  onChange={handleContactFormOnChange} ref={textAreaRef}/>
                <button className='contact-button' onClick={submitContact}> send </button>
                {contactIsSubmitting 
                && 
                <div className='contact-submitted'>
                  <p> Submitting... </p>
                </div>}
                {contactIsSubmitted 
                && 
                <div className='contact-submitted'>
                  <p> Form is submitted!!! </p>
                </div>}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}


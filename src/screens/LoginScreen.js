import React,{useState,useEffect} from 'react'
import './LoginScreen.css'
import SignupScreen  from './SignupScreen';
function LoginScreen() {
// initially false when onclick it becomes true
const[signIn, setSignIn]=useState(false);


    return (
        <div className="loginScreen">
      <div className="loginScreen_background">
    <img 
    className="loginScreen_logo"
    src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="" />
    
    
    <button onClick={()=>setSignIn(true)}
     className="loginScreen_button">
     Sign in
     </button>

    <div className="loginScreen_gradient"></div>
   <div className="loginScreen_body">
   {/* if signin button is clicked than show signInScreen a=else render login page */}
     {signIn ?(
          <SignupScreen />
     ):(

        <>
      <h1>Unlimited films, TV programmes and more.</h1>
      <h2>Watch anywhere, Cancel anytime</h2>
      <h3>Ready to Watch? Enter your email to create or restart your membership.</h3>

    <div className="loginScreen_input">
        <form>
        <input type="email" placeholder="Email Address" />
        <button onClick={()=>setSignIn(true)}
         className="loginScreen_getStarted">Get Started</button>
        </form>
    </div>
    </>
     )}
     


   </div>
   
   </div>
        </div>
    )
}

export default LoginScreen

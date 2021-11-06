import React, { useRef } from 'react';

import {auth} from '../firebase';
import './SignupScreen.css'
// import { auth, db } from '../firebase'
function SignupScreen() {
// ref to that field uses user ref hook imagine a big finger pointing to html element
const emailRef=useRef(null);
const passwordRef=useRef(null);

    // ebery time button is insiide a form when click it refreshes a page to avoid this
const register=(e)=>{
e.preventDefault();

// when this is clicked craete a new account with user email and password
auth.createUserWithEmailAndPassword(
emailRef.current.value,
passwordRef.current.value 
).then((authUser)=>{
    // here i can use this information provided by user
    console.log(authUser);
}).catch(error=>{
    // here catch error and provide an alert
    alert(error.message);
});
};

const signIn=(e)=>{
    e.preventDefault();


    // signin with user email and password
    auth.signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
    ).then((authUser)=>{
        console.log(authUser);
    }).catch((error)=>alert(error.message));
};

    return (
        <div className="signupScreen">
            <form>
            <h1>Sign In</h1>
          <input ref={emailRef} type="email" placeholder="Email "/>
          <input ref={passwordRef} type="password" placeholder="Password "/>
           {/* onclick signin to avoid default refresh */}
             <button type="submit" onClick={signIn}>Sign Me In</button>
           <h4>
           <span className="signupScreen_gray">New to Netflix?</span> 
           <span className="signupScreen_link" onClick={register}> Sign Up now.</span></h4>
            </form>
        </div>
    )
}

export default SignupScreen

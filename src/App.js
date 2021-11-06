import React,{useEffect} from 'react'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'
import './App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { auth } from './firebase';
import {useDispatch, useSelector} from 'react-redux'
import { login, logout, selectUser } from './features/userSlice';
function App (){

  const user= useSelector(selectUser);
const dispatch=useDispatch();

  // when i am signed in it should look thtat effectand show me profile section 
  useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged(
      (userAuth)=>{
        if(userAuth)
        {
          // logged In
          // console.log(userAuth);
          dispatch(login({
            uid: userAuth.uid,
            email: userAuth.email,
          }))
        }
        else{
          // logged Out
          dispatch(logout());
        }
        
      }
    );
    return unsubscribe;
  },[])

  return (
    <div className="app">
    {/* set of screens over here there has to be other screens */}
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
       {/* this says if i dont have any user than render to login screen else shoe homescreen */}
        {!user?(
         <LoginScreen />
        ):(
          <Switch>
        {/* as i wanted my hmescreen as to be my home section */}
        <Route path="/profile">
          <ProfileScreen />
        </Route>
          <Route exact path="/">
          <HomeScreen />
          </Route>
        </Switch>
        )}
    </Router>


    </div>
  )
}

export default App

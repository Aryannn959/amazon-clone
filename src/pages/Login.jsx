import "./Login.css"
import React, { useState } from 'react'
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"
import {auth} from "../firebase.js"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

function Login() {
    const navigate=useNavigate();
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    //firebase
    //logged in a user with email and password
    const signIn=e=>{ 
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then((auth)=>{
            console.log(auth)
            navigate('/')
        })
        .catch(error=>alert(error.message))
    }
    const register=e=>{
        e.preventDefault();

        //firebase 
        createUserWithEmailAndPassword(auth, email, password)
        .then((auth)=>{
            //successfully created new user
            //with email and password
            console.log(auth);
            if(auth){
                navigate('/')
            }

        })
        .catch(error=>alert(error.message));

    }

  return (
    <div className='login'>
        <Link to="/">
        
        <img className="login__logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"/>
        </Link>
        <div className="login__container">
            <h1>Sign-In</h1>
            <form>
                <h5>Email</h5>
                <input type="text" value={email} onChange={e=>setEmail(e.target.value)}/>
                <h5>Password</h5>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                <button className="login__signIn__button" onClick={signIn} type="submit">Sign In</button>
            </form>
            <p>
                By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
            </p>
            <button className="login__register__button" onClick={register}>Create Your Amazon Account</button>

        </div>
    </div>
  )
}

export default Login


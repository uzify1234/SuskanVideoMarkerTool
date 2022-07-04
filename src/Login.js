import React,{useState} from 'react'
import auth from './Firebaseauth';
import './Login.css';
import { resolvePath, useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const logintapped = () => {
        if(email != "" && password != "") {
            auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
              var user = userCredential.user;
              console.log(user);
              navigate(`/home/${user.uid}`);
            //   navigate('/home',{passeduser : user});
            })
            .catch((error) => {
              alert("Login Failed");
            });
        }
    }
    return (
        <div className='login'>
            <div className="part">
                <img src={require('./vgnewlogo.png')} style={{width : 300}}/>
                <h3>Creative Downloader</h3>
             </div>

            <div className='loginregion'>

                <h4>Login to continue</h4>
                <input type="email" placeholder="Enter Email" onChange={e => setemail(e.target.value) } />
                <input type="password" placeholder="Enter Password" onChange={e => setpassword(e.target.value) } />
                <button onClick={logintapped}>Login</button>
            </div>
           
        </div>
    )
}

export default Login

import React, {useState} from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import {useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css";
import { useAuth } from '../../context/auth';

const Login = () => {

const [email, setEmail] = useState ("");
const [password, setPassword] = useState ("");
const [auth,setAuth] = useAuth();

const navigate = useNavigate();
const location = useLocation();

//form function
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {email,password});

        if(res && res.data.success){
            toast.success(res.data.message);

            setAuth({
                ...auth,
                user: res.data.user,
                token: res.data.token,
            });

            //store data in local storage
            localStorage.setItem('auth',JSON.stringify(res.data));

            navigate( location.state || '/');
        }else{
            toast.error(res.data.message);
        }

    } catch (error) {
        console.log(error);
        toast.error('Something went wrong!');
    }
};

console.log(process.env.REACT_APP_API);

//Form Design//
    
  return (
    <Layout title="Login | Paws to Whiskers">
    <div className="register-page">

    {/* Left Section */}
    <div className="register-left">
    <img src="https://cff2.earth.com/uploads/2017/12/12171608/Dogs-understand-humans-better-than-we-understand-them.jpg"
    alt="Register Banner" className="register-image"/></div>
    
    {/* Right Section */}
    <div className="register-right">
    <div><h1>LOGIN</h1>
    <form onSubmit={handleSubmit} className='register-form'>
    
    <div className="mb-3">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
        className="form-control" id="exampleInputEmail" placeholder="Enter your Email ID" required /> </div>
    
    <div className="mb-3">
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
        className="form-control" id="exampleInputPassword1" placeholder="Enter your Password" required />
    </div>

    <div className='mb-2'>
        <button type="button" className="btn fp-btn" onClick={() => {navigate('/forgot-password')}}>Forgot Password?</button> 
    </div>

    <button type="submit" className="btn">Login Now</button> 
    
    </form>
    </div>
    </div>
    </div>
    </Layout> 

  );
};

export default Login
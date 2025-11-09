import React, {useState} from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {

const [email, setEmail] = useState ("");
const [newPassword, setNewPassword] = useState ("");
const [answer, setAnswer] = useState ("");

const navigate = useNavigate();

//form function
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {
            email,
            newPassword,
            answer,
        });

        if(res && res.data.success){
            toast.success(res.data.message);

            navigate('/login');
        }else{
            toast.error(res.data.message);
        }

    } catch (error) {
        console.log(error);
        toast.error('Something went wrong!');
    }
};

console.log(process.env.REACT_APP_API);


//Forgot password layout
  return (
    <Layout title="Forgot Password | Paws to Whiskers">
        <div className="register-page">

    {/* Left Section */}
    <div className="register-left">
    <img src="https://cff2.earth.com/uploads/2017/12/12171608/Dogs-understand-humans-better-than-we-understand-them.jpg"
    alt="Register Banner" className="register-image"/></div>
    
    {/* Right Section */}
    <div className="register-right">
    <div><h1>RESET PASSWORD</h1>
    <form onSubmit={handleSubmit} className='register-form'>
    
    <div className="mb-3">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
        className="form-control" id="exampleInputEmail" placeholder="Enter your Email ID" required /> </div>

    <div className="mb-3">
        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)}
        className="form-control" id="exampleInputAnswer" placeholder="Enter your place of birth" required /> </div>
    
    <div className="mb-3">
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
        className="form-control" id="exampleInputNewPassword1" placeholder="Enter your New Password" required />
    </div>


    <button type="submit" className="btn">Reset Password</button> 
    
    </form>
    </div>
    </div>
    </div>
    </Layout>
  );
};

export default ForgotPassword;
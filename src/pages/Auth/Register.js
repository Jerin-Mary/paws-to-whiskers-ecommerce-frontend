import React,{useState} from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css";

const Register = () => {

const [name, setName] = useState ("");
const [email, setEmail] = useState ("");
const [password, setPassword] = useState ("");
const [phone, setPhone] = useState ("");
const [address, setAddress] = useState ("");
const [answer, setAnswer] = useState ("");
const navigate = useNavigate();

//form function
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {
            name,
            email,
            password,
            phone,
            address,
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

//Form Design//

  return (
    <Layout title="Register | Paws to Whiskers">
     <div className="register-page">

    {/* Left Section */}
    <div className="register-left">
    <img src="https://i2.wp.com/petsittersireland.com/wp-content/uploads/2015/09/Pet-Sitter-Cost.jpg"
    alt="Register Banner" className="register-image"/></div>
    
    {/* Right Section */}
    <div className="register-right">
    <div><h1>REGISTER</h1>
    <form onSubmit={handleSubmit} className='register-form'>
    <div className="mb-3">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
        className="form-control" id="exampleInputName" placeholder="Enter your Name" required /> </div>
    
    <div className="mb-3">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
        className="form-control" id="exampleInputEmail" placeholder="Enter your Email ID" required /> </div>
    
    <div className="mb-3">
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
        className="form-control" id="exampleInputPassword1" placeholder="Enter your Password" required />
    </div>
    
    <div className="mb-3">
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}
        className="form-control" id="exampleInputPhone" placeholder="Enter your Phone Number" required /> </div>
    
    <div className="mb-3">
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
        className="form-control" id="exampleInputAddress" placeholder="Enter your Address" required /> </div>

    <div className="mb-3">
        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)}
        className="form-control" id="exampleInputAddress" placeholder="What is your place of birth?" required /> </div>

    <button type="submit" className="btn">Register Now</button> </form>
    </div>
    </div>
    </div>
    </Layout>
  );
};

export default Register;
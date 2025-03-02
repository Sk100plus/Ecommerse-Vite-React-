import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Profile from './Profile';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl,user,setUser } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
// const [uname,setUname]=useState('')
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!backendUrl) {
      toast.error("Backend URL is not defined.");
      return;
    }

    if (!email || !password || (currentState === 'Sign Up' && !name)) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const endpoint = currentState === 'Sign Up' ? '/api/user/register' : '/api/user/login';
      const payload = currentState === 'Sign Up' ? { name, email, password } : { email, password };
      const response = await axios.post(`${backendUrl}${endpoint}`, payload);
   

      if (response.data.success) {
        // console.log(response);
        const {  user } = response.data;
        setToken(response.data.token);
        setUser(response.data.user);
        console.log(user);
        console.log(response)
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(user)); // Store user info in localStorage
        toast.success(`${currentState} successful!`);
      } else {
        toast.error(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currentState === 'Sign Up' && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Name'
        />
      )}
      
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Email'
      />
      
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Password'
      />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        <p onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')} className='cursor-pointer'>
          {currentState === 'Login' ? "Create Account" : "Login"}
        </p>
      </div>

      <button type="submit" className='bg-black text-white font-light px-8 py-2 mt-4'>
        {currentState}
      </button>

      {/* {user && <Profile />} */}
          </form>
  );
};

export default Login;

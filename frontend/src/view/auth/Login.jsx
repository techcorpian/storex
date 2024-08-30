import React, { useState, useEffect } from 'react';
import AuthService from '../../services/auth.service.jsx';
import CustomInput from '../shared/inputs/CustomInput.jsx'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      navigate('/home');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    AuthService.login(username, password).then(
      () => {
        navigate('/home');
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
      }
    );
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <div className=''>
          <div className="px-6 pb-6 border shadow-lg rounded-xl bg-white h-[100%] w-[500px]">
            <header className='py-5 text-sky-600'>
              <span className='text-xl font-extrabold'>LOGIN TO</span>
              <div className='leading-5'>Crescent Teacher Portal</div>
            </header>
            <form onSubmit={handleLogin} className='py-3'>
              <div className='flex flex-col gap-6'>
                <CustomInput id='username' type='text' label='Username' value={username} setValue={(e) => setUsername(e.target.value)} />
                <CustomInput id='password' type='password' label='Password' value={password} setValue={(e) => setPassword(e.target.value)} />
              </div>

              {message && (
                <div className="mt-6 text-center text-red-400 p-1">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}

              <div className="">
                <button className="my-6 py-3 px-4 w-[100%] bg-sky-700 text-white rounded-md float-right">Log In</button>

              </div>
              {/* <div className=''>
                <span className='py-4 '>Don't Have An Account?</span><Link to='/register' className="text-sky-600"> Register Now</Link>
              </div> */}
            </form>
          </div>

        </div>
        <div className='flex justify-center'>
          <div className='absolute bottom-3 text-center font-thin '>Copyrights by Corpian Technologies. All Rights Reserved</div>
        </div>
      </div>

    </>
  );
};

export default Login;

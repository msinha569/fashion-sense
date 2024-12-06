import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useLoginContext } from '../../Context/LoginPageContext';
import { loginHandler } from '../../Services/AuthServices';


const  LoginInput = () => {
  const location = useLocation()
  const {name, dispatch} = useLoginContext()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [hidden, setHidden] = useState(false)
  const handleHidden = () => {
    setHidden(!hidden)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGuest = () => {
    setFormData({
      email: "msinha569@gmail.com",
      password: "12345678"
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    loginHandler(formData, dispatch)

  };



  useEffect(() => {
    
    if (name !==""){
      const redirectTo = location.state?.from?.pathname || '/'
      navigate(redirectTo, {replace:true})
    }
    },[name])

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 ">
      <div className="bg-gray-800 text-gray-200 rounded-lg shadow-lg flex h-96 ">
        {/* Left side - Image */}
        <div className="w-1/2 p-8">
          <div className="text-white flex justify-between items-center mb-8">
            <img src="/logo.png" alt="AMU Logo" className="h-10" />
            <button 
            onClick={() => navigate('/')}
            className="bg-gray-700 hover:bg-gray-600 w-full text-white py-2 px-4 rounded-lg">
              Back to website → 
            </button>
          </div>
          <div className="text-center mt-20">
            <p className="text-lg">Capturing Moments,</p>
            <p className="text-lg">Creating Memories</p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-1/2 bg-gray-700 p-8 rounded-r-lg">
          <h2 className="text-2xl font-bold mb-4">Create an account</h2>
          <p className="mb-4">
            Don't have an account?{' '}
            <Link to="/SignupPage" className="text-purple-500 hover:underline">
              Sign up
            </Link>
          </p>

          <form onSubmit={handleSubmit}>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full mb-4 bg-gray-800 text-gray-200 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="relative mb-4">
              <input
                type={hidden? "text":"password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full bg-gray-800 text-gray-200 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={handleHidden}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
              >
                👁️
              </button>
            </div>

            <div 
            onClick={handleGuest}
            className="text-purple-500 hover:underline my-2 cursor-pointer">
              Guest LogIn
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition duration-300"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );


  
}

export default LoginInput

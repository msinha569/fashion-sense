import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupHandler } from '../../Services/AuthServices';


const  SignupInput = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
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
  
    const handleSubmit = (e) => {
      console.log(formData)
      e.preventDefault();
      const nav = signupHandler(formData)
      if (nav)
        navigate('/LoginPage')
    };
  
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900">
        <div className="bg-gray-800 text-gray-200 rounded-lg shadow-lg flex">
          {/* Left side - Image */}
          <div className="w-1/2 p-8">
            <div className="text-white flex justify-between items-center mb-8">
              <img src="/logo.png" alt="AMU Logo" className="h-10" />
              <button className="bg-gray-700 hover:bg-gray-600 w-full text-white py-2 px-4 rounded-lg">
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
              Already have an account?{' '}
              <Link to="/LoginPage" className="text-purple-500 hover:underline">
                Log in
              </Link>
            </p>
  
            <form onSubmit={handleSubmit}>
              <div className="flex space-x-4 mb-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full bg-gray-800 text-gray-200 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
  
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
  
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition duration-300"
              >
                Create account
              </button>
            </form>
          </div>
        </div>
      </div>
    );


  
}

export default SignupInput

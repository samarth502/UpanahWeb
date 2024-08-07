// src/components/Login.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateEmail, validatePassword } from "../Validations/Validations";
import userService from "../Services/UserServices";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setSubmitError({ emailError, passwordError });
      setSubmitting(false);
      return;
    }

    try {
      const loginUser = await userService.getUsers(email, password);
      console.log('Logged in user:', loginUser);

      if(loginUser){

        
              toast.success("Logged in successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
      }else{
        toast.error("Invalid email or password");
      }

    
    } catch (error) {
      console.error('Login error:', error); // Log error for debugging
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900">Login</h2>
      <div className="flex min-h-custom justify-center items-center">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
          {submitError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {Object.values(submitError).filter(Boolean).join(' ')}</span>
            </div>
          )}

          <div className="mb-4">
            <label className="flex justify-start text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="flex justify-start text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className={`bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                submitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Logging in..." : "Log In"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

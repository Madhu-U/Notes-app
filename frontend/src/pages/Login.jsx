import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { validateEmail } from "../utils/helper";
import { login } from "../api/auth";
import { useUser } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setIsLoggedIn } = useUser();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email Address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    // Login API call
    try {
      const response = await login({ email, password });
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        setIsLoggedIn(true);
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An Unexpected error occurred. Please try again");
      }
    }
  };
  return (
    <form
      onSubmit={handleLogin}
      className='w-95 border mx-auto border-slate-400 mt-[8rem] p-7 rounded-md'
    >
      <h2 className='font-medium text-2xl uppercase tracking-wider mb-4'>
        Login
      </h2>
      <input
        type='email'
        placeholder='Email'
        className='input-box'
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <PasswordInput
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></PasswordInput>
      {error && <p className='text-xs text-red-600 mt-3 pl-1'>{error}</p>}
      <button type='submit' className='input-btn'>
        Login
      </button>
      <p className='text-center text-sm text-primary-dark'>
        Not registered yet?
        <Link to='/signup' className='text-accent underline'>
          Create Account
        </Link>
      </p>
    </form>
  );
};

export default Login;

import React, { useState } from "react";
import PasswordInput from "../components/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/helper";
import { createAccount } from "../api/auth";
import { useUser } from "../context/UserContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { setIsLoggedIn } = useUser();
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }

    setError("");

    // Signup API call
    try {
      const response = await createAccount({ fullName: name, email, password });
      if (response.data && response.data.error) {
        setError(response.data.message);
      }

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
      onSubmit={handleSignup}
      className='w-95 border mx-auto border-slate-400 mt-[8rem] p-7 rounded-md'
    >
      <h2 className='font-medium text-2xl uppercase tracking-wider mb-4'>
        Signup
      </h2>
      <input
        type='name'
        placeholder='Full Name'
        className='input-box'
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
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
        Sign Up
      </button>
      <p className='text-center text-sm text-primary-dark'>
        Already have an account?
        <Link to='/login' className='text-accent underline'>
          Log in
        </Link>
      </p>
    </form>
  );
};

export default Signup;

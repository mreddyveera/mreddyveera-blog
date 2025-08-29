import { Label, TextInput, Button } from "flowbite-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ named import
import { useState } from "react";
import axios from "axios";
function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
    let errors = {
      username: "",
      email: "",
      password: "",
    };
    if (name === "username" && value.length < 3) {
      errors.username = "Length shouid be greater than 3";
    }
    if (
      name === "email" &&
      !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value.trim())
    ) {
      errors.email = "Please enter a valid gmail account";
    }
    if (name === "password" && !(value.length > 8 && value.length <= 12)) {
      errors.password =
        "Password shouid be in between 8 to 12 characters of length";
    }
    setFormErrors(errors);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.email) {
      return setErrorMessage("Please fill out all the fields");
    }

    try {
      // const res=await fetch('http://localhost:3000/api/auth/signup',{
      //   method:'POST',
      //   headers:{'Content-Type':'application/json'},
      //   body:JSON.stringify(formData),
      // });
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        formData
      );
      const data = response.data; // Note: response.data, not response.json()
      if (data.message === "User already exists please Sign in") {
        setErrorMessage(data.message);
      } else {
        navigate("/");
      }
    } catch (error) {
      if(error.message==="Request failed with status code 400")
      setErrorMessage("User already exists please Sign in");
      //console.log(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      {/* Main container with left + right */}
      <div className="flex p-6 max-w-4xl w-full flex-col md:flex-row gap-8">
        {/* Left */}
        <div className="flex-1 flex flex-col justify-center gap-5">
          <Link to="/" className="font-bold dark:text-white text-4xl mb-4">
            <span className="px-3 py-2 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
              Manikanta
            </span>{" "}
            Blog
          </Link>

          <p className="text-gray-600 dark:text-gray-300">
            This is a knowledge sharing blog. You can signup with your email and
            password or with Google.
          </p>
        </div>

        {/* Right (Signup Form) */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="username" value="Your Username" >Your Username</Label>
              <TextInput
                type="text"
                placeholder="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              {formErrors.username && (
                <small className="text-red-600">{formErrors.username}</small>
              )}
            </div>

            <div>
              <Label htmlFor="email" value="Your Email" >Your Email</Label>
              <TextInput
                type="email"
                placeholder="example@gmail.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {formErrors.email && (
                <small className="text-red-600">{formErrors.email}</small>
              )}
            </div>

            <div>
              <Label htmlFor="password" value="Your Password" >Your password</Label>
              <TextInput
                type="password"
                placeholder="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {formErrors.password && (
                <small className="text-red-600">{formErrors.password}</small>
              )}
            </div>

            <Button
              type="submit"
              className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/signin" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <small className="text-red-600">{errorMessage}</small>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;

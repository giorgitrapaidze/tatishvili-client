import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
const API_URL = process.env.REACT_APP_SERVER_URL;

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = async (e) => {
    try {
      e.preventDefault();
      // Create an object representing the request body
      const requestBody = { email, password, name };

      const authToken = localStorage.getItem("authToken");
      await axios.post(`${API_URL}/auth/signup`, requestBody, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      // or with a service
      // await authService.signup(requestBody);

      // If the request is successful navigate to login page
      navigate("/login");
    } catch (error) {
      // If the request resolves with an error, set the error message in the state
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <div className="main">
      `{" "}
      <div className="SignupPage">
        <h1>Sign Up</h1>

        <form onSubmit={handleSignupSubmit}>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleEmail}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            autocomplete="new-password"
            value={password}
            onChange={handlePassword}
          />

          <label>Name:</label>
          <input type="text" name="name" value={name} onChange={handleName} />

          <Button
            style={{ marginTop: "20px", marginBottom: "10px" }}
            type="submit"
          >
            Sign Up
          </Button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>Already have account?</p>
        <Link to={"/login"}> Login</Link>
      </div>
      `
    </div>
  );
}

export default SignupPage;

import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response = await axios.post(
      "http://localhost:3000/users/tokens/sign_in/",
      {
        email,
        password,
      },
    );

    localStorage.setItem("token", response.data.token);
    navigate("/projects/1");

    console.log("respone: ", response.data);
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <button>Sign In</button>
      </form>
      <a href="/login">Log In</a>
    </div>
  );
}

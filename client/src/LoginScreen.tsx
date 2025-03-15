import { NavLink, useNavigate } from "react-router";
import { useState } from "react";// for managing input fields
import { login } from "./api";

export function LoginScreen() {
     // store username and password inputs
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    
    return (
        <section>
            <h1>My Cookbook</h1>
                <p>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" onChange={(e) => {
                    setUsername(e.target.value);
                }}></input>
            </p>
            <p>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" onChange={(e) => {
                    setPassword(e.target.value);
                }}></input>
                </p>
                <p><button onClick={async () => {
                    await login(username, password);// Call login function with user credentials
                    await setTimeout(() => { // Small delay before reloading the page
                        window.location.reload();
                      }, 200);
                      navigate("/home");// Redirect to home page after successful login
                }}>Log In</button></p>
            <NavLink to="/register" end>Register new user</NavLink>
        </section>
    );
}

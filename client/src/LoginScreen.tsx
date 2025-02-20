import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { login } from "./api";

export function LoginScreen() {
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
                    await login(username, password);
                    await setTimeout(() => {
                        window.location.reload();
                      }, 200);
                      navigate("/home");
                }}>Log In</button></p>
            <NavLink to="/register" end>Register new user</NavLink>
        </section>
    );
}
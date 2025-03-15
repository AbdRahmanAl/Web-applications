import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { registerUser } from "./api";

export function RegisterScreen() {
    // store username and password inputs
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    return (
        <section>
            <h1>Register New User</h1>
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
                await registerUser(username, password);// Call register function with user credentials
                navigate("/login");// Redirect to login page after successful registration
            }}>Register </button></p>
            <NavLink to="/login" end>Back to login screen</NavLink>
        </section>
    )

}

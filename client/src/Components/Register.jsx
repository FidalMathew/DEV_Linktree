import React, { useState } from 'react';
import { axiosInstance } from '../config';

import "./Register.css"
import { Link, useNavigate } from "react-router-dom"
export default function Register() {


    const [user, setUser] = useState({

        username: "", email: "", g_user: "", d_user: "", password: ""
    })

    const [error, setError] = useState(false);

    const history = useNavigate();

    let name, value;
    const HandleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }




    const postData = async (e) => {
        e.preventDefault();
        const { username, email, g_user, d_user, password } = user;

        console.log(username, email, g_user);

        setError(false);
        try {
            const res = await axiosInstance.post("/auth/register", {
                username,
                email,
                g_user,
                d_user,
                password,
            });
            res.data && window.location.replace("/login");
        } catch (err) {
            setError(true);
            alert("error while registration")
        }
    };


    return (
        <div className='Register'>
            <div className='bg-white text-dark rounded formdiv'>
                <h3 className='text-center mb-4'>Create Account </h3>
                <form>
                    <div className="mb-4">
                        <input type="text" className="form-control" value={user.username} name='username' onChange={HandleInputs} placeholder='Username (required)' required />

                    </div>

                    <div className="mb-4">
                        <input type="email" className="form-control" value={user.email} name='email' onChange={HandleInputs} placeholder='Email (required)' required />
                    </div>
                    <div className="mb-4">
                        <input type="text" className="form-control" value={user.g_user} name='g_user' onChange={HandleInputs} placeholder='Github Username' />

                    </div>
                    <div className="mb-4">
                        <input type="text" className="form-control" value={user.d_user} name='d_user' onChange={HandleInputs} placeholder='Dev.to Username' />

                    </div>
                    <div className="mb-4">
                        <input type="password" className="form-control" value={user.password} name='password' onChange={HandleInputs} placeholder='Password (required)' required />
                    </div>

                    <button type="submit" className="Register_btn mb-4" onClick={postData}>Sign Up</button>

                    <div className="mb-2 text-center">
                        Already have an account? <Link to="/login"><u>Sign-in</u></Link >
                    </div>
                </form>
            </div>
        </div>
    )
}

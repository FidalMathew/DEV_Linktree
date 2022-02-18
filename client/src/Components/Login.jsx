import React, { useRef, useContext } from 'react'
import "./Register.css"
import { Link } from "react-router-dom"
import { Context } from '../Context/Context';
import { axiosInstance } from '../config';



export default function Register() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { user, dispatch, isFetching } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axiosInstance.post("/auth/login", {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        } catch (err) {
            alert('Error while Login');
            dispatch({ type: "LOGIN_FAILURE" });
        }
    };

    console.log(isFetching);
    console.log(user);


    return (
        <div className='Register'>
            <div className='bg-white text-dark rounded formdiv'>
                <h3 className='text-center mb-4'>Sign in to Dev_profile Account </h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input type="text" className="form-control" placeholder='Email' ref={emailRef} />
                    </div>
                    <div className="mb-4">
                        <input type="password" className="form-control" placeholder='Password' ref={passwordRef} />
                    </div>

                    <button type="submit" className="Register_btn mb-4">Sign In</button>

                    <div className="mb-2 text-center">
                        Don't have an account?  <Link to="/register"><u>Create one</u></Link >
                    </div>
                </form>
            </div>
        </div>
    )
}

import React, { useContext } from 'react'
import { Context } from '../Context/Context';
import './home.css'

import { Link } from 'react-router-dom';

export default function Home() {
    const { user, dispatch } = useContext(Context);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    }


    return (


        <div className=' text-dark rounded Home text-center'>

            <div className='bg-white home_content rounded'>
                <div className='bg-white  p-4 mb-4'>
                    {
                        (user) ?
                            (<>
                                <h1 className='pt-5 mb-5' >Welcome {user.username}</h1>
                                <div className='mb-4'>
                                    <button><Link to={`/user/${user.username}`} target="_blank" className='text-white'>CHECKOUT YOUR DEV_PROFILE</Link></button>
                                </div>
                                <p> <Link to="/edit">Edit your DEV_PROFILE</Link>  </p>
                                <p> <span onClick={handleLogout}>Logout</span>  </p>


                            </>) :
                            (
                                <>
                                    <h1 className='mb-5 pt-3 '>Welcome to DEV_Profile</h1>

                                    <p>Share your DEV blogs, Github Projects, and all your Links</p>
                                    <h4>HERE!</h4>
                                    <div className='pt-5 pb-2'>
                                        <button><Link to="/register" className='text-white'>GET STARTED</Link></button>
                                    </div>
                                    <p>Already have an account? <Link to="/login">Login</Link>  </p>
                                </>
                            )
                    }
                </div>
                <div className="resources bg-dark text-white text-left h-100 pt-4 pl-4">
                    <h4>Resources</h4>

                    <ul>
                        <li> <a className='text-white' href="http://github.com/" target="_blank" rel="noreferrer">Github</a></li>
                        <li><a className='text-white' href="https://dev.to/" target="_blank" rel="noreferrer">DEV Forem</a></li>
                        <li><a className='text-white' href="https://iconape.com/" target="_blank" rel="noreferrer">Iconape</a></li>
                        <li><a className='text-white' href="https://icons8.com/" target="_blank" rel="noreferrer">Icons8</a></li>
                    </ul>

                </div>


            </div>
        </div>

    )
}

import React from 'react'
import { Link } from 'react-router-dom'
import './notfound.css'
export default function Notfound() {
    return (
        <div className='notfound_page'>
            <div>
                <h1>404</h1>

                <h2>We cant find the page you are looking for.</h2>

                <Link to="/" ><button className='not_found_button'> Go to Home Page</button></Link>
            </div>
        </div>
    )
}

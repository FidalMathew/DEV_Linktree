import React from 'react'
import "./User.css"
export default function Dropdown(props) {
    return (

        <div className='Dropdown text-center'>
            <a href={props.link} target="_blank" rel="noreferrer">  {props.title}</a>
        </div>
    )
}

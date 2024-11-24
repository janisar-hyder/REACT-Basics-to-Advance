import React from 'react'
import './Card.css'

function Card(props) {
    return (

        <div className="card">
            <div className="card-image"
                style={{backgroundImage: `url(${props.link})`}}></div>
            <div className="category">{props.category}</div>
            <div className="heading">
                {props.heading}
                <div className="author">
                    By <span className="name">{props.author}</span> 4 days ago
                </div>
            </div>
        </div>

    )
}

export default Card
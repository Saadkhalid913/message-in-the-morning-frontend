import React, { Component } from 'react'


const Message = (props) => {
    const { message } = props

    return ( 
        <div className = "message">
            <h1>{message.title}</h1>
            <p>{message.body}</p>
        </div>
    );
}

export default Message;

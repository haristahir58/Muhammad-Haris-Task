import React from 'react'
import './sidebar.css'
import {Link} from "react-router-dom"



const Sidebar = () => {


  return (
    <div className="sidebar">
        <div className="top">
            <Link to="/" style={{textDecoration:"none"}}>
            <span className="logo">Admin Panel</span>
            </Link>
        </div>
        <hr />
        <div className="center">
            <ul style={{lineHeight: "29px"}}>
                <Link to="/" style={{textDecoration:"none"}}>
                <li>
                <i className="fas fa-home icon"></i>
                    <span>Home</span>
                </li>
                </Link>

                <Link to="/users" style={{textDecoration:"none"}}>
                <li>
                <i className="fas fa-user icon"></i>
                    <span>View Users</span>
                </li>
                </Link>
              
                <Link to="/user/new" style={{textDecoration:"none"}}>
                <li>
                <i className="fas fa-user-plus icon"></i>
                    <span>Add Users</span>
                </li>
               
                </Link>               
            </ul>
            </div>
    </div>
  )
}

export default Sidebar
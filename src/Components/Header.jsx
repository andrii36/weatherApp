import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Header (props){

    let[searchField, setSearchField] = useState('')
    let onChange = (e) => {
        setSearchField(e.target.value)
    }

    return(
       <header>
        <div className="header_logo"><a href="/">Weather App</a></div>
        <div className="header_search">
            <input type="text" name="main_search" placeholder="Enter location" value={searchField} onChange={onChange}/>
            <NavLink className="search_btn" to={`/weather-by-city/${searchField}`}>GO</NavLink>
        </div>
        </header> 
    )
}

export default Header
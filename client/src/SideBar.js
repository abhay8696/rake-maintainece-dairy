import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
    return (
        <div>
            <Link to = '/home'>Home</Link>
            <Link to='/LogForm'>Create New Log </Link>
            <Link to = '/home'>Home</Link>
            <Link to = '/LogForm/train'>Trains</Link>
            
        </div>
    )
}

export default SideBar

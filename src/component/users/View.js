import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const View = () => {
    const {id} = useParams()
    const [user,setUser] = useState([])
    const fetUser = async(id)=>{
        let result = await axios.get(`http://localhost:3001/users/${id}`)
        console.log('dataview',result)
        setUser(result.data)
    }
    useEffect(()=>{
        fetUser(id)
    },[])
    console.log("user",user);
  return (
    <div className="my-5 py-4"
      style={{
        border: "1px solid grey",
        width: "40%",
        margin: "auto", // Added margin: auto to center the box
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // Changed alignContent to alignItems for vertical centering
      }}
    >
      <Link to='/'>Back to Home</Link>
      <ul>
        <li>{user.name} </li>
        <li>{user.username} </li>
        <li>{user.email} </li>
        <li>{user.phone} </li>
      </ul>
    </div>
  )
}

export default View
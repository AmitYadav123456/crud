import axios from "axios";
import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const {id} = useParams()
  // alert(id)
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name:'',
        username:'',
        email:'',
        phone:'',
    })
    const handleChange = (e)=>{
        setUser({...user,[e.target.name]:e.target.value})
        console.log("user",user)
    }
    const fetchUsers = async()=>{
      let result = await axios.get(`http://localhost:3001/users/${id}`)
      console.log("getId",result);
      setUser(result.data)
    }
    useEffect(()=>{
      fetchUsers()
    },[])
    const onSubmit = async(e)=>{
        e.preventDefault()
        await axios.put(`http://localhost:3001/users/${id}`,user)
        navigate("/")
    }
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
      <form onSubmit={(e)=>onSubmit(e)}>
          <input
            type="text"
            className="form-control my-2"
            placeholder="Enter Your Name"
            name="name"
            value={user.name}
            onChange={(e)=>handleChange(e)}
            style={{ width: "100%", fontSize: "18px", padding: "10px 40px"  }}
          />
          <input
            type="text"
            className="form-control my-2"
            name="username"
            value={user.username}
            placeholder="Enter Your UserName"
            onChange={(e)=>handleChange(e)}
            style={{ width: "100%", fontSize: "18px", padding: "10px 40px"  }}
          />
          <input
            type="email"
            className="form-control my-2"
            name="email"
            value={user.email}
            onChange={(e)=>handleChange(e)}
            placeholder="Enter Your E-mail"
            style={{ width: "100%", fontSize: "18px", padding: "10px 40px"  }}
          />
          <input
            type="text"
            className="form-control my-2"
            placeholder="Enter Your Mob"
            onChange={(e)=>handleChange(e)}
            name="phone"
            value={user.phone}
            style={{ width: "100%", fontSize: "18px", padding: "10px 40px"  }}
          />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditUser;

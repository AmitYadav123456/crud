import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// ... (previous code)

const Adduser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear the error when user starts typing
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Simple validation example (you can customize this based on your requirements)
    const newErrors = {};

    if (!user.name) {
      newErrors.name = "Name is required";
    }

    // Show one error at a time
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!user.username) {
      newErrors.username = "Username is required";
      setErrors(newErrors);
      return;
    }

    if (!user.email) {
      newErrors.email = "Email is required";
      setErrors(newErrors);
      return;
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "Invalid email address";
      setErrors(newErrors);
      return;
    }

    if (!user.phone) {
      newErrors.phone = "Phone number is required";
      setErrors(newErrors);
      return;
    } else if (!/^\d{10}$/.test(user.phone)) {
      newErrors.phone = "Invalid phone number";
      setErrors(newErrors);
      return;
    }

    // If there are no errors, submit the form
    try {
      await axios.post("http://localhost:3001/users", user);
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error from the server, if needed
    }
  };

  return (
    <div
      className="my-5 py-4"
      style={{
        border: "1px solid grey",
        width: "40%",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <input
            type="text"
            className="form-control my-2"
            placeholder="Enter Your Name"
            name="name"
            onChange={(e) => handleChange(e)}
            style={{ width: "100%", fontSize: "18px", padding: "10px 40px" }}
          />
          <div style={{ color: "red", fontSize: "14px" }}>{errors.name}</div>
        </div>

        <div>
          <input
            type="text"
            className="form-control my-2"
            name="username"
            placeholder="Enter Your UserName"
            onChange={(e) => handleChange(e)}
            style={{ width: "100%", fontSize: "18px", padding: "10px 40px" }}
          />
          <div style={{ color: "red", fontSize: "14px" }}>
            {errors.username}
          </div>
        </div>

        <div>
          <input
            type="email"
            className="form-control my-2"
            name="email"
            onChange={(e) => handleChange(e)}
            placeholder="Enter Your E-mail"
            style={{ width: "100%", fontSize: "18px", padding: "10px 40px" }}
          />
          <div style={{ color: "red", fontSize: "14px" }}>{errors.email}</div>
        </div>

        <div>
          <input
            type="tel"
            className="form-control my-2"
            placeholder="Enter Your Mob"
            onChange={(e) => handleChange(e)}
            name="phone"
            value={user.phone}
            style={{ width: "100%", fontSize: "18px", padding: "10px 40px" }}
          />
          <div style={{ color: "red", fontSize: "14px" }}>{errors.phone}</div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
export default Adduser;

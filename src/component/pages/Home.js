import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  // console.log("name", data.filter((item)=>item.name.toLowerCase().includes('a')))
  const fetchUser = async () => {
    let result = await axios.get("http://localhost:3001/users");
    console.log("kyaobjhai", result.data);
    setData(result.data);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/users/${id}`);
    fetchUser();
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="search..."
          className="mx-2 my-2"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">S.no</th>
            <th scope="col">Name</th>
            <th scope="col">User Name</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((item) => item.name.toLowerCase().includes(query))
            .map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/user/${user.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edit/user/${user.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn btn-danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default Home;

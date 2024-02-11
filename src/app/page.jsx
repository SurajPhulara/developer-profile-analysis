'use client'

import { useEffect, useState } from 'react'
import "./page.css"
import axios from 'axios';
const page = () => {

  const [username, setUsername] = useState('');
  const [userExists, setUserExists] = useState(null);

  const handleChange = async(e) => {
    setUsername(e.target.value);
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserExists(true);
    } catch (error) {
      setUserExists(false);
    }
  };

  // useEffect(() => {
  //   console.log(username)
  // }, [username])

const handleSubmit = (e) => {
  e.preventDefault();
  checkUserExistence();
};

return (
  <div className='page'>
    <div className="body">
      <div className="content">
        <form action="/submit" method="post">
          <div className="input_sec">
            <label htmlFor="username">GitHub Username:</label>
            <input type="text" id="username" name="username" value={username} onChange={(e) => handleChange(e)} required />
          </div>

          <div className="input_sec">
            <label htmlFor="repository">Repository Name:</label>
            <input type="text" id="repository" name="repository" required />
          </div>

          <div className="input_sec">
            <label htmlFor="contributor">Contributor Name:</label>
            <input type="text" id="contributor" name="contributor" required />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
)
}

export default page
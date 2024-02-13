'use client'

import { useEffect, useState } from 'react'
import "./page.css"
import axios from 'axios';
const Page = () => {

  const [username, setUsername] = useState('');
  const [result, setResult] = useState(null);

  const handleCheckUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`/api/github/${username}`);
      const data = response.data;
      console.log(data)

      setResult(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <div className="navbar">
        <button>Sign In</button>
        <button>Register</button>
      </div>
      <div className="hero">
        <div className="hero-left">

          <div className="heading">Developer Performance Analysis</div>
          <a  href="#section2"><button className='button2'> Free Demo </button></a>
        </div>
        <div className="hero-right">
          <img src={"https://www.perforce.com/sites/default/files/image/2018-06/image-blog-what-is-static-analysis.jpg"} style={{borderRadius:'20px'}}></img>
        </div>
      </div>


      <div className="section2" id='section2'>
        <div className="heading2">
        Analyse and Evaluate your code with the power of AI 
        </div>
        <div className="box" style={{height:"232px", borderRadius:"20px", background: "rgba(41, 46, 171, 0.11)"}}></div>
      </div>



      <form onSubmit={handleCheckUser}>
        <input
          type="text"
          placeholder="GitHub Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Check User</button>
      </form>

      {result && (
        <div>
          {result.user_exists ? (
            <>
              <p>User exists on GitHub!</p>
              <p>Repositories:</p>
              <ul>
                {result.repositories.map((repo) => (
                  <li key={repo.name}>
                    <a href={repo.url} target="_blank" rel="noopener noreferrer">
                      {repo.name}
                    </a>
                    : {repo.description}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>User does not exist on GitHub.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Page
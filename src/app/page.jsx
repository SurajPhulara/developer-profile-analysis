'use client'

import { useEffect, useState } from 'react'
import "./page.css"
import axios from 'axios';
const Page = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = [
    { id: 1, content: <div>Item 1 Content</div> },
    { id: 2, content: <div>Item 2 Content</div> },
    // Add more items as needed
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, items.length - 1));
  };

  const [username, setUsername] = useState('');
  const [result, setResult] = useState(null);

  const handleCheckUser = async (e) => {
    console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
    e.preventDefault();
    const usernamee = 'your_username';
    try {
      const response = await axios.get(`/api/github/${usernamee}`);
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
          <a href="#section2"><button className='button2'> Free Demo </button></a>
        </div>
        <div className="hero-right">
          <img src={"https://www.perforce.com/sites/default/files/image/2018-06/image-blog-what-is-static-analysis.jpg"} style={{ borderRadius: '20px' }}></img>
        </div>
      </div>


      <div className="section2" id='section2'>
        <div className="heading2">
          Analyse and Evaluate your code with the power of AI
        </div>
        <div className="box" style={{ borderRadius: "20px", background: "rgba(41, 46, 171, 0.11)" }}>
          <form onSubmit={handleCheckUser}>
            <div className="grp">
              <label htmlFor="">Github Username : </label>
              <input type="text" />
            </div>
            <div className="grp">
              <label htmlFor="">Repository Name : </label>
              <input type="text" />
            </div>
            <div className="grp">
              <label htmlFor="">Contributer Name : </label>
              <input type="text" />
            </div>
            <div className="grp">
              <button type="submit" className="grp button3">
                GO
              </button>
            </div>
          </form>
        </div>
      </div>


      


      {/* {result && (
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
      )} */}
    </div>
  )
}

export default Page




const Modal = ({ isOpen, onClose, content, onPrev, onNext }) => {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}>
          Close
        </button>
        {content}
        <div className="navigationButtons">
          <button onClick={onPrev}>Prev</button>
          <button onClick={onNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

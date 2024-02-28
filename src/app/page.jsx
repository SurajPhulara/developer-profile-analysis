'use client'

import { useEffect, useState } from 'react'
import "./page.css"
import axios from 'axios';
const Page = () => {

  const [formData, setFormData] = useState({
    githubUsername: '',
    repositoryName: '',
    contributorName: '',
  });
  const [analysis, setAnalysis] = useState({});
  const [usravatar, setusravatar] = useState({});


  const handleChange = (e) => {
    // const { name, value } = e.target;
    // // Update the corresponding form value in formData
    // setFormData((prevData) => ({
    //   ...prevData,
    //   [name]: value,
    // }));
  };



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

    const formData1 = new FormData(e.target);
    // Access form values from formData
    const githubUsername = formData1.get('githubUsername');
    const repositoryName = formData1.get('repositoryName');
    const contributorName = formData1.get('contributorName');

    setFormData({
      githubUsername,
      repositoryName,
      contributorName,
    });



    // console.log("\n new : ", githubUsername, repositoryName, contributorName)

    // console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
    e.preventDefault();



    const usernamee = githubUsername;
    const repo = repositoryName;
    const contributornamee = contributorName;

    try {
      // Check if user exists

      const userResponse = await axios.get(`https://api.github.com/users/${usernamee}`);

      if (userResponse.status === 200) {
        // User exists, check repository
        const repoResponse = await axios.get(`https://api.github.com/repos/${usernamee}/${repo}`);
        if (repoResponse.status === 200) {
          // Repository exists, check contributor
          const contributorsResponse = await axios.get(`https://api.github.com/repos/${usernamee}/${repo}/contributors`);
          const contributors = contributorsResponse.data;

          const contributorExists = contributors.some(contributor => contributor.login === contributorName);

          if (contributorExists) {
            console.log("GitHub profile exists with the specified credentials.", userResponse.data.avatar_url);
            // Continue with your logic if the profile exists

            setusravatar(userResponse.data.avatar_url)

            const response = await axios.post(`/api/github`, { usernamee, repo, contributornamee })
            const data = response.data;
            console.log(data)
            setAnalysis(response?.data)

          } else {
            console.log("Contributor does not exist in the specified repository.");
            alert("Contributor not found in the repository. Please check your credentials.");
          }
        } else {
          console.log("Repository does not exist in the specified user's GitHub profile.");
          alert("Repository not found. Please check your credentials.");
        }
      } else {
        console.log("GitHub user does not exist with the specified credentials.");
        alert("GitHub user not found. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error checking GitHub profile:", error);
      // Handle errors accordingly
    }
    // try {
    const response = await axios.post(`/api/github`, { usernamee, repo, contributornamee })
    const data = response.data;
    console.log(data)

    //   // setResult(data);
    // } catch (error) {
    //   console.error('Error fetching data:', error);
    // }
  };

  //   async function checkGitHubProfile() {

  // }


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
              <label htmlFor="githubUsername">Github Username : </label>
              <input type="text" id="githubUsername" name="githubUsername"/>
            </div>
            <div className="grp">
              <label htmlFor="repositoryName">Repository Name : </label>
              <input type="text" id="repositoryName" name="repositoryName"/>
            </div>
            <div className="grp">
              <label htmlFor="contributorName">Contributor Name : </label>
              <input type="text" id="contributorName" name="contributorName"/>
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



      <div className="analisys">
        <div className="profilepic">
          <img className="profilepicImg" src={usravatar} alt="" />
          <h2>{formData.githubUsername}</h2>
        </div>
        <div className="analysis_result"> 
          <pre>{JSON.stringify(analysis, null, 2)}</pre>
        </div>
      </div>




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

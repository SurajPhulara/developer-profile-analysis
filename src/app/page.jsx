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
  const [analysis, setAnalysis] = useState();
  const [usravatar, setusravatar] = useState();


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
            console.log("data received")
            const data = response.data;
            console.log(data)
            console.log("Data Type:", typeof data);
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
    }
    // const response = await axios.post(`/api/github`, { usernamee, repo, contributornamee })
    // const data = response.data;
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
              <label htmlFor="githubUsername">Github Username : </label>
              <input type="text" id="githubUsername" name="githubUsername" />
            </div>
            <div className="grp">
              <label htmlFor="repositoryName">Repository Name : </label>
              <input type="text" id="repositoryName" name="repositoryName" />
            </div>
            <div className="grp">
              <label htmlFor="contributorName">Contributor Name : </label>
              <input type="text" id="contributorName" name="contributorName" />
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
          {/* {analysis && <pre>{JSON.stringify(analysis, null, 2)}</pre>} */}

          {/* JSON.parse(analysis.replace(/'/g, '"')); */}
          {
            // const abc = "[{\"type\": \"commit\", \"sha\": \"7c6f9cc979ac8deec72878664a1f470c3323f4ae\", \"analysis\": \"{  \"Code Quality Rating\": \"⭐⭐\",  \"Commit Message Quality Rating\": \"⭐⭐\",  \"Summary\": \"The code quality is fair, with some areas for improvement. The commit message is concise but lacks context and details about the changes made.\",  \"Code Quality Strengths\": [    \"Adherence to coding standards: The code follows basic coding conventions, such as proper indentation, variable naming, and syntax.\"  ],  \"Areas for Improvement in Code Quality\": [    \"Maintainability: The code is not organized in a modular manner, making it difficult to understand and maintain.\",    \"Efficiency: The code lacks optimizations and could benefit from refactoring to improve performance.\",    \"Error handling: The code doesn\\\"t include proper error handling mechanisms, which could lead to unexpected behavior.\",    \"Unit testing: There is no evidence of unit tests to ensure code correctness.\"  ],  \"Commit Message Clarity\": [    \"The commit message is concise and provides a brief overview of the changes made.\"  ],  \"Areas for Improvement in Commit Messages\": [    \"Lack of context: The commit message doesn\\\"t provide any context or rationale for the changes made, making it difficult to understand the purpose behind the changes.\",    \"Missing details: The commit message doesn\\\"t include specifics about the changes, such as which files were modified or what specific code improvements were made.\"  ],  \"Recommendations\": {    \"Code Quality\": [      \"Organize the code in a modular manner to enhance maintainability.\",      \"Incorporate performance optimizations to enhance code efficiency.\",      \"Implement proper error handling mechanisms to address potential issues.\",      \"Add unit tests to ensure code functionality and reliability.\"    ],    \"Commit Messages\": [      \"Provide context and rationale for the changes made, explaining the motivation behind the modifications.\",      \"Include specific details about the changes, such as files modified and code improvements implemented.\",      \"Adhere to a consistent commit message format to improve readability and understanding.\"    ]  },  \"By addressing these areas for improvement, the developer can enhance the overall code quality, ensuring maintainability, efficiency, and reliability. Additionally, providing clear and detailed commit messages will facilitate better communication and understanding among team members.\": \"\"}\"}, {\"type\": \"pull_request\", \"number\": 3, \"analysis\": \"{    \"Developer Comment Rating\": \"⭐\"}\"}, {\"type\": \"pull_request\", \"number\": 2, \"analysis\": \"{    \"Developer Comment Rating\": \"⭐\"}\"}]\r\n"
            // console.log(JSON.stringify("[{\"type\": \"commit\", \"sha\": \"7c6f9cc979ac8deec72878664a1f470c3323f4ae\", \"analysis\": \"{  \"Code Quality Rating\": \"⭐⭐\",  \"Commit Message Quality Rating\": \"⭐⭐\",  \"Summary\": \"The code quality is fair, with some areas for improvement. The commit message is concise but lacks context and details about the changes made.\",  \"Code Quality Strengths\": [    \"Adherence to coding standards: The code follows basic coding conventions, such as proper indentation, variable naming, and syntax.\"  ],  \"Areas for Improvement in Code Quality\": [    \"Maintainability: The code is not organized in a modular manner, making it difficult to understand and maintain.\",    \"Efficiency: The code lacks optimizations and could benefit from refactoring to improve performance.\",    \"Error handling: The code doesn\\\"t include proper error handling mechanisms, which could lead to unexpected behavior.\",    \"Unit testing: There is no evidence of unit tests to ensure code correctness.\"  ],  \"Commit Message Clarity\": [    \"The commit message is concise and provides a brief overview of the changes made.\"  ],  \"Areas for Improvement in Commit Messages\": [    \"Lack of context: The commit message doesn\\\"t provide any context or rationale for the changes made, making it difficult to understand the purpose behind the changes.\",    \"Missing details: The commit message doesn\\\"t include specifics about the changes, such as which files were modified or what specific code improvements were made.\"  ],  \"Recommendations\": {    \"Code Quality\": [      \"Organize the code in a modular manner to enhance maintainability.\",      \"Incorporate performance optimizations to enhance code efficiency.\",      \"Implement proper error handling mechanisms to address potential issues.\",      \"Add unit tests to ensure code functionality and reliability.\"    ],    \"Commit Messages\": [      \"Provide context and rationale for the changes made, explaining the motivation behind the modifications.\",      \"Include specific details about the changes, such as files modified and code improvements implemented.\",      \"Adhere to a consistent commit message format to improve readability and understanding.\"    ]  },  \"By addressing these areas for improvement, the developer can enhance the overall code quality, ensuring maintainability, efficiency, and reliability. Additionally, providing clear and detailed commit messages will facilitate better communication and understanding among team members.\": \"\"}\"}, {\"type\": \"pull_request\", \"number\": 3, \"analysis\": \"{    \"Developer Comment Rating\": \"⭐\"}\"}, {\"type\": \"pull_request\", \"number\": 2, \"analysis\": \"{    \"Developer Comment Rating\": \"⭐\"}\"}]\r\n"
            // , null, 2))
          }
          {/* <GitHubAnalysis analysisData={JSON.stringify(analysis, null, 2)}></GitHubAnalysis> */}
          {analysis && <GitHubAnalysis data={analysis}></GitHubAnalysis>}
        </div>
      </div>




    </div>
  )
}

export default Page

























// import React from 'react';
const GitHubAnalysis = ({ data }) => {

  // const correctedData = data.replace(/'/g, '"');
  // console.log(typeof JSON.stringify(data, null, 2));
  // const parsedData = JSON.parse(data);
  // console.log("mmmmmmmmmmm    :    ")
  // data = JSON.parse(data)
  console.log(typeof data);
  // console.log(data);
  // console.log("ggggg  :  ",JSON.parse(JSON.stringify(data, null, 2)))

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      {data.map((item, index) => (
        <div key={index} style={{ marginBottom: '40px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ color: '#333', padding: '15px 20px', margin: '0', borderBottom: '1px solid #ddd' }}>
            {item.type === 'commit' ? 'Commit Analysis' : 'Pull Request Analysis'}
          </h3>
          <div style={{ padding: '20px' }}>
            {item.type === 'commit' && (
              <>
                <p style={{ marginBottom: '30px', marginLeft: '20px' }}>
                  <strong>Code Quality Rating:</strong> {item.analysis['Code Quality Rating']}
                </p>
                <p style={{ marginBottom: '30px', marginLeft: '20px' }}>
                  <strong>Commit Message Quality Rating:</strong> {item.analysis['Commit Message Quality Rating']}
                </p>
                <div style={{ marginLeft: '20px' }}> {/* Indentation container */}
                  <p style={{ marginBottom: '0px' }}> {/* Apply margin to the summary */}
                    <strong>Summary:</strong> {item.analysis.Summary}
                  </p>
                </div>
              </>
            )}
            {item.type === 'pull_request' && (
              <>
                <p style={{ marginBottom: '30px', marginLeft: '20px' }}>
                  <strong>Developer Comment Rating:</strong> {item.analysis['Developer Comment Rating']}
                </p>
                {/*                 
                <div style={{ marginLeft: '20px' }}> 
                  <p style={{ marginBottom: '0px' }}> 
                    <strong>Summary:</strong> {item.analysis.Summary}
                  </p>
                </div> 
                */}

              </>
            )}
          </div>
          {item.type === 'commit' && (
            <>
              <div style={{ padding: '20px' }}>
                <p style={{ marginBottom: '10px', marginLeft: '20px' }}>
                  <strong>Code Quality Strengths:</strong>
                </p>
                <ul style={{ paddingLeft: '40px', marginBottom: '10px', marginLeft: '20px' }}>
                  {item.analysis['Code Quality Strengths'].map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
              <div style={{ padding: '20px' }}>
                <p style={{ marginBottom: '10px', marginLeft: '20px' }}>
                  <strong>Areas for Improvement in Code Quality:</strong>
                </p>
                <ul style={{ paddingLeft: '40px', marginBottom: '10px', marginLeft: '20px' }}>
                  {item.analysis['Areas for Improvement in Code Quality'].map((improvement, index) => (
                    <li key={index}>{improvement}</li>
                  ))}
                </ul>
              </div>
              <div style={{ padding: '20px' }}>
                <p style={{ marginBottom: '10px', marginLeft: '20px' }}>
                  <strong>Commit Message Clarity:</strong>
                </p>
                <ul style={{ paddingLeft: '40px', marginBottom: '10px', marginLeft: '20px' }}>
                  {item.analysis['Commit Message Clarity'].map((clarity, index) => (
                    <li key={index}>{clarity}</li>
                  ))}
                </ul>
              </div>
              <div style={{ padding: '20px' }}>
                <p style={{ marginBottom: '10px', marginLeft: '20px' }}>
                  <strong>Areas for Improvement in Commit Messages:</strong>
                </p>
                <ul style={{ paddingLeft: '40px', marginBottom: '10px', marginLeft: '20px' }}>
                  {item.analysis['Areas for Improvement in Commit Messages'].map((improvement, index) => (
                    <li key={index}>{improvement}</li>
                  ))}
                </ul>
              </div>
              <div style={{ padding: '20px' }}>
                <p style={{ marginBottom: '10px', marginLeft: '20px' }}>
                  <strong>Recommendations for Code Quality:</strong>
                </p>
                <ul style={{ paddingLeft: '40px', marginBottom: '10px', marginLeft: '20px' }}>
                  {item.analysis.Recommendations['Code Quality'].map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                  ))}
                </ul>
              </div>
              <div style={{ padding: '20px' }}>
                <p style={{ marginBottom: '10px', marginLeft: '20px' }}>
                  <strong>Recommendations for Commit Messages:</strong>
                </p>
                <ul style={{ paddingLeft: '40px', marginLeft: '20px' }}>
                  {item.analysis.Recommendations['Commit Messages'].map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
          {/* {item.type === 'pull_request' && (
            <>
              <div style={{ padding: '20px' }}>
                <p style={{ marginBottom: '10px', marginLeft: '20px' }}>
                  <strong>User Comments Strengths:</strong>
                </p>
                <ul style={{ paddingLeft: '40px', marginBottom: '10px', marginLeft: '20px' }}>
                  {item.analysis['User Comments Strengths'].map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
              <div style={{ padding: '20px' }}>
                <p style={{ marginBottom: '10px', marginLeft: '20px' }}>
                  <strong>User Comments Weaknesses:</strong>
                </p>
                <ul style={{ paddingLeft: '40px', marginLeft: '20px' }}>
                  {Array.isArray(item.analysis['User Comments Weaknesses']) && item.analysis['User Comments Weaknesses'].map((weakness, index) => (
                    <li key={index}>{weakness}</li>
                  ))}
                </ul>
              </div>
            </>
          )} */}
        </div>
      ))}
    </div>
  );
};
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
            console.log(JSON.parse(JSON.stringify(analysis, null, 2)))

            setAnalysis(JSON.parse(JSON.stringify(analysis, null, 2)))

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
              <button type="submit" className="grp button3 abc3" style={{ backgroundColor: '#292EAB' }}>
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

        {analysis && <PageDataComponent pagedata={analysis} />}

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





// PageDataComponent.jsx

const PageDataComponent = ({ pagedata }) => {


  return (
    <div className="analysis_result">
      {/* <pre>{pagedata}</pre> */}
      <div className="container mx-auto mt-8 p-8 bg-gray-100">
        {
        [
          {
            "type": "commit",
            "sha": "024f405e790b83c142b4ec8b2913af62dc3b760c",
            "analysis": {
              "Code Quality Rating": "⭐⭐⭐⭐",
              "Commit Message Quality Rating": "⭐⭐⭐⭐",
              "Summary": {
                "Code Quality Strengths": [
                  "Adherence to coding standards (e.g., PEP8)",
                  "Maintainable code structure (e.g., clear separation of concerns)",
                  "Efficient use of algorithms and data structures (e.g., avoiding unnecessary loops)"
                ],
                "Areas for Improvement in Code Quality": [
                  "Some variable names could be more descriptive for better readability",
                  "Error handling could be improved by adding more detailed error messages"
                ],
                "Commit Message Clarity": [
                  "Clear and concise descriptions of changes made",
                  "Inclusion of relevant issue or ticket numbers for traceability"
                ],
                "Areas for Improvement in Commit Messages": [
                  "Consider adding more context to the commit message body, explaining the rationale behind the changes"
                ]
              },
              "Recommendations": {
                "Code Quality": [
                  "Utilize code linting tools and automated tests to maintain a high level of code quality and readability",
                  "Strive to write self-documenting code by using descriptive variable names and adding inline comments where necessary"
                ],
                "Commit Messages": [
                  "Incorporate a consistent format for commit messages, including a clear summary line and a detailed body explaining the motivation and impact of the changes",
                  "Reference any relevant user stories or tasks in the commit message to provide context and traceability"
                ]
              }
            }
          },
          {
            "type": "commit",
            "sha": "555bc09c5027b553b75c746bc9de481a7ac5d4a6",
            "analysis": {
              "Code Quality Rating": "⭐⭐⭐⭐",
              "Commit Message Quality Rating": "⭐⭐⭐⭐",
              "Summary": {
                "Code Quality Strengths": [
                  "Modularized code with clear separation of responsibilities.",
                  "Adherence to coding standards and conventions."
                ],
                "Areas for Improvement in Code Quality": [
                  "Lack of comments and inline documentation to explain code functionality.",
                  "Some areas of the code could benefit from refactoring to improve readability."
                ],
                "Commit Message Clarity": [
                  "Clear and concise commit messages that provide a good overview of the changes made.",
                  "Inclusion of relevant issue or bug numbers for easy tracking."
                ],
                "Areas for Improvement in Commit Messages": [
                  "Some commit messages could benefit from more detailed explanations of the rationale behind the changes.",
                  "Occasionally, commit messages lack specific details about the implementation."
                ]
              },
              "Recommendations": {
                "Code Quality": [
                  "Incorporate comments and inline documentation to enhance code readability and understanding.",
                  "Refactor complex code blocks into smaller, more manageable functions or methods to improve maintainability.",
                  "Utilize code review tools or practices to identify potential code quality issues early on."
                ],
                "Commit Messages": [
                  "Provide more detailed explanations of the rationale behind code changes in commit messages.",
                  "Include specific details about the implementation, such as algorithms or techniques used.",
                  "Follow a consistent commit message format to ensure clarity and ease of tracking."
                ]
              }
            }
          },
          {
            "type": "commit",
            "sha": "555bc09c5027b553b75c746bc9de481a7ac5d4a6",
            "analysis": {
              "Code Quality Rating": "⭐⭐⭐⭐",
              "Commit Message Quality Rating": "⭐⭐⭐",
              "Summary": {
                "Code Quality Strengths": [
                  "Adheres to coding standards.",
                  "Well-structured and maintainable code."
                ],
                "Areas for Improvement in Code Quality": [
                  "Use descriptive variable names.",
                  "Extract logic in functions."
                ],
                "Commit Message Clarity": [
                  "Conveys the changes made in the code."
                ],
                "Areas for Improvement in Commit Messages": [
                  "Provide more context and details about the changes."
                ]
              },
              "Recommendations": {
                "Code Quality": [
                  "Use descriptive variable names to enhance code readability.",
                  "Extract reusable logic into functions to improve maintainability."
                ],
                "Commit Messages": [
                  "Include a brief explanation of the motivation behind the changes.",
                  "Mention the specific issue or ticket being addressed (if applicable)."
                ]
              }
            }
          },
          {
            "type": "commit",
            "sha": "555bc09c5027b553b75c746bc9de481a7ac5d4a6",
            "analysis": {
              "Code Quality Rating": 4,
              "Message Quality Rating": 3,
              "Summary": {
                "Code Quality Strengths": [
                  "The code follows a consistent coding style.",
                  "The code is well-structured and easy to read.",
                  "The code is well-tested with unit tests."
                ],
                "Areas for Improvement in Code Quality": [
                  "Some of the variable names are not very descriptive.",
                  "The code could be more efficient in some areas.",
                  "The code could be better documented."
                ],
                "Message Quality Strengths": [
                  "The commit messages are clear and concise.",
                  "The commit messages are informative and provide context for the changes.",
                  "The commit messages are well-formatted and follow a consistent style."
                ],
                "Areas for Improvement in Message Quality": [
                  "Some of the commit messages could be more detailed.",
                  "The commit messages could be more specific about the purpose of the changes.",
                  "The commit messages could be more consistent in terms of tone and language."
                ]
              },
              "Recommendations": {
                "Code Quality": [
                  "Use more descriptive variable names.",
                  "Improve the efficiency of the code in some areas.",
                  "Write better documentation for the code."
                ],
                "Messages": [
                  "Provide more details about the purpose of the changes in the commit messages.",
                  "Be more consistent in terms of tone and language in the commit messages.",
                  "Follow a consistent style guide for writing commit messages."
                ]
              }
            }
          },
          {
            "type": "pull_request",
            "number": 2,
            "analysis": {
              "Developer Performance Rating": "⭐⭐⭐",
              "Explanation": "The comment \"Godd you have successfully added new button to the website.\" is a positive comment, but it lacks constructive feedback or suggestions for improvement. It does not provide any valuable insights or guidance to the developer. While it acknowledges the developer's contribution, it does not indicate a high level of performance or engagement with the code. The comment is a simple acknowledgment of the completed task without any further elaboration or analysis. Therefore, the rating is 3 out of 5, which is considered average."
            }
          }
        ].map((commit, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-bold mb-4"># {index + 1}</h2>

            <div className="border p-4 bg-white rounded shadow-md">
              {commit.type === 'commit' ? (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Commit Information</h3>
                  <p className="text-gray-600 mb-4">
                    <strong>SHA:</strong> {commit.sha}
                  </p>
                  {/* Display other code quality information */}
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Pull Request Information</h3>
                  <p className="text-gray-600 mb-4">
                    <strong>Number:</strong> {commit.number}
                  </p>
                  {/* <h4 className="text-lg font-semibold mb-2">Developer Performance</h4>
                  <p className="text-gray-600 mb-4">
                    <strong>Rating:</strong> {commit.analysis.DeveloperPerformanceRating}
                  </p> */}
                  {/* Display other pull request information */}
                </div>
              )}
            </div>

            {/* Display analysis details */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Analysis Details</h3>
              {/* Display analysis details based on commit type */}
              {/* You may want to conditionally render different sections for commit and pull request */}
              {/* For simplicity, I'm showing a common structure */}
              <ul>
                {Object.entries(commit.analysis).map(([key, value]) => (
                  <li key={key} className="text-gray-600 mb-2">
                    <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


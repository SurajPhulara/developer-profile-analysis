// pages/api/github.js
import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import util from 'util';

const spawnPromise = util.promisify(spawn);

export async function POST(request, content) {

    console.log("helllllllllllllllllllllo  :  ");

    // let x = await request.json()
    // console.log(x)



    const abc = [
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
    ]




    return NextResponse.json(abc, { status: 200 });






    // const pythonScriptPath = 'utils.py';

    // try {
    //     const { usernamee, repo, contributornamee } = x
    //     // console.log(usernamee, repo, contributornamee)
    //     const pythonProcess = spawn('python', [pythonScriptPath, usernamee, repo, contributornamee]);
    //     const [stdout, stderr] = await Promise.all([
    //         new Promise((resolve) => pythonProcess.stdout.on('data', resolve)),
    //         new Promise((resolve) => pythonProcess.stderr.on('data', resolve)),
    //         new Promise((resolve) => pythonProcess.on('close', resolve))
    //     ]);

    //     let dataFromPython = stdout.toString();
    //     let errorFromPython = stderr.toString();

    //     if (errorFromPython) {
    //         console.error(`Error executing Python script: ${errorFromPython}`);
    //         // return NextResponse.json({ user_exists: false, error: 'Internal Server Error' }, { status: 500 });
    //     }

    //     console.log('Python script executed successfully');
    //     console.log(dataFromPython);
    //     return NextResponse.json(dataFromPython, { status: 200 });

    // } catch (error) {
    //     console.error(`Error executing Python script: ${error.message}`);
    //     console.error(`Error NOT DONE`);
    //     return NextResponse.json({ user_exists: false, error: 'Internal Server Error' }, { status: 500 });
    // }
}

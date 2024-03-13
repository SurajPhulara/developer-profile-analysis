// pages/api/github.js
import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import util from 'util';

const spawnPromise = util.promisify(spawn);

export async function POST(request, content) {

    console.log("helllllllllllllllllllllo  :  ");

    const abc = [
        {
            "type": "commit",
            "sha": "7c6f9cc979ac8deec72878664a1f470c3323f4ae",
            "analysis": {
                "Code Quality Rating": "⭐⭐⭐",
                "Commit Message Quality Rating": "⭐⭐",
                "Summary": "Overall, the code quality is at an average level. The code demonstrates basic adherence to coding standards, while the commit message is concise but lacks details and context. There are areas for improvement in both aspects to enhance the maintainability, efficiency, and communicability of the code and commit messages.",
                "Code Quality Strengths": [
                    "Adherence to coding standards: The code follows basic coding conventions, such as proper indentation, variable naming, and syntax."
                ],
                "Areas for Improvement in Code Quality": [
                    "Maintainability: The code lacks organization and modularity, making it somewhat difficult to understand and maintain.",
                    "Efficiency: The code can be optimized to improve performance. There are instances where unnecessary calculations or operations can be removed.",
                    "Error handling: The code doesn't include proper error handling mechanisms, which could lead to unexpected behavior.",
                    "Unit testing: There is no evidence of unit tests to ensure code correctness."
                ],
                "Commit Message Clarity": [
                    "Conciseness: The commit message is brief and to the point."
                ],
                "Areas for Improvement in Commit Messages": [
                    "Lack of context: The commit message doesn't provide any context or rationale for the changes made, making it difficult to understand the purpose behind the changes.",
                    "Missing details: The commit message doesn't include specifics about the changes, such as which files were modified or what specific code improvements were made."
                ],
                "Recommendations": {
                    "Code Quality": [
                        "Incorporate performance optimizations to enhance code efficiency.",
                        "Implement proper error handling mechanisms to address potential issues.",
                        "Add unit tests to ensure code functionality and reliability.",
                        "Organize the code into logical modules and improve the overall structure to enhance maintainability."
                    ],
                    "Commit Messages": [
                        "Provide context and rationale for the changes made, explaining the motivation behind the modifications.",
                        "Include specific details about the changes, such as files modified and code improvements implemented.",
                        "Adhere to a consistent commit message format to improve readability and understanding."
                    ]
                },
                "Conclusion": "By addressing these areas for improvement, the developer can enhance the overall code quality, ensuring maintainability, efficiency, and reliability. Additionally, providing clear and detailed commit messages will facilitate better communication and understanding among team members."
            }
        },
        {
            "type": "pull_request",
            "number": 3,
            "analysis": {
                "Developer Comment Rating": "⭐⭐⭐⭐⭐"
            }
        },
        {
            "type": "pull_request",
            "number": 2,
            "analysis": {
                "Developer Comment Rating": "⭐⭐⭐⭐"
            }
        }
    ]


    return NextResponse.json(abc, { status: 200 });

    let x = await request.json()
    console.log(x)


    const pythonScriptPath = 'utils.py';

    try {
        const { usernamee, repo, contributornamee } = x
        console.log(usernamee, repo, contributornamee)
        const pythonProcess = spawn('python', [pythonScriptPath, usernamee, repo, contributornamee]);
        console.log("reached line 22");

        const startTime = new Date();

        const [stdout, stderr] = await Promise.all([
            new Promise((resolve) => pythonProcess.stdout.on('data', resolve)),
            // new Promise((resolve) => pythonProcess.stderr.on('data', resolve)),
            new Promise((resolve) => pythonProcess.on('close', resolve))
        ]);

        const endTime = new Date();
        const totalTimeInSeconds = (endTime - startTime) / 1000;

        console.log("reached line 28");
        console.log("Total time taken:", totalTimeInSeconds, "seconds");

        let dataFromPython = stdout.toString();
        let errorFromPython = stderr.toString();

        if (errorFromPython) {
            console.error(`Error executing Python script: ${errorFromPython}`);
            // return NextResponse.json({ user_exists: false, error: 'Internal Server Error' }, { status: 500 });
        }

        // const jsonData = JSON.parse(dataFromPython);
        console.log('Python script executed successfully');
        console.log(dataFromPython);
        // dataFromPython = JSON.parse(dataFromPython)
        // console.log("dfdfvd   :    ",dataFromPython);

        return NextResponse.json(dataFromPython, { status: 200 });

    } catch (error) {
        console.error(`Error executing Python script: ${error.message}`);
        console.error(`Error NOT DONE`);
        return NextResponse.json({ user_exists: false, error: 'Internal Server Error' }, { status: 500 });
    }
}

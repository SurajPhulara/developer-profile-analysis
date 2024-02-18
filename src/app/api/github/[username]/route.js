// pages/api/github.js
import axios from 'axios';
import { NextResponse } from 'next/server';
import { spawn } from 'child_process';

export async function GET(request, content) {

    console.log("helllllllllllllllllllllo")


    // try {

    // const { username } = content.params;
    const pythonScriptPath = './developer_profile_analysis/abc.py';

    const pythonProcess = spawn('python', [pythonScriptPath]);
    // , "surajphulara", "routing", "surajphulara", "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"]);

    // Collect data from the Python script's stdout
    // let dataFromPython = '';

    // pythonProcess.stdout.on('data', (data) => {
    //     dataFromPython += data.toString();
    // });

    // Handle Python script execution completion
    // pythonProcess.on('close', (code) => {
    //     if (code === 0) {

    //         // Send the output from util.py as the API response
    //         // res.status(200).json({ message: dataFromPython });
    //         console.log("pppppppppppppppppppppppppppppp")
    //         console.log(dataFromPython)
    //         return NextResponse.json({ user_exists: true }, { status: 200 });
    //     } else {
    //         // If there's an error in the Python script
    //         // res.status(500).json({ error: 'Internal Server Error' });

    //         console.log("ooooooooooooooooooooooooooooooooooooooooooooo")
    //         return NextResponse.json({ user_exists: false }, { status: 500 });
    //     }
    // });


    // Handle Python script execution completion
    pythonProcess.on('close', (code) => {
        if (code === 0) {
            console.log('Python script executed successfully');
        } else {
            console.error('Error executing Python script');
        }
    });


    return NextResponse.json({ user_exists: true }, { status: 200 });
}



// pages/api/github.js
import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import util from 'util';

const spawnPromise = util.promisify(spawn);

export async function GET(request, content) {
    console.log("helllllllllllllllllllllo");

    const pythonScriptPath = 'utils.py';

    try {
        const pythonProcess = spawn('python', [pythonScriptPath]);
        const [stdout, stderr] = await Promise.all([
            new Promise((resolve) => pythonProcess.stdout.on('data', resolve)),
            new Promise((resolve) => pythonProcess.stderr.on('data', resolve)),
            new Promise((resolve) => pythonProcess.on('close', resolve))
        ]);

        let dataFromPython = stdout.toString();
        let errorFromPython = stderr.toString();

        if (errorFromPython) {
            console.error(`Error executing Python script: ${errorFromPython}`);
            // return NextResponse.json({ user_exists: false, error: 'Internal Server Error' }, { status: 500 });
        }

        console.log('Python script executed successfully');
        console.log(dataFromPython);
        return NextResponse.json({ user_exists: true, dataFromPython }, { status: 200 });

    } catch (error) {
        console.error(`Error executing Python script: ${error.message}`);
        console.error(`Error NOT DONE`);
        return NextResponse.json({ user_exists: false, error: 'Internal Server Error' }, { status: 500 });
    }
}

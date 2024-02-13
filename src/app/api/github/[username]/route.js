// pages/api/github.js
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request, content) {


    // try {

    const { username } = content.params;
    if (!username) {
        return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }
    console.log(username)

    const userResponse = await axios.get(`https://api.github.com/users/${username}`, {
        headers: {
            Authorization: `Bearer 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`,
        },
    });
    // console.log(" kk :  ", userResponse.data)
    
    if (userResponse.status === 200) {
        const user = {
            username: userResponse.data.login,
            avatar_url: userResponse.data.avatar_url,
            url: userResponse.data.html_url,
        };
        // User exists, fetch repositories
        const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`, {
            headers: {
                Authorization: `Bearer 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`,
            },
        });

        const repositories = await Promise.all(reposResponse.data.map(async (repo) => {
            // Fetch contributors for each repository
            const contributorsResponse = await axios.get(`https://api.github.com/repos/${username}/${repo.name}/contributors`, {
                headers: {
                    Authorization: `Bearer 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`,
                },
            });

            const contributors = Array.isArray(contributorsResponse.data)
                ? contributorsResponse?.data?.map(contributor => ({
                    username: contributor.login,
                    avatar_url: contributor.avatar_url,
                    url: contributor.html_url,
                }))
                : [{
                    username: contributorsResponse.data.login,
                    avatar_url: contributorsResponse.data.avatar_url,
                    url: contributorsResponse.data.html_url,
                }
                ];

            return {
                name: repo.name,
                description: repo.description,
                url: repo.html_url,
                contributors,
            };
        }));

        // console.log(repositories)
        return NextResponse.json({ user_exists: true, user, repositories }, { status: 200 });
    }

    //       return NextResponse.json({ user_exists: true, repositories }, { status: 200 });
    //     } else {
    return NextResponse.json({ user_exists: false }, { status: 200 });
    //     }
    //   } catch (error) {
    //     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    //   }
}

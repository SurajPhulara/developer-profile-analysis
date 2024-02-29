import requests
from datetime import datetime, timedelta
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.summarize import load_summarize_chain
from dotenv import load_dotenv
from langchain.docstore.document import Document
from langchain.prompts import PromptTemplate
import base64
import sys
sys.stdout.reconfigure(encoding='utf-8')

load_dotenv()

def fetch_user_changed_files_in_commits(owner, repo, username, token):
    # print(f"Fetching changed files for {username} in {owner}/{repo}")
    base_url = "https://api.github.com"
    commits_url = f"{base_url}/repos/{owner}/{repo}/commits"

    headers = {"Authorization": f"token {token}"}

    one_week_ago = (datetime.utcnow() - timedelta(days=7)).strftime("%Y-%m-%dT%H:%M:%SZ")

    commits_params = {
        "author": username,
        "since": one_week_ago,
    }

    commits_response = requests.get(commits_url, headers=headers, params=commits_params)
    commits_response.raise_for_status()

    commits_data = commits_response.json()

    user_changed_files = []

    for commit in commits_data:
        commit_details = {
            'sha': commit['sha'],
            'message': commit['commit']['message'],
            'changed_files': []
        }

        files_url = f"{base_url}/repos/{owner}/{repo}/commits/{commit['sha']}?diff=unified&w=0"
        files_response = requests.get(files_url, headers=headers)

        files_response.raise_for_status()

        files_data = files_response.json()

        for file_info in files_data.get('files', []):
            if 'changes' in file_info and file_info['changes'] > 0:
                file_details = {
                    'status': file_info['status'],
                    'path': file_info['filename'],
                    'content': "",
                    'patch': file_info['patch']
                }

                raw_url = f"{base_url}/repos/{owner}/{repo}/contents/{file_info['filename']}?ref={commit['sha']}"
                file_response = requests.get(raw_url, headers=headers)

                file_response.raise_for_status()

                file_data = file_response.json()

                if 'content' in file_data:
                    content = base64.b64decode(file_data['content']).decode('utf-8')
                    file_details['content'] = content

                commit_details['changed_files'].append(file_details)

        user_changed_files.append(commit_details)

    return user_changed_files


def fetch_user_pull_requests(owner, repo, username, token):
    # print(f"Fetching pull requests for {username} in {owner}/{repo}")
    base_url = "https://api.github.com"
    pulls_url = f"{base_url}/repos/{owner}/{repo}/pulls"

    headers = {"Authorization": f"token {token}"}

    one_week_ago = (datetime.utcnow() - timedelta(days=7)).strftime("%Y-%m-%dT%H:%M:%SZ")

    pulls_params = {
        "state": "all",
        "sort": "updated",
        "direction": "desc",
        "since": one_week_ago,
        "creator": username
    }

    pulls_response = requests.get(pulls_url, headers=headers, params=pulls_params)
    pulls_response.raise_for_status()
    pulls_data = pulls_response.json()

    user_pull_requests = []
    for pull_request in pulls_data:
        pull_request_details = {
            'number': pull_request['number'],
            'title': pull_request['title'],
            'state': pull_request['state'],
            'comments': []
        }

        comments_url = f"{base_url}/repos/{owner}/{repo}/issues/{pull_request['number']}/comments"
        comments_response = requests.get(comments_url, headers=headers)
        comments_response.raise_for_status()
        comments_data = comments_response.json()

        for comment in comments_data:
            comment_details = {
                'user': comment['user']['login'],
                'body': comment['body']
            }
            pull_request_details['comments'].append(comment_details)

        user_pull_requests.append(pull_request_details)

    return user_pull_requests

def generate_developer_performance_analysis(filename, code_content, commit_message):
    llm_g = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.9)
    prompt = """
        Task: Evaluate the developer's performance by analyzing code quality and commit messages in their recent commits.

        Instructions:
        1. Retrieve the last few commits made by the developer in the specified repository.
        2. Assess the code quality, considering factors such as adherence to coding standards, maintainability, and efficiency, based on the provided unified diff/patch file.
        3. Evaluate the clarity and relevance of the commit messages in conveying the changes made.
        4. Provide a rating on a scale of 1 to 5 stars for both code quality and commit message quality, where 1 represents poor performance and 5 represents excellent performance.
        5. Include a detailed summary of the analysis for both aspects, highlighting strengths and areas for improvement.
        6. If there are specific criteria or coding standards to adhere to, mention them in your analysis.

        Input:
        File Name: {filename}
        Code Changes: {code}
        Commit Message: {commit_message}

        Output Structure (in JSON format remember it is important to maintain standard json format like in javascript strictly without any unnecessary punctuation marks and special characters like /\*) dont print "/n" :
        Code Quality Rating: [number of ⭐⭐⭐⭐⭐]
        Commit Message Quality Rating: [number of ⭐⭐⭐⭐⭐]

        Summary:
        - Code Quality Strengths: [Identify strong points]
        - Areas for Improvement in Code Quality: [Highlight areas that need improvement]
        - Commit Message Clarity: [Evaluate how well the commit message conveys changes]
        - Areas for Improvement in Commit Messages: [Highlight areas that need improvement]

        Recommendations:
        - Suggest specific actions to enhance code quality.
        - Provide guidance on writing clear and informative commit messages.
        - Offer advice on adopting best practices.

        Note: The ratings should reflect the overall code quality and commit message quality, and the summary should offer constructive feedback for improvement.
        Special note: Please do not include or print any code file or code in the output.
        """
    # star_template = PromptTemplate(template=prompt, input_variables=['filename', 'code_content', 'commit_message'])
    prompt = prompt.format(code=code_content, filename=filename, commit_message=commit_message)
    response = llm_g.invoke(prompt)
    return response.content

def generate_pull_request_analysis(user, comment):
    llm_g = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.9)
    prompt = """
    Task: Evaluate the developer's performance by analyzing comment quality in their pull requests.

    Do an analysis on {user}'s {comment} on an repository and give him an rating from 1-5 based on the comments on Pull request.
    
    1. Positive comments : like +1, bravo, nice,this code looks very good etc.
    2. Code suggestions in comments: Some alternate implementation of current code, this should be considered as neutral.
    3. Change Request: This could be considered as negative or if reviewer says there is a change in requirement then neutral.

    input:
    user - {user}
    comment - {comment}

    Output Structure (in JSON format remember it is important to maintain standard json format like in javascript strictly without unnecessary punctuation marks and special characters like /\*) dont print "/n" :
    Developer Performance Rating: [number of ⭐⭐⭐⭐⭐]
    

    Note: The rating should reflect the overall comment quality.
    """
    prompt = prompt.format(user=user, comment=comment)
    response = llm_g.invoke(prompt)
    return response.content
def get_summary(doc):
    llm_g = ChatGoogleGenerativeAI(model="gemini-pro")
    chain = load_summarize_chain(llm_g, chain_type="stuff")
    summary = chain.run([doc])
    return summary

def display_github_analysis(owner, repo, username, token):
    analysis_results = []
    changed_files_info = fetch_user_changed_files_in_commits(owner, repo, username, token)
    for commit_info in changed_files_info:
        if commit_info['changed_files']:
            for file_info in commit_info['changed_files']:
                commit_analysis = generate_developer_performance_analysis(file_info['path'], file_info['patch'], commit_info['message'])
                analysis_results.append({
                    'type': 'commit',
                    'sha': commit_info['sha'],
                    'analysis': commit_analysis
                })

    # Analyze pull requests
    user_pull_requests = fetch_user_pull_requests(owner, repo, username, token)
    for pull_request in user_pull_requests:
        for comment in pull_request['comments']:
            pr_analysis = generate_pull_request_analysis(comment['user'], comment['body'])
            analysis_results.append({
                'type': 'pull_request',
                'number': pull_request['number'],
                'analysis': pr_analysis
            })

    all_analyses = []
    for result in analysis_results:
        result['analysis'] = result['analysis'].replace('\n', '')

    for result in analysis_results:
        all_analyses.append(str(result['analysis']))


    all_analyses_content = "\n".join(all_analyses)
    doc = Document(page_content=all_analyses_content)
    overall_summary = get_summary(doc)

    return overall_summary, analysis_results

owner = "impressico-testing"
repo = "test"
username= "impressico-testing"
token = "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"

# overall_summary, analysis_results = display_github_analysis(owner,repo,username,token)

# print([[overall_summary],[1,2,3,4,5], [analysis_results]])
# print("_____")
# print(analysis_results)
# print("___DONE__")





if __name__ == "__main__":
    # print("hello abc : ")
#     # If so, extract command-line arguments and call the function
#     owner = "impressico-testing"
#     repo = "test"
#     username= "impressico-testing"
#     token = "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"

#     overall_summary, analysis_results = display_github_analysis(owner,repo,username,token)

#     print(overall_summary)
#     print("_____________")
#     print(analysis_results)
#     print("hello abc")

    # print("reached gg: ",sys.argv)
    if len(sys.argv) == 4:
        # print("reached : ",sys.argv)
        username = sys.argv[1]
        repository = sys.argv[2]
        contributor_name = sys.argv[3]
        # token = sys.argv[4]
        # result = get_contributor_info(username, repository, contributor_name, token)
        # overall_summary, analysis_results  = display_github_analysis(username, repository, contributor_name,token)
        overall_summary, analysis_results = display_github_analysis(owner,repo,username,token)
        print([[overall_summary], [analysis_results]])




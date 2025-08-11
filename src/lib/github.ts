function requireGitEnv() {
	const GitEnv = {
		GITHUB_OWNER: process.env.GITHUB_OWNER,
		GITHUB_REPO: process.env.GITHUB_REPO,
		GITHUB_TOKEN: process.env.GITHUB_TOKEN,
	};
	const missing = Object.entries(GitEnv).filter(([, v]) => !v?.trim());
	if (missing.length) {
		throw new Error(
			`환경 변수 설정 오류: ${missing.join(', ')} 누락되었습니다.`,
		);
	}
	const {
		GITHUB_OWNER: owner,
		GITHUB_REPO: repo,
		GITHUB_TOKEN: token,
	} = GitEnv as {
		GITHUB_OWNER: string;
		GITHUB_REPO: string;
		GITHUB_TOKEN: string;
	};
	return { owner, repo, token };
}

async function getMarkdownList() {
	const { owner, repo, token } = requireGitEnv();
	const res = await fetch(
		`https://api.github.com/repos/${owner}/${repo}/contents/til`,
		{
			headers: { Authorization: `token ${token}` },
			next: { revalidate: 60 },
		},
	);
	if (!res.ok) throw new Error('GitHub 파일 목록 가져오기 실패');
	return res.json();
}

async function getMarkdownContent(slug: string) {
	const { owner, repo, token } = requireGitEnv();
	const repoUrl = `https://api.github.com/repos/${owner}/${repo}/contents/til/${slug}.md`;
	const res = await fetch(repoUrl, {
		headers: { Authorization: `token ${token}` },
		cache: 'no-cache',
	});
	if (res.status === 404) return null;
	if (!res.ok)
		throw new Error(`markdown fetching 오류: ${res.status} ${res.statusText}`);
	const { content } = await res.json();
	return Buffer.from(content, 'base64').toString('utf-8');
}

export { requireGitEnv, getMarkdownList, getMarkdownContent };

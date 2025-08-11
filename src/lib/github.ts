const GITHUB_ENV_KEYS = [
	'GITHUB_OWNER',
	'GITHUB_REPO',
	'GITHUB_TOKEN',
] as const;
const GITHUB_API_BASE_URL = 'https://api.github.com/repos';

function requireGitEnv() {
	const env: Partial<Record<(typeof GITHUB_ENV_KEYS)[number], string>> = {};
	for (const key of GITHUB_ENV_KEYS) {
		const value = process.env[key]?.trim();
		if (value) {
			env[key] = value;
		}
	}
	const missingKeys = GITHUB_ENV_KEYS.filter((key) => !env[key]);
	if (missingKeys.length > 0) {
		throw new Error(
			`환경 변수 설정 오류: ${missingKeys.join(', ')} 누락되었습니다.`,
		);
	}
	return {
		owner: env.GITHUB_OWNER as string,
		repo: env.GITHUB_REPO as string,
		token: env.GITHUB_TOKEN as string,
	};
}

function createAuthHeaders(token: string) {
	return {
		Authorization: `token ${token}`,
	};
}

async function getMarkdownList() {
	const { owner, repo, token } = requireGitEnv();
	const url = `${GITHUB_API_BASE_URL}/${owner}/${repo}/contents/til`;
	const res = await fetch(url, {
		headers: createAuthHeaders(token),
		next: { revalidate: 60 },
	});
	if (res.status === 404) return null;
	if (!res.ok)
		throw new Error(`markdown list fetching 오류: ${res.status} ${res.status}`);
	return res.json();
}

async function getMarkdownContent(slug: string) {
	const { owner, repo, token } = requireGitEnv();
	const url = `${GITHUB_API_BASE_URL}/${owner}/${repo}/contents/til/${slug}.md`;
	const res = await fetch(url, {
		headers: createAuthHeaders(token),
		cache: 'no-cache',
	});
	if (res.status === 404) return null;
	if (!res.ok)
		throw new Error(
			`markdown content fetching 오류: ${res.status} ${res.statusText}`,
		);
	const { content } = await res.json();
	return Buffer.from(content, 'base64').toString('utf-8');
}

async function getMarkdownContentByUrl(url: string): Promise<string | null> {
	const { token } = requireGitEnv();
	const cleanUrl = url.split('?')[0];
	const res = await fetch(cleanUrl, {
		headers: createAuthHeaders(token),
	});
	if (res.status === 404) return null;
	if (!res.ok) {
		throw new Error(
			`markdown content fetching 오류: ${res.status} ${res.statusText}`,
		);
	}
	const { content } = await res.json();
	const decoded = Buffer.from(content, 'base64').toString('utf-8');
	return decoded.trim() === '' ? null : decoded;
}

export {
	requireGitEnv,
	getMarkdownList,
	getMarkdownContent,
	getMarkdownContentByUrl,
};

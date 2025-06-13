// src/lib/github.ts
// GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO 는 .env 로 관리
const TOKEN = process.env.GITHUB_TOKEN;
const OWNER = process.env.GITHUB_OWNER;
const REPO = process.env.GITHUB_REPO;

// GitHub API를 호출해 til 디렉토리 내 .md 파일 목록만 반환
export async function fetchMdFileList() {
	const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/til`;

	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${TOKEN}`,
			Accept: 'application/vnd.github.v3+json',
		},
	});

	if (!res.ok) throw new Error('파일 목록 로딩 실패');
	const data = (await res.json()) as Array<{ name: string; url: string }>;
	return data.filter((item) => item.name.endsWith('.md'));
}

// GitHub raw 컨텐츠로부터 텍스트를 가져오는 함수
export async function fetchMdFileContent(filename: string) {
	const url = `https://raw.githubusercontent.com/${OWNER}/${REPO}/main/til/${filename}`;

	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${TOKEN}`,
		},
	});

	if (!res.ok) throw new Error('파일 내용 로딩 실패');
	return await res.text();
}

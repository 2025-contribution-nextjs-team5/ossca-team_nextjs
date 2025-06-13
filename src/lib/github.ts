// lib/github.ts
// lib/github.ts
const TOKEN = process.env.GITHUB_TOKEN;
const OWNER = process.env.GITHUB_OWNER;
const REPO = process.env.GITHUB_REPO;

export async function fetchMdFileList() {
	const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/til`;

	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${TOKEN}`,
			Accept: 'application/vnd.github.v3+json',
		},
	});

	if (!res.ok) throw new Error('파일 목록 로딩 실패');
	const data = await res.json();
	return data.filter((item: any) => item.name.endsWith('.md'));
}

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

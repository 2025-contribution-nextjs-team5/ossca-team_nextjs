import matter from 'gray-matter'; // Markdown 파일의 frontmatter(meta 정보)를 파싱하기 위한 라이브러리
import PostingTemplate from './PostingTemplate';
const GITHUB_API_URL = 'https://api.github.com';

// GitHub 저장소에서 TIL 디렉토리 내의 Markdown 파일 목록을 가져오는 함수
const getMarkdownList = async (): Promise<
	{
		name: string;
		url: string;
	}[]
> => {
	const res = await fetch(
		`${GITHUB_API_URL}/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/til`,
		{
			headers: {
				Authorization: `token ${process.env.GITHUB_TOKEN}`, // GitHub 인증 토큰
			},
			next: { revalidate: 60 }, // ISR 위한 설정 (60초마다 재검증)
		},
	);

	if (!res.ok) throw new Error('GitHub 파일 목록 가져오기 실패');
	return res.json();
};

// 특정 Markdown 파일의 원본 content를 GitHub API로부터 가져오고 base64 디코딩하여 반환하는 함수
const getMarkdownContent = async (url: string): Promise<string | null> => {
	const res = await fetch(url, {
		headers: {
			Authorization: `token ${process.env.GITHUB_TOKEN}`,
		},
	});

	if (!res.ok) throw new Error('파일 내용 가져오기 실패');

	const fileData: { content: string } = await res.json();
	const decoded = Buffer.from(fileData.content, 'base64').toString('utf-8'); // Base64 디코딩

	return decoded.trim() === '' ? null : decoded; // 사전 필터: 내용이 비어있으면 null 반환
};

// Markdown 본문에서 '## ' 로 시작하는 Subheading들만 추출하여 배열로 반환하는 함수
const extractSubHeadings = (markdown: string): string[] => {
	const lines = markdown.split('\n');
	return lines
		.filter((line) => line.startsWith('## ')) // Subheading만 필터링
		.map((line) => line.replace(/^##\s+/, '').trim()); // '## ' 제거 후 공백 제거
};

// 포스트 타입
interface Post {
	slug: string;
	title: string;
	subHeadings: string[];
}

// ✔️ Next.js 15에선 searchParams 가 Promise 로 들어올 수 있음
interface Props {
	searchParams?: Promise<{ q?: string }>;
}

//포스팅 페이지 컴포넌트(GitHub에서 Markdown 목록 가져오고, 각 파일의 내용 파싱하여 게시글 리스트로 렌더링)
export default async function PostingPage({ searchParams }: Props) {
	// ✔️ 먼저 resolve 해서 동기 값으로 변환
	const resolvedParams = searchParams ? await searchParams : undefined;
	const searchKeyword = resolvedParams?.q?.toLowerCase() || '';

	const files = await getMarkdownList(); // 파일 목록 가져오기

	const posts = await Promise.all(
		files
			.filter((file) => file.name.endsWith('.md')) // .md 파일만 필터링
			.reverse() // 최신 순으로 정렬
			.map(async (file) => {
				const content = await getMarkdownContent(file.url); // 내용 가져오기
				if (!content) return null; // null인 경우 필터될 수 있게 처리
				const { data } = matter(content); // frontmatter 파싱
				const subHeadings = extractSubHeadings(content); // Subheading 추출

				const title =
					data.title ??
					(file.name === 'README.md'
						? 'README'
						: file.name.replace('.md', ' TIL'));

				const lowerContent = content.toLowerCase();

				if (
					searchKeyword &&
					!title.toLowerCase().includes(searchKeyword) &&
					!lowerContent.includes(searchKeyword)
				) {
					return null;
				}

				return {
					slug: file.name.replace('.md', ''),
					title,
					subHeadings,
				};
			}),
	);

	const filteredPosts = posts.filter((post): post is Post => post !== null); // null 제거

	return (
		<PostingTemplate
			filteredPosts={filteredPosts}
			searchKeyword={searchKeyword}
		/>
	);
}

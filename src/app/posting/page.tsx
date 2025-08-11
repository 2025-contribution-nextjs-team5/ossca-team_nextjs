import matter from 'gray-matter'; // Markdown 파일의 frontmatter(meta 정보)를 파싱하기 위한 라이브러리
import PostingList from './components/PostingList';
import { getMarkdownList, getMarkdownContentByUrl } from '../../lib/github';

function extractSubHeadings(markdown: string) {
	return markdown
		.split('\n')
		.filter((line) => line.startsWith('## '))
		.map((line) => line.replace(/^##\s+/, '').trim());
}

interface Post {
	slug: string;
	title: string;
	subHeadings: string[];
}

interface Props {
	searchParams?: Promise<{ q?: string }>;
}

export default async function PostingPage({ searchParams }: Props) {
	const resolvedParams = searchParams ? await searchParams : undefined;
	const searchKeyword = resolvedParams?.q?.toLowerCase() || '';

	const files = await getMarkdownList(); // 파일 목록 가져오기

	const posts = await Promise.all(
		files
			.filter((file: { name: string }) => file.name.endsWith('.md')) // .md 파일만 필터링
			.reverse() // 최신 순으로 정렬
			.map(async (file: { name: string; url: string }) => {
				const content = await getMarkdownContentByUrl(file.url);
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
		<PostingList filteredPosts={filteredPosts} searchKeyword={searchKeyword} />
	);
}

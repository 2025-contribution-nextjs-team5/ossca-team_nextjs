import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { MdxStyle } from '../components/MdxStyle';

const GITHUB_API_URL = 'https://api.github.com';

const getMarkdownContent = async (slug: string) => {
	const res = await fetch(
		`${GITHUB_API_URL}/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/til/${slug}.md`,
		{
			headers: {
				Authorization: `token ${process.env.GITHUB_TOKEN}`,
			},
			cache: 'no-cache',
		},
	);

	if (!res.ok) return null;

	const fileData = await res.json();
	const decoded = Buffer.from(fileData.content, 'base64').toString('utf-8');
	return decoded;
};

export default async function PostingDetailPage(props: {
	params: { slug: string };
}) {
	const { params } = props;
	const markdown = await getMarkdownContent(params.slug);
	if (!markdown) return notFound();

	const { content, data } = matter(markdown);

	const escapeNonHtmlTags = (markdown: string) => {
		// 먼저 줄 단위로 나눠서 인용문 라인인지 확인 후 각각 이스케이프 처리
		let escaped = markdown
			.split('\n')
			.map((line) => {
				if (/^\s*>/.test(line)) {
					// 인용문 줄은 그대로 두기
					return line;
				}
				// 인용문 아닌 줄에만 <, > 이스케이프 처리
				return line
					.replace(/<(?!\/?\w+[^>]*>)/g, '&lt;')
					.replace(/(?<!<[^>]+)>(?![^<]*>)/g, '&gt;');
			})
			.join('\n');

		// 링크 텍스트 내의 <, > 이스케이프 처리 (전체에 적용)
		escaped = escaped.replace(
			/\[([^\]]*?<[^>]+>[^\]]*?)\]\((.*?)\)/g,
			(_, linkText, url) =>
				`[${linkText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}](${url})`,
		);

		// 모든 URL 텍스트를 [url](url)로 치환 (이미 링크 처리된 건 제외)
		escaped = escaped.replace(
			/(?<!\]\()(?<!\]:\s*)(?<!["'=\(])\b(https?:\/\/[^\s<>\[\](){}"']+)/g,
			(url) => `[${url}](${url})`,
		);

		return escaped;
	};

	const fixedContent = escapeNonHtmlTags(content)
		.replace(/<br>/g, '<br />')
		.replace(/<img([^>]*)(?<!\/)>/g, '<img$1 />')
		.replace(
			/<table>\s*(<tr>[\s\S]*?<\/tr>)\s*<\/table>/g,
			'<table><tbody>$1</tbody></table>',
		);

	return (
		<div className="mx-auto">
			{/* 제목도 본문 카드와 동일한 폭, 정렬로 감쌈 */}
			<div className="w-[90%] mx-auto">
				<h1 className="text-3xl font-bold mb-6">
					{data.title || params.slug} TIL ------------------------------------
				</h1>
			</div>

			{/* 본문 카드 */}
			<div
				style={{ backgroundColor: 'rgba(206, 206, 206, 0.2)' }}
				className="w-[90%] px-7 py-7 mb-2 mx-auto rounded-xl"
			>
				<article className="prose prose-lg dark:prose-invert">
					<MDXRemote source={fixedContent} components={MdxStyle} />
				</article>
			</div>
		</div>
	);
}

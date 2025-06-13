// src/app/posting/[slug]/page.tsx

import { compileMDX } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';
import { MdxStyle } from '../components/MdxStyle';
import { notFound } from 'next/navigation';

interface Params {
	slug: string;
}

type Props = {
	// Next.js 15에서는 params가 Promise로 넘어옴
	params: Promise<Params>;
};

// GitHub API로부터 MD 파일 내용(base64) 가져오기
async function getMarkdownContent(slug: string) {
	const res = await fetch(
		`https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/til/${slug}.md`,
		{
			headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
			cache: 'no-cache',
		},
	);
	if (!res.ok) return null;
	const { content } = await res.json();
	return Buffer.from(content, 'base64').toString('utf-8');
}

export default async function PostingDetailPage({ params }: Props) {
	// params가 Promise이므로 await로 풀어야 slug에 접근할 수 있음
	const { slug } = await params;

	// GitHub에서 MD 파일 내용 가져오기
	const markdown = await getMarkdownContent(slug);
	if (!markdown) return notFound();

	// frontmatter(meta) 분리
	const { content, data } = matter(markdown);

	// HTML 태그가 아닌 모든 '<', '>'를 이스케이프
	const escapeNonHtmlTags = (markdown: string) => {
		let escaped = markdown
			.split('\n')
			.map((line) => {
				if (/^\s*>/.test(line)) {
					// 인용구 라인은 그대로
					return line;
				}
				return line
					.replace(/<(?!\/?\w+[^>]*>)/g, '&lt;')
					.replace(/(?<!<[^>]+)>(?![^<]*>)/g, '&gt;');
			})
			.join('\n');

		// 링크 텍스트 내 '<', '>' 이스케이프
		escaped = escaped.replace(
			/\[([^\]]*?<[^>]+>[^\]]*?)\]\((.*?)\)/g,
			(_, linkText, url) =>
				`[${linkText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}](${url})`,
		);

		// 모든 URL 텍스트를 자동 링크로 변환
		escaped = escaped.replace(
			/(?<!\]\()(?<!\]:\s*)(?<!["'=\(])\b(https?:\/\/[^\s<>\[\](){}"']+)/g,
			(url) => `[${url}](${url})`,
		);

		return escaped;
	};

	// self-closing 태그 보정
	const normalizedContent = escapeNonHtmlTags(content)
		.replace(/<br>/g, '<br />')
		.replace(/<img([^>]*)(?<!\/)>/g, '<img$1 />');

	// MDX → React Element
	const { content: mdxElement } = await compileMDX({
		source: normalizedContent,
		options: {
			parseFrontmatter: false,
			mdxOptions: {
				remarkPlugins: [remarkGfm], // GFM 테이블 지원
			},
		},
		components: MdxStyle,
	});

	return (
		<div className="mx-auto">
			{/* 제목 */}
			<div className="w-[90%] mx-auto">
				<h1 className="text-3xl font-bold mb-6">{data.title || slug} TIL</h1>
			</div>

			{/* 본문 카드 */}
			<div
				className="w-[90%] px-7 py-7 mb-2 mx-auto rounded-xl"
				style={{ backgroundColor: 'rgba(206, 206, 206, 0.2)' }}
			>
				<article className="prose prose-lg dark:prose-invert">
					{mdxElement}
				</article>
			</div>
		</div>
	);
}

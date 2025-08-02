// src/app/posting/[slug]/page.tsx

import { compileMDX } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { MdxStyle } from '../components/MdxStyle';
import { notFound } from 'next/navigation';

interface Params {
	slug: string;
}

interface Props {
	// Next.js 15에서는 params가 Promise로 넘어옴
	params: Promise<Params>;
}

function requireGitEnv() {
	const env = {
		GITHUB_OWNER: process.env.GITHUB_OWNER,
		GITHUB_REPO: process.env.GITHUB_REPO,
		GITHUB_TOKEN: process.env.GITHUB_TOKEN,
	};
	const missing = Object.entries(env).filter(([, v]) => !v?.trim());
	if (missing.length) {
		throw new Error(
			`환경 변수 설정 오류: ${missing.join(', ')} 누락되었습니다.`,
		);
	}

	const {
		GITHUB_OWNER: owner,
		GITHUB_REPO: repo,
		GITHUB_TOKEN: token,
	} = env as {
		GITHUB_OWNER: string;
		GITHUB_REPO: string;
		GITHUB_TOKEN: string;
	};

	return { owner, repo, token };
}

/**
 * 깃허브 API가 반환하는 Base64 형태의 파일을 utf-8로 반환
 */
async function getMarkdownContent(slug: string) {
	const { owner, repo, token } = requireGitEnv();

	const repoUrl = `https://api.github.com/repos/${owner}/${repo}/contents/til/${slug}.md`;
	const res = await fetch(repoUrl, {
		headers: { Authorization: `token ${token}` },
		cache: 'no-cache',
	});
	if (res.status === 404) return null;
	if (!res.ok) {
		throw new Error(`markdown fetching 오류: ${res.status} ${res.statusText}`);
	}

	const { content } = await res.json();
	const markdown = Buffer.from(content, 'base64').toString('utf-8');
	return markdown;
}

async function getDetailPost(slug: string) {
	const markdown = await getMarkdownContent(slug);
	if (!markdown) return null;

	const { content, data } = matter(markdown);
	const normalizedContent = content
		.replace(/<br>/g, '<br />')
		.replace(/<img([^>]*?)(?<!\/)>/gi, '<img$1 />');

	const { content: mdxElement } = await compileMDX({
		source: normalizedContent,
		options: {
			parseFrontmatter: false,
			mdxOptions: {
				remarkPlugins: [remarkGfm],
				rehypePlugins: [rehypeSanitize],
			},
		},
		components: MdxStyle,
	});

	return {
		title: data.title as string | undefined,
		mdxElement,
	};
}

export default async function PostingDetailPage({ params }: Props) {
	const { slug } = await params;

	const post = await getDetailPost(slug);
	if (!post) return notFound();

	return (
		<div className="mx-auto mt-2">
			{/* 제목 */}
			<div className="w-[90%] mx-auto">
				<h1 className="text-3xl font-bold mb-6">{post.title || slug} TIL</h1>
			</div>

			{/* 본문 카드 */}
			<div
				className="w-[90%] px-7 py-7 mb-2 mx-auto rounded-xl"
				style={{ backgroundColor: 'rgba(206, 206, 206, 0.2)' }}
			>
				<article className="prose prose-lg dark:prose-invert">
					{post.mdxElement}
				</article>
			</div>
		</div>
	);
}

import { compileMDX } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { MdxStyle } from '../components/MdxStyle';
import { notFound } from 'next/navigation';
import { getMarkdownContent } from '../../../lib/github';

interface Params {
	slug: string;
}
interface Props {
	params: Promise<Params>;
}

/**
 * 특정 포스트(slug) 내용 mdx 형태로 가져오기
 */
async function getDetailPost(slug: string) {
	const markdown = await getMarkdownContent(slug);
	if (!markdown) return null;

	const { content, data } = matter(markdown);

	const normalizedContent = content
		// HTML 태그 (br, img) self-closing 처리
		.replace(/<br>/g, '<br />')
		.replace(/<img([^>]*?)(?<!\/)>/gi, '<img$1 />')

		// 링크 안의 꺾쇠괄호 이스케이프 처리
		.replace(/\[([^\]]*)<([^>]*>)/g, (_, before, after) => {
			return `[${before}&lt;${after.replace('>', '&gt;')}`;
		});

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

function PostTitle({ title, slug }: { title?: string; slug: string }) {
	return (
		<div className="w-[90%] mx-auto">
			<h1 className="text-3xl font-bold mb-6">{title || slug} TIL</h1>
		</div>
	);
}

function PostContent({ children }: { children: React.ReactNode }) {
	return (
		<div
			className="w-[90%] px-7 py-7 mb-2 mx-auto rounded-xl"
			style={{ backgroundColor: 'rgba(206, 206, 206, 0.2)' }}
		>
			<article className="prose prose-lg dark:prose-invert">{children}</article>
		</div>
	);
}

export default async function PostingDetailPage({ params }: Props) {
	const { slug } = await params;

	const post = await getDetailPost(slug);
	if (!post) return notFound();

	return (
		<div className="mx-auto mt-2">
			<PostTitle title={post.title} slug={slug} />
			<PostContent>{post.mdxElement}</PostContent>
		</div>
	);
}

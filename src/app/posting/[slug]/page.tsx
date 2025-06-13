// src/app/posting/[slug]/page.tsx
import { MDXRemote, compileMDX } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';
import { MdxStyle } from '../components/MdxStyle';
import { notFound } from 'next/navigation';

const GITHUB_API_URL = 'https://api.github.com';

async function getMarkdownContent(slug: string) {
  const res = await fetch(
    `${GITHUB_API_URL}/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/til/${slug}.md`,
    {
      headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
      cache: 'no-cache',
    }
  );
  if (!res.ok) return null;
  const { content } = await res.json();
  return Buffer.from(content, 'base64').toString('utf-8');
}

export default async function PostingDetailPage({
  params,
}: {
  // params를 Promise<{ slug: string }>로 선언
  params: Promise<{ slug: string }>;
}) {
  // await로 slug를 꺼내기
  const { slug } = await params;

  // (나머지 MDX 컴파일, 렌더링 로직)
  const markdown = await getMarkdownContent(slug);
  if (!markdown) return notFound();

  // frontmatter 분리
  const { content, data } = matter(markdown);

  const escapeNonHtmlTags = (markdown: string) => {
  // 먼저 줄 단위로 나눠서 인용문 라인인지 확인 후 각각 이스케이프 처리
  let escaped = markdown
    .split('\n')
    .map(line => {
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
    (_, linkText, url) => `[${linkText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}](${url})`
  );

  // 모든 URL 텍스트를 [url](url)로 치환 (이미 링크 처리된 건 제외)
  escaped = escaped.replace(
    /(?<!\]\()(?<!\]:\s*)(?<!["'=\(])\b(https?:\/\/[^\s<>\[\](){}"']+)/g,
    (url) => `[${url}](${url})`
  );

  return escaped;
};


  // MDX 파서가 <br> 태그 인식하게 self-closing 형태로 바꿈
  const normalizedContent = escapeNonHtmlTags(content)
    .replace(/<br>/g, '<br />')
    .replace(/<img([^>]*)(?<!\/)>/g, '<img$1 />')

  // compileMDX 로 MDX(content) → React Element
  const { content: mdxElement } = await compileMDX<{}>({
    source: normalizedContent,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],    // GFM 테이블 지원
      },
    },
    // components는 compileMDX 단계에 넘겨도 되고, MDXRemote 단계에 넘겨도 됨
    components: MdxStyle,
  });

  return (
    <div className="mx-auto">
      <div className="w-[90%] mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          {data.title || slug} TIL
        </h1>
      </div>
      <div
        className="w-[90%] px-7 py-7 mb-2 mx-auto rounded-xl"
        style={{ backgroundColor: 'rgba(206, 206, 206, 0.2)' }}
      >
        <article className="prose prose-lg dark:prose-invert">
          {/* 이미 ReactElement 상태인 mdxElement 를 그대로 렌더링 */}
          {mdxElement}
        </article>
      </div>
    </div>
  );
}

'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Divider from '../common/Divider';
import SearchBar from '../common/SearchBar';
import ArticleSnippet from './components/ArticleSnippet';
import NotFound from './components/NotFound';
import TabMenu from '@/app/common/TabMenu';

interface Post {
	slug: string;
	title: string;
	subHeadings: string[];
}

interface PostingTemplateProps {
	filteredPosts: Post[];
}

export default function PostingTemplate({
	filteredPosts,
}: PostingTemplateProps) {
	// ─── fixed vs normal 분리 ───
	const fixedPosts = filteredPosts.filter((p) => !/^\d{4}$/.test(p.slug));
	const normalPosts = filteredPosts.filter((p) => /^\d{4}$/.test(p.slug));

	// ─── mm 탭 생성 (최신순) ───
	const tabs = useMemo(
		() =>
			Array.from(new Set(normalPosts.map((p) => p.slug.slice(0, 2)))).sort(
				(a, b) => Number(b) - Number(a),
			),
		[normalPosts],
	);

	const [activeTab, setActiveTab] = useState(tabs[0] ?? '');
	const postsForTab = normalPosts.filter((p) => p.slug.startsWith(activeTab));

	return (
		<div className="mt-10">
			{/** ─── 탭 + 검색창 (90% 컨테이너) ─── */}
			<div className="w-9/10 mx-auto flex items-center justify-between h-[48px] mb-6">
				{/* 왼쪽: TabMenu */}
				<TabMenu
					tabs={tabs}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>

				{/* 오른쪽: SearchBar 래퍼
            - 고정 폭 w-[350px] (원하는 대로 조정)
            - 자식 첫 div(.mb-10, .ml-[70%]) 리셋: !mb-0 !ml-0
            - 자식 둘째 div(.w-[83%]) 확장: w-full */}
				<div className="w-[350px] [&>div]:!mb-0 [&>div]:!ml-0 [&>div>div]:w-full">
					<SearchBar />
				</div>
			</div>

			{/** ─── Divider (90% 컨테이너) ─── */}
			<Divider
				className="mb-8 mx-auto"
				width="w-9/10"
				color="border-ossca-gray-100"
			/>

			{/** ─── 게시글 리스트 (full-width) ─── */}
			<div className="space-y-6">
				{/* 항상 상단에 고정되는 포스트 */}
				{fixedPosts.map((p) => (
					<Link href={`/posting/${p.slug}`} key={p.slug}>
						<ArticleSnippet title={p.title} subHeadings={p.subHeadings} />
					</Link>
				))}

				{/* 탭별 포스트 */}
				{postsForTab.length > 0 ? (
					postsForTab.map((p) => (
						<Link href={`/posting/${p.slug}`} key={p.slug}>
							<ArticleSnippet title={p.title} subHeadings={p.subHeadings} />
						</Link>
					))
				) : (
					<NotFound />
				)}
			</div>
		</div>
	);
}

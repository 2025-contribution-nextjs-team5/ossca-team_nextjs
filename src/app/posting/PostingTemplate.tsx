'use client';

import { useEffect, useMemo, useState } from 'react';
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
	// 1. 고정 게시물과 일반 게시물 분리
	const fixedPosts = filteredPosts.filter((post) => !/^\d{4}$/.test(post.slug));
	const normalPosts = filteredPosts.filter((post) => /^\d{4}$/.test(post.slug));

	// 2. tabs: 월(mm) 목록
	const tabs = useMemo(() => {
		return Array.from(new Set(normalPosts.map((post) => post.slug.slice(0, 2)))).sort(
			(a, b) => Number(b) - Number(a)
		);
	}, [normalPosts]);

	const [activeTab, setActiveTab] = useState(tabs[0] ?? '');
	const [activePosition, setActivePosition] = useState({
		position: '',
		width: '',
	});

	useEffect(() => {
		const index = tabs.findIndex((tab) => tab === activeTab);
		if (index !== -1) {
			setActivePosition({
				position: `ml-[${index * 80}px]`,
				width: 'w-14',
			});
		}
	}, [activeTab, tabs]);

	// 3. 현재 탭에 해당하는 게시물만 필터링
	const postsForTab = normalPosts.filter((post) => post.slug.startsWith(activeTab));

	return (
		<>
			<TabMenu
				tabs={tabs}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				activePosition={activePosition}
			/>

			<div className="mt-10">
				<SearchBar />
				<Divider
					className="mb-8 mx-auto"
					width="w-9/10"
					color="border-ossca-gray-100"
				/>

				{/* 항상 상단에 고정되는 게시물 (ex. README.md 등) */}
				{fixedPosts.length > 0 &&
					fixedPosts.map((post) => (
						<Link href={`/posting/${post.slug}`} key={post.slug}>
							<ArticleSnippet
								title={post.title}
								subHeadings={post.subHeadings}
							/>
						</Link>
					))}

				{/* 탭에 해당하는 게시물 */}
				{postsForTab.length > 0 ? (
					postsForTab.map((post) => (
						<Link href={`/posting/${post.slug}`} key={post.slug}>
							<ArticleSnippet
								title={post.title}
								subHeadings={post.subHeadings}
							/>
						</Link>
					))
				) : (
					<NotFound />
				)}
			</div>
		</>
	);
}

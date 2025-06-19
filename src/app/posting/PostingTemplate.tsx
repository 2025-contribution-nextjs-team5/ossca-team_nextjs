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
	// mm 월 기준으로 탭 목록 생성
	const tabs = useMemo(() => {
		return Array.from(
			new Set(filteredPosts.map((post) => post.slug.slice(0, 2)))
		).sort((a, b) => Number(b) - Number(a)); // 내림차순 (최신 월부터)
	}, [filteredPosts]);

	const [activeTab, setActiveTab] = useState(tabs[0] ?? '');
	const [activePosition, setActivePosition] = useState({
		position: '',
		width: '',
	});

	useEffect(() => {
		const index = tabs.findIndex((tab) => tab === activeTab);
		if (index !== -1) {
			setActivePosition({
				position: `ml-[${index * 80}px]`, // 필요 시 숫자 조정
				width: 'w-14',
			});
		}
	}, [activeTab, tabs]);

	// 탭에 따라 필터링된 게시물
	const postsForTab = filteredPosts.filter((post) =>
		post.slug.startsWith(activeTab)
	);

	return (
		<>
			<TabMenu
				tabs={tabs}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				activePosition={activePosition}
			/>

			{postsForTab.length === 0 ? (
				<div className="mt-10">
					<SearchBar />
					<Divider
						className="mb-8 mx-auto"
						width="w-9/10"
						color="border-ossca-gray-100"
					/>
					<NotFound />
				</div>
			) : (
				<div className="mt-10">
					<SearchBar />
					<Divider
						className="mb-8 mx-auto"
						width="w-9/10"
						color="border-ossca-gray-100"
					/>
					{postsForTab.map((post) => (
						<Link href={`/posting/${post.slug}`} key={post.slug}>
							<ArticleSnippet
								title={post.title}
								subHeadings={post.subHeadings}
							/>
						</Link>
					))}
				</div>
			)}
		</>
	);
}

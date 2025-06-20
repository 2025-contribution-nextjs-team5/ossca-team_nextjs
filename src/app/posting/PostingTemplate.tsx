'use client';
import { useMemo, useState, useEffect, useCallback } from 'react';
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

	const [activeTab, setActiveTab] = useState<string>('');

	// 1) 초기 로드나 해시 변경 시 activeTab 동기화
	useEffect(() => {
		const syncTabFromHash = () => {
			const h = window.location.hash.replace('#', '');
			if (tabs.includes(h)) {
				setActiveTab(h);
			} else if (tabs.length > 0) {
				// 해시가 없거나 유효하지 않으면 기본 탭으로
				window.location.hash = tabs[0];
				setActiveTab(tabs[0]);
			}
		};

		// 초기 동기화
		syncTabFromHash();
		// 브라우저 뒤로/앞으로 버튼 처리
		window.addEventListener('hashchange', syncTabFromHash);
		return () => window.removeEventListener('hashchange', syncTabFromHash);
	}, [tabs]);

	// 2) 탭 클릭 핸들러: 해시만 바꿔도 useEffect에서 activeTab 세팅됨
	const onTabClick = useCallback(
		(tab: string) => {
			if (tab !== activeTab) {
				window.location.hash = tab;
			}
		},
		[activeTab],
	);

	// 탭에 해당하는 포스트
	const postsForTab = normalPosts.filter((p) => p.slug.startsWith(activeTab));

	return (
		<div className="mt-2">
			{/* ─── 탭 + 검색창 (90% 컨테이너) ─── */}
			<div className="w-9/10 mx-auto flex items-center justify-between h-[48px] mb-6">
				<TabMenu tabs={tabs} activeTab={activeTab} setActiveTab={onTabClick} />
				<div className="w-[350px] [&>div]:!mb-0 [&>div]:!ml-0 [&>div>div]:w-full">
					<SearchBar />
				</div>
			</div>

			{/* ─── Divider (90% 컨테이너) ─── */}
			<Divider
				className="mb-8 mx-auto"
				width="w-9/10"
				color="border-ossca-gray-100"
			/>

			{/* ─── 포스트 리스트 (full-width) ─── */}
			<div className="space-y-6">
				{fixedPosts.map((p) => (
					<Link href={`/posting/${p.slug}`} key={p.slug}>
						<ArticleSnippet title={p.title} subHeadings={p.subHeadings} />
					</Link>
				))}

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

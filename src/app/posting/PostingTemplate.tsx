'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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

interface Props {
	filteredPosts: Post[];
}

export default function PostingTemplate({ filteredPosts }: Props) {
	const router = useRouter();
	const searchParams = useSearchParams();

	// ─── 1) fixed vs normal ───
	const fixedPosts = filteredPosts.filter((p) => !/^\d{4}$/.test(p.slug));
	const normalPosts = filteredPosts.filter((p) => /^\d{4}$/.test(p.slug));

	// ─── 2) tabs 생성 ───
	const tabs = useMemo(
		() =>
			Array.from(new Set(normalPosts.map((p) => p.slug.slice(0, 2)))).sort(
				(a, b) => Number(b) - Number(a),
			),
		[normalPosts],
	);

	// ─── 3) URL ?tab= 값 읽어오기 + state 동기화 ───
	const urlTab = searchParams.get('tab') ?? '';
	const defaultTab = tabs[0] ?? '';
	const [activeTab, setActiveTab] = useState<string>(urlTab || defaultTab);

	// URL이 바뀔 때(activeTab이 달라질 때) state 업데이트
	useEffect(() => {
		if (urlTab && tabs.includes(urlTab)) {
			setActiveTab(urlTab);
		} else {
			// query가 없거나 유효하지 않으면 기본 탭으로
			setActiveTab(defaultTab);
			router.replace(`?tab=${defaultTab}`);
		}
	}, [urlTab, tabs, defaultTab, router]);

	// ─── 4) 탭 클릭 핸들러 ───
	const onTabClick = (tab: string) => {
		if (tab === activeTab) return;
		setActiveTab(tab);
		router.push(`?tab=${tab}`);
	};

	// ─── 5) 해당 탭 포스트 필터 ───
	const postsForTab = normalPosts.filter((p) => p.slug.startsWith(activeTab));

	return (
		<div className="mt-2">
			{/* ─── 탭 + 검색창(90%) ─── */}
			<div className="w-9/10 mx-auto flex items-center justify-between h-[48px] mb-6">
				<TabMenu tabs={tabs} activeTab={activeTab} setActiveTab={onTabClick} />
				<div className="w-[350px] [&>div]:!mb-0 [&>div]:!ml-0 [&>div>div]:w-full">
					<SearchBar />
				</div>
			</div>

			{/* ─── Divider(90%) ─── */}
			<Divider
				className="mb-8 mx-auto"
				width="w-9/10"
				color="border-ossca-gray-100"
			/>

			{/* ─── 포스트 리스트(full-width) ─── */}
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

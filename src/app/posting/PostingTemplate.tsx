'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Divider from '../common/Divider';
import SearchBar from '../common/SearchBar';
import SortArticle, { SortType } from '../common/SortArticle';
import SearchResultCount from '../search/SearchResultCount';
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
	searchKeyword: string; // 빈 문자열이면 검색 모드 아님
}

export default function PostingTemplate({
	filteredPosts,
	searchKeyword,
}: Props) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const isSearchMode = Boolean(searchKeyword);

	// 검색 모드: SortArticle + 검색 결과
	const [sortType, setSortType] = useState<SortType>('latest');
	const sortedPosts = useMemo(() => {
		if (sortType === 'latest' || !searchKeyword) {
			// 검색 전이거나 최신순 선택 시 그냥 원본 배열
			return filteredPosts;
		}
		// 정확도순 정렬 로직
		const score = (post: Post) => {
			const q = searchKeyword.toLowerCase();
			const inTitle = post.title.toLowerCase().includes(q) ? 2 : 0;
			const inSubs = post.subHeadings.filter((sh) =>
				sh.toLowerCase().includes(q),
			).length;
			return inTitle + inSubs;
		};
		return [...filteredPosts].sort((a, b) => score(b) - score(a));
	}, [filteredPosts, searchKeyword, sortType]);

	// 탭 모드: normalPosts
	const normalPosts = filteredPosts.filter((p) => /^\d{4}$/.test(p.slug));

	// tabs 생성
	const tabs = useMemo(
		() =>
			Array.from(new Set(normalPosts.map((p) => p.slug.slice(0, 2)))).sort(
				(a, b) => Number(b) - Number(a),
			),
		[normalPosts],
	);

	// URL ?tab= 읽어서 탭 동기화
	const urlTab = searchParams.get('tab') ?? '';
	const defaultTab = tabs[0] ?? '';
	const [activeTab, setActiveTab] = useState<string>(urlTab || defaultTab);

	// URL이 바뀔 때(activeTab이 달라질 때) state 업데이트
	useEffect(() => {
		if (isSearchMode) return; // 검색 모드면 아무것도 안 함
		if (urlTab && tabs.includes(urlTab)) {
			setActiveTab(urlTab);
		} else {
			// query가 없거나 유효하지 않으면 기본 탭으로
			setActiveTab(defaultTab);
			window.history.replaceState(null, '', `?tab=${defaultTab}`); // 초기 로드시 URL을 기본 탭으로 한번만 설정
		}
	}, [urlTab, tabs, defaultTab, router]);

	// 탭 클릭 핸들러
	const onTabClick = (tab: string) => {
		if (tab === activeTab) return;
		setActiveTab(tab);
		//router.push(`?tab=${tab}`);
		window.history.replaceState(null, '', `?tab=${tab}`); // URL만 바꾸되 Next.js 라우팅은 트리거하지 않음
	};

	// 해당 탭 포스트 필터
	const postsForTab = useMemo(
		() => normalPosts.filter((p) => p.slug.startsWith(activeTab)),
		[normalPosts, activeTab],
	);

	// ─── 렌더링 분기 ───────────────────────────
	if (isSearchMode) {
		if (filteredPosts.length === 0) {
			return (
				<div className="mt-10">
					<SearchBar />
					<Divider />
					<NotFound />
				</div>
			);
		}

		// 검색 모드 UI
		return (
			<div className="mt-10">
				<SearchBar />
				<Divider
					className="mb-8 mx-auto"
					width="w-9/10"
					color="border-ossca-gray-100"
				/>

				<div className="ml-[5%] mb-10">
					<SortArticle sortType={sortType} onChange={setSortType} />
				</div>

				{sortedPosts.length > 0 ? (
					sortedPosts.map((post) => (
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
		);
	}

	// 검색 결과 개수
	// test
	const count = sortedPosts.length;

	return (
		<div className="mt-2">
			{/* 탭 + 검색창 (90% 컨테이너) */}
			<div className="w-9/10 mx-auto flex items-center justify-between h-[48px] mb-6">
				<TabMenu tabs={tabs} activeTab={activeTab} setActiveTab={onTabClick} />
				<div className="w-[350px] [&>div]:!mb-0 [&>div]:!ml-0 [&>div>div]:w-full">
					<SearchBar />
				</div>
			</div>

			{/* 구분선 */}
			<Divider
				className="mb-8 mx-auto"
				width="w-9/10"
				color="border-ossca-gray-100"
			/>

			{/* 검색어가 있을 때만 SortArticle 표시 */}
			{searchKeyword && (
				<div className="ml-[5%] mb-10">
					<SearchResultCount count={count} />
					<SortArticle sortType={sortType} onChange={setSortType} />
				</div>
			)}

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
	);
}

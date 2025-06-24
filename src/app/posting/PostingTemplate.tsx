'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import Divider from '../common/Divider';
import SearchBar from '../common/SearchBar';
import SortArticle, { SortType } from '../common/SortArticle';
import SearchResultCount from '../search/SearchResultCount';
import ArticleSnippet from './components/ArticleSnippet';
import NotFound from './components/NotFound';

interface Post {
	slug: string;
	title: string;
	subHeadings: string[];
}

interface Props {
	filteredPosts: Post[];
	searchKeyword: string; // 빈 문자열이면 아직 검색 전
}

export default function PostingTemplate({
	filteredPosts,
	searchKeyword,
}: Props) {
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

	// 렌더링
	if (filteredPosts.length === 0) {
		return (
			<div className="mt-10">
				<SearchBar />
				<Divider
					className="mb-8 mx-auto"
					width="w-9/10"
					color="border-ossca-gray-100"
				/>
				<NotFound />
			</div>
		);
	}

	// 검색 결과 개수
	// test
	const count = sortedPosts.length;

	return (
		<div className="mt-10">
			<SearchBar />

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

			{sortedPosts.map((post) => (
				<Link href={`/posting/${post.slug}`} key={post.slug}>
					<ArticleSnippet title={post.title} subHeadings={post.subHeadings} />
				</Link>
			))}
		</div>
	);
}

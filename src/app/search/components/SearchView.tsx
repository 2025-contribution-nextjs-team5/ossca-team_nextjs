'use client';
import { useState } from 'react';
import Link from 'next/link';
import SearchBar from '../../common/SearchBar';
import Divider from '../../common/Divider';
import NotFound from '../../posting/components/NotFound';
import { SearchResultCount } from './SearchResultCount';
import SortArticle from '../../common/SortArticle';
import ArticleSnippet from '../../posting/components/ArticleSnippet';
import { SortType } from '@/app/common/SortArticle';
import { useSortedPosts } from '../../posting/hooks/useSortedPosts';

interface Post {
	slug: string;
	title: string;
	subHeadings: string[];
}

interface Props {
	filteredPosts: Post[];
	searchKeyword?: string;
}

function SearchView({ filteredPosts, searchKeyword }: Props) {
	const [sortType, setSortType] = useState<SortType>('latest');
	const sortedPosts = useSortedPosts(filteredPosts, searchKeyword, sortType);
	const count = sortedPosts.length;

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

	return (
		<div className="mt-10">
			<SearchBar />
			<Divider
				className="mb-8 mx-auto"
				width="w-9/10"
				color="border-ossca-gray-100"
			/>
			<div className="ml-[5%] mb-10">
				<SearchResultCount count={count} />
				<SortArticle sortType={sortType} onChange={setSortType} />
			</div>
			{sortedPosts.length > 0 ? (
				sortedPosts.map((post) => (
					<Link href={`/posting/${post.slug}`} key={post.slug}>
						<ArticleSnippet title={post.title} subHeadings={post.subHeadings} />
					</Link>
				))
			) : (
				<NotFound />
			)}
		</div>
	);
}

export { SearchView };

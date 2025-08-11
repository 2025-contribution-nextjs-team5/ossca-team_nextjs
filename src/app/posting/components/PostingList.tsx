'use client';
import { SearchView } from '@/app/search/components/SearchView';
import { TabView } from './TabView';

interface Post {
	slug: string;
	title: string;
	subHeadings: string[];
}
interface Props {
	filteredPosts: Post[];
	searchKeyword?: string;
}

export default function PostingList({ filteredPosts, searchKeyword }: Props) {
	const isSearchMode = Boolean(searchKeyword);
	if (isSearchMode) {
		return (
			<SearchView filteredPosts={filteredPosts} searchKeyword={searchKeyword} />
		);
	}

	return <TabView filteredPosts={filteredPosts} />;
}

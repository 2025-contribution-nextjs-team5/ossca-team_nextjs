'use client';
import { SortType } from '@/app/common/SortArticle';
import { useMemo } from 'react';

interface Post {
	slug: string;
	title: string;
	subHeadings: string[];
}

function useSortedPosts(
	posts: Post[],
	keyword: string | undefined,
	sortType: SortType,
) {
	return useMemo(() => {
		if (sortType === 'latest' || !keyword) return posts;
		const q = keyword.toLowerCase();
		const score = (post: Post) => {
			const inTitle = post.title.toLowerCase().includes(q) ? 2 : 0;
			const inSubs = post.subHeadings.filter((sh) =>
				sh.toLowerCase().includes(q),
			).length;
			return inTitle + inSubs;
		};
		return [...posts].sort((a, b) => score(b) - score(a));
	}, [posts, keyword, sortType]);
}

export { useSortedPosts };

'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';

interface Post {
	slug: string;
	title: string;
	subHeadings: string[];
}

function useTabState(normalPosts: Post[]) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const tabs = useMemo(
		() =>
			Array.from(new Set(normalPosts.map((p) => p.slug.slice(0, 2)))).sort(
				(a, b) => Number(b) - Number(a),
			),
		[normalPosts],
	);

	const urlTab = searchParams.get('tab') ?? '';
	const defaultTab = tabs[0] ?? '';
	const [activeTab, setActiveTab] = useState<string>(urlTab || defaultTab);

	useEffect(() => {
		if (urlTab && tabs.includes(urlTab)) {
			setActiveTab(urlTab);
		} else {
			setActiveTab(defaultTab);
			router.replace(`?tab=${defaultTab}`);
		}
	}, [urlTab, tabs, defaultTab, router]);

	const onTabClick = (tab: string) => {
		if (tab === activeTab) return;
		setActiveTab(tab);
		router.push(`?tab=${tab}`);
	};

	const postsForTab = useMemo(
		() => normalPosts.filter((p) => p.slug.startsWith(activeTab)),
		[normalPosts, activeTab],
	);

	return { tabs, activeTab, onTabClick, postsForTab };
}

export { useTabState };

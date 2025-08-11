import { useTabState } from '../hooks/useTabState';
import TabMenu from '../../common/TabMenu';
import SearchBar from '../../common/SearchBar';
import Divider from '../../common/Divider';
import NotFound from './NotFound';
import ArticleSnippet from './ArticleSnippet';
import Link from 'next/link';

interface Post {
	slug: string;
	title: string;
	subHeadings: string[];
}

function TabView({ filteredPosts }: { filteredPosts: Post[] }) {
	const normalPosts = filteredPosts.filter((p) => /^\d{4}$/.test(p.slug));
	const { tabs, activeTab, onTabClick, postsForTab } = useTabState(normalPosts);

	return (
		<div className="mt-2">
			<div className="w-9/10 mx-auto flex items-center justify-between h-[48px] mb-6">
				<TabMenu tabs={tabs} activeTab={activeTab} setActiveTab={onTabClick} />
				<div className="w-[350px] [&>div]:!mb-0 [&>div]:!ml-0 [&>div>div]:w-full">
					<SearchBar />
				</div>
			</div>
			<Divider
				className="mb-8 mx-auto"
				width="w-9/10"
				color="border-ossca-gray-100"
			/>
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

export { TabView };

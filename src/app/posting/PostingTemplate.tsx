import Link from 'next/link';
import Divider from '../common/Divider';
import SearchBar from '../common/SearchBar';
import ArticleSnippet from './components/ArticleSnippet';
import NotFound from './components/NotFound';

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
	return (
		<>
			{filteredPosts.length === 0 ? (
				<div className="mt-15">
					<SearchBar />
					<Divider
						className="mb-8 mx-auto"
						width="w-9/10"
						color="border-ossca-gray-100"
					/>
					<NotFound />
				</div>
			) : (
				<div className="mt-15">
					<SearchBar />
					<Divider
						className="mb-8 mx-auto"
						width="w-9/10"
						color="border-ossca-gray-100"
					/>
					{filteredPosts.map((post) => (
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

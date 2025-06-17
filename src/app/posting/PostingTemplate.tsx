import Link from 'next/link';
import Divider from '../common/Divider';
import SearchBar from '../common/SearchBar';
import ArticleSnippet from './components/ArticleSnippet';
import { Routes}

const PostingTemplate = ({ filteredPosts }) => {
	return (
		<>
			<div className="mt-10">
				<SearchBar />
				<Divider
					className="mb-8 mx-auto"
					width="w-9/10"
					color="border-ossca-gray-100"
				/>
				{filteredPosts.map((post) => (
					<Link href={`/posting/${post.slug}`} key={post.slug}>
						<ArticleSnippet title={post.title} subHeadings={post.subHeadings} />
					</Link>
				))}
			</div>
		</>
	);
};

export default PostingTemplate;

'use client';

import SearchBar from '../common/SearchBar';
import SearchResultCount from './components/SearchResultCount';

export default function SearchPageTemplate({ articles }) {
	return (
		<>
			<SearchBar />
			<article className="ml-[10%] mt-10 ">
				<div className="mb-5">
					<SearchResultCount />
				</div>
				{articles.map((item: any) => (
					<div
						key={item.id}
						className="mb-3 w-[80%] text-[25px] bg-gray-100 pl-5 pt-3 pb-3 rounded-xl"
					>
						{item.title}
						<div className="text-[15px] mt-2">{item.content}.</div>
					</div>
				))}
			</article>
		</>
	);
}

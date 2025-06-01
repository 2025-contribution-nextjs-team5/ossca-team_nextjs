import SearchBar from '@/app/common/SearchBar';
import SearchResultCount from './SearchResultCount';

const mockData = [
	{
		id: 0,
		title: '0506 TIL',
		content: '0번 내용입니다',
	},
	{
		id: 1,
		title: '0510 TIL',
		content: '1번 내용입니다',
	},
	{
		id: 2,
		title: '0516 TIL',
		content: '2번 내용입니다',
	},
	{
		id: 3,
		title: '0521 TIL',
		content: '3번 내용입니다',
	},
	{
		id: 4,
		title: '0522 TIL',
		content: '4번 내용입니다',
	},
	{
		id: 5,
		title: '0528 TIL',
		content: '5번 내용입니다',
	},
	{
		id: 6,
		title: '0529 TIL',
		content: '6번 내용입니다',
	},
];

export default function Search() {
	return (
		<>
			<SearchBar />
			<article className="ml-[10%] mt-10 ">
				<div className="mb-5">
					<SearchResultCount />
				</div>
				{mockData.map((item) => (
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

'use client';

const mockData = [
	{
		id: 0,
		title: '0506 TIL',
		content: '0번 내용 입니다',
	},
	{
		id: 1,
		title: '0510 TIL',
		content: '1번 내용 입니다',
	},
	{
		id: 2,
		title: '0516 TIL',
		content: '2번 내용 입니다',
	},
];

import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

export default function SearchBar() {
	const [contents, setContents] = useState('');

	const searchArticles = (event: ChangeEvent<HTMLInputElement>) => {
		setContents(event.target.value);
	};

	const getFilteredArticles = () => {
		if (contents === '') {
			return mockData;
		}
		return mockData.filter(
			(item) =>
				item.content.includes(contents) || item.title.includes(contents),
		);
	};

	return (
		<>
			<div className="w-[80%] text-[18px] bg-[color:var(--color-ossca-mint-600)]/50 pretendard-500 rounded-[25px] mt-2 pt-2 pb-2">
				<div className="pl-[1rem] pr-[1.5rem] flex flex-row items-center justify-between">
					<Image
						src="/search-icon.png"
						alt="검색 아이콘"
						width={16}
						height={16}
					/>
					<input
						type="text"
						value={contents}
						placeholder="Search"
						onChange={searchArticles}
						className="w-[80%] text-right focus:outline-none"
					/>
				</div>
			</div>
			<div className="flex flex-col">
				{getFilteredArticles().map((item) => (
					<div key={item.id}>{item.title}</div>
				))}
			</div>
		</>
	);
}

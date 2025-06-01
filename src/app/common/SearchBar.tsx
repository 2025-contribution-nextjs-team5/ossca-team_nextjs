'use client';

import Image from 'next/image';
import { ChangeEvent, KeyboardEvent, useState } from 'react';

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
];

export default function SearchBar() {
	const [inputText, setInputText] = useState(''); // 검색할 내용을 담을 변수
	const [finalText, setFinalText] = useState(''); // 최종 검색어

	// 검색어를 상태에 저장하는 함수
	const searchContents = (event: ChangeEvent<HTMLInputElement>) => {
		setInputText(event.target.value);
	};

	// 검색어(contents) 내용에 따라 제목 및 내용에 일치하면 해당하는 글들을 필터링
	const getFilteredArticles = () => {
		if (finalText === '') {
			return mockData;
		}
		return mockData.filter(
			(item) =>
				item.content.includes(finalText) || item.title.includes(finalText),
		);
	};

	// Enter 키를 누르면 검색하는 함수
	const enterSearch = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key == 'Enter') {
			setFinalText(inputText);
		}
	};

	return (
		<div className="ml-[80%]">
			<div className="w-[80%] text-[18px] bg-ossca-mint-600/50 pretendard-500 rounded-[25px] mt-2 pt-2 pb-2">
				<div className="pl-[1rem] pr-[1.5rem] flex flex-row items-center justify-between">
					<Image
						src="/search-icon.png"
						alt="검색 아이콘"
						width={16}
						height={16}
					/>
					<input
						type="text"
						value={inputText}
						placeholder="Search"
						onChange={searchContents}
						onKeyDown={enterSearch}
						className="w-[80%] text-right focus:outline-none"
					/>
				</div>
			</div>
			{/* <div className="flex flex-col mt-3">
				{getFilteredArticles().map((item) => (
					<div key={item.id}>
						{item.title} - {item.content}
					</div>
				))}
			</div> */}
		</div>
	);
}

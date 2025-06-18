'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, KeyboardEvent, useState } from 'react';

export default function SearchBar() {
	const [inputText, setInputText] = useState(''); // 검색할 내용을 담을 변수

	const router = useRouter();

	// 검색어를 상태에 저장하는 함수
	const searchContents = (event: ChangeEvent<HTMLInputElement>) => {
		setInputText(event.target.value);
	};

	// Enter 키를 누르면 검색하는 함수
	const enterSearch = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			router.push(`/posting?q=${inputText}`);
		}
	};

	return (
		<div className="mb-10 ml-[70%]">
			<div className="w-[83%] text-[18px] bg-ossca-mint-600/50 pretendard-500 rounded-[25px] pt-4 pb-4">
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
		</div>
	);
}

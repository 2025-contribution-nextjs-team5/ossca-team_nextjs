'use client';

import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

export default function SearchBar() {
	const [contents, setContents] = useState('');

	const searchContents = (e: ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value);
		setContents(e.target.value);
	};

	return (
		<>
			<div className="w-[275] text-[18px] bg-[color:var(--color-ossca-mint-600)]/50 pretendard-500 rounded-[25px] pt-2 pb-2">
				<div className="pl-4 pr-5 flex flex-row items-center justify-between">
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
						onChange={searchContents}
						className="w-[200] text-right focus:outline-none"
					/>
				</div>
			</div>
		</>
	);
}

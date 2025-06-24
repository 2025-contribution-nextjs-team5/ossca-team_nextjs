'use client';

import clsx from 'clsx';

export type SortType = 'relevance' | 'latest';

interface Props {
	sortType: SortType;
	onChange: (type: SortType) => void;
}

export default function SortArticle({ sortType, onChange }: Props) {
	return (
		<div className="ml-1 flex text-sm font-medium">
			<button
				className={clsx(
					sortType === 'relevance' ? 'text-black' : 'text-gray-400',
					'hover:text-black',
				)}
				onClick={() => onChange('relevance')}
			>
				정확도순
			</button>

			<span className="mx-2 text-gray-800">|</span>

			<button
				className={clsx(
					sortType === 'latest' ? 'text-black' : 'text-gray-400',
					'hover:text-black',
				)}
				onClick={() => onChange('latest')}
			>
				최신순
			</button>
		</div>
	);
}

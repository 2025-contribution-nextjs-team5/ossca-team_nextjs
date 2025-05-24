'use client';

import React, { useState } from 'react';

function QnaPreviewCard() {
	const [extended, setExtended] = useState(false);

	const handleExtend = () => {
		setExtended((prev) => !prev);
	};
	return (
		<button
			onClick={handleExtend}
			className="flex flex-col h-auto w-full pt-2 px-4 pb-3 gap-1 bg-[#efefef] rounded-2xl transition-h duration-300"
		>
			<div className="flex gap-2.5 items-center mb-1">
				<div className="text-md font-pretendard font-medium border-b-1 border-gray-300">
					NickName
				</div>
				<div className="flex pt-3">
					<div className="text-sm">ㅣ</div>
					<div className="text-sm">Date. 2025.05.01 14:30</div>
				</div>
			</div>

			<div className="text-lg font-pretendard font-medium text-left">
				Q&A Title
			</div>

			<div
				className={`text-md font-pretendard text-left ${extended ? '' : 'line-clamp-2'}`}
			>
				With rapid advancements in AI and machine learning, technology is
				evolving quickly, changing how industries operate and impacting the
				global workforce. As new technologies are integrated, robust
				cybersecurity becomes crucial to protect sensitive data from
				sophisticated cyber threats. sophisticated cyber threats.sophisticated
				cyber threats.sophisticated cyber threats.sophisticated cyber threats.
				cyber threats.sophisticated cyber threats.sophisticated cyber threats.
				cyber threats.sophisticated cyber threats.sophisticated cyber threats.
			</div>
		</button>
	);
}
export default QnaPreviewCard;

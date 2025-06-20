'use client';

import { useEffect, useRef, useState } from 'react';

interface TabMenuProps {
	tabs: string[];
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

export default function TabMenu({
	tabs,
	activeTab,
	setActiveTab,
}: TabMenuProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

	useEffect(() => {
		if (!containerRef.current) return;
		const tabEls = Array.from(
			containerRef.current.children,
		) as HTMLDivElement[];
		const idx = tabs.findIndex((t) => t === activeTab);
		if (idx >= 0) {
			const el = tabEls[idx];
			const contRect = containerRef.current.getBoundingClientRect();
			const elRect = el.getBoundingClientRect();
			setIndicatorStyle({
				left: elRect.left - contRect.left,
				width: elRect.width,
			});
		}
	}, [activeTab, tabs]);

	return (
		<div className="relative w-full">
			<div
				ref={containerRef}
				className="flex space-x-6" /* 탭 사이 간격: 필요에 따라 space-x-4/5/6 등 조정 */
			>
				{tabs.map((tab) => (
					<div
						key={tab}
						className="pb-1 cursor-pointer"
						onClick={() => setActiveTab(tab)}
					>
						<span
							className={`pretendard-700 text-lg transition-colors duration-300 ${
								activeTab === tab ? 'text-teal-500' : 'text-gray-600'
							}`}
						>
							{tab}월
						</span>
					</div>
				))}
			</div>

			{/* indicator */}
			<div
				className="absolute bottom-0 h-0.5 bg-teal-500 rounded-full transition-all duration-300"
				style={{
					left: indicatorStyle.left,
					width: indicatorStyle.width,
				}}
			/>
		</div>
	);
}

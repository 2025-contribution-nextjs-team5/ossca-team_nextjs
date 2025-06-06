'use client';
import { useState, useEffect } from 'react';
import Giscus from './components/Giscus';
import QnaTab from './components/QnaTab';

function QnaTemplate() {
	const tabs = ['Career', 'Employment', 'Frontend'];
	const [activeTab, setActiveTab] = useState(tabs[0]); // 기본값은 첫 번째 탭 'Career'
	const [activePosition, setActivePosition] = useState({
		position: '',
		width: '',
	});
	useEffect(() => {
		switch (activeTab) {
			case 'Career':
				setActivePosition({ position: 'ml-5.5', width: 'w-16' });
				break;
			case 'Employment':
				setActivePosition({ position: 'ml-24', width: 'w-27.5' });
				break;
			case 'Frontend':
				setActivePosition({ position: 'ml-54', width: 'w-21' });
				break;
			default:
				setActivePosition({ position: 'ml-5.5', width: 'w-16' });
				break;
		}
	}, [activeTab]);
	return (
		<div className="flex flex-col w-full h-full bg-white dark:bg-gray-900 py-4 px-2 mt-20">
			<QnaTab
				tabs={tabs}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				activePosition={activePosition}
			/>
			<section className="w-full h-full pt-10 px-8 dark:border-gray-700">
				<Giscus
					key={activeTab}
					repo="2025-contribution-nextjs-team5/ossca-team_nextjs"
					repoId="R_kgDOOoJCgw"
					category="project"
					categoryId="DIC_kwDOOoJCg84Cqrjc"
					mapping="specific"
					dataTerm={activeTab.toLowerCase()}
					reactionsEnabled="0"
					emitMetadata="0"
					inputPosition="top"
					theme="preferred_color_scheme"
					lang="ko"
					loading="lazy"
				/>
			</section>
		</div>
	);
}
export default QnaTemplate;

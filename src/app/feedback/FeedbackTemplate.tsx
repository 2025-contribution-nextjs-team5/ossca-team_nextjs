'use client';
import { useState, useEffect } from 'react';
import Giscus from './components/Giscus';
import QnaTab from './components/QnaTab';

function FeedbackTemplate() {
	const tabs = ['디자인', '건의사항'];
	const [activeTab, setActiveTab] = useState(tabs[0]); // 기본값은 첫 번째 탭 'Career'
	const [activePosition, setActivePosition] = useState({
		position: '',
		width: '',
	});

	useEffect(() => {
		switch (activeTab) {
			case `${tabs[0]}`:
				setActivePosition({ position: 'ml-5.5', width: 'w-12.5' });
				break;
			case `${tabs[1]}`:
				setActivePosition({ position: 'ml-21', width: 'w-16.5' });
				break;
			default:
				setActivePosition({ position: 'ml-5.5', width: 'w-12.5' });
				break;
		}
	}, [activeTab]);
	return (
		<div className="flex flex-col w-full h-full px-2 py-4 bg-white dark:bg-gray-900">
			<QnaTab
				tabs={tabs}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				activePosition={activePosition}
			/>
			<section className="w-full h-full px-8 pt-10 dark:border-gray-700">
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
export default FeedbackTemplate;

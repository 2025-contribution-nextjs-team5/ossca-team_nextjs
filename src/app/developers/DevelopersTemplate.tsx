'use client';

import React, { useState, useRef, useEffect } from 'react';
import DevelopersIntroCard from './components/DevelopersIntroCard';
interface IconProps extends React.SVGProps<SVGSVGElement> {
	size?: number;
}

function Github({ size = 24, ...props }: IconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="currentColor"
			{...props}
		>
			<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
		</svg>
	);
}

const ExternalLink = ({ size = 24, ...props }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}
	>
		<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
		<polyline points="15,3 21,3 21,9" />
		<line x1="10" y1="14" x2="21" y2="3" />
	</svg>
);

interface Developer {
	id: number;
	name: string;
	feature: string;
	page: string;
	reflection: string;
	links: {
		github: string;
		blog: string;
		email: string;
	};
	avatar: {
		bg: string;
		accent: string;
	};
}

const DevelopersTemplate = () => {
	const [isPaused, setIsPaused] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const scrollRef = useRef<HTMLDivElement>(null);
	const animationRef = useRef<number | null>(null);

	const developers: Developer[] = [
		{
			id: 1,
			name: 'Jeon Yejin',
			feature: '메인 페이지 구현',
			page: '헤더, 메인 페이지',
			reflection:
				'6주+α 동안 정말 즐거웠습니다! 지금까지 했던 팀플 중 가장 뜻깊고 좋은 경험이었어요. 좋은 분들과 함께할 수 있어 정말 감사했습니다. 5조 최고 bb',
			links: {
				github: 'https://github.com/dpwls02142',
				blog: 'https://dpwls02142.github.io/',
				email: 'dpwls02142@gmail.com',
			},
			avatar: { bg: 'bg-gray-400', accent: 'bg-green-400' },
		},
		{
			id: 2,
			name: 'Lee Hanbin',
			feature: '검색 결과 페이지 구현',
			page: '검색 결과 페이지',
			reflection:
				'물론 완벽하진 않겠지만 이렇게 체계적인 협업을 위해 노력해본 건 처음이었던 것 같아요! 좋은 분들 만나서 많은 자극 받을 수 있어서 행복했고 정말 감사했습니당 5조 파이팅!!!! 💪🏻💪🏻 ',
			links: {
				github: 'https://github.com/Clt689',
				blog: 'https://velog.io/@nadnerde',
				email: 'kx1302@naver.com',
			},
			avatar: { bg: 'bg-gray-500', accent: 'bg-green-400' },
		},
		{
			id: 3,
			name: 'Kim sooyeon',
			feature: '포스팅 페이지 구현',
			page: '포스팅 페이지',
			reflection:
				'짧다면 짧고 길다면 긴 시간 동안 다들 고생 많으셨어요!! 좋은 분들과 이렇게 열정적으로 같이 배우고 협업할 수 있어서 정말 감사한 시간이었습니다. 앞으로도 5조 화이팅!!!',
			links: {
				github: 'https://github.com/syk001108',
				blog: 'https://velog.io/@1108suyeon/posts',
				email: '1108suyeon@gmail.com',
			},
			avatar: { bg: 'bg-gray-400', accent: 'bg-green-400' },
		},
		{
			id: 4,
			name: 'Cho Joonhee',
			feature: '피드백 페이지 구현',
			page: '피드백 페이지',
			reflection:
				'6주 라는 시간동안 발표부터 프로젝트까지 다들 너무 고생하셨습니다!! 한 분도 빠짐없이 열심히 그리고 열정적으로 임해주셔서 저도 많이 동기부여되고 배웠습니다. 좋은 분들과 함께해서 더 좋은 시간이였어요. 5조 화이팅 :D.',
			links: {
				github: 'https://github.com/aiminghee3',
				blog: 'https://matrix-o.tistory.com/',
				email: 'aimhee20@gmail.com',
			},
			avatar: { bg: 'bg-gray-600', accent: 'bg-green-400' },
		},
		{
			id: 5,
			name: 'Kim eunbin',
			feature: '제작자 페이지',
			page: '디자인, 제작자 페이지',
			reflection:
				'우선 5조 팀원분들 모두 고생하셨습니다!! 무지의 상태에서 시작하여 함께한 시간동안 팀원분들께 정말 많은 도움 받았는데 너무 감사드리고, 얻은 배움과 더불어 프로젝트까지 참여할 수 있어 좋은 경험이었던 것 같아요:) 5조 최고 !',
			links: {
				github: 'https://github.com/ASI-031',
				blog: 'https://asi031.tistory.com/',
				email: 'asi031@naver.com',
			},
			avatar: { bg: 'bg-gray-500', accent: 'bg-green-400' },
		},
	];

	// Auto-scroll
	useEffect(() => {
		const startAnimation = () => {
			const container = scrollRef.current;
			if (!container || isPaused) return;

			const cardWidth = 320 + 24;
			const maxScroll = cardWidth * developers.length;

			const animate = () => {
				if (!isPaused && container) {
					container.scrollLeft += 0.5;

					if (container.scrollLeft >= maxScroll) {
						container.scrollLeft = 0;
					}

					const newIndex =
						Math.round(container.scrollLeft / cardWidth) % developers.length;
					setCurrentIndex(newIndex);
				}

				animationRef.current = requestAnimationFrame(animate);
			};

			animationRef.current = requestAnimationFrame(animate);
		};

		startAnimation();

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [isPaused, developers.length]);

	const handleMouseEnter = () => setIsPaused(true);
	const handleMouseLeave = () => setIsPaused(false);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isPaused) return;

		const container = scrollRef.current;
		if (!container) return;

		const rect = container.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const containerWidth = rect.width;
		const scrollPercentage = mouseX / containerWidth;
		const maxScroll = container.scrollWidth - container.clientWidth;

		const targetScroll = scrollPercentage * maxScroll;

		const currentScroll = container.scrollLeft;
		const diff = targetScroll - currentScroll;
		container.scrollLeft = currentScroll + diff * 0.005;

		const cardWidth = 320 + 24;
		const newIndex =
			Math.round(container.scrollLeft / cardWidth) % developers.length;
		setCurrentIndex(newIndex);
	};

	return (
		<div className="min-h-screen bg-white relative overflow-hidden">
			{/* Background decorative elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-20 left-10 w-32 h-32 bg-teal-100/20 rounded-full blur-3xl" />
				<div className="absolute top-40 right-20 w-48 h-48 bg-mint-100/15 rounded-full blur-3xl" />
				<div className="absolute bottom-40 left-1/4 w-40 h-40 bg-emerald-100/15 rounded-full blur-3xl" />
				<div className="absolute bottom-20 right-1/3 w-56 h-56 bg-teal-50/20 rounded-full blur-3xl" />
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-teal-50/10 to-mint-50/10 rounded-full blur-3xl" />
			</div>

			{/* Hero Section */}
			<section className="py-16 px-4 relative z-9 bg-gradient-to-b from-white via-teal-50/30 to-white">
				<div className="max-w-4xl mx-auto text-center">
					<h1
						className="text-4xl md:text-3xl font-semibold text-gray-900 mb-8 leading-tight"
						style={{
							fontFamily:
								'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
						}}
					>
						[ Introduction ]
					</h1>

					{/* Team Info */}
					<div className="flex flex-wrap justify-center gap-8 mt-8">
						<div className="bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg border border-teal-100/50">
							<div className="text-xl font-semibold text-teal-600 mb-1">
								Next.js Team
							</div>
							<div className="text-sm text-gray-600">Development Team</div>
						</div>
						<div className="bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg border border-cyan-100/50">
							<div className="text-xl font-semibold text-cyan-600 mb-1">
								Team.5
							</div>
							<div className="text-sm text-gray-600">Team Number</div>
						</div>
						<div className="bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg border border-emerald-100/50">
							<div className="text-xl font-semibold text-emerald-600 mb-1">
								5 Members
							</div>
							<div className="text-sm text-gray-600">Team Size</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-3 px-4 relative z-9 from-white via-teal-50/30 to-white border-b border-teal-200/50" />

			{/* Developer Cards Section */}
			<section className="py-16 px-4 relative z-9 bg-gradient-to-b from-white via-teal-50/20 to-white">
				<div className="max-w-7xl mx-auto">
					<div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
						<span className="text-white text-xl">{'</>'}</span>
					</div>
					<div className="max-w-4xl mx-auto text-center">
						<h2
							className="text-4xl md:text-3xl font-semibold text-gray-900 mb-8 leading-tight"
							style={{
								fontFamily:
									'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
							}}
						>
							[ Developers ]
						</h2>
					</div>

					{/* Auto-scrolling Cards Container */}
					<div className="relative overflow-hidden">
						<div
							ref={scrollRef}
							className="flex space-x-6 overflow-x-hidden pb-4"
							style={{
								scrollbarWidth: 'none',
								msOverflowStyle: 'none',
								width: '100%',
							}}
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
							onMouseMove={handleMouseMove}
						>
							{[...developers, ...developers].map((dev, index) => (
								<DevelopersIntroCard
									key={`${dev.id}-${index}`}
									developer={dev}
								/>
							))}
						</div>
					</div>

					<div className="flex justify-center mt-8 space-x-2">
						{developers.map((_, index) => (
							<div
								key={index}
								className={`h-2 rounded-full transition-all duration-300 ${
									index === currentIndex
										? 'bg-gradient-to-r from-teal-400 to-cyan-500 w-6 shadow-sm'
										: 'bg-gray-300/60 w-2 hover:bg-gray-400/60'
								}`}
							/>
						))}
					</div>
				</div>
			</section>

			{/* Project Repository Section */}
			<section className="py-20 px-4 relative z-9 bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50">
				<div className="max-w-4xl mx-auto text-center">
					<div className="bg-gradient-to-br from-white/70 to-teal-50/80 backdrop-blur-sm rounded-3xl p-12 border border-teal-200/30 shadow-xl">
						<div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
							<span className="text-2xl">💻</span>
						</div>
						<h3 className="text-2xl font-semibold text-gray-900 mb-4">
							Repository
						</h3>
						<p className="text-gray-600 mb-8 leading-relaxed">
							팀원들이 함께 협업하여 개발한 프로젝트를 확인해보세요
						</p>
						<a
							href="https://github.com/2025-contribution-nextjs-team5/ossca-team_nextjs"
							className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold hover:from-teal-500 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
							aria-label="View Repository"
						>
							<Github size={20} />
							<span>View Repository</span>
							<ExternalLink size={16} />
						</a>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 py-12 px-4 text-white relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-teal-900/10 to-cyan-900/10" />
				<div className="max-w-4xl mx-auto text-center relative z-9">
					<div className="flex items-center justify-center space-x-3 mb-6">
						<div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
							<span className="text-black font-bold text-lg">N</span>
						</div>
						<span className="text-xl font-medium bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
							NEXT.JS Community
						</span>
					</div>
					<div className="w-12 h-1 bg-gradient-to-r from-teal-400 to-cyan-500 mx-auto mb-6 rounded-full" />
					<p className="text-gray-400">
						© 2025 Next.js Community. All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	);
};

export default DevelopersTemplate;

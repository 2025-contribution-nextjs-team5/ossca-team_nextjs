'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Emoji {
	id: number;
	emoji: string;
	x: number;
	y: number;
}

const mainSectionData = {
	Frame1: {
		title: `2025년 오픈소스 컨트리뷰션 아카데미 [체험형-1차]
		Git 활용 및 Next.js 뽀개기 과정의 
		블로그에 오신 걸 환영합니다.`,
		description: `※ 현재는 웹에서 더 잘 동작해요 ※`,
	},
	Frame2: {
		title: 'Posting 탭에서',
		description: `프로그램 참여자분들의 TIL을
									한 눈에 모아볼 수 있습니다.`,
		buttonText: '보러가기',
	},
	Frame3: {
		title: 'OSSCA Next.js 과정 최고!',
		subtitle: '6주간 고생 많으셨습니다',
		description: `화면의 빈 곳을 누르면 이모티콘이 나와요.`,
		emoji: ['🎉', '🌟'],
	},
	Frame4: {
		cards: [
			{
				emoji: '💭',
				title: '사이트 이용 중 피드백이 있으시다면',
				buttonText: '피드백 남기러가기 →',
			},
			{
				emoji: '👨‍💻',
				title: '사이트 제작자가 궁금하시다면',
				buttonText: '제작자 소개 →',
			},
		],
	},
};

export default function MainContent() {
	const router = useRouter();
	const [emojis, setEmojis] = useState<Emoji[]>([]);

	const clickEmoji = (e: React.MouseEvent) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const randomEmoji =
			mainSectionData.Frame3.emoji[
				Math.floor(Math.random() * mainSectionData.Frame3.emoji.length)
			];

		const newEmoji = {
			id: Date.now(),
			emoji: randomEmoji,
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		};

		setEmojis((prev) => [...prev, newEmoji]);

		setTimeout(() => {
			setEmojis((prev) => prev.filter((emoji) => emoji.id !== newEmoji.id));
		}, 1000);
	};

	return (
		<div className="min-h-screen whitespace-pre-line">
			{/* Frame1 */}
			<section className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-4xl text-black my-2 pretendard-700">
						{mainSectionData.Frame1.title}
					</h1>
					<div className="text-2xl text-ossca-gray-200 pretendard-500">
						{mainSectionData.Frame1.description}
					</div>
				</div>
			</section>

			{/* Frame2 */}
			<section className="min-h-screen flex items-center justify-center">
				<div className="container mx-auto max-w-5xl flex items-center justify-between">
					<div className="flex-1 text-left pl-8 text-black">
						<div className="text-2xl pretendard-500">
							{mainSectionData.Frame2.title}
						</div>
						<div className="text-4xl pretendard-700 mt-2">
							{mainSectionData.Frame2.description}
						</div>
						<button
							onClick={() => router.push('/posting')}
							className="mt-6 px-8 py-3 bg-ossca-mint-200 text-black rounded-full transform hover:scale-105 hover:bg-ossca-mint-300 hover: cursor-pointer transition-all duration-300 ease-in-out"
						>
							{mainSectionData.Frame2.buttonText}
						</button>
					</div>

					<div className="flex-1 bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 -ml-24 max-w-md">
						<div className="space-y-4">
							<div className="flex items-center gap-3 pb-4 border-b border-gray-200">
								<div className="w-3 h-3 rounded-full bg-red-500" />
								<div className="w-3 h-3 rounded-full bg-yellow-500" />
								<div className="w-3 h-3 rounded-full bg-green-500" />
								<div className="text-sm text-gray-500 ml-2">
									포스팅 미리보기
								</div>
							</div>
							<div className="space-y-3">
								{[1, 2, 3].map((_, index) => {
									const date = new Date();
									date.setDate(date.getDate() - index);
									const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
									return (
										<div
											key={index}
											className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
										>
											<div className="flex items-center gap-3">
												<div>
													<div className="pretendard-600">{formattedDate}</div>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Frame3 */}
			<section
				className="min-h-screen flex items-center justify-center cursor-pointer relative overflow-hidden"
				onClick={clickEmoji}
			>
				<div className="container max-w-5xl flex flex-col items-center justify-center text-center">
					<div className="text-2xl text-ossca-gray-200 pretendard-500 mb-4">
						{mainSectionData.Frame3.subtitle}
					</div>
					<div className="text-4xl text-black pretendard-700 mb-4">
						{mainSectionData.Frame3.title}
					</div>
					<div className="text-xl text-ossca-gray-200 pretendard-500">
						{mainSectionData.Frame3.description}
					</div>
				</div>

				{emojis.map((emoji) => (
					<div
						key={emoji.id}
						className="absolute text-6xl pointer-events-none select-none animate-pulse"
						style={{
							left: `${emoji.x}px`,
							top: `${emoji.y}px`,
							transform: 'translate(-50%, -50%)',
							zIndex: 1000,
						}}
					>
						{emoji.emoji}
					</div>
				))}
			</section>
		</div>
	);
}

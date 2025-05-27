'use client';

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
		emoji: '🎉',
		subtitle: '6주간 고생 많으셨습니다',
		title: 'OSSCA Next.js 과정 최고!',
		trophy: '🏆',
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
	return (
		<div className="min-h-screen whitespace-pre-line">
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
		</div>
	);
}

import Frame1 from '../mainFrames/Frame1';
import Frame2 from '../mainFrames/Frame2';
import Frame3 from '../mainFrames/Frame3';
import Frame4 from '../mainFrames/Frame4';

const mainSectionData = {
	Frame1: {
		title: `2025년 오픈소스 컨트리뷰션 아카데미 [체험형-1차]
		Git 활용 및 Next.js 뽀개기 과정의 
		블로그에 오신 걸 환영합니다.`,
		description: `※ 현재는 PC 웹 환경에서 더 잘 동작해요 ※`,
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
				title: '사이트 이용 중 피드백이 있으시다면',
				buttonText: '피드백 남기러가기',
			},
			{
				title: '사이트 제작자가 궁금하시다면',
				buttonText: '제작자 소개',
			},
		],
	},
};

export default function MainContent() {
	return (
		<div className="min-h-screen whitespace-pre-line">
			<Frame1 data={mainSectionData.Frame1} />
			<Frame2 data={mainSectionData.Frame2} />
			<Frame3 data={mainSectionData.Frame3} />
			<Frame4 data={mainSectionData.Frame4} />
		</div>
	);
}

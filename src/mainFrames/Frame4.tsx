import Link from 'next/link';

interface Frame4Props {
	data: {
		cards: {
			title: string;
			buttonText: string;
		}[];
	};
}

export default function Frame4({ data }: Frame4Props) {
	return (
		<section className="min-h-[80vh] flex items-center justify-center">
			<div className="container mx-auto max-w-5xl">
				<div className="space-y-8">
					{data.cards.map((card, index) => (
						<div key={index} className="flex flex-col items-start space-y-4">
							<h3 className="text-2xl text-black pretendard-700">
								{card.title}
							</h3>
							<Link
								href={index === 0 ? '/feedback' : '/developers'}
								className="px-8 py-3 bg-ossca-mint-200 text-black rounded-full transform hover:scale-105 hover:bg-ossca-mint-300 hover:cursor-pointer transition-all duration-300 ease-in-out inline-block"
							>
								{card.buttonText}
							</Link>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

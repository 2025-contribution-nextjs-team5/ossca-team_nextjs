interface Frame1Props {
	data: {
		title: string;
		description: string;
	};
}

export default function Frame1({ data }: Frame1Props) {
	return (
		<section className="flex items-center justify-center min-h-screen bg-gradient-to-t from-ossca-mint-300 to-black">
			<div className="text-center">
				<h1 className="my-2 text-4xl text-white pretendard-700 text-animate">
					{data.title}
				</h1>
				<div className="text-2xl text-white text-opacity-25 pretendard-500 text-animate-delay-1">
					{data.description}
				</div>
			</div>
		</section>
	);
}

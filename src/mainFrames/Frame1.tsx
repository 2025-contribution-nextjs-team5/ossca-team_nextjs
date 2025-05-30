interface Frame1Props {
	data: {
		title: string;
		description: string;
	};
}

export default function Frame1({ data }: Frame1Props) {
	return (
		<section className="min-h-screen flex items-center justify-center">
			<div className="text-center">
				<h1 className="text-4xl text-black my-2 pretendard-700">
					{data.title}
				</h1>
				<div className="text-2xl text-ossca-gray-200 pretendard-500">
					{data.description}
				</div>
			</div>
		</section>
	);
}

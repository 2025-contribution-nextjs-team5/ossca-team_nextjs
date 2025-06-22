import Link from 'next/link';

interface Frame2Props {
	data: {
		title: string;
		description: string;
		buttonText: string;
	};
}

export default function Frame2({ data }: Frame2Props) {
	return (
		<section className="flex items-center justify-center min-h-screen">
			<div className="container flex items-center justify-between max-w-5xl mx-auto">
				<div className="flex-1 pl-8 text-left text-black">
					<div className="text-2xl pretendard-500">{data.title}</div>
					<div className="mt-2 text-4xl pretendard-700">{data.description}</div>
					<Link
						href="/posting?tab=05"
						className="inline-block px-8 py-3 mt-6 text-black transition-all duration-300 ease-in-out transform rounded-full cursor-pointer bg-ossca-mint-200 hover:scale-105 hover:bg-ossca-mint-300 hover:"
					>
						{data.buttonText}
					</Link>
				</div>

				<div className="flex-1 max-w-md p-6 -ml-24 transition-transform duration-300 transform bg-white shadow-lg rounded-2xl hover:scale-105">
					<div className="space-y-4">
						<div className="flex items-center gap-3 pb-4 border-b border-gray-200">
							<div className="w-3 h-3 bg-red-500 rounded-full" />
							<div className="w-3 h-3 bg-yellow-500 rounded-full" />
							<div className="w-3 h-3 bg-green-500 rounded-full" />
							<div className="ml-2 text-sm text-gray-500">포스팅 미리보기</div>
						</div>
						<div className="space-y-3">
							{[1, 2, 3].map((_, index) => {
								const date = new Date();
								date.setDate(date.getDate() - index);
								const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
								return (
									<div
										key={index}
										className="p-3 transition-colors duration-200 rounded-lg bg-gray-50 hover:bg-gray-100"
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
	);
}

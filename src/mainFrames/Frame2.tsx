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
		<section className="min-h-[80vh] flex items-center justify-center">
			<div className="container mx-auto max-w-5xl flex items-center justify-between">
				<div className="flex-1 text-left pl-8 text-black">
					<div className="text-2xl pretendard-500">{data.title}</div>
					<div className="text-4xl pretendard-700 mt-2">{data.description}</div>
					<Link
						href="/posting"
						className="mt-6 px-8 py-3 bg-ossca-mint-200 text-black rounded-full transform hover:scale-105 hover:bg-ossca-mint-300 hover: cursor-pointer transition-all duration-300 ease-in-out inline-block"
					>
						{data.buttonText}
					</Link>
				</div>

				<div className="flex-1 bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 -ml-24 max-w-md">
					<div className="space-y-4">
						<div className="flex items-center gap-3 pb-4 border-b border-gray-200">
							<div className="w-3 h-3 rounded-full bg-red-500" />
							<div className="w-3 h-3 rounded-full bg-yellow-500" />
							<div className="w-3 h-3 rounded-full bg-green-500" />
							<div className="text-sm text-gray-500 ml-2">포스팅 미리보기</div>
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
	);
}

'use client';

const sortAccurate = () => {
	console.log('정확도순!');
};

const sortLatest = () => {
	console.log('최신순!');
};

export default function SortArticle() {
	return (
		<>
			<div className="flex">
				<div className="" onClick={sortAccurate}>
					정확도순
				</div>
				<div className="ml-2 mr-2 text-gray-300">|</div>
				<div className="text-gray-300" onClick={sortLatest}>
					최신순
				</div>
			</div>
		</>
	);
}

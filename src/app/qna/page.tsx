import QnaPreviewCard from './components/QnaPreviewCard';
function QnaPage() {
	return (
		<div className="w-full h-full px-10">
			<div className="flex flex-col gap-4 items-center">
				<QnaPreviewCard />
				<hr className="h-[1px] w-11/12 border-gray-300" />
				<QnaPreviewCard />
				<hr className="h-[1px] w-11/12 border-gray-300" />
				<QnaPreviewCard />
			</div>
		</div>
	);
}
export default QnaPage;
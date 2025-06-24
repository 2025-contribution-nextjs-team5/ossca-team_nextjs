interface SearchResultCountProps {
	count: number;
	// test
}

export default function SearchResultCount({ count }: SearchResultCountProps) {
	return (
		<div className="w-[120px] text-center mb-6 pt-2 pb-2 rounded-[0.3vw] font-bold text-xl text-white bg-ossca-mint-300/60">
			{count} Results
		</div>
	);
}

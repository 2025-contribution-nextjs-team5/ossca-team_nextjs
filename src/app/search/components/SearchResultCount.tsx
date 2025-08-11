interface Props {
	count: number;
}

function SearchResultCount({ count }: Props) {
	return (
		<div className="w-[120] pl-1 pr-1 text-center mt-3 pt-2 pb-2 rounded-[0.3vw] font-bold text-xl text-white bg-ossca-mint-300/80">
			{count} Results
		</div>
	);
}

export { SearchResultCount };

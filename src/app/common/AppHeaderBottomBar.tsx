export default function AppHeaderBottomBar({
	isVisible,
}: {
	isVisible: boolean;
}) {
	return (
		<div
			className={`absolute left-1/2 transform -translate-x-1/2 -bottom-2.5 h-0.5 w-16 bg-[color:var(--color-ossca-mint-300)] transition-opacity duration-300 ${
				isVisible ? 'opacity-100' : 'opacity-0'
			}`}
		/>
	);
}

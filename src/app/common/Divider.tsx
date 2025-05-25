interface DividerProps {
	width?: string;
	height?: string;
	color?: string;
	className?: string;
}
function Divider(props: DividerProps) {
	const {
		width = 'w-full',
		height = 'h-[1px]',
		color = 'border-black',
		className = '',
	} = props;
	const combinedClass = `${width} ${height} ${color} ${className}`;
	return <hr className={combinedClass} />;
}
export default Divider;

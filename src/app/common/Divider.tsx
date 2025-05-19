interface DividerProps {
	className?: string;
}
function Divider({ className }: DividerProps) {
	const baseClass = 'w-full h-[1px] border-black';
	const combinedClass = `${baseClass} ${className}`;
	return <hr className={combinedClass} />;
}
export default Divider;

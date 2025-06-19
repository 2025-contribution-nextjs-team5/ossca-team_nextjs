interface TabComponentProps {
	tabs: string[]; // tabs는 문자열 배열입니다.
	activeTab: string;
	setActiveTab: (activeTab: string) => void;
	activePosition?: {
		position: string;
		width: string;
	};
}

const Tab = ({
	tabs,
	activeTab,
	setActiveTab,
	activePosition,
}: TabComponentProps) => {
	return (
		<>
			<div className="flex px-4">
				{tabs.map((tab) => (
					<div
						key={tab}
						className="relative px-2 pb-1 cursor-pointer"
						onClick={() => setActiveTab(tab)}
					>
						<span
							className={`
               pretendard-700 transition-all duration-300 ease-in-out text-lg
              ${activeTab === tab ? 'text-teal-500' : 'text-gray-600'}
            `}
						>
							{tab}
						</span>
					</div>
				))}
			</div>
			{activeTab && (
				<div
					className={`${activePosition?.width} ${activePosition?.position} h-0.5 bg-teal-500 rounded-full shadow-md transition-all duration-300 ease-in-out`}
				/>
			)}
		</>
	);
};

export default Tab;

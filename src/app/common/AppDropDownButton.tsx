'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppHeaderBottomBar from './AppHeaderBottomBar';

interface DropDownItem {
	label: string;
	href: string;
}

interface DropDownButtonProps {
	title: string;
	items: DropDownItem[];
	id: string;
	activeDropdownId: string | null;
	setActiveDropdownId: (_: string | null) => void;
}

const getSortedItems = (items: DropDownItem[], currentPath: string) => {
	return [...items].sort((a, b) => {
		if (a.href === currentPath) return -1;
		if (b.href === currentPath) return 1;
		return 0;
	});
};

export default function AppDropDownButton({
	title,
	items,
	id,
	activeDropdownId,
	setActiveDropdownId,
}: DropDownButtonProps) {
	const dropdownRef = useRef<HTMLDivElement>(null);
	const currentPath = usePathname();

	// 현재 드롭다운이 열려있는지 확인
	const isDropDownOpen = activeDropdownId === id;

	// 현재 페이지가 드롭다운의 어떤 항목과 일치하는지 확인
	const isCurrentPathInDropdown = items.some(
		(item) => item.href === currentPath,
	);

	// 드롭다운 아이템 정렬
	const sortedItems = getSortedItems(items, currentPath);

	// 드롭다운 외부 클릭시 닫힘
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isDropDownOpen &&
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setActiveDropdownId(null);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isDropDownOpen, setActiveDropdownId]);

	// 클릭시 드롭다운 토글
	const toggleDropdown = () => {
		setActiveDropdownId(isDropDownOpen ? null : id);
	};

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				className="px-8 py-2 text-white cursor-pointer relative"
				onClick={toggleDropdown}
			>
				{title}
				<AppHeaderBottomBar
					isVisible={isDropDownOpen || isCurrentPathInDropdown}
				/>
			</button>

			{isDropDownOpen && (
				<div className="absolute left-1/2 transform -translate-x-1/2 mt-3 w-32 bg-white shadow-xl border-1 border-black z-10">
					<div role="menu">
						{sortedItems.map((item) =>
							currentPath === item.href ? (
								<span
									key={item.href}
									className="grid place-items-center w-full py-2 text-sm pretendard-700 bg-ossca-mint-300 cursor-text"
									role="menuitem"
								>
									{item.label}
								</span>
							) : (
								<Link
									key={item.href}
									href={item.href}
									onClick={() => setActiveDropdownId(null)}
									className="grid place-items-center w-full py-2 text-sm pretendard-500 hover:bg-gray-100"
									role="menuitem"
								>
									{item.label}
								</Link>
							),
						)}
					</div>
				</div>
			)}
		</div>
	);
}

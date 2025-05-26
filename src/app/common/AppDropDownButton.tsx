'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppHeaderBottomBar from './AppHeaderBottomBar';

interface DropdownItem {
	label: string;
	href: string;
}

interface DropdownButtonProps {
	title: string;
	items: DropdownItem[];
	id: string;
	activeDropdownId: string | null;
	setActiveDropdownId: (_: string | null) => void;
}

export default function AppDropdownButton({
	title,
	items,
	id,
	activeDropdownId,
	setActiveDropdownId,
}: DropdownButtonProps) {
	/**
	 * 드롭다운 외부 클릭 감지에 사용
	 */
	const dropdownRef = useRef<HTMLDivElement>(null);

	/**
	 * 현재 페이지 경로를 추적하기 위해 사용
	 *
	 * 그러나 URL 변경 없이 상태로 각 컴포넌트를 관리하기에
	 *
	 * 이는 추후 수정
	 */
	const currentPath = usePathname();

	// 현재 드롭다운이 열려있는지 확인
	const isDropDownOpen = activeDropdownId === id;
	// 현재 페이지가 드롭다운의 어떤 항목과 일치하는지 확인
	const isCurrentPathInDropdown = items.some(
		(item) => item.href === currentPath,
	);

	/**
	 * 현재 경로에 해당하는 드롭다운아이템을 맨 위로 정렬하는 함수
	 * @returns {DropDownItem[]} 정렬된 드롭다운 아이템 배열
	 */
	const getSortedItems = () => {
		return [...items].sort((a, b) => {
			if (a.href === currentPath) return -1;
			if (b.href === currentPath) return 1;
			return 0;
		});
	};

	/**
	 * 드롭다운 열림
	 */
	const openDropdown = () => {
		setActiveDropdownId(isDropDownOpen ? null : id);
	};

	/**
	 * 드롭다운 닫힘
	 */
	const closeDropdown = () => {
		setActiveDropdownId(null);
	};

	/**
	 * 드롭다운 외부 클릭 시 드롭다운 자동닫힘
	 */
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;
			if (
				isDropDownOpen &&
				dropdownRef.current &&
				!dropdownRef.current.contains(target)
			) {
				closeDropdown();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	});

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				className="px-8 py-2 text-white cursor-pointer relative"
				onClick={openDropdown}
			>
				{title}
				<AppHeaderBottomBar
					isVisible={isDropDownOpen || isCurrentPathInDropdown}
				/>
			</button>

			{isDropDownOpen && (
				<div className="absolute left-1/2 transform -translate-x-1/2 mt-3 w-32 bg-white shadow-xl border-1 border-black z-10">
					<div role="menu">
						{getSortedItems().map((item) =>
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

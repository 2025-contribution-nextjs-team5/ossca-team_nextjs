'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HeaderBottomBar from './HeaderBottomBar';

interface DropDownButtonProps {
	title: string;
	items: {
		label: string;
		href: string;
	}[];
	id: string;
	activeDropdown: string | null;
	setActiveDropdown: (id: string | null) => void;
}

export default function DropDownButton({
	title,
	items,
	id,
	activeDropdown,
	setActiveDropdown,
}: DropDownButtonProps) {
	const dropdownRef = useRef<HTMLDivElement>(null);
	const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const pathname = usePathname();

	// 현재 드롭다운이 열려있는지 확인
	const isOpen = activeDropdown === id;

	// 현재 페이지가 드롭다운의 어떤 항목과 일치하는지 확인
	const isCurrentPathInDropdown = items.some((item) => pathname === item.href);

	// 현재 페이지에 해당하는 항목을 맨 위로 정렬
	const sortedItems = [...items].sort((a, b) => {
		if (a.href === pathname) return -1;
		if (b.href === pathname) return 1;
		return 0;
	});

	// 마우스 호버시 드롭다운 열기
	const openDropdown = () => {
		if (closeTimerRef.current) {
			clearTimeout(closeTimerRef.current);
		}
		setActiveDropdown(id);
	};

	// 마우스 호버 벗어나면 1s 뒤에 드롭다운 닫기
	const closeDropdown = () => {
		closeTimerRef.current = setTimeout(() => {
			setActiveDropdown(null);
		}, 1000);
	};

	return (
		<div
			className="relative"
			ref={dropdownRef}
			onMouseEnter={openDropdown}
			onMouseLeave={closeDropdown}
		>
			<button className="px-8 py-2 text-white relative">
				{title}
				<HeaderBottomBar isVisible={isOpen || isCurrentPathInDropdown} />
			</button>

			{isOpen && (
				<div className="absolute left-1/2 transform -translate-x-1/2 mt-3 w-32 bg-white shadow-xl border-1 border-black z-20">
					<div role="menu">
						{sortedItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								onClick={() => setActiveDropdown(null)}
								className={`grid place-items-center block w-full py-2 text-sm pretendard-500 ${
									pathname === item.href
										? 'bg-[color:var(--color-ossca-mint-300)] pretendard-700'
										: 'hover:bg-gray-100'
								}`}
								role="menuitem"
							>
								{item.label}
							</Link>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

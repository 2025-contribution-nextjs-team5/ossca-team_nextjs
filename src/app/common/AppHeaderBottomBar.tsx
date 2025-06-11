'use client';

import { usePathname } from 'next/navigation';

/**
 * AppHeaderBottomBar 컴포넌트의 props 인터페이스
 * @interface AppHeaderBottomBarProps
 * @property {Array<{href: string}>} [isItems] - 드롭다운 메뉴 아이템 배열
 * @property {boolean} [isDevelopers] - Developers 메뉴 여부
 * @property {boolean} [isOpen] - 드롭다운 메뉴 열림 상태
 */
interface AppHeaderBottomBarProps {
	isItems?: { href: string }[];
	isDevelopers?: boolean;
	isOpen?: boolean;
}

/**
 * AppHeaderBottomBar 컴포넌트
 * @component
 * @example
 * ```tsx
 * // 드롭다운 메뉴용
 * <AppHeaderBottomBar isItems={items} isOpen={isOpen} />
 *
 * // Developers 메뉴용
 * <AppHeaderBottomBar isDevelopers />
 * ```
 */
export default function AppHeaderBottomBar({
	isItems,
	isDevelopers,
	isOpen,
}: AppHeaderBottomBarProps) {
	const pathname = usePathname();

	const shouldShowBottomBar = isDevelopers
		? pathname === '/developers'
		: isOpen || isItems?.some((item) => item.href === pathname);

	if (!shouldShowBottomBar) return null;

	return (
		<div
			className={`absolute left-1/2 transform -translate-x-1/2 -bottom-2.5 h-0.5 w-16 bg-ossca-mint-300 transition-opacity duration-300 ${
				shouldShowBottomBar ? 'opacity-100' : 'opacity-0'
			}`}
		/>
	);
}

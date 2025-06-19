'use client';
import { usePathname } from 'next/navigation';

interface AppHeaderBottomBarProps {
	isItems?: { href: string }[];
	isOpen?: boolean;
	highlightRoutes?: string[];
}

export default function AppHeaderBottomBar({
	isItems,
	isOpen,
	highlightRoutes,
}: AppHeaderBottomBarProps) {
	const pathname = usePathname();

	const shouldShowBottomBar =
		isOpen || // 드롭다운이 열려 있을 때
		highlightRoutes?.some((route) => pathname.startsWith(route)) || // 현재 경로가 하이라이트 경로와 같을 때
		isItems?.some((item) => item.href === pathname); // 드롭다운 아이템 경로와 같을 때

	if (!shouldShowBottomBar) return null;

	return (
		<div
			className={`absolute left-1/2 transform -translate-x-1/2 -bottom-2.5 h-0.5 w-16 bg-ossca-mint-300 transition-opacity duration-300 ${
				shouldShowBottomBar ? 'opacity-100' : 'opacity-0'
			}`}
		/>
	);
}

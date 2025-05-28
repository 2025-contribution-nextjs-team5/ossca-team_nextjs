'use client';

import { usePathname } from 'next/navigation';

interface AppHeaderBottomBarProps {
	isItems?: { href: string }[];
	isDevelopers?: boolean;
	isOpen?: boolean;
}

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

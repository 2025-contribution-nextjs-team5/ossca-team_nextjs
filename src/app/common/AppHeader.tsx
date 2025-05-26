'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import AppDropdownButton from './AppDropdownButton';
import AppHeaderBottomBar from './AppHeaderBottomBar';

const postingMenuItems = [
	{ label: 'April', href: '/posting/april' },
	{ label: 'May', href: '/posting/may' },
];

const qnaMenuItems = [
	{ label: 'Career', href: '/qna/career' },
	{ label: 'Employment', href: '/qna/employment' },
	{ label: 'Frontend', href: '/qna/frontend' },
];

export default function AppHeader() {
	// 1. 변수명 수정
	const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
	const pathname = usePathname();
	const isDropdownOpen = activeDropdownId !== null;

	// 2. 이벤트 핸들러의 명시적인 이름 부여 및 표현식으로부터의 분리
	const closeDropdown = () => {
		setActiveDropdownId(null);
	};

	return (
		<>
			{/* 검은색 반투명 배경 - 드롭다운이 활성화됐을 때만 표시 */}
			{isDropdownOpen && (
				<div
					className="fixed inset-0 bg-black/30 z-5"
					onClick={closeDropdown}
				/>
			)}

			<header className="fixed top-0 left-0 right-0 bg-black shadow-sm z-10 pretendard-700">
				<div className="max-w-7xl flex h-16 items-center">
					{/* 로고 */}
					<Link href="/" className="ml-4 mr-8" onClick={closeDropdown}>
						<Image
							src="/ossca_logo.svg"
							alt="ossca_logo"
							width={158}
							height={37}
							priority
						/>
					</Link>

					{/* 네비게이션 메뉴 */}
					<nav className="flex space-x-2">
						<AppDropdownButton
							title="Posting"
							items={postingMenuItems}
							id="posting"
							activeDropdownId={activeDropdownId}
							setActiveDropdownId={setActiveDropdownId}
						/>

						<AppDropdownButton
							title="Q&A"
							items={qnaMenuItems}
							id="qna"
							activeDropdownId={activeDropdownId}
							setActiveDropdownId={setActiveDropdownId}
						/>

						<Link
							href="/developers"
							className="px-8 py-2 text-white relative group"
						>
							Developers
							<AppHeaderBottomBar isVisible={pathname === '/developers'} />
						</Link>
					</nav>
				</div>
			</header>
		</>
	);
}
